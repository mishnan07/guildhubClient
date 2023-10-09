import { createSlice } from "@reduxjs/toolkit";

export const  proAuth = createSlice({
    name:'pro',
    initialState:{
        Token:null,
        Id:null,
    },
    reducers:{
        proLogin(state,action){
            state.Token = action.payload.token;
        },
        proLogOut(state,action){
            state.Token = ''
        },
        ProId(state,action){
            state.Id = action.payload.id
        },
       
    }
})


export const {proLogOut,proLogin,ProId} = proAuth.actions
export default proAuth.reducer