import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    accessToken : null,
    isAuthenticated : false,
    isLoading : false,
    error : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        logout : (state) => {
            state.user = null,
            state.isAuthenticated = false,
            state.accessToken = null
        },
        setAccessToken : (state, action) => {
            state.accessToken = action.payload;
        }
    },
    // extraReducers : (builder) =>{
    //     builder 
    //         .addCase()
    // }
})

export const { logout, setAccessToken} = authSlice.actions;

export default authSlice.reducer;