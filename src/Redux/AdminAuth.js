import { createSlice } from "@reduxjs/toolkit";

export const adminAuth = createSlice({
    name:'admin',
    initialState:{
        Token:null
    },
    reducers:{
        adminLogin(state,action){
            state.Token = action.payload.token;
        },
        adminLogout(state,action){
            state.Token = ''
        }
    }
})


export const {adminLogin,adminLogout} = adminAuth.actions
export default adminAuth.reducer