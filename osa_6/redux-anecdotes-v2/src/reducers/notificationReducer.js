const notificationReducer = (store = '', action) => {
  if (action.type === 'NOTIFY') {
    return action.notification
  }
  if (action.type === 'REMOVE') {
    return ''
  }
  return store
}

export const notify = (notification, timeInSeconds) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY',
      notification: notification
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, 1000 * timeInSeconds)
  }
}

export default notificationReducer