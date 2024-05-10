import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    lang: 'es',
    dataUser: {}
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
        },
        setDataUser: (state, action) => {
            state.dataUser = action.payload
        }
    }
});

export const { updateLang, setToken, setDataUser } = userSlice.actions;

export default userSlice.reducer;