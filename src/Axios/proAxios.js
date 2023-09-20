import axios from "axios";
import { professionalAPI } from "../Constants/Api";

const professionalInstance = axios.create({
    baseURL:professionalAPI
})


export default professionalInstance