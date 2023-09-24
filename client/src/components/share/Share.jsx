import { Clear, EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material'
import Avatar from '../avatar/Avatar'
import { useContext, useRef, useState } from 'react'
import { authContext } from '../../context/authContext'
import { Link } from 'react-router-dom'
import { privateRequest } from '../../axiosRequest'
import NoAvatar from '../noImage/NoAvatar'
import { addPost } from '../../slices/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { LinearProgress } from '@mui/material'

const Share = () => {
  const content = useRef()
  const [file, setFile] = useState(null)
  const { user } = useContext(authContext)
  const { isAddingPost } = useSelector(state => state.posts)
  const dispatch = useDispatch()

  const uploadFile = async () => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const pathFile = await privateRequest.post('upload', formData)
      return pathFile.data
    } catch (error) {
      console.log(error)
    }
  }
  const sharePost = async (e) => {
    e.preventDefault()
    try {
      const path = await uploadFile()
      dispatch(addPost({
        content: content.current.value,
        picture: path
      }))
      setFile(null)
      content.current = ''
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isAddingPost && <LinearProgress style={{ marginBottom: '1rem' }}/>}

      <form className='share' onSubmit={sharePost}>
        <div className="share-top">
          <Link to={'/profile/' + user.username}>
            {
              user.profilePicture
                ? <Avatar img={import.meta.env.VITE_PUBLIC_FOLDER + user.profilePicture}/>
                : <NoAvatar />
            }
          </Link>
          <input type="text"
            required
            ref={content}
            placeholder={`What in your mind ${user.username}?....`}
          />
        </div>
        {file && <div className="image-preview">
          <img src={URL.createObjectURL(file)} alt="image-preview" />
          <Clear className='clear-image' onClick={() => setFile(null)}/>
        </div>}
        <hr />
        <div className="share-bottom">
          <label htmlFor='file' className="share-bottom-item">
            <PermMedia htmlColor='red'/>
            <span>Photo|video</span>
            <input style={{ display: 'none' }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <div className="share-bottom-item">
            <Label htmlColor='green'/>
            <span>Tag</span>
          </div>
          <div className="share-bottom-item">
            <Room htmlColor='blue'/>
            <span>Location</span>
          </div>
          <div className="share-bottom-item">
            <EmojiEmotions htmlColor='orange'/>
            <span>Feelings</span>
          </div>
          <button style={{ cursor: isAddingPost ? 'not-allowed' : 'pointer' }} disabled={isAddingPost} type='submit'>Share</button>
        </div>

      </form>
    </>
  )
}

export default Share
