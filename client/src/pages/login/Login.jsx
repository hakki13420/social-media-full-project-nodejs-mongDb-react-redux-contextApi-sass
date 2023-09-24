import { useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../context/authContext'
import Notification from '../../components/notification/Notification'
import { CircularProgress } from '@mui/material'

const Login = () => {
  const navigate = useNavigate()
  const username = useRef()
  const password = useRef()
  const { isFetching, logIn, errors, resetErrors } = useContext(authContext)
  // const [errors, setErrors] = useState('')

  console.log('errors login', errors)
  const submitForm = async (e) => {
    e.preventDefault()
    logIn({
      username: username.current.value,
      password: password.current.value
    })
  }

  setTimeout(() => {
    errors && resetErrors()
  }, 4000)

  return (
    <div className="login">
      <Notification type='danger' notification={errors || ''} closeNotification={errors}/>
      <div className="login-container">
        <div className="login-left">
          <h1>HAKKI<span>Media</span></h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam voluptate porro est unde explicabo. Eligendi.</p>
        </div>
        <div className="login-right">
          <h1>Login Space</h1>

          <form onSubmit={submitForm}>
            <input ref={username}
              type="text"
              name='username'
              placeholder="username..."
              className={ errors ? 'error-input' : '' }
            />
            <input ref={password}
              type="password"
              name='password'
              placeholder="password..."
              className={ errors ? 'error-input' : '' }
            />
            <button type='submit'
              disabled={isFetching}
              style={{ cursor: isFetching ? 'not-allowed' : '' }}
            >
              {isFetching && <CircularProgress style={{ color: 'white' }} size='20px' />}Login
            </button>
            <span>Forgot password ?</span>
            <button onClick={() => navigate('/register', { replace: true })}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
