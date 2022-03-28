import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoginPage from "../pages/LoginPage";

export default function PrivateRoute(props) {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet/> : <LoginPage />;
}
