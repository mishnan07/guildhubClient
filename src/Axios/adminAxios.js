import axios from "axios";
import { adminAPI } from "../Constants/Api";

const adminAxios = axios.create({
    baseURL:adminAPI
})

export default adminAxios