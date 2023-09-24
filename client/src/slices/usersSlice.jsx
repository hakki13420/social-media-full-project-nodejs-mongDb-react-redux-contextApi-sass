import { createSlice } from '@reduxjs/toolkit'
import { privateRequest } from '../axiosRequest'

const initialState = {
  isFetching: false,
  users: [],
  erros: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    startFetchingSearchUsers: (state, action) => {
      return {
        isFetching: true,
        users: [],
        errors: null
      }
    },
    successFetchingSearchUsers: (state, action) => {
      return {
        isFetching: false,
        users: action.payload,
        errors: null
      }
    },
    failureFetchinSearchUsers: (state, action) => {
      return {
        isFetching: false,
        users: [],
        errors: action.payload
      }
    }

  }
})

export const getSearchUsers = (search) => async (dispatch) => {
  try {
    dispatch(startFetchingSearchUsers())
    const res = await privateRequest.get('users/search/' + search)
    console.log('data success search users', res.data)
    dispatch(successFetchingSearchUsers(res.data))
  } catch (error) {
    dispatch(failureFetchinSearchUsers(error.response.data))
  }
}

export const {
  startFetchingSearchUsers, successFetchingSearchUsers, failureFetchinSearchUsers

} = usersSlice.actions
export default usersSlice.reducer
