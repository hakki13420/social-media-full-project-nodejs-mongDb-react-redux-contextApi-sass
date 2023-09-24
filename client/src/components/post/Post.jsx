import { Comment, MoreVert, ThumbUpOutlined, Share, Delete, Edit, ShareLocationOutlined, Close } from '@mui/icons-material'
import Avatar from '../avatar/Avatar'
import { useContext, useEffect, useState } from 'react'
import NoAvatar from '../noImage/NoAvatar'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { privateRequest } from '../../axiosRequest'
import { deletePost, getComments, likedPost } from '../../slices/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { authContext } from '../../context/authContext'
import { CircularProgress } from '@mui/material'
import Comments from '../comments/Comments'

const Post = ({ post }) => {
  const [user, setUser] = useState({})
  const { isFetchingComments } = useSelector(state => state.posts)
  // const comments = posts.filter

  const [showComments, setShowComments] = useState(false)
  const [toggleMenu, setToggleMenu] = useState(false)
  const dispatch = useDispatch()
  const { user: currentUser } = useContext(authContext)
  const { isLikingPost } = useSelector(state => state.posts)

  useEffect(() => {
    const getUser = async () => {
      const res = await privateRequest.get('users?id=' + post.userId)
      setUser(res.data)
    }
    getUser()
  }, [post])

  const likePost = async () => {
    dispatch(likedPost(post._id, currentUser._id))
  }

  useEffect(() => {
    dispatch(getComments(post._id))
  }, [post._id])

  const openComments = () => {
    setShowComments(!showComments)
  }

  const removePost = async () => {
    try {
      if (confirm('Are you shire to delete?')) {
        dispatch(deletePost(post._id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-header-left">
          <Link to={'/profile/' + user.username}>
            {
              user.profilePicture
                ? <Avatar img={import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture} />
                : <NoAvatar/>
            }
          </Link>
          <div className="post-header-left-info">
            <span>{user.username}</span>
            <span>{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
        <div className="post-header-right">
          <MoreVert onClick={() => setToggleMenu(!toggleMenu)}/>
          {
            toggleMenu && (
              <>
                <div className="menu-context">
                  <p onClick={removePost}><Delete/>Delete</p>
                  <p><Edit/>Update</p>
                  <p><ShareLocationOutlined/>Share</p>
                </div>
                <Close className='closeMenu' onClick={() => setToggleMenu(false)}/>
              </>
            )
          }
        </div>
      </div>
      <div className="post-body">
        <p>{post.content}</p>
        <img src={`${import.meta.env.VITE_PUBLIC_FOLDER}${post.picture}`} alt="image-post" />
      </div>
      <div className="post-footer">
        <div className="post-footer-container">
          {
            isLikingPost
              ? <CircularProgress style={{ width: '1rem', height: '1rem' }}/>
              : (<div className="post-footer-item">
                <ThumbUpOutlined onClick={likePost}
                  htmlColor={post.likes.includes(currentUser._id) ? 'red' : ''}
                />
                {/* <FavoriteBorderOutlined/> */}
                <span>{post.likes?.length} likes</span>
              </div>)
          }

          <div className="post-footer-item">
            <Comment onClick={openComments}/>
            <span>{post.comments?.length} comments</span>
          </div>
          <div className="post-footer-item">
            <Share/>
            <span>{post.shares?.length} shares</span>
          </div></div>

      </div>

      {showComments && (
        isFetchingComments
          ? <CircularProgress/>
          : <Comments postId={post._id} comments={post.comments}/>
      )}
    </div>
  )
}

export default Post
