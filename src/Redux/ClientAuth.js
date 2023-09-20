import { createSlice } from "@reduxjs/toolkit";

export const  ClientAuth = createSlice({
    name:'Client',
    initialState:{
        Token:null,
        email:null
    },
    reducers:{
        ClientLogin(state,action){
            state.Token = action.payload.token;
        },
       ClientLogout(state,action){
        state.Token = ''
       },
       ClientEmail(state,action){
        console.log(action.payload.email);
        state.email = action.payload.email

       }
    },
})


export const {ClientLogin,ClientLogout,ClientEmail} = ClientAuth.actions;
export default ClientAuth.reducer