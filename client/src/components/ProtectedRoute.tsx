import { ReactNode, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider";
import SignUpPage from "../pages/SignUp";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  const { isLoggedIn } = useContext(UserContext);


  if (!isLoggedIn) {
    return <SignUpPage />
  }

  return <>{children}</>;
};

export default ProtectedRoute;

