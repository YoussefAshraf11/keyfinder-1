import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "./projectSlice";

export const store = configureStore({
    reducer: {
        project: projectSlice,
    },
  });