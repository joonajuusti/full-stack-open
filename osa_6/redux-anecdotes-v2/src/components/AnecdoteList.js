import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notificationCreation, notificationRemoval } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  vote = id => () => {
    const { store } = this.props
    const anecdotes = this.getAnecdotes()
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    store.dispatch(anecdoteVoting(id))
    store.dispatch(notificationCreation(`you voted anecdote '${votedAnecdote.content}'`))
    setTimeout(() => {
      store.dispatch(notificationRemoval())
    }, 5000)
  }

  getAnecdotes = () => {
    return this.props.store.getState().anecdotes
  }

  getFilteredAnecdotes = () => {
    const anecdotes = this.getAnecdotes()
    const filter = this.props.store.getState().filter
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.getFilteredAnecdotes().sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
