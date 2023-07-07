import React, { useContext } from "react";
import { AuthContext } from "../Context/Auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return true ? <Outlet /> : <Navigate to="login" />;
};

export default ProtectedRoutes;
