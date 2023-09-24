import { useContext, useEffect, useRef, useState } from 'react'
import Layout from '../../components/layout/Layout'
import Notification from '../../components/notification/Notification'
import RightBar from '../../components/rightBar/RightBar'
import { authContext } from '../../context/authContext'
import { useDispatch, useSelector } from 'react-redux'
import { resetErrors } from '../../slices/postsSlice'
import { useLocation } from 'react-router-dom'

const Home = ({ login }) => {
  const { user } = useContext(authContext)
  const [loginNot, setLoginNot] = useState(false)
  const { errors } = useSelector(state => state.posts)
  const dispatch = useDispatch()
  const timer = useRef(null)

  useEffect(() => {
    login && setLoginNot(true)
  }, [login])

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      errors && dispatch(resetErrors())
    }, 4000)
  }, [errors])

  setTimeout(() => {
    setLoginNot(false)
  }, 4000)

  return (
    <div className="home" style={{ position: 'relative' }}>
      {
        errors?.getPosts
          ? <Notification type='danger' notification={errors?.getPosts?.response?.data} closeNotification={errors.getPosts}/>
          : errors?.likePost
            ? <Notification type='danger' notification={errors?.likePost?.response?.data} closeNotification={errors.likePost}/>
            : ''
      }
      <Notification type='success' notification={`Welcom ${user.username}`} closeNotification={loginNot}/>
      <Layout>
        <RightBar/>
      </Layout>
    </div>
  )
}

export default Home
