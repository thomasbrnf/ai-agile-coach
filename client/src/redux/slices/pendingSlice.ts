import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface PendingSlice {
  status: boolean
}

const initialState: PendingSlice = {
  status: false
}

export const pendingSlice = createSlice({
  name: 'respond',
  initialState,
  reducers: {
    pending: state => {
      state.status = true
    },
    recieved: state => {
      state.status = false
    }
  }
})

export const { pending, recieved } = pendingSlice.actions

export const selectPending = (state: RootState) => state.pending.status

export default pendingSlice.reducer 