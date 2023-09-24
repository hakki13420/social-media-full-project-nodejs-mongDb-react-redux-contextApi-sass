const TopBarItem = ({ children, count }) => {
  return (
    <div className="topbar-item">
      <div className="container">
        {children}
        <span>{count}</span>
      </div>
    </div>
  )
}

export default TopBarItem
