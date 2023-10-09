import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID = 'd94c43de92314a14a97112fcc8c77c8e';
const TOKEN = '007eJxTYGieV253lL/8dG3jKoGKt6lZeZa7rj3aqfTfaFd4i7nnLDsFhhRLk2QT45RUSyNjQ5NEILI0NzQ0SktOtkg2N0+2SG3fIp7aEMjI0KHxlZmRAQJBfFaGssyU1HwGBgCEjCAV';
const CHANNEL = 'video';

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

const VideoRoom = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Initialize Agora SDK and join the channel
    const initializeAgora = async () => {
      try {
        // Join the channel
        await client.join(APP_ID, CHANNEL, TOKEN, null);

        // Create microphone and camera tracks
        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();

        // Publish tracks to the channel
        await client.publish([audioTrack, videoTrack]);

        // Update the users state with the current user
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid: client.uid,
            videoTrack,
          },
        ]);
      } catch (error) {
        console.error('Error joining Agora channel:', error);
      }
    };

    initializeAgora();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.uid}>
          {/* Render video for each user */}
          <h2>User {user.uid}</h2>
          <video
            ref={(ref) => {
              if (ref && user.videoTrack) {
                user.videoTrack.play(ref);
              }
            }}
            autoPlay
          />
        </div>
      ))}
      <h1>Video Room</h1>
    </div>
  );
};

export default VideoRoom;


let requirement = location.pathname.includes('requirement')?true:false
{requirement && <RequirementShow Type={Type} user={user} />}


import axios from "axios";
import { useSelector } from "react-redux";
import { userApi} from "../Constants/Api";

const createUserInstance = () => {
  const token = useSelector((state)=> state.Client.Token);

  const userInstance = axios.create({
    baseURL: userApi,
  });


  userInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return userInstance;
};

export default createUserInstance;




import CreateAdminInstance from '../../../Axios/adminAxios';
const adminAxios = CreateAdminInstance()


import CreateUserInstance from '../../../Axios/userAxios';
const userAxios = CreateUserInstance()

import axios from "axios";
import {  userAPI } from "../Constants/Api";
import { useSelector } from "react-redux";


const CreateUserInstance = ()=>{
    const token = useSelector((state) => state.ClientAuth.Token);

    const userInstance = axios.create({
        baseURL:userAPI
    });

    userInstance.interceptors.request.use(
        (config)=>{
            if(token){
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config
        },
        (error)=>{
            return Promise.reject(error);
        }
    );
    return userInstance
}



export default CreateUserInstance;



const proAxios = CreateProInstance()
