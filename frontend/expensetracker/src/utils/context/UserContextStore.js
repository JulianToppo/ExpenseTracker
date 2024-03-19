import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import {
  emailVerificationMail,
  firebaseLoginURL,
  firebaseSignupURL,
  getUserDataURL,
  updateProfileURL,
} from "../firebase/constants";
import { resetPasswordEmail } from "../firebase/constants";

const UserContextStore = (props) => {
  const [LoginStatus, setLoginStatus] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("token")){
    setLoginStatus(true)
  }
},[])

  const navigate = useNavigate();

  const loginUserFunc = async (email, password) => {
    try {
      const formObj = {
        email: email,
        password: password,
        returnSecureToken: true,
      };

      const post = await fetch(firebaseLoginURL, {
        method: "POST",
        body: JSON.stringify(formObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(post);
      const data = await post.json();
      if (post.ok) {
        console.log(" User has successfully logged in.");
        console.log(data);
        localStorage.setItem("token", data.idToken);
        setLoginStatus(!LoginStatus);
        navigate("/verifymail");
      } else {
        console.log("data", data.error.message);
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const signUpFunc = async (email, password) => {
    try {
      const formObj = {
        email: email,
        password: password,
        returnSecureToken: true,
      };

      const post = await fetch(firebaseSignupURL, {
        method: "POST",
        body: JSON.stringify(formObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await post.json();
      if (post.ok) {
        console.log(" User has successfully signed up.");
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfileFunc = async (fullname, photoURL) => {
    const formObj = {
      displayName: fullname,
      photoUrl: photoURL,
      idToken: localStorage.getItem("token"),
      returnSecureToken: true,
    };

    try {
      const post = await fetch(updateProfileURL, {
        method: "POST",
        body: JSON.stringify(formObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await post.json();
      if (post.ok) {
        console.log(" User has successfully updated");
        console.log(data);
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDataFunc = async () => {
    const formObj = {
      idToken: localStorage.getItem("token"),
    };

    try {
      const post = await fetch(getUserDataURL, {
        method: "POST",
        body: JSON.stringify(formObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await post.json();
      if (post.ok) {
        console.log(" User data successfully fetched");
        console.log(data.users[0]);

        return data.users[0];
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const EmailVerificationFunc = async () => {
    const requestObj = {
      requestType: "VERIFY_EMAIL",
      idToken: localStorage.getItem("token"),
    };

    try {
      const post = await fetch(emailVerificationMail, {
        method: "POST",
        body: JSON.stringify(requestObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await post.json();
      if (post.ok) {
        console.log(" Email Verification successfully sent");
        console.log(post, data);
        navigate("/loginsuccess");
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const LogoutFunc = () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const ForgotPasswordFunc= async(email)=>{
    const requestObj = {
      requestType: "PASSWORD_RESET",
      email: email,
    };

    try {
      const post = await fetch(resetPasswordEmail, {
        method: "POST",
        body: JSON.stringify(requestObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await post.json();
      if (post.ok) {
        console.log(" Email Reset successfully sent");
        console.log(post, data);
        navigate("/")
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const store = {
    isLoggedIn: LoginStatus,
    LoginUser: loginUserFunc,
    SignUpUser: signUpFunc,
    LogoutUser: LogoutFunc,
    UpdateProfile: updateProfileFunc,
    getUserData: getUserDataFunc,
    EmailVerification: EmailVerificationFunc,
    ForgotPassword:ForgotPasswordFunc
  };

  return (
    <UserContext.Provider value={store}>{props.children}</UserContext.Provider>
  );
};

export default UserContextStore;
