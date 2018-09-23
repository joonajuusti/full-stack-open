import React from 'react'
import '../index.css'

const Notification = ({ notification }) => {
  if(notification.message === '') {
    return null
  }
  else if(notification.success) {
    return(
      <div className="success">
        {notification.message}
      </div>
    )
  }
  else {
    return(
      <div className="error">
        {notification.message}
      </div>
    )
  }
}

export default Notification