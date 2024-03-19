import React from "react";
import UserFunctions from '../utils/storefunctions/UserFunctions';
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../utils/store/themeSlice";

const Header = () => {
  const { LogoutFunc } = UserFunctions();
  const theme= useSelector((store)=>store.theme)
  const dispatch= useDispatch();

  const onLogoutClickHandler = (e) => {
    e.preventDefault();
    LogoutFunc();
  };

  const changeThemeHandler =(e)=>{
    e.preventDefault();
    dispatch(toggle());
  }
  return (
    <div className="flex justify-end p-4 rounded-lg bg-yellow-100 space-x-10">
      <button className="bg-green-100 px-6 py-1 rounded-lg" onClick={changeThemeHandler}>
        ChangeTheme
      </button>
      <button
        className="bg-orange-400 px-6 py-1 rounded-lg"
        onClick={onLogoutClickHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
