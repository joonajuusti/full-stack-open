import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = props => {
  const { title } = props
  return (
      <h1>{title}</h1>
  )
}

const Sisalto = props => {
  const { partName, exercisesAmount } = props
  return (
      <p>{partName} {exercisesAmount}</p>
  )
}

const Yhteensa = props => {
  const { exercisesAmount1, exercisesAmount2, exercisesAmount3 } = props
  const totalExerciseAmount = exercisesAmount1 + exercisesAmount2 + exercisesAmount3
  return (
    <p>yhteensä {totalExerciseAmount} tehtävää</p>
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko title={kurssi}/>
      <Sisalto partName={osa1} exercisesAmount={tehtavia1} />
      <Sisalto partName={osa2} exercisesAmount={tehtavia2} />
      <Sisalto partName={osa3} exercisesAmount={tehtavia3} />
      <Yhteensa exercisesAmount1={tehtavia1} exercisesAmount2={tehtavia2} exercisesAmount3={tehtavia3} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
