import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux' 
import counterReducer from './counterReducer';

const store = createStore(counterReducer)

const Statistiikka = () => {
  const palautteita = Object.values(store.getState()).reduce((a, b) => a + b)
  const state = store.getState()

  const reset = () => {
    store.dispatch({ type: 'ZERO' })
  }

  const average = () => {
    return((state.good - 1 * state.bad) / (state.good + state.ok + state.bad))
  }

  const positiveReviews = () => {
    return(`${(state.good / (state.good + state.ok + state.bad)) * 100}`)
  }

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }
  
  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{Number.parseFloat(average()).toPrecision(2)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{`${Number.parseFloat(positiveReviews()).toPrecision(3)}%`}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={reset}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({ type: nappi })
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render()
store.subscribe(render)