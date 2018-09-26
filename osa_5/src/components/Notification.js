import React from 'react'
import '../index.css'
import PropTypes from 'prop-types'

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

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification