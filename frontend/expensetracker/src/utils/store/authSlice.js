import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginStatus: "false",
    idToken: "",
   
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
    
    },
  },
});

export const { setLoginStatus, setLogoutStatus } = authSlice.actions;
export default authSlice.reducer;
