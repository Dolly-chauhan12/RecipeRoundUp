import React from "react";
import { createOrGetUser } from "../utils/createOrGetUser";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { userProfile, addUser } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div>
      {userProfile ? (
        <div className="mt-0.5">
          <Link to={`/home/user-profile/${userProfile?._id}`} className="block">
            <img
              src={userProfile.image}
              alt="user-pic"
              className="w-12 h-12 rounded-full "
            />
          </Link>
        </div>
      ) : (
        <GoogleLogin
          shape="pill"
          theme="filled_black"
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
