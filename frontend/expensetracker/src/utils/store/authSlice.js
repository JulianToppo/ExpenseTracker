import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginStatus: "false",
    idToken: "",
    userId: "",
  },
  reducers: {
    setLoginStatus:(state, action)=>{
      const { idToken, localId } = action.payload;
      state.loginStatus = true;
      state.idToken = idToken;
      state.userId = localId;
    },
    setLogoutStatus:(state)=> {
      state.loginStatus = false;
      state.idToken = "";
      state.userId = "";
    },
  },
});

export const { setLoginStatus, setLogoutStatus } = authSlice.actions;
export default authSlice.reducer;
