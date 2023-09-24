import Avatar from '../avatar/Avatar'

const LeftBarBottomItem = ({ img, title }) => {
  return (
    <li className="left-bar-bottom-item">
      <Avatar img={img} />
      <span>{title}</span>
    </li>
  )
}

export default LeftBarBottomItem
