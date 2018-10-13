import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notificationCreation, notificationRemoval } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  vote = id => async () => {
    const votedAnecdote = this.props.anecdotes.find(anecdote => anecdote.id === id)
    const newAnecdote = await anecdoteService.update({ ...votedAnecdote, votes: votedAnecdote.votes + 1 })
    this.props.anecdoteVoting(newAnecdote)
    this.props.notificationCreation(`you voted anecdote '${votedAnecdote.content}'`)
    setTimeout(() => {
      this.props.notificationRemoval()
    }, 5000)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.map(anecdote =>
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

const filterAnecdotes = (anecdotes, filter) => {
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

const sortAnecdotes = anecdotes => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = state => {
  return {
    anecdotes: sortAnecdotes(filterAnecdotes(state.anecdotes, state.filter))
  }
}

export default connect(
  mapStateToProps,
  {
    anecdoteVoting,
    notificationCreation,
    notificationRemoval
  })(AnecdoteList)
