import {configureStore} from "@reduxjs/toolkit";
import { authSlice,bookingSlice } from "./slices/user";

export const store = configureStore({
    reducer : {
        auth: authSlice.reducer,
        booking: bookingSlice.reducer,
    }
})