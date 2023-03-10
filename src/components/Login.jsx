import React from 'react'
import { createOrGetUser } from '../utils/createOrGetUser';
import { GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../store/authStore';


const Login = () => {

  const { userProfile, addUser } = useAuthStore();

  return (
    <div>
      {userProfile ? (<div> {userProfile.userName} </div>) : (<GoogleLogin
        onSuccess={credentialResponse => {
          createOrGetUser(credentialResponse, addUser);
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />)}
    </div>

  )
}

export default Login