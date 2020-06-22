import { configureStore } from '@reduxjs/toolkit'

import session from './session'

const store = configureStore({
  devTools: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  reducer: { session }
})

export default store
