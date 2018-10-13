import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationCreation, notificationRemoval } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    this.props.anecdoteCreation(newAnecdote)
    this.props.notificationCreation(`you created anecdote '${content}'`)
    setTimeout(() => {
      this.props.notificationRemoval()
    }, 5000)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  {
    anecdoteCreation,
    notificationCreation,
    notificationRemoval
  })(AnecdoteForm)
