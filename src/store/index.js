import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";
import authSlice from "./authSlice";

export const store = configureStore({
    reducer: {
        project: projectSlice,
        auth: authSlice,
    },
  });