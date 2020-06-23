import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'account',
  initialState: {},
  reducers: {
    updateAccount (state, action) {
      const account = action.payload
      return account
    }
  }
})

export const { updateAccount } = accountSlice.actions

export default accountSlice.reducer
