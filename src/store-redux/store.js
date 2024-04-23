import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slide/userSlide';

const store = configureStore({
    reducer: {
        userSlice: userReducer, 
    }
})

export default store;