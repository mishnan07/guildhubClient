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



