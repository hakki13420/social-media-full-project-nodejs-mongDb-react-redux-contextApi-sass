import { Link } from 'react-router-dom'
import NoAvatar from '../noImage/NoAvatar'
import { useContext } from 'react'
import { authContext } from '../../context/authContext'
import { CircularProgress } from '@mui/material'

const SearchItem = ({ user }) => {
  const { user: currentUser, followUser, isFollowing } = useContext(authContext)

  function follow (id) {
    document.querySelector('.mu' + id).style.display = 'block'
    followUser(id)
  }

  return (
    <div className="search-item">
      <Link to={'/profile/' + user.username}>
        {
          user.profilePicture
            ? <img src={import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture} alt="imageAvatar" />
            : (<div className="noImage">
              <NoAvatar/>
            </div>
            )
        }
      </Link>

      <div className="search-item-info">
        <span><b>Username :</b>{user.username}</span>
        <span><b>City :</b>{user.city}</span>
        <span><b>From :</b>{user.from}</span>
        <span><b>Relationship :</b>{user?.relationShip === 1 ? 'Single' : user?.relationShip === 2 ? 'Maried' : 'Devorsed'}</span>
      </div>
      <button id={user._id}
        disabled={isFollowing}
        onClick={ () => follow(user._id)}
      >
        <div className={'mu' + user._id} style={{

          display: 'none'

        }}>

          <CircularProgress
            size='20px'
            style={{
              color: 'red'
            }}

          />
        </div>
        {
          currentUser.followings.includes(user._id)
            ? 'Following'
            : 'Follow'
        }
      </button>
    </div>
  )
}

export default SearchItem
