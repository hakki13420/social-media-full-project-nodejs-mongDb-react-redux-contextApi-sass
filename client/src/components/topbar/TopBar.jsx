import { SearchOutlined, Person2Outlined, NotificationsNoneOutlined, CommentOutlined } from '@mui/icons-material'
import Avatar from '../avatar/Avatar'
import TopBarItem from './TopBarItem'
import { authContext } from '../../context/authContext'
import { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import NoAvatar from '../noImage/NoAvatar'
import { useDispatch } from 'react-redux'
import { getSearchUsers } from '../../slices/usersSlice'

const TopBar = () => {
  const { user, logOut } = useContext(authContext)
  const [openMenu, setOpenMenu] = useState(false)
  const search = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = async () => {
    logOut()
  }

  const submitForm = async (e) => {
    e.preventDefault()
    dispatch(getSearchUsers(search.current.value))
    navigate('/search')
  }

  return (
    <div className="topbar">
      <div className="topbar-left">
        <Link to='/'>
          <h1 className="logo">
            <span>Hakki</span>
            <span>Media</span>
          </h1>
        </Link>

      </div>
      <div className="topbar-center">
        <form className="search" onSubmit={submitForm}>
          <SearchOutlined className='search-icon'/>
          <input ref={search} type="search" placeholder="Search..." />
        </form>
      </div>
      <div className="topbar-right">
        <div className="topbar-right-links"></div>
        <div className="topbar-right-icons">
          <TopBarItem count={1}>
            <Person2Outlined/>
          </TopBarItem>
          <TopBarItem count={1}>
            <CommentOutlined/>
          </TopBarItem>
          <TopBarItem count={1}>
            <NotificationsNoneOutlined/>
          </TopBarItem>
        </div>
        <div className="avatar-container">
          {
            user.profilePicture
              ? <Avatar setOpenMenu={ setOpenMenu} img={import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture}/>
              : <NoAvatar setOpenMenu={ setOpenMenu}/>
          }
          {
            openMenu &&
            <div className="menu-context">
              <Link to={'/profile/' + user.username}>
                <p>Profile</p>
              </Link>
              <p onClick={logout}>Logout</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default TopBar
