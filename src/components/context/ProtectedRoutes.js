import { React, useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";

const ProtectedRoutes = () => {
  const { account, setAccount } = useContext(LoginContext);

  console.log("hi");
  return account ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
