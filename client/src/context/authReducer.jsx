export const authReducer = (state, action) => {
  switch (action.type) {
  case 'START_LOGIN':{
    return {
      isFetching: true,
      user: null,
      error: null
    }
  }
  case 'SUCCESS_LOGIN':{
    return {
      isFetching: false,
      user: action.payload,
      error: null
    }
  }
  case 'FAILURE_LOGIN':{
    return {
      isFetching: false,
      user: null,
      error: action.payload
    }
  }
  case 'START_FOLLOW':{
    return {
      isFollowing: true,
      user: { ...state.user },
      error: null
    }
  }
  case 'SUCCESS_FOLLOW':{
    console.log('payload', action.payload)
    return {
      isFollowing: false,
      user: {
        ...state.user,
        followings: state.user.followings.includes(action.payload)
          ? [...state.user.followings.filter(el => el !== action.payload)]
          : [...state.user.followings, action.payload]
      },
      error: null
    }
  }
  case 'FAILURE_FOLLOW':{
    return {
      isFollowing: false,
      user: { ...state.user },
      error: action.payload
    }
  }

  case 'LOGOUT':{
    return {
      isFetching: false,
      user: null,
      error: null
    }
  }
  case 'RESET_ERRORS':{
    return {
      isFollowing: false,
      user: { ...state.user },
      error: null
    }
  }

  default:return state
  }
}
