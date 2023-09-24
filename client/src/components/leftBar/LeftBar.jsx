import {
  RssFeedOutlined,
  ChatOutlined,
  OndemandVideo,
  PeopleAltOutlined,
  HelpOutlineOutlined,
  EventNoteOutlined,
  SchoolOutlined
} from '@mui/icons-material'
import LeftBarTopItem from './LeftBarTopItem'
import LeftBarBottomItem from './LeftBarBottomItem'
import { users } from '../../data.json'
import AvatarName from '../avatarName/AvatarName'

const LeftBar = () => {
  return (
    <div className="left-bar">
      <div className="left-bar-top">
        <ul className="left-bar-top-list">
          <LeftBarTopItem title='Feeds'><RssFeedOutlined/></LeftBarTopItem>
          <LeftBarTopItem title='Chat'><ChatOutlined/></LeftBarTopItem>
          <LeftBarTopItem title='Videos'><OndemandVideo/></LeftBarTopItem>
          <LeftBarTopItem title='Groups'><PeopleAltOutlined/></LeftBarTopItem>
          <LeftBarTopItem title='FAQ'><HelpOutlineOutlined/></LeftBarTopItem>
          <LeftBarTopItem title='Events'><EventNoteOutlined/></LeftBarTopItem>
          <LeftBarTopItem title='Courses'><SchoolOutlined/></LeftBarTopItem>
        </ul>
      </div>
      <div>
        <hr />
      </div>
      <div className="left-bar-bottom">
        <ul className="left-bar-bottom-list">
          {
            users.map(user => <AvatarName key={user.id} user={user} />)
          }
        </ul>
      </div>
    </div>
  )
}

export default LeftBar
