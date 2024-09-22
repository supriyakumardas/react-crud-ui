import axios from "axios";
import { baseurl } from "../api/baseUrl";
import { url } from "../api/apiConstants";



const createProduct =(payload)=>{
    const apiUrl = baseurl+url.createProduct
    return axios.post(apiUrl,payload);
}

const updateProduct =(id,payload)=>{
    const apiUrl = baseurl+url.updateProduct+id
    return axios.put(apiUrl,payload);
}

const getProductByUserId =(userId)=>{
    const apiUrl = baseurl+url.getAllProductByUserId+userId
    return axios.get(apiUrl);
}

const getProductDetails =(id)=>{
    const apiUrl = baseurl+url.productDeatals+id
    return axios.get(apiUrl);
}


const deleteProduct =(productId)=>{
    const apiUrl = baseurl+url.deleteProduct+productId
    return axios.get(apiUrl);
}
export default {createProduct,updateProduct,getProductByUserId,deleteProduct,getProductDetails};