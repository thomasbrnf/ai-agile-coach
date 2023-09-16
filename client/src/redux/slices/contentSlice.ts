import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface ContentState {
  current: string
}

const initialState: ContentState = {
  current: 'chat'
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    chat: state => {
      state.current = 'chat'
    }
  }
})

export const { chat } = contentSlice.actions

export const selectContent = (state: RootState) => state.content.current

export default contentSlice.reducer 