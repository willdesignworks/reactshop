import { configureStore } from "@reduxjs/toolkit"; // Redux Toolkit
import messageReducer from "./slice/messageSlice";

export const store = configureStore({
  reducer: {
    message: messageReducer,
  },
});