import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginStatus: "false",
    idToken: "",
    ispremium:false
   
  },
  reducers: {
    setLoginStatus:(state, action)=>{
      const { token } = action.payload;
      
      state.loginStatus = true;
      state.idToken = token;
      
    },

    setLogoutStatus:(state)=> {
      state.loginStatus = false;
      state.idToken = "";
      state.ispremium=false
    
    },

    setPremiumStatus: (state,action)=>{
      const {ispremium}=action.payload
      state.ispremium=ispremium;
    }
  },
});

export const { setLoginStatus, setLogoutStatus ,setPremiumStatus} = authSlice.actions;
export default authSlice.reducer;
