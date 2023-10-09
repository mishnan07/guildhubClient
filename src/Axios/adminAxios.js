import axios from "axios";
import { adminAPI } from "../Constants/Api";
import { useSelector } from "react-redux";


const CreateAdminInstance = ()=>{
    const token = useSelector((state) => state.AdminAuth.Token);

    const adminInstance = axios.create({
        baseURL:adminAPI
    });

    adminInstance.interceptors.request.use(
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
    return adminInstance
}

export default CreateAdminInstance





