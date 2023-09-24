import { Link } from 'react-router-dom'
import NoAvatar from '../noImage/NoAvatar'

const OnlineFriend = ({ user }) => {
  return (
    <li className="online-friend-item">
      <div className="online-friend-image">
        <Link to={'/profile/' + user.username}>
          {
            user.profilePicture
              ? <img src={import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture} alt="online-friend-image" />
              : <NoAvatar/>
          }
        </Link>
        <div className="online"></div>
      </div>
      <span>{user.username}</span>
    </li>
  )
}

export default OnlineFriend
