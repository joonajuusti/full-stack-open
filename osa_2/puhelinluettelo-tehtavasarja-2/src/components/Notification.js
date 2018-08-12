import React from 'react'

const Notification = ({ notification }) => {
  if(notification.message === null) {
    return null
  }
  else if(notification.status === 'success') {
    return(
      <div className="success">
        {notification.message}
      </div>
    )
  }
  else if(notification.status === 'error') {
    return(
      <div className="error">
        {notification.message}
      </div>
    )
  }else return null
}

export default Notification