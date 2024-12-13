import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { UseAuth } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { token } = UseAuth();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default ProtectedRoute;
