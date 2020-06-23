import { configureStore } from '@reduxjs/toolkit'

import account from './account'

const store = configureStore({
  devTools: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  reducer: { account }
})

export default store
