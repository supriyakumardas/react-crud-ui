import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { path } from './constants/path';
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';



import Login from './view/auth/login';
import Register from './view/auth/register';
import UserProfile from './view/user/userProfile';
import Product from './view/product/product';
import CreateProduct from './view/product/createProduct';
import EditProduct from './view/product/editProduct';


const App = () => {
    return (
        <>
            <BrowserRouter basename='/'>
                <Routes>
                    <Route path={path.login} element={<Login />} />
                    <Route path={path.register} element={<Register />} />
                    <Route path={path.product} element={<Product />} />
                    <Route path={path.createProduct} element={<CreateProduct />} />
                    <Route path={path.editProduct+":id"} element={<EditProduct />} />

                    <Route path={path.user} element={<UserProfile />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>

    )
}

export default App