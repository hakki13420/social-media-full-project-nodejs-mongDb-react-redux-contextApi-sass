import TopBar from '../topbar/TopBar'
import LeftBar from '../leftBar/LeftBar'
import Feed from '../feed/Feed'
import ProfileComp from '../profile/ProfileComp'
import { authContext } from '../../context/authContext'
import { useContext } from 'react'

const LayoutHome = ({ children }) => {
  return (
    <>
      <TopBar/>
      <div className="layout">
        <LeftBar/>
        <Feed />
        {children}
      </div>
    </>
  )
}

const LayoutProfile = ({ children, user }) => {
  const { user: currentUser } = useContext(authContext)
  return (
    <>
      <TopBar/>
      <div className="layout">
        <LeftBar/>
        <div className="layout-profile">
          <ProfileComp user={user}/>
          <div className="content">
            <Feed share={user._id === currentUser._id} />
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

const Layout = ({ children, user }) => {
  return (
    <>
      {
        user
          ? <LayoutProfile user={user}>{children}</LayoutProfile>
          : <LayoutHome>{children}</LayoutHome>
      }
    </>
  )
}

export default Layout
