import { MoreVert, ThumbUpOutlined } from '@mui/icons-material'
import moment from 'moment'
import { Link } from 'react-router-dom'
import NoAvatar from '../noImage/NoAvatar'
import Avatar from '../avatar/Avatar'

const Comment = ({ comment }) => {
  console.log('comment ====', comment)
  return (
    <div className='comment'>
      <div className="comment-top">
        <Link to={'/profile/' + comment.userId.username}>
          {
            comment.userId.profilePicture
              ? <Avatar img={import.meta.env.VITE_PUBLIC_FOLDER + comment.userId.profilePicture} />
              : <NoAvatar/>
          }
        </Link>
        <div className="comment-body">
          <span>{comment.userId.username}</span>
          <p>
            {comment.comment}
          </p>
        </div>
        <MoreVert/>
      </div>
      <div className="comment-bottom">
        <ThumbUpOutlined/>
        <span>{moment(comment.createdAt).fromNow()}</span>
      </div>
    </div>
  )
}

export default Comment
