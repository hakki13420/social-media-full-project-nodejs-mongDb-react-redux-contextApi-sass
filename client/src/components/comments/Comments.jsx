import Comment from '../comment/Comment'
import { useContext, useRef } from 'react'
import { authContext } from '../../context/authContext'
import { addComment } from '../../slices/postsSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import NoAvatar from '../noImage/NoAvatar'
import Avatar from '../avatar/Avatar'

const Comments = ({ comments, postId }) => {
  const comment = useRef()
  const { user } = useContext(authContext)
  const dispatch = useDispatch()

  const submitForm = async (e) => {
    e.preventDefault()
    await dispatch(addComment(
      {
        comment: comment.current.value,
        postId,
        userId: user._id
      }
    ))
    comment.current.value = ''
  }
  return (
    <div className='comments'>
      <div className="comments-top">
        <div className="write-comment">
          <Link to={'/profile/' + user.username}>
            {
              user.profilePicture
                ? <Avatar img={import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture} />
                : <NoAvatar/>
            }
          </Link>
          <form onSubmit={submitForm}>
            <input ref={comment} type="text" name="comment" placeholder="write a public comment..." />
            <button type='submit'>Send</button>
          </form>
        </div>
      </div>
      <div className="comments-bottom">
        {
          comments.map(comment => <Comment key={comment._id} comment={comment}/>)
        }
      </div>
    </div>
  )
}

export default Comments
