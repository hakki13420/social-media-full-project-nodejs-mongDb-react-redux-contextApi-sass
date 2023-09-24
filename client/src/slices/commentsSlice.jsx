import { createSlice } from '@reduxjs/toolkit'
import { privateRequest } from '../axiosRequest'

const initialState = {
  isFetching: false,
  isAddingComment: false,
  comments: [],
  errors: null
}

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    startFetching: (state, action) => {
      return {
        isFetching: true,
        comments: [],
        errors: null
      }
    },
    successFetching: (state, action) => {
      return {
        isFetching: false,
        comments: [...action.payload],
        errors: null
      }
    },
    failureFetching: (state, action) => {
      return {
        isFetching: true,
        comments: [],
        errors: action.payload
      }
    },
    startAddingComment: (state, action) => {
      return {
        isAddingComment: true,
        comments: [...state.comments],
        errors: null
      }
    },
    successAddingComment: (state, action) => {
      return {
        isAddingComment: false,
        comments: [...state.comments, action.payload],
        errors: null
      }
    },
    failureAddingComment: (state, action) => {
      return {
        isAddingComment: false,
        comments: state.comments,
        errors: action.payload
      }
    },
    getAllComments: (state, action) => {
      return {
        comments: action.payload
      }
    }
  }
})

export const getComments = (postId) => async (dispatch) => {
  try {
    dispatch(startFetching())
    const res = await privateRequest.get('comments/post/' + postId)

    dispatch(successFetching(res.data))
  } catch (error) {
    dispatch(failureFetching(error.response.data))
  }
}

export const addComment = (comment) => async (dispatch) => {
  try {
    dispatch(startAddingComment())
    const res = await privateRequest.post('comments', comment)
    dispatch(successAddingComment(res.data))
  } catch (error) {
    console.log(error)
    dispatch(failureAddingComment())
  }
}

export const getInitAllComments = () => async (dispatch) => {
  try {
    const comments = await privateRequest.get('comments')
    dispatch(getAllComments(comments.data))
  } catch (error) {
    console.log(error)
  }
}
export const {
  startFetching, successFetching, failureFetching,
  startAddingComment, successAddingComment, failureAddingComment,
  getAllComments
} = commentSlice.actions
export default commentSlice.reducer
