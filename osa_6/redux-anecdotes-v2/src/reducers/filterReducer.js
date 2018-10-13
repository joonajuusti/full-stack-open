const filterReducer = (store = '', action) => {
  if (action.type === 'CHANGE') {
    return action.filter
  }
  return store
}

export const filterChanging = filter => {
  return {
    type: 'CHANGE',
    filter
  }
}

export default filterReducer