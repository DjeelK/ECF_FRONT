import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SIGN_IN_URL, SIGN_UP_URL } from "../../firebaseConfig";

export const signIn = createAsyncThunk(
"auth/signIn",
async (credentials) => {
    const response = await axios.post(SIGN_IN_URL, credentials)

    if (response.status !== 200) {
    throw new Error("Something went wrong when Signing In...")
    }

    return response.data
}
)

export const signUp = createAsyncThunk(
"auth/signUp",
async (credentials) => {
    const response = await axios.post(SIGN_UP_URL, credentials)

    if (response.status !== 200) {
    throw new Error("Something went wrong when Signing Up...")
    }

    return response.data
}
)

const authSlice = createSlice({
name: "auth",
initialState: {
    user: null,
    isLoading: false,
    error: null
},
reducers: {
    signOut(state) {
    state.user = null
    localStorage.removeItem('idToken')
    }
},
extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
    state.user = null
    state.isLoading = true
    state.error = null
    })

    builder.addCase(signIn.rejected, (state, action) => {
    state.isLoading = false
    state.error = action.payload
    })

    builder.addCase(signIn.fulfilled, (state, action) => {
    state.isLoading = false
    state.user = action.payload
    localStorage.setItem('idToken', action.payload.idToken)
    })
    
    builder.addCase(signUp.pending, (state) => {
    state.user = null
    state.isLoading = true
    state.error = null
    })
    
    builder.addCase(signUp.rejected, (state, action) => {
    state.isLoading = false
    state.error = action.payload
    })
    
    builder.addCase(signUp.fulfilled, (state, action) => {
    state.isLoading = false
    state.user = action.payload
    localStorage.setItem('idToken', action.payload.idToken)
    })
}
})

export const { signOut } = authSlice.actions

export default authSlice.reducer