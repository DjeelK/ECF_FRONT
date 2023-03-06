import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./routes/auth/authSlice";
import CountersSlice from "./routes/page1/CountersSlice";



const store = configureStore({
reducer: {
    auth: authSlice,
    counters: CountersSlice
}
});

export default store