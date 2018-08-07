import React from 'react'
import ReactDOM from 'react-dom'

const RandomAnecdote = ({ handleClick }) => {
  return(
    <button onClick={handleClick}>
      next anecdote
    </button>
  )
}

const VoteAnecdote = ({ handleClick }) => {
  return(
    <button onClick={handleClick}>
      vote
    </button>
  )
}

const MostVotes = ({ anecdotes, points }) => {
  const mockPoints = [ ...points ]
  mockPoints.sort((a, b) =>  b - a)
  const mostVotesIndex = points.indexOf(mockPoints[0])
  return(
    <div>
      <p>{anecdotes[mostVotesIndex]}</p>
      <p>{`has ${points[mostVotesIndex]} votes`}</p>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      points: []
    }
  }

  componentDidMount() {
    const initialPoints = []
    const { anecdotes } = this.props

    anecdotes.forEach((anecdote, index) => initialPoints.push(0))
    this.setState({ points: initialPoints })
  }

  render() {
    const { anecdotes } = this.props
    const { selected, points } = this.state

    const getRandomAnecdote = () => () => {
      const randomNumber = Math.floor(Math.random() * anecdotes.length)
      this.setState({ selected: randomNumber })
    }

    const voteAnecdote = () => () => {
      const { selected, points } = this.state
      const newPoints = [ ...points ]
      newPoints[selected] += 1
      this.setState({ points: newPoints })
    }

    return (
      <div>
        <p>{anecdotes[selected]}</p>
        <p>{`has ${points[selected]} votes`}</p>
        <RandomAnecdote handleClick={getRandomAnecdote()} />
        <VoteAnecdote handleClick={voteAnecdote()} />
        <h3>anecdote with most votes:</h3>
        <MostVotes anecdotes={anecdotes} points={points} />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)