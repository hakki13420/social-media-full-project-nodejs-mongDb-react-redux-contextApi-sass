const Avatar = ({ img, setOpenMenu }) => {
  return (
    <div className="avatar">
      <img src={img} alt="avatar" onClick={() => { setOpenMenu(open => !open) }} />
    </div>
  )
}

export default Avatar
