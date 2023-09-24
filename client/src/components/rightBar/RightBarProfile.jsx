import { useEffect, useState } from 'react'
import { privateRequest } from '../../axiosRequest'
import { Link } from 'react-router-dom'
import NoAvatar from '../noImage/NoAvatar'

const RightBarProfile = ({ user }) => {
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await privateRequest.get('users/friends?username=' + user.username)
        setFriends(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getFriends()
  }, [user])

  return (
    <div className="right-bar-profile">
      <div className="user-info">
        <h4>User Informations</h4>
        <div className="user-info-item">
          <h3>City :</h3>
          <span>{user?.city}</span>
        </div>
        <div className="user-info-item">
          <h3>From :</h3>
          <span>{user?.from}</span>
        </div>
        <div className="user-info-item">
          <h3>Relationship :</h3>
          <span>{user?.relationShip === 1 ? 'Single' : user?.relationShip === 2 ? 'Maried' : 'Devorsed'}</span>
        </div>
      </div>
      <h4>User Friends</h4>
      <div className="user-friends">
        {
          friends.map(friend => (
            <Link key={friend._id} to={'/profile/' + friend.username}>
              <div className="user-friends-item">
                {
                  friend.profilePicture
                    ? <img src={import.meta.env.VITE_PUBLIC_FOLDER + friend.profilePicture} alt="" />
                    : <div className='noAvatar'><NoAvatar/></div>
                }
                <span>{friend.username}</span>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default RightBarProfile
