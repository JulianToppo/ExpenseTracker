import { createSlice } from "@reduxjs/toolkit";

const themeSlice=createSlice({
    name:'theme',
    initialState:{
        'mode':'light'
    },
    reducers:{
        toggle:(state)=>{
            state.mode=state.mode=='dark'?'light':'dark'
        }
    }
})


export const {toggle}= themeSlice.actions
export default themeSlice.reducer