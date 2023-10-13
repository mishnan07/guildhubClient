import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = 'd94c43de92314a14a97112fcc8c77c8e';
const TOKEN = '007eJxTYBCXv/v82FpvMekJ/3+KGkXPjztwsdm7+Y6D6oW8dz9818koMKRYmiSbGKekWhoZG5okApGluaGhUVpyskWyuXmyRepDW4nUhkBGBl6rAGZGBggE8VkZyjJTUvMZGACIax9v';
const CHANNEL = 'video';

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

const VideoRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks,setLocalTracks] = useState([])
  const [remoteUsersVolume, setRemoteUsersVolume] = useState({});


  const handleUserJoined = (user, mediaType) => {
    client.subscribe(user, mediaType);
  
    if (mediaType === 'video') {
      const newUser = {
        uid: user.uid,
        videoTrack: user.videoTrack,
      };
  
      setUsers((previousUsers) => [...previousUsers, newUser]);
  
      // Set the initial volume level for the user (e.g., 100% by default)
      setVolume(user.uid, 100);
    }
  };
  


  const hadleUserLeft = (user)=>{
     setUsers((previousUsers)=>
     previousUsers.filter((u) => u.uid !== user.uid)
     )
  }
  

  useEffect(() => {
    // Initialize Agora SDK and join the channel
  // Inside the useEffect
const initializeAgora = async () => {
    try {
      client.on('user-published', handleUserJoined);
      client.on('user-left', hadleUserLeft);
      // Join the channel
      await client.join(APP_ID, CHANNEL, TOKEN, null);
  
      // Create microphone and camera tracks
      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      const [audioTrack, videoTrack] = tracks;
      setLocalTracks(tracks);
  
      // Publish tracks to the channel
      await client.publish([audioTrack, videoTrack]); // This line publishes both audio and video tracks.
  
      // Update the users state with the current user
      setUsers((previousUsers) => [
        ...previousUsers,
        {
          uid: client.uid,
          videoTrack,
          audioTrack,
        },
      ]);
    } catch (error) {
      console.error('Error joining Agora channel:', error);
    }
  };
  
    initializeAgora();

    return () => {
        for (let localTrack of localTracks) {
            localTrack.stop();
            localTrack.close();
        }
        client.off('user-published', handleUserJoined);
        client.off('user-left', hadleUserLeft);
        client.unpublish(localTracks); // Unpublish the local tracks
        client.leave();
    }
    
  }, []);

  const setVolume = (uid, volume) => {
    // Update the state to reflect the new volume level
    setRemoteUsersVolume((prevVolume) => ({
      ...prevVolume,
      [uid]: volume,
    }));
  
    // Use the Agora SDK to set the volume for the user
    client.setAudioVolume(uid, volume);
  };
  

  return (
    <div>
      {users.map((user) => (
  <div key={user.uid}>
    <h2>User {user.uid}</h2>
    <video
      ref={(ref) => {
        if (ref && user.videoTrack) {
          user.videoTrack.play(ref);
        }
      }}
      autoPlay
    />
    <input
      type="range"
      min="0"
      max="100"
      value={remoteUsersVolume[user.uid] || 100}
      onChange={(e) => setVolume(user.uid, e.target.value)}
    />
  </div>
))}

      <h1>Video Room</h1>
    </div>
  );
};

export default VideoRoom;