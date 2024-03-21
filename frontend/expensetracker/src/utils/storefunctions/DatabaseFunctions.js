import React, { useEffect, useState } from "react";
import { firebaseDBURL } from "../firebase/dbConstants";
import { useSelector, useDispatch } from "react-redux";
import { addExpenseRedx, deleteExpense, refreshSum, setExpense } from "../store/ExpenseSlice";
import { dbURL } from "../constants/constants";

const DatabaseFunctions = (props) => {
  const expenses = useSelector((store) => store.expenses);
  const auth = useSelector((store)=>store.auth)
  console.log("authhh",auth.idToken)
  const dispatch = useDispatch();

  const getExpenses = async (pageNo,rowcount) => {
    try {
      const post = await fetch(dbURL+'/expense/getExpense/pageNo/'+ pageNo+"/"+rowcount, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth.idToken
        },
      });

      const data = await post.json();
      if (post.ok) {
        console.log("Data from firebase successfully fetched");
      
        console.log(data); 
         console.log(data.ExpenseEntries)
        {
          
          data && dispatch(setExpense(data.ExpenseEntries));
        }
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addExpenseFunc = async (formObj) => {
    try {
      
      const post = await fetch(dbURL +'/expense/addExpense', {
        method: "POST",
        body: JSON.stringify(formObj),
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth.idToken 
        },
      });

      const data = await post.json();
      if (post.ok) {
        console.log("Database entry successfully sent");
        console.log(data);
   
        dispatch(addExpenseRedx({"data":data}));
        console.log("dispatch completed")
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
  
      console.log("deleteid",id)
      const post = await fetch(dbURL +"/expense/"+  id , {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          "Authorization": auth.idToken
        },
      });

      const data = await post.json();
      console.log(post);
      if (post.ok) {
        console.log("Database entry successfully deleted");
       dispatch(deleteExpense({"id":id}))
        return true;
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editExpenseFunc = async (id, formObj) => {
    try {
      const post = await fetch(dbURL +"/expense/expenses/edit/"+id, {
        method: "PUT",
        body: JSON.stringify(formObj),
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth.idToken
        },
      });

      const data = await post.json();

      if (post.ok) {
        console.log("Database entry successfully edited");
        getExpenses('1','5');
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { editExpenseFunc, deleteExpenseFunc, addExpenseFunc, getExpenses };
};

export default DatabaseFunctions;
