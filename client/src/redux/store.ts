import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import pendingReducer from './slices/pendingSlice';
import messagesReducer from './slices/messagesSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    pending: pendingReducer,
    messages: messagesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch