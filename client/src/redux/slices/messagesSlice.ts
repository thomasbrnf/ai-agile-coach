import { Message } from '../../features/chat/interfaces/Message'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface messagesState {
    content: Message[]
}

const initialState: messagesState = {
  content: []
}

const socketSlice = createSlice({
 name: 'socket',
 initialState,
 reducers: {
   receiveMessage: (state, action) => {
     state.content.push(action.payload)
   },
   setInitialMessages: (state, action) => {
    state.content = action.payload;
   }
 }
})

export const { receiveMessage, setInitialMessages } = socketSlice.actions

export const selectMessages = (state: RootState) => state.messages.content

export default socketSlice.reducer