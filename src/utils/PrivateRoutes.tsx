import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function PrivateRoutes() {
  const { userProfile } = useAuthStore();
  return userProfile ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
