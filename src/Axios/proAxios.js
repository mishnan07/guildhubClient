import axios from "axios";
import { professionalAPI } from "../Constants/Api";
import { useSelector } from "react-redux";


const CreateProInstance = ()=>{
    const token = useSelector((state) => state.proAuth.Token);

    const proInstance = axios.create({
        baseURL:professionalAPI
    });

    proInstance.interceptors.request.use(
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
    return proInstance
}



export default CreateProInstance;