import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useRazorpay from "react-razorpay";

import {
  emailVerificationMail,
  firebaseLoginURL,
  firebaseSignupURL,
  getUserDataURL,
  updateProfileURL,
  resetPasswordEmail,
} from "../firebase/constants";

import { dbURL } from "../constants/constants";
import {
  setLoginStatus,
  setLogoutStatus,
  setPremiumStatus,
} from "../store/authSlice";
import { downloadExpenses, setDownloadExpenses } from "../store/ExpenseSlice";

const UserFunctions = () => {
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const signUpFunc = async (email, password, username) => {
    try {
      const formObj = {
        email: email,
        password: password,
        name: username,
      };

      const post = await fetch(dbURL + "/user/post", {
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
        throw new Error(data.Error);
      }
    } catch (error) {
      alert(error);
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

      dispatch(setLogoutStatus());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const ForgotPasswordFunc = async (email) => {
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
        navigate("/");
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loginUserFunc = async (email, password) => {
    console.log("login function called");
    try {
      const formObj = {
        email: email,
        password: password,
      };

      const post = await fetch(dbURL + "/login", {
        method: "POST",
        body: JSON.stringify(formObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(post);
      const data = await post.json();
      console.log(data);
      if (post.ok) {
        console.log(" User has successfully logged in.");
        console.log(data);
        localStorage.setItem("token", data.token);
        dispatch(setLoginStatus(data));
        navigate("/loginsuccess");
      } else {
        console.log("data", data.Error);
        throw new Error(data.Error);
      }
    } catch (error) {
      alert(error);
    }
  };

  // const buyPremiumMembership = async () => {
  //   try {
  //     console.log("inside buy membership");
  //     const response = await fetch("/purchase/premiummembership", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": auth.idToken,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch premium membership data');
  //   }

  //   console.log(response)
  //   // const data= await response.json()
  //   // console.log(data)
  //   // console.log(data.key_id)

  //     // var options = {
  //     //   key: response.data.key_id, // Enter the Key ID generated from the Dashboard
  //     //   order_id: response.data.order.id, // For one time payment
  //     //   // This handler function will handle the success payment
  //     //   handler: async function (response) {
  //     //     const res = await fetch("/purchase/updatetransactionstatus", {
  //     //       method: "POST",
  //     //       body: JSON.stringify({
  //     //         order_id: options.order_id,
  //     //         payment_id: response.razorpay_payment_id,
  //     //       }),
  //     //       headers: {
  //     //         Authorization: auth.idToken,
  //     //         "Content-Type": "application/json",
  //     //       },
  //     //     });

  //     //     console.log(res);
  //     //     alert("You are a Premium User Now");
  //     //     // //hide the button and show premium user
  //     //     // document.getElementById("buyMembership").style.display = "none";

  //     //     // document.getElementById("message").innerHTML =
  //     //     //   "You are a premium user ";
  //     //     // localStorage.setItem("token", res.data.token);
  //     //     // showLeaderboard();
  //     //     // showDaily_Monthly_YearlyExpense();
  //     //   },
  //     // };
  //     // const rzp1 = new Razorpay(options);
  //     // rzp1.open();

  //     // rzp1.on("payment.failed", function (response) {
  //     //   console.log(response);
  //     //   alert("Something went wrong");
  //     // });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const buyPremiumMembership = async () => {
    try {
      const response = await fetch(dbURL + "/purchase/premiummembership", {
        method: "GET",
        headers: {
          Authorization: auth.idToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch premium membership data");
      }

      const responseData = await response.json();

      const options = {
        key: responseData.key_id,
        order_id: responseData.order.id,
        handler: async function (response) {
          try {
            const res = await fetch(
              dbURL + "/purchase/updatetransactionstatus",
              {
                method: "POST",
                headers: {
                  Authorization: auth.idToken,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  order_id: options.order_id,
                  payment_id: response.razorpay_payment_id,
                }),
              }
            );

            if (!res.ok) {
              throw new Error("Failed to update transaction status");
            }

            const resData = await res.json();
            console.log(resData);
            alert("You are a Premium User Now");
            dispatch(setPremiumStatus({ ispremium: res.ok }));
            // document.getElementById("buyMembership").style.display = "none";
            // document.getElementById("message").innerHTML =
            //   "You are a premium user";
            localStorage.setItem("token", resData.token);
            // showLeaderboard();
            // showDaily_Monthly_YearlyExpense();
          } catch (error) {
            console.error(error);
            alert("Failed to update transaction status");
          }
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();

      rzp1.on("payment.failed", function (response) {
        console.log(response);
        alert("Something went wrong");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadDownloadedFiles = async () => {
    try {
      const data = await fetch(dbURL + "/expense/getDownloadedFiles", {
        method: "GET",
        headers: {
          Authorization: auth.idToken,
        },
      });

      const res = await data.json();
      dispatch(setDownloadExpenses({results:res}))
      
    } catch (err) {
      console.log(err);
    }
  };

  //Download file
  const downloadFile = async ()=>{
    
    try {
      const data= await fetch(dbURL+"/expense/user/download", {method:'GET', headers: { "Authorization": auth.idToken } });
      const res=await data.json();
      console.log(res);
      dispatch(downloadExpenses())
      loadDownloadedFiles()
    } catch (error) {
      console.log(error)
    }
   
         
     
  
  }

  return {
    signUpFunc,
    updateProfileFunc,
    getUserDataFunc,
    EmailVerificationFunc,
    LogoutFunc,
    ForgotPasswordFunc,
    loginUserFunc,
    buyPremiumMembership,
    loadDownloadedFiles,
    downloadFile
  };
};

export default UserFunctions;
