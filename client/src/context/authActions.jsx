export const loginStart = () => {
  return ({
    type: 'START_LOGIN'
  })
}

export const loginSuccess = (user) => {
  return ({
    type: 'SUCCESS_LOGIN',
    payload: user
  })
}

export const loginFailure = (error) => {
  return ({
    type: 'FAILURE_LOGIN',
    payload: error
  })
}

export const resetErrs = () => {
  return ({
    type: 'RESET_ERRORS'
  })
}

export const logout = () => {
  return ({
    type: 'LOGOUT'
  })
}

export const followStart = () => {
  return ({
    type: 'START_FOLLOW'
  })
}

export const followSuccess = (followedId) => {
  return ({
    type: 'SUCCESS_FOLLOW',
    payload: followedId
  })
}

export const followFailure = (error) => {
  return ({
    type: 'FAILURE_FOLLOW',
    payload: error
  })
}
