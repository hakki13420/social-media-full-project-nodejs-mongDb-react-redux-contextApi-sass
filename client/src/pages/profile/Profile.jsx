import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import RightBarProfile from '../../components/rightBar/RightBarProfile'
import { useNavigate, useParams } from 'react-router-dom'
import { privateRequest } from '../../axiosRequest'

const Profile = () => {
  const [user, setUser] = useState({})
  const { username } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await privateRequest.get('users?username=' + username)
        setUser(res.data)
      } catch (error) {
        if (error.response.status === 404) navigate('/error')
        console.log(error)
      }
    }
    getUser()
  }, [username])

  return (
    <div className="profile">
      <Layout user={user}>
        <RightBarProfile user={user}/>
      </Layout>
    </div>
  )
}

export default Profile
