import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import userService from '../../service/userService';
import { showErrorMessage } from '../../constants/alertMessages';

const UserProfile = () => {

  const [userData , setUserData ] = useState({});

  const getUserData=async()=>{
    try {
      const userId = localStorage.getItem("userId");
console.log(userId)
      const res = await userService.userDetails(userId.toString());

      if(res.status === 200){
        setUserData(res.data.data)
      }
    } catch (error) {
      showErrorMessage(error)
    }
  }

  
useEffect(()=>{
  getUserData();
},[])

  return (
    <div style={{ padding: '180px' }} className="row-center">
    <Card className='card'>
  <div className='row-center img-div'>
    <div className='img-holder'>
      <img src={require('../../assets/images/users/user4.jpg')} className='card-img' />
    </div>
  </div>
  <div className='name-container'>
    <div className='name-text'>
     {userData?.name}
    </div>
  </div>
  <div className='details-container'>
    <div className='prop-value'>
      <div className='card-prop'>
        <span>Email</span> <span style={{ paddingRight: 1 }}>:</span>
      </div>
      <div className='card-des'>
        <span style={{ paddingLeft: 1 }}>{userData?.email} </span>
      </div>
    </div>
    <div className='prop-value'>
      <div className='card-prop'>
        <span>Mobile</span> <span style={{ paddingRight: 1 }}>:</span>
      </div>
      <div className='card-des'>
        <span style={{ paddingLeft: 1 }}>+91</span><span>{userData?.mobile}</span>
      </div>
    </div>
  </div>
</Card>
    </div>
  )
}

export default UserProfile