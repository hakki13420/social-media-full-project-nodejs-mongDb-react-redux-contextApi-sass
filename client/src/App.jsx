import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { useContext } from 'react'
import FourAndFour from './pages/404/FourAndFour'
import { authContext } from './context/authContext'
import Search from './pages/search/Search'

function App () {
  const { user } = useContext(authContext)

  const ProtectedRoute = ({ children }) => {
    return (
      user
        ? <>{ children }</>
        : <Navigate to='/login' />
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute><Home /></ProtectedRoute>

    },
    {
      path: '/search',
      element: <ProtectedRoute><Search /></ProtectedRoute>

    },
    {
      path: '/profile/:username',
      element: <ProtectedRoute><Profile /></ProtectedRoute>

    },

    {
      path: '/login',
      element: user ? <Home login/> : <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '*',
      element: <FourAndFour />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
