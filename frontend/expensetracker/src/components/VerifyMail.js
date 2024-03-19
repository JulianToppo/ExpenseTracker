import React from "react";
import UserFunctions from "../utils/storefunctions/UserFunctions";

const VerifyMail = () => {
  const { EmailVerificationFunc } = UserFunctions();
  const verifyMailOnclickHanlder = async (e) => {
    e.preventDefault();
    EmailVerificationFunc();
  };
  return (
    <div>
      <button className="p-2 bg-green-200" onClick={verifyMailOnclickHanlder}>
        Verify Mail
      </button>
    </div>
  );
};

export default VerifyMail;
