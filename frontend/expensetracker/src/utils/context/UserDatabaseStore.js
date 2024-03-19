import React, { useEffect, useState } from "react";
import UserDatabase from "./UserDatabaseContext";
import { firebaseDBURL } from "../firebase/dbConstants";
import { setExpenses } from "../store/ExpenseSlice";
import { useDispatch } from "react-redux";

const UserDatabaseStore = (props) => {
 
  const dispatch=useDispatch()

  const getExpenses = async () => {
    try {
      const post = await fetch(firebaseDBURL + "expenses.json", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await post.json();
      if (post.ok) {
        console.log("Data from firebase successfully fetched");

        console.log(data);
        {
          data && dispatch(setExpenses(data));
        }
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const addExpenseFunc = async (formObj) => {
    try {
      const post = await fetch(firebaseDBURL + "expenses.json", {
        method: "POST",
        body: JSON.stringify(formObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await post.json();
      if (post.ok) {
        console.log("Database entry successfully sent");
        console.log(data);
        return true;
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpenseFunc = async (id) => {
    try {
      const post = await fetch(firebaseDBURL + "expenses/" + id + ".json", {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await post.json();
      console.log(post);
      if (post.ok) {
        console.log("Database entry successfully deleted");
        return true;
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editExpenseFunc = async (id,formObj) => {
    try {
        const post = await fetch(firebaseDBURL + "expenses/" + id + ".json", {
          method: "PUT",
          body: JSON.stringify(formObj),
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        const data = await post.json();
      
        if (post.ok) {
          console.log("Database entry successfully edited");
         getExpenses();
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        console.log(error);
      }
  };

  const store = {
    expenses: expenses,
    addExpenses: addExpenseFunc,
    deleteExpense: deleteExpenseFunc,
    editExpense: editExpenseFunc,
  };
  return (
    <UserDatabase.Provider value={store}>
      {props.children}
    </UserDatabase.Provider>
  );
};

export default UserDatabaseStore;
