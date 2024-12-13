import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); 

  const login = (userData, token) => {
    setUser(userData);
    setToken(token)
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("authToken", token);
    navigate("/dashboard")
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("authToken");
    navigate("/"); 
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token,login, logout }}>
      {children} 
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
