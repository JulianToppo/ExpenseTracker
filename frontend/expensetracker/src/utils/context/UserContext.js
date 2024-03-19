import { createContext } from "react";

const UserContext = createContext({
    isLoggedIn:'',
    LoginUser:()=>{},
    SignUpUser:()=>{},
    LogoutUser:()=>{},
    UpdateProfile:()=>{},
    getUserData:()=>{},
    EmailVerification:()=>{},
    ForgotPassword:()=>{}
})

export default UserContext;