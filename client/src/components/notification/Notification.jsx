const Notification = ({ type, closeNotification, notification }) => {
  return (
    <div className="notification"
      style={{
        transform: closeNotification
          ? 'translateX(-200px)'
          : 'translateX(200px)',
        backgroundColor: type === 'danger'
          ? 'red'
          : type === 'success'
            ? 'green'
            : '$thirdColor'
      }}>
      {notification}
    </div>
  )
}

export default Notification
