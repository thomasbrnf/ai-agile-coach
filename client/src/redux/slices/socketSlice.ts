import { createSlice } from "@reduxjs/toolkit";
import { Message } from "../../interfaces/Message";
import { RootState } from "../store";

interface socketState {
  messages: Message[];
  pending: boolean;
}
const initialState: socketState = {
  messages: [],
  pending: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setInitialMessages: (state, action) => {
      state.messages = action.payload;
    },
    recieving: (state) => {
      state.pending = true;
    },
    recieved: (state) => {
      state.pending = false;
    },
  },
});

export const { receiveMessage, setInitialMessages, recieving, recieved } =
  socketSlice.actions;

export const selectMessages = (state: RootState) => state.socket.messages;
export const selectPending = (state: RootState) => state.socket.pending;

export default socketSlice.reducer;
