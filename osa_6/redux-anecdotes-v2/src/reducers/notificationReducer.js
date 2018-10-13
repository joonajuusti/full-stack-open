const notificationReducer = (store = '', action) => {
  if (action.type === 'NOTIFY') {
    return action.notification
  }
  if (action.type === 'REMOVE') {
    return ''
  }
  return store
}

export const notificationCreation = notification => {
  return {
    type: 'NOTIFY',
    notification: notification
  }
}

export const notificationRemoval = () => {
  return {
    type: 'REMOVE'
  }
}

export default notificationReducer