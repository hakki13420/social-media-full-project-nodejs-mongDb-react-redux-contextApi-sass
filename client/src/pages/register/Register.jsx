import axios from 'axios'
import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Notification from '../../components/notification/Notification'
import { authContext } from '../../context/authContext'
import { CircularProgress } from '@mui/material'
import { publicRequest } from '../../axiosRequest'

const Register = () => {
  const username = useRef()
  const name = useRef()
  const email = useRef()
  const password = useRef()
  const password2 = useRef()
  const [notification, setNotification] = useState('')
  const [closeNotification, setCloseNotification] = useState(false)
  const navigate = useNavigate()
  const { isFetching } = useContext(authContext)

  const submitForm = async (e) => {
    e.preventDefault()
    console.log(password.current.value, password2.current.value)
    if (password !== password2) password.current.setCustomValidity('password dont match')
    try {
      await publicRequest.post('auth/register',
        {
          username: username.current.value,
          name: name.current.value,
          email: email.current.value,
          password: password.current.value
        }
      )
      setNotification('Compte created')
      setCloseNotification(true)
    } catch (error) {

    }
  }

  setTimeout(() => {
    setCloseNotification(false)
    setNotification('')
  }, 4000)

  return (
    <div className="login register">

      <Notification closeNotification={closeNotification} notification={notification}/>

      <div className="login-container register-container">

        <div className="login-right">
          <h1>Register Space</h1>
          <form onSubmit={submitForm}>
            <input ref={name} required maxLength='50' type="text" name='name' placeholder="name..." />
            <input ref={username} required maxLength='20' type="text" name='username' placeholder="username..." />
            <input ref={email} type="email" name='email' placeholder="email..." />
            <input ref={password} type="password" minLength='6' name='password' placeholder="password..." />
            <input ref={password2} type="password" name='password2' placeholder="password again..." />
            <button type='submit'>
              {isFetching && <CircularProgress/>}Register
            </button>
            <button onClick={() => navigate('/login')}>Login</button>
          </form>
        </div>
        <div className="login-left">
          <h1>HAKKI<span>Media</span></h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam voluptate porro est unde explicabo. Eligendi.</p>
        </div>
      </div>
    </div>
  )
}

export default Register
