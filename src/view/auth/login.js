import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { error } from '../../constants/errorText';
import { showErrorMessage, showSuccessMessage } from '../../constants/alertMessages';
import { Puff } from 'react-loader-spinner'
import { path } from '../../constants/path';
import { Button, Input } from 'antd';
import authService from '../../service/authService';
import * as EmailValidator from 'email-validator';




const Login = () => {
    const [windowHeight , setWindowHeight] = useState(window.innerHeight);
    const [windowWidth , setWindowWidth] = useState(window.innerWidth)

    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);
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
      setEmail("");
      setPassword("");
    }
  
    const loginHandler = async () => {
      try {
     
        if (!email || !EmailValidator.validate(email)) {
          setIsError(true)
          return;
        }
        if (!password || password.length < 8) {
          setIsError(true)
          return;
        }
        setLoader(true);
        const payload = {}
        payload.email = email;
        payload.password = password;

        console.log(payload)
  
        const res = await authService.userLogin(payload);
  
        if (res.status === 200) {
          localStorage.setItem('userId', res.data.userId);
          showSuccessMessage(res.data.message)
          setTimeout(() => {
            navigate(path.product);
            clearFields();
            setLoader(false)
          }, 1000);
  
        }
        setLoader(false)

      } catch (error) {
        console.log(error);
        showErrorMessage(error.response.data.message)
        setLoader(false)
      }
    };
  
    const passwordHandler=()=>{
      setShowPassword(!showPassword)
    }
   

  return (
    <>
      <div style={{ width:windowWidth, height: windowHeight }} className="row-center">
        <div
          style={{
            height: 600,
            width:windowWidth < 1500? (windowWidth * 1.2) / 1.5 : (windowWidth * 1.2) / 2,
            backgroundColor: '#fff',
            boxShadow: '5px 1px 15px 0 gray',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <div style={{ width: '50%', height: '100%' }}>
            <img
              src={require('../../assets/images/icons/login_icon.jpg')}
              style={{
                height: '80%',
                width: '100%',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
          </div>
          <div style={{ width: '50%', height: '100%' }}>
            
            <div style={{ height: '18%', width: '100%' }} className="row-bottom">
              <div style={{ fontWeight: 'bolder', color: '#000', fontSize: '28px' }}>Account Sign In</div>
            </div>
            <div style={{ height: '82%', width: '100%', paddingTop: 50 }} className="row-top">
              <div style={{ width: '75%' }}>
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
                      <div className="error-text">{error.password }</div> :
                      null
                  }
                </div>

                <Button type='primary' block  onClick={loginHandler}>
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

                    "Login"}
                </Button>

                <div style={{marginTop:10}}>
                   <span>Don't have an account? <Link to={path.register} style={{textDecoration:"none",color:"#1677ff"}}>Sign up</Link></span>
                </div>

            
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
