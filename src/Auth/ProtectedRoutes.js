import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// import { AuthContext } from "../Context/Auth";

const ProtectedRoutes = () => {
  // const { isLoggedIn } = useContext(AuthContext);

  const isLogged = useSelector((state) => state.isLogged);

  return isLogged ? <Outlet /> : <Navigate to="login" />;
};

export default ProtectedRoutes;
