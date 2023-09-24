import { CardGiftcardOutlined } from '@mui/icons-material'
import OnlineFriend from './OnlineFriend'
import { useContext, useEffect, useState } from 'react'
import { privateRequest } from '../../axiosRequest'
import { authContext } from '../../context/authContext'

const RightBar = () => {
  const [friends, setFriends] = useState([])
  const { user } = useContext(authContext)

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
    <div className="right-bar">
      <div className="right-bar-birthDay">
        <CardGiftcardOutlined htmlColor='tomato'/>
        <p><b>Jhon Smith</b> and <b>2 other friends</b> have his birthday today!</p>
      </div>
      <div className="publicity">
        <img src="https://picsum.photos/980" alt="pub-image" />
        <h1>HAKKI<span>DEV</span></h1>
      </div>
      <div className="online-friends">
        <h1>Online Friends</h1>
        <ul className="online-friends-list">
          {
            friends.map(user => <OnlineFriend key={user._id} user={user}/>)
          }
        </ul>
      </div>
    </div>
  )
}

export default RightBar
