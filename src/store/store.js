import { configureStore } from "@reduxjs/toolkit";  
import authReducer from "./slice/authslice.js";

const store = configureStore({
   reducer:{
    authorization:authReducer,
   }
})

export default store ;