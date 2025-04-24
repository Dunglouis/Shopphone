import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const CheckNotLogged = (OriginComponent) => {
  const ExtendsComponent = () => {
    const login = useSelector(({ Auth }) => Auth.logged.isLogged);
    return login ? <OriginComponent /> : <Navigate to="/login" />;
  };
  return ExtendsComponent;
};

export default CheckNotLogged;
