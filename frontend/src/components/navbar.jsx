import React from "react";
import { UseAuth } from "../context/auth_context";
import {Link} from "react-router"

const Navbar = () => {
  const { user, logout } = UseAuth();

  const handleLogout = () => {
    logout(); 
    window.location.href = "/"; 
  };

  return (
    <div className="bg-slate-800 h-16 mt-0 w-full mx-auto flex justify-between px-4">
      <div className="flex flex-row w-full m-auto">
        <p className="text-white font-semibold text-lg">Member system</p>
        <ul className="flex w-5/12 m-auto justify-evenly items-end mr-0">
          {user ? (
            <>
              <li className="text-white font-normal text-lg hover:cursor-pointer hover:underline hover:underline-offset-2">
                <Link to="/dashboard">Members</Link>
              </li>
              <li className="text-white font-normal text-lg hover:cursor-pointer hover:underline hover:underline-offset-2">
                <Link to="/add/member">New Member</Link>
              </li>
              <li className="text-white font-normal text-lg ">{user.email}</li>
              <li className="text-white font-normal text-lg">
                <button
                  onClick={handleLogout}
                  className="rounded-sm bg-white text-slate-800"
                  type="button"
                >
                  logout
                </button>
              </li>
            </>
          ) : (
            <div className="w-1/4 flex items-center m-auto justify-around mr-0">
              {/* If not logged in, show Login/Signup options */}
              <li className="text-white text-lg ">
                <a href="/">Login</a>
              </li>
              <li className="text-white text-lg">
                <a href="/user/register">Register</a>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
