import React from "react";

const RegisterPage = () => {
  return (
    <div>
      <div className="mt-19 flex flex-col w-1/3 mx-auto ">
        <h2 className="text-slate-800 font-medium uppercase text-center text-xl my-2 px-2">
          Register Now
        </h2>
        <div className="w-full m-auto  rounded-md h-60 p-4">
          <form
            className="flex flex-col justify-center"
            action=""
            method="post"
          >
            <div>
              <label className="font-medium text-gray-500" htmlFor="firstName">
                First Name
              </label>
              <input
                className="border p-2 w-full active:outline-2 active:outline-slate-800 h-10 rounded-md"
                type="text"
                name="firstName"
                id="firstName"
              />
            </div>
            <div>
              <label className="font-medium text-gray-500" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="border p-2 w-full active:outline-2 active:outline-slate-800 h-10 rounded-md"
                type="text"
                name="lastName"
                id="lastName"
              />
            </div>
            <div>
              <label className="font-medium text-gray-500" htmlFor="email">
                Email
              </label>
              <input
                className="border p-2 w-full active:outline-2 active:outline-slate-800 h-10 rounded-md"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div>
              <label className="font-medium text-gray-500" htmlFor="password">
                Password
              </label>
              <input
                className="border p-2 w-full active:outline-2 active:outline-slate-800 h-10 rounded-md"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div>
              <label
                className="font-medium text-gray-500"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="border p-2 w-full active:outline-2 active:outline-slate-800 h-10 rounded-md"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
            </div>
            <div>
              <button
                className="bg-slate-800 hover:bg-slate-700 outline-none hover:outline-none font-semibold text-white h-10 w-full float-right rounded-md "
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
