import React, { useState } from "react";
import { useNavigate } from "react-router";
import { UseAuth } from "../context/auth_context";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = UseAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(
          errorText || "An error occurred during login. Please try again."
        );
        return;
      }

      const data = await response.json();

      login(data.user, data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occured during login. please try again.");
    }
  };

  return (
    <div>
      <div className="mt-24 flex flex-col w-1/3 mx-auto ">
        <h2 className="text-slate-800 font-medium uppercase text-center text-xl my-2 px-2">
          login here
        </h2>
        <div className="w-full m-auto rounded-md h-60 p-4">
          <form
            className="flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            {error && <div className="text-red-500 mt-2">{error}</div>}

            <div className="flex flex-col w-full mt-2">
              <label className="font-medium text-gray-500" htmlFor="email">
                Email
              </label>
              <input
                className="border p-2 w-full text-gray-700 active:outline-2 focus:outline-none focus:shadow-outline h-10 rounded-md"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full mt-2">
              <label className="font-medium text-gray-500" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none text-gray-700 leading-tight focus:shadow-outline focus:outline-none border p-2 w-full h-10 rounded-md"
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {/* <button type="button" onClick={togglePasswordVisibility}>
                Toggle
              </button> */}
            </div>
            <div className="w-full mt-2 p-0">
              <button
                className="bg-slate-800 hover:bg-slate-700 outline-none hover:outline-none font-semibold text-white h-10 w-full float-right rounded-md"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
