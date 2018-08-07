import React from 'react';
import ReactDOM from 'react-dom';

const ReviewButton = ({ title, handleClick }) => {
  return (
    <button onClick={handleClick(title)}>
      {title}
    </button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const average = () => {
    return((good - 1 * bad) / (good + neutral + bad))
  }

  const positiveReviews = () => {
    return((good / (good + neutral + bad)) * 100)
  }
  
  return (
    <table>
      <tbody>
        <Statistic title='good' value={good} />
        <Statistic title='neutral' value={neutral} />
        <Statistic title='bad' value={bad} />
        <Statistic title='average' value={Number.parseFloat(average()).toPrecision(2)} />
        <Statistic title='positive' value={`${Number.parseFloat(positiveReviews()).toPrecision(3)} %`} />
      </tbody>
    </table>
  )
}

const Statistic = ({ title, value }) => {
  return (
      <tr>
        <td>{title}</td>
        <td>{value}</td>
      </tr>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      good: 0,
      neutral: 0,
      bad: 0
    }
  }

  render() {
    const addReview = review => () => {
     this.setState({ [review]: this.state[review] + 1 })
    }
    const { good, neutral, bad } = this.state
    const reviewsGiven = (good + neutral + bad) > 0
    return (
      <div>
        <h1>Give reviews!</h1>
        <ReviewButton title="good" handleClick={addReview} />
        <ReviewButton title="neutral" handleClick={addReview} />
        <ReviewButton title="bad" handleClick={addReview} />
        <h1>Statistics!</h1>
        {reviewsGiven && <Statistics good={good} neutral={neutral} bad={bad} />}
        {!reviewsGiven && <p>No reviews given :(</p>}
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
