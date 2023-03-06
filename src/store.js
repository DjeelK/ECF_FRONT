import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./routes/auth/authSlice";
import countersSlice from "./routes/page1/countersSlice";



const store = configureStore({
reducer: {
    auth: authSlice,
    counters: countersSlice
}
});

export default store