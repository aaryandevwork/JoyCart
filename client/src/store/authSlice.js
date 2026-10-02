import { createSlice } from "@reduxjs/toolkit";
import { LoginUserAction, refreshAccessToken } from "./authActions";

const initialState = {
    user : null,
    accessToken : null,
    isAuthenticated : false,
    isLoading : true,
    isInitialized : false,
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
    extraReducers : (builder) =>{
        builder 
            .addCase(LoginUserAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(LoginUserAction.fulfilled , (state, action) => {
                state.isLoading = false;
                state.user = action.payload?.user;
                state.accessToken = action.payload?.accessToken;
                state.isAuthenticated = true;
            })
            .addCase(LoginUserAction.rejected , (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(refreshAccessToken.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(refreshAccessToken.fulfilled , (state, action) => {
                state.isLoading = false;
                state.user = action.payload?.user;
                state.accessToken = action.payload?.accessToken;
                state.isAuthenticated = true;
                state.isInitialized = true;
            })
            .addCase(refreshAccessToken.rejected , (state,action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isInitialized = true;
            })
    }
})

export const { logout, setAccessToken} = authSlice.actions;

export default authSlice.reducer;