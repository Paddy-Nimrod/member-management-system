import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { UseAuth } from "../context/auth_context";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token } = UseAuth();
  const storedToken = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (!token && !storedToken) {
      navigate("/");
    }
  }, [token, storedToken, navigate]);

  return token || storedToken ? children : null;
};

export default ProtectedRoute;
