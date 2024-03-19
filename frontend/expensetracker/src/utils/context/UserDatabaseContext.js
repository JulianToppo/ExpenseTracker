import { createContext } from "react";

const UserDatabase= createContext({

expenses:[],
addExpenses:()=>{},
deleteExpense:()=>{},
editExpense:()=>{}

})

export default UserDatabase