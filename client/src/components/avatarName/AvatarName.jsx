import NoAvatar from '../noImage/NoAvatar'

const AvatarName = ({ user }) => {
  return (
    <div className="avatar-name">
      {
        user.profilePicture
          ? <img src={import.meta.env.VITE_PUBLIC_FOLDER + user.profileImage} alt="img-avatar-name" />
          : <NoAvatar/>
      }
      <span>{user.username}</span>
    </div>
  )
}

export default AvatarName
