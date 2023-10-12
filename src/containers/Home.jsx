import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Sidebar, UserDetail } from "../components";
import useAuthStore from "../store/authStore";
import Posts from "./Posts";

const Home = () => {
  const [user, setUser] = useState();
  const { userProfile } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  return (
    <div className="flex">
      <div className="h-[92vh] ">
        <Sidebar />
      </div>

      <div className="pb-2 flex-1 h-screen ">
        <Routes>
          <Route path="/*" element={<Posts user={user && user} />} />
          <Route
            path="/user-profile/:userId"
            element={<UserDetail viewer={user && user} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
