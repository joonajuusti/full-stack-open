import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  vote = anecdote => async () => {
    this.props.anecdoteVoting({ ...anecdote, votes: anecdote.votes + 1 })
    this.props.notify(`you voted anecdote '${anecdote.content}'`, 1)
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
              <button onClick={this.vote(anecdote)}>
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
    notify
  })(AnecdoteList)
