import { createSlice } from '@reduxjs/toolkit'

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    account: {},
    token: {}
  },
  reducers: {
    updateAccount (state, action) {
      const account = action.payload
      state.account = account
    },
    updateToken (state, action) {
      const token = action.payload
      state.token = token
    }
  }
})

export const { updateAccount, updateToken } = sessionSlice.actions

export default sessionSlice.reducer
