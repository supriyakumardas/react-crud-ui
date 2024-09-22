import axios from "axios";
import { baseurl } from "../api/baseUrl";
import { url } from "../api/apiConstants";



const userDetails =(id)=>{
    const apiUrl = baseurl+url.userDetails+id
    console.log(apiUrl)
    return axios.get(apiUrl);
}

export default {userDetails};