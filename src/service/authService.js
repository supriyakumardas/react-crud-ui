import axios from "axios";
import { baseurl } from "../api/baseUrl";
import { url } from "../api/apiConstants";



const userRegistration =(payload)=>{
    const apiUrl = baseurl+url.register
    return axios.post(apiUrl,payload);
}

const userLogin =(payload)=>{
    const apiUrl = baseurl+url.login
    return axios.post(apiUrl,payload);
}


export default {userRegistration,userLogin};