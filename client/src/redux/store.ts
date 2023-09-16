import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./slices/contentSlice";
import socketReducer from "./slices/socketSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
    socket: socketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
