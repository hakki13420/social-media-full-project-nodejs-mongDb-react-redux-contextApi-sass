import { createSlice } from '@reduxjs/toolkit'
import { privateRequest } from '../axiosRequest'
const initialState = {
  isFetching: false,
  isFetchingComments: false,
  isAddingComments: false,
  isAddingPost: false,
  isRemovingPost: false,
  isLikingPost: false,
  posts: [],
  errors: {

  }
}

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    startFetchingPosts: () => {
      return {
        isFetching: true,
        post: [],
        errors: null
      }
    },
    SuccessGetPosts: (state, action) => {
      return {
        isFetching: false,
        posts: action.payload,
        errors: null
      }
    },
    failureGetPosts: (state, action) => {
      return {
        isFetching: false,
        posts: [],
        errors: { ...state.errors, getPosts: action.payload }
      }
    },
    startAddPost: (state, action) => {
      return {
        isAddingPost: true,
        posts: [...state.posts],
        errors: null
      }
    },
    successAddPost: (state, action) => {
      return {
        isAddingPost: false,
        posts: [action.payload, ...state.posts],
        errors: null
      }
    },
    failureAddPost: (state, action) => {
      return {
        isAddingPost: false,
        posts: [...state.posts],
        errors: { ...state.errors, AppPost: action.payload }
      }
    },
    startRemovePost: (state, action) => {
      return {
        isRemovingPost: true,
        posts: [...state.posts],
        errors: null
      }
    },
    successRemovePost: (state, action) => {
      return {
        isRemovingPost: false,
        posts: [...state.posts.filter(post => post._id !== action.payload)],
        errors: null
      }
    },
    failureRemovePost: (state, action) => {
      return {
        isRemovingPost: false,
        posts: [...state.posts],
        errors: { ...state.errors, removePost: action.payload }
      }
    },
    startLikePost: (state, action) => {
      return {
        isLikingPost: true,
        posts: [...state.posts],
        errors: null
      }
    },
    successLikePost: (state, action) => {
      return {
        isLikingPost: false,
        posts: state.posts.map(post => post.likes.includes(action.payload)
          ? ({
            ...post,
            likes: post.likes.filter(el => el !== action.payload)
          })
          : ({
            ...post,
            likes: [...post.likes, action.payload]
          })
        ),
        errors: null
      }
    },
    failureLikePost: (state, action) => {
      return {
        isLikingPost: false,
        posts: [...state.posts],
        errors: { ...state.errors, likePost: action.payload }
      }
    },

    resetErrors: (state, action) => {
      return {
        ...state,
        errors: {}
      }
    },
    startFetchingComments: (state, action) => {
      return {
        isFetchingComments: true,
        posts: [...state.posts],
        errors: null
      }
    },
    successFetchingComments: (state, action) => {
      return {
        isFetchingComments: false,
        posts: state.posts.map(el => el._id === action.payload.postId ? ({ ...el, comments: [...action.payload.comments] }) : el),
        errors: null
      }
    },
    failureFetchingComments: (state, action) => {
      return {
        isFetchingComments: false,
        posts: [...state.posts],
        errors: action.payload
      }
    },

    startAddingComment: (state, action) => {
      return {
        isAddingComment: true,
        posts: state.posts,
        errors: null
      }
    },
    successAddingComment: (state, action) => {
      return {
        isAddingComment: false,
        posts: state.posts.map(
          el => el._id === action.payload.comment.postId
            ? ({ ...el, comments: [{ ...action.payload.comment, userId: ({ ...action.payload.user }) }, ...el.comments] })
            : { ...el }
        ),
        errors: null
      }
    },
    failureAddingComment: (state, action) => {
      return {
        isAddingComment: false,
        posts: state.posts,
        errors: action.payload
      }
    }

  }

})

export const getPosts = (username, user) => async (dispatch) => {
  try {
    dispatch(startFetchingPosts())
    const res = username
      ? await privateRequest.get('posts?username=' + username)
      : await privateRequest.get('posts?id=' + user._id)
    dispatch(
      SuccessGetPosts(
        res.data.sort((a, b) => new Date(`${b.createdAt}`) - new Date(`${a.createdAt}`))
      )
    )
  } catch (error) {
    dispatch(failureGetPosts(error))
  }
}

export const addPost = (post) => async (dispatch) => {
  dispatch(startAddPost())
  try {
    const newPost = await privateRequest.post('posts', {
      content: post.content,
      picture: post.picture
    })
    console.log('10000000', newPost.data)
    dispatch(successAddPost(newPost.data))
    // window.location.reload()
  } catch (error) {
    dispatch(failureAddPost(error))
  }
}

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch(startRemovePost())
    await privateRequest.delete('posts/' + postId)

    dispatch(successRemovePost(postId))
  } catch (error) {
    console.log('error remove post', error)
    dispatch(failureRemovePost())
  }
}

export const likedPost = (postId, userId) => async (dispatch) => {
  try {
    dispatch(startLikePost())
    await privateRequest.get('posts/like/' + postId)
    dispatch(successLikePost(userId))
  } catch (error) {
    dispatch(failureLikePost(error))
  }
}

export const getComments = (postId) => async (dispatch) => {
  try {
    dispatch(startFetchingComments())
    const res = await privateRequest.get('comments/post/' + postId)

    dispatch(successFetchingComments(
      {
        postId,
        comments: res.data.sort((a, b) => new Date(`${b.createAt}`) - new Date(`${a.createdAt}`))
      }
    ))
  } catch (error) {
    dispatch(failureFetchingComments(error.response.data))
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

export const {
  resetErrors,
  startFetchingPosts, SuccessGetPosts, failureGetPosts,
  startAddPost, successAddPost, failureAddPost,
  startRemovePost, successRemovePost, failureRemovePost,
  startLikePost, successLikePost, failureLikePost,
  startFetchingComments, successFetchingComments, failureFetchingComments,
  startAddingComment, successAddingComment, failureAddingComment
} = postsSlice.actions
export default postsSlice.reducer
