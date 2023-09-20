import { createSlice } from "@reduxjs/toolkit";

export const  proAuth = createSlice({
    name:'pro',
    initialState:{
        Token:null,
        Email:null
    },
    reducers:{
        proLogin(state,action){
            state.Token = action.payload.token;
        },
        proLogOut(state,action){
            state.Token = ''
        },
        proEmail(state,action){
            state.Email = action.payload.email
        }
    }
})


export const {proLogOut,proLogin,proEmail} = proAuth.actions
export default proAuth.reducer