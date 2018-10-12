import React from 'react';
import actionFor from './actionCreators'

class App extends React.Component {
  vote = id => () => {
    this.props.store.dispatch(
      actionFor.anecdoteVoting(id)
    )
  }

  sortAnecdotes = anecdotes => {
    return anecdotes.sort((a, b) => b.votes - a.votes)
  }

  addAnecdote = event => {
    event.preventDefault()
    this.props.store.dispatch(
      actionFor.anecdoteCreation(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.sortAnecdotes(anecdotes).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App