const actionFor = {
  anecdoteVoting(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  },
  anecdoteCreation(anecdote) {
    return {
      type: 'ADD_ANECDOTE',
      data: { anecdote }
    }
  }
}

export default actionFor