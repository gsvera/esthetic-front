import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    lang: 'es'
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        updateLang: (state, action) => {
            state.lang = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload
        }
    }
});

export const { updateLang, setToken } = userSlice.actions;

export default userSlice.reducer;