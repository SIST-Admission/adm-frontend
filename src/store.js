import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    userStore: userReducer,
  }
})

export default store