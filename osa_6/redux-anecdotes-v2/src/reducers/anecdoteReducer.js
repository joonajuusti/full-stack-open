import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  switch(action.type) {
  case 'VOTE':
    const old = store.filter(a => a.id !== action.data.id)
    return [...old, action.data ]
  case 'CREATE':
    return [...store, action.data]
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return store
  }
}

export const anecdoteCreation = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const anecdoteVoting = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const anecdoteInitialization = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer