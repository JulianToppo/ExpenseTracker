import React, { useEffect, useState } from "react";

import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { Route, Routes, useNavigate } from "react-router-dom";
import VerifyMail from "./components/VerifyMail";
import UserContext from "./utils/context/UserContext";
import ForgotPassword from "./components/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus, setLogoutStatus } from "./utils/store/authSlice";
import UserFunctions from "./utils/storefunctions/UserFunctions";

function App() {
  const userReducer = useSelector((store) => store.auth);
  const theme = useSelector((store) => store.theme);
  const [pageTheme, setPageTheme] = useState("light");
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { getUserDataFunc } = UserFunctions();
  const navigate= useNavigate()

  useEffect(() => {
    setPageTheme(theme.mode);
  }, [theme.mode]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    
    if (!token) {
      navigate('/')
      return;
    }
    const getTokenAndUserID = async () => {
      try {
        //  const data = await getUserDataFunc();

      dispatch(setLoginStatus({ 'token': token })); 
      } catch (error) {
        console.log(error)
      }
    
    };

    getTokenAndUserID();

  }, []);

  return (
    <div
      className={`h-screen bg w-screen ${
        pageTheme == "dark" ? "bg-black" : "bg-stone-400"
      } `}
    >
      {/* <Header/> */}
      <Routes>
        {!userReducer.loginStatus && (
          <>
            {" "}
            <Route path="/" element={<SignUp />} />
          </>
        )}
        {userReducer.loginStatus && (
          <>
            <Route path="/loginsuccess" element={<Home />} />
            <Route path="/verifymail" element={<VerifyMail />} />
          </>
        )}
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="*" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
