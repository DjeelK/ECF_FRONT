import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_DB_URL } from "../../firebaseConfig";

export const fetchCounters = createAsyncThunk(
    "counters/fetchCounters",
    async () => {
    const response = await axios.get(`${BASE_DB_URL}counters.json`)

    if (response.status !== 200) {
    throw new Error("Error while getting counters.")
    }

    const tmpArray = []

    for (const key in response.data) {
        tmpArray.push({id : key, ...response.data[key]})
    }

    return tmpArray

    }
)

export const addCounter = createAsyncThunk(
    "counters/addCounter",
    async (counterValues, {getState}) => {
        const token = getState().auth.user.idToken
        if (token) {
        const response = await axios.post(`${BASE_DB_URL}counters.json?auth=${token}`, counterValues)

        if (response.status !== 200) {
            throw new Error("Error while adding a counter.")
        }
    
        return {id: response.data.name, ...counterValues}
        }
    }    
)

export const editCounter = createAsyncThunk(
    "counters/editCounter",
    async ({id, ...counterValues}, {getState}) => {
        const token = getState().auth.user.idToken
        if (token) {
        const response = await axios.patch(`${BASE_DB_URL}counters/${id}.json?auth=${token}`, counterValues)
    
        if (response.status !== 200) {
            throw new Error("Error while editing a counter.")
        }
    
        return {id, ...response.data}
        }
    }
)

export const deleteCounter = createAsyncThunk(
    "counters/deleteCounter",
    async (id, {getState}) => {
    const token = getState().auth.user.idToken
    if (token) {
        const response = await axios.delete(`${BASE_DB_URL}counters/${id}.json?auth=${token}`)
    
        if (response.status !== 200) {
        throw new Error("Error while deleting a counter.")
        }
    
        return id
    }
    }
)

const countersSlice = createSlice({
    name: "counters",
    initialState: {
        counters:[],
        isLoading:false,
        error:null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCounters.pending, (state) => {
        state.counters = []
        state.isLoading = true
        state.error = null
        })
    
        builder.addCase(fetchCounters.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        })
    
        builder.addCase(fetchCounters.fulfilled, (state, action) => {
        state.isLoading = false
        state.counters = action.payload
        })
    
        builder.addCase(addCounter.fulfilled, (state, action) => {
        state.counters.push(action.payload)
        })
    
        builder.addCase(editCounter.fulfilled, (state, action) => {
        const { id } = action.payload
        const counterFound = state.counters.find(c => c.id === id)
        if (counterFound) {
            state.counters = [...state.counters.filter(c => c.id !== id), action.payload]
        }
        })
    
        builder.addCase(deleteCounter.fulfilled, (state, action) => {
        const counterFound = state.counters.find(c => c.id === action.payload)
        if (counterFound) {
            state.counters = state.counters.filter(c => c.id !== action.payload)
        }
        })
    }
    })
    
    export default countersSlice.reducer