import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//    userData: null,    
//     status: false,
  
// } 

const initialState = {
  userData: JSON.parse(localStorage.getItem("user")) || null,
  status: localStorage.getItem("auth") === "true"
}
const authSlice = createSlice({
     name: "authorization",
     initialState,
     reducers:{
        login: (state,action)=>{
            state.status = true,
            state.userData = action.payload
           
        },
        logout: (state)=>{
           
            state.status = false,
            state.userData = null
           
        }
     }
})


export const {login,logout} = authSlice.actions; 
export default authSlice.reducer ;