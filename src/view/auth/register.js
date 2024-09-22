

import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { error } from '../../constants/errorText';
import { showErrorMessage, showSuccessMessage } from '../../constants/alertMessages';
import { Puff } from 'react-loader-spinner'
import { path } from '../../constants/path';
import { Button, Input } from 'antd';
import * as EmailValidator from 'email-validator';
import authService from '../../service/authService';


const Register = () => {
    const [windowHeight , setWindowHeight] = useState(window.innerHeight);
    const [windowWidth , setWindowWidth] = useState(window.innerWidth)

    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);



    const [isError, setIsError] = useState(false);
    const [loader, setLoader] = useState(false);
  
    const navigate = useNavigate();

    const handleSize =()=>{
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
    }

    useEffect(()=>{
        handleSize();
        window.addEventListener('resize',handleSize);

        return ()=> window.removeEventListener('resize',handleSize)
    },[windowWidth])
  
    const clearFields = () => {
      setPassword("");
    }
  
    const submitHandler = async () => {
      try {
        if (!name || name.trim() === "") {
          setIsError(true)
          return;
        }
        if (!email || !EmailValidator.validate(email)) {
          setIsError(true)
          return;
        }
    
        if (!password || password.length < 8) {
          setIsError(true)
          return;
        }
        if(confirmPassword !== password){
          setIsError(true)
          return;
        }
        setLoader(true);
        const payload = {}
        payload.name = name;
        payload.email = email;
        payload.password = password;

        console.log(payload)
  
        const res = await authService.userRegistration(payload);
  
        if (res.status === 201) {
          // localStorage.setItem('user', JSON.stringify(res.data.userData));
          showSuccessMessage(res.data.message)
          setTimeout(() => {
            navigate(path.login);
            clearFields();
            setLoader(false)
          }, 1000);
  
        }
  
      } catch (error) {
        console.log(error);
        showErrorMessage(error.response.data.message)
        setLoader(false)
      }
    };
  
    const passwordHandler=()=>{
      setShowPassword(!showPassword)
    }
    const confirmPasswordHandler=()=>{
      setShowConfirmPassword(!showConfirmPassword)
    }
   

  return (
    <>
      <div style={{ width:windowWidth, height: windowHeight }} className="row-center">
        <div
          style={{
            height:600,
            width:windowWidth < 1500? (windowWidth * 1.2) / 1.5 : (windowWidth * 1.2) / 2,
            backgroundColor: '#fff',
            boxShadow: '5px 1px 15px 0 gray',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div style={{ width: '50%', height: '100%' ,display:"flex",justifyContent:"center"}}>
            <img
              src={require('../../assets/images/icons/register.png')}
              style={{
                height: '80%',
                width: '80%',
                borderRadius: '10px',
                objectFit: 'contain',
              }}
            />
          </div>
          <div style={{ width: '50%', height: '100%' }}>
         
            <div style={{ height: '18%', width: '100%' }} className="row-bottom">
              <div style={{ fontWeight: 'bolder', color: '#000', fontSize: '28px' }}>Account Registration</div>
            </div>
            <div style={{ height: '82%', width: '100%', paddingTop: 50 }} className="row-top">
              <div style={{ width: '75%' }}>
                <div>
                  <Input
                    className="input-field"
                    type="text" name="name"
                    placeholder="Enter Name"
                    
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  {
                    isError && (!name || name.trim() === "") ?
                      <div className="error-text">{error.name}</div> :
                      null
                  }

                </div>
                <div>
                  <Input
                    className="input-field"
                    type="email" name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  {
                    isError && (!email || !EmailValidator.validate(email)) ?
                      <div className="error-text">{error.email}</div> :
                      null
                  }

                </div>
              
                <div>
                  <div style={{display:"flex"}}>
                    <div style={{width:"100%"}}>
                    <Input
                    className="input-field"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                    </div>
                 
                    
                   <div style={{marginLeft:"-30px",marginTop:"10px",zIndex:1}} >
                    { showPassword ?
                    <img 
                    onClick={passwordHandler}
                    src={require("../../assets/images/icons/eye.png")} 
                    style={{height:"15px",width:"20px"}}
                     /> :
                      <img 
                      onClick={passwordHandler}
                   src={ require("../../assets/images/icons/eye-hide.png")} 
                   style={{height:"20px",width:"20px",}}
                    /> }
                 
                 </div>
                
                  </div>
                  
                  {
                    isError && (!password || password.length < 8) ?
                      <div className="error-text">{error.password}</div> :
                      null
                  }
                </div>
                <div>
                  <div style={{display:"flex"}}>
                    <div style={{width:"100%"}}>
                    <Input
                    className="input-field"
                    type={showConfirmPassword ? "text" : "password"}
                    name="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                    </div>
                 
                    
                   <div style={{marginLeft:"-30px",marginTop:"10px",zIndex:1}} >
                    { showConfirmPassword ?
                    <img 
                    onClick={confirmPasswordHandler}
                    src={require("../../assets/images/icons/eye.png")} 
                    style={{height:"15px",width:"20px"}}
                     /> :
                      <img 
                      onClick={confirmPasswordHandler}
                   src={ require("../../assets/images/icons/eye-hide.png")} 
                   style={{height:"20px",width:"20px",}}
                    /> }
                 
                 </div>
                
                  </div>
                  
                  {
                    isError && (confirmPassword !== password) ?
                      <div className="error-text">{error.confirmPassword}</div> :
                      null
                  }
                </div>

                <Button type='primary' block  onClick={submitHandler}>
                  {loader ?
                    <div className='row-center'>
                      <Puff
                        visible={true}
                        height="25"
                        width="25"
                        color="#fff"
                        ariaLabel="puff-loading"
                      />
                    </div> :

                    "Register"}
                </Button>
                <div style={{marginTop:10}}>
                   <span>Already have an account? <Link to={path.login} style={{textDecoration:"none",color:"#1677ff"}}>Login</Link></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
