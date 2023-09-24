import Post from '../post/Post'
// import { posts } from '../../data.json'
import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { authContext } from '../../context/authContext'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../slices/postsSlice'
import { CircularProgress } from '@mui/material'

const Posts = () => {
  const { username } = useParams()
  const { user } = useContext(authContext)
  const dispatch = useDispatch()
  const { posts, errors, isFetching } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(getPosts(username, user))
    console.log('useeffect in posts comp')
  }, [dispatch, username, user])

  useEffect(() => {
    console.log((errors?.getPosts?.response?.status === 403 || errors?.getPosts?.response?.status === 401))
    if ((errors?.getPosts?.response?.status === 403 || errors?.getPosts?.response?.status === 401)) {
      window.localStorage.removeItem('user')
      // logOut()
    }
  }, [errors?.getPosts])

  return (
    <div className="posts">
      {
        isFetching
          ? <CircularProgress/>
          : posts?.map(post => <Post key={post._id} post={post} />)
      }
    </div>
  )
}

export default Posts
