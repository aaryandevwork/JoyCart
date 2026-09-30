import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../config/axiosInstance";

export const LoginUserAction = createAsyncThunk("auth/login", async (credentials , thunkAPI) => {
    try {
        const res = await axiosInstance.post("/auth/login",credentials);
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Login failed")
    }
})

export const refreshAccessToken = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.post("/auth/refresh");
        return res.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Refresh failed")
    }
})