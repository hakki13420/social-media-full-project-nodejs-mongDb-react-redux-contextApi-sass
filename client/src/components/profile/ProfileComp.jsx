import { useContext } from 'react'
import { authContext } from '../../context/authContext'
import NoAvatar from '../noImage/NoAvatar'
import NoCoverImage from '../noImage/NoCoverImage'

const ProfileComp = ({ user }) => {
  const { user: currentUser, isFollowing, followUser } = useContext(authContext)

  const follow = () => {
    followUser(user._id)
  }

  return (
    <div className='profile-comp'>
      <div className="profile-comp-top">
        {
          user.coverPicture
            ? <img src={import.meta.env.VITE_PUBLIC_FOLDER + user.coverPicture} alt="coverImage" />
            : <NoCoverImage/>
        }
        {
          user.profilePicture
            ? <img src={import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture} alt="profileImage" />
            : <NoAvatar className='avatar-image'/>
        }
      </div>
      <div className="profile-comp-bottom">
        <h1>{user.username}</h1>
        <span>Hello world!</span>
        <button disabled={isFollowing} onClick={follow} style={{ cursor: isFollowing ? 'not-allowed' : 'pointer' }}>
          {
            user._id === currentUser._id
              ? 'Update'
              : currentUser?.followings?.includes(user._id)
                ? 'Following'
                : 'Follow'
          }
        </button>
      </div>

    </div>
  )
}

export default ProfileComp
