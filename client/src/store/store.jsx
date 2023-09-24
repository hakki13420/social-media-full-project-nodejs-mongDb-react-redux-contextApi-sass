import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../slices/postsSlice'
import usersReducer from '../slices/usersSlice'
import commentsReducer from '../slices/commentsSlice'

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer
  }
})
