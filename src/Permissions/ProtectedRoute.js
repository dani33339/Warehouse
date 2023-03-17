import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, redirectPath = '/Sing-in' }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return <Outlet />;
  };

export default ProtectedRoute;
