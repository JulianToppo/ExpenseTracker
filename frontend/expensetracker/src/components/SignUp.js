import React, { useRef, useState, useSelector } from "react";

import { useNavigate } from "react-router-dom";
import UserFunctions from "../utils/storefunctions/UserFunctions";

const SignUp = () => {
  const { loginUserFunc, signUpFunc } = UserFunctions();
  const [isLogin, setisLogin] = useState(false);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isLogin) {
      loginUserFunc(email.current.value, password.current.value);
    } else {
      signUpFunc(email.current.value, password.current.value,username.current.value);
    }
  };

  const onForgotPasswordManager = () => {
    navigate("/forgotpassword");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center h-3/4 w-1/2 mx-auto  bg-slate-300 rounded-lg">
      <form
        className="flex w-full flex-col p-5 space-y-4"
        onSubmit={onSubmitHandler}
      >
        <div>
          <h1 className="text-3xl">{isLogin ? "Login" : "SignUp"}</h1>
        </div>

        {!isLogin && <div>
          <label>Username</label>
          <input
            className="p-2 w-full  rounded-md"
            ref={username}
            type="username"
            placeholder="Enter Username"
            required
          ></input>
        </div> }
        <div>
          <label>Email</label>
          <input
            className="p-2 w-full  rounded-md"
            ref={email}
            type="email"
            placeholder="Enter Email"
            required
          ></input>
        </div>

        <div>
          <label>Password</label>
          <input
            className="p-2 w-full  rounded-md"
            ref={password}
            type="password"
            placeholder="Enter Password"
            required
          ></input>
          <br></br>
        </div>
        {isLogin && (
          <p
            onClick={onForgotPasswordManager}
            className="text-sm self-center px-6 hover:font-bold cursor-pointer rounded-lg text-red-500"
          >
            Forgot Password ?
          </p>
        )}
        <button
          className="p-2 self-center bg-blue-500 w-3/5 rounded-lg"
          type="submit"
        >
          {isLogin ? "Login" : "SignUp"}
        </button>
        <div className="w-full border-zinc-950 bg-blue-300 bg-opacity-30  rounded-md p-4">
          <p
            className="self-center"
            onClick={() => {
              setisLogin(!isLogin);
            }}
          >
            {isLogin
              ? "Don't Have an account? Signup"
              : "Have an account? Login"}
          </p>
        </div>
      </form>
    </div>
    </div>
    
  );
};

export default SignUp;
