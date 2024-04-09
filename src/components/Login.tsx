import React from "react";
import { createOrGetUser } from "../utils/createOrGetUser";
import { GoogleLogin } from "@react-oauth/google";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { userProfile, addUser } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div>
      {userProfile ? (
        <div> {userProfile.userName} </div>
      ) : (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            createOrGetUser(credentialResponse, addUser);
            navigate("/home");
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </div>
  );
};

export default Login;
