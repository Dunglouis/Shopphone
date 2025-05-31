import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckLogged = (OriginComponent) => {
  const ExtensComponent = () => {
    const login = useSelector(({ Auth }) => Auth.logged.isLogged);
    return login ? <Navigate to="/" /> : <OriginComponent />;
  };
  return ExtensComponent;
};

export default CheckLogged;
