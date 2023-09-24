import { privateRequest } from '../axiosRequest'
import { followFailure, followStart, followSuccess, loginFailure, loginStart, loginSuccess, logout, resetErrs } from './authActions'
import { authReducer } from './authReducer'
import { createContext, useReducer } from 'react'

const INITIAL_STATE = {
  isFetching: false,
  isFollowing: false,
  user: JSON.parse(window.localStorage.getItem('user')) || null,
  error: null
}

export const authContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

  const logIn = async (user) => {
    dispatch(loginStart())
    try {
      const res = await privateRequest.post('auth/login', {
        username: user.username,
        password: user.password
      })
      dispatch(loginSuccess(res.data))
      window.localStorage.setItem('user', JSON.stringify(res.data))
    } catch (error) {
      dispatch(loginFailure(error.response.data))
      // setErrors(error.response.data)
    }
  }

  const logOut = async () => {
    try {
      await privateRequest.get('auth/logout')
      window.localStorage.removeItem('user')
      dispatch(logout())
    } catch (error) {
      dispatch(loginFailure(error))
    }
  }

  const resetErrors = () => {
    dispatch(resetErrs())
  }

  const followUser = async (followedId) => {
    try {
      dispatch(followStart())
      await privateRequest.get('users/follow/' + followedId)
      dispatch(followSuccess(followedId))
    } catch (error) {
      console.log(error)
      dispatch(followFailure(error))
    }
  }

  return (
    <authContext.Provider value={{
      isFetching: state.isFetching,
      isFollowing: state.isFollowing,
      user: state.user,
      errors: state.error,
      dispatch,
      logIn,
      logOut,
      resetErrors,
      followUser
    }}>
      {children}
    </authContext.Provider>
  )
}
