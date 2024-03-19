import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import DailyExpenses from "./DailyExpenses";
import UserFunctions from "../utils/storefunctions/UserFunctions";

const Home = () => {
  const { getUserDataFunc, updateProfileFunc } =  UserFunctions();
  const [showForm, setShowForm] = useState(false);
  const fullname = useRef(null);
  const photoURL = useRef(null);

  useEffect(() => {
    if (showForm === true) {
      console.log("True Called");
      getUserData();
    }
  }, [showForm]);

  const onClickCompleteHandler = (e) => {
    e.preventDefault();
    console.log("Complete form called");
    console.log(showForm);

    setShowForm(!showForm);
  };

  const fillDataInForm = (data) => {
    fullname.current.value = data.displayName;
    photoURL.current.value = data.photoUrl;
  };

  const getUserData = async () => {
    const data = await getUserDataFunc();
    console.log(data);
    fillDataInForm(data);
  };

  const onUpdateFormSubmitHandler = async (e) => {
    e.preventDefault();
    updateProfileFunc(fullname.current.value, photoURL.current.value);
  };

  return (
    <div>
      <Header />
      <div className="flex justify-between bg-slate-100 p-2 shadow-lg">
        <div>
          <p>Welcome to Expense Tracker!</p>
        </div>
        <div className="bg-red-200 rounded-lg p-1">
          <p className="inline">Your profile is incomplete </p>
          <p className="inline text-blue-500" onClick={onClickCompleteHandler}>
            Complete now!
          </p>
        </div>
      </div>

      {showForm && (
        <div className="w-full flex justify-around p-4 bg-red-200">
          <div className="w-1/4">
            <p>Empty</p>
          </div>

          <div className="w-3/4">
            <h1 className="font-medium text-2xl">Contact Details</h1>
            <form
              className="flex flex-col space-y-6"
              onSubmit={onUpdateFormSubmitHandler}
            >
              <div className="flex justify-around space-x-11 ">
                <div className="flex w-full ">
                  <label htmlFor="fullname">Full Name:</label>
                  <input
                    ref={fullname}
                    id="fullname"
                    type="text"
                    className="border border-gray-400  w-full"
                  />
                </div>

                <div className="flex space-x-7 w-full ">
                  <label htmlFor="profileUrl">Profile Photo Url:</label>
                  <input
                    ref={photoURL}
                    id="profileUrl"
                    type="text"
                    className="border border-gray-400 w-full"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2  rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DailyExpenses/>
    </div>
  );
};

export default Home;
