import ExpenseSlice from "./ExpenseSlice"
import authSlice from "./authSlice"
import {configureStore} from "@reduxjs/toolkit"
import themeSlice from "./themeSlice"

const store=configureStore(
    {
        reducer:{
            'auth':authSlice,
            'expenses':ExpenseSlice,
            'theme':themeSlice
        },
    }
)

export default store