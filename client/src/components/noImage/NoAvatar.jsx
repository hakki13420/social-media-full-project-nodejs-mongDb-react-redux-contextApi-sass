import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import './noavatar.scss'

const NoAvatar = ({ setOpenMenu }) => {
  return (
    <div className="noavatar">
      <AccountCircleOutlinedIcon className='avatar-image' onClick={() => { setOpenMenu(open => !open) }}/>
    </div>
  )
}

export default NoAvatar
