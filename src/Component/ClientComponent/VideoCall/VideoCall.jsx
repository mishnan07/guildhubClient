import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = 'd94c43de92314a14a97112fcc8c77c8e';
const TOKEN = '007eJxTYGieV253lL/8dG3jKoGKt6lZeZa7rj3aqfTfaFd4i7nnLDsFhhRLk2QT45RUSyNjQ5NEILI0NzQ0SktOtkg2N0+2SG3fIp7aEMjI0KHxlZmRAQJBfFaGssyU1HwGBgCEjCAV';
const CHANNEL = 'video';
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

const VideoCall = () => {
    const [localVideoTrack, setLocalVideoTrack] = useState(null);
    const [remoteVideoTrack, setRemoteVideoTrack] = useState(null);
  
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
  
    useEffect(() => {
      const initializeAgora = async () => {
        try {
          // Join the channel
          await client.join(APP_ID, CHANNEL, null, null);
  
          // Create a local video track
          const videoTrack = await AgoraRTC.createCameraVideoTrack();
          setLocalVideoTrack(videoTrack);
  
          // Play the local video track in the local video DOM element
          videoTrack.play(localVideoRef.current);
  
          // Subscribe to remote user's video tracks
          client.on('user-published', async (user, mediaType) => {
            if (mediaType === 'video') {
              const remoteVideoTrack = await client.subscribe(user, mediaType);
              setRemoteVideoTrack(remoteVideoTrack);
              remoteVideoTrack.play(remoteVideoRef.current);
            }
          });
  
          // Handle user leaving
          client.on('user-left', (user) => {
            if (remoteVideoTrack && user.uid === remoteVideoTrack.uid) {
              setRemoteVideoTrack(null);
            }
          });
        } catch (error) {
          console.error('Error joining Agora channel:', error);
        }
      };
  
      initializeAgora();
  
      return () => {
        if (localVideoTrack) {
          localVideoTrack.stop();
          localVideoTrack.close();
        }
        if (remoteVideoTrack) {
          remoteVideoTrack.stop();
          remoteVideoTrack.close();
        }
        client.leave();
      };
    }, []);
  
    return (
      <div>
        <h1>One-to-One Video Call</h1>
        <div>
          <h2>Your Video</h2>
          <video ref={localVideoRef} autoPlay  />
        </div>
        <div>
          <h2>Remote User's Video</h2>
          <video ref={remoteVideoRef} autoPlay />
        </div>
      </div>
    );
  };
  
  export default VideoCall;