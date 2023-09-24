const LeftBarTopItem = ({ children, title }) => {
  return (
    <li className="left-bar-top-list-item">
      {children}
      <span>{title}</span>
    </li>
  )
}

export default LeftBarTopItem
