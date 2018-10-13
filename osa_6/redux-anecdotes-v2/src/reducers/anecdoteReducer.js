const anecdoteReducer = (store = [], action) => {
  switch(action.type) {
  case 'VOTE':
    const updatedAnecdote = action.data
    const old = store.filter(a => a.id !== updatedAnecdote.id)
    return [...old, updatedAnecdote ]
  case 'CREATE':
    const newAnecdote = action.data
    return [...store, { content: newAnecdote.content, votes: newAnecdote.votes, id: newAnecdote.id }]
  case 'INIT_ANECDOTES':
    return action.data
  default:
    return store
  }
}

export const anecdoteCreation = data => {
  return {
    type: 'CREATE',
    data
  }
}

export const anecdoteVoting = data => {
  return {
    type: 'VOTE', data
  }
}

export const anecdoteInitialization = data => {
  return {
    type: 'INIT_ANECDOTES',
    data
  }
}

export default anecdoteReducer