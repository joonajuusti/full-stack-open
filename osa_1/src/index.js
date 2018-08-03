import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = props => {
  const { title } = props
  return (
      <h1>{title}</h1>
  )
}

const Osa = props => {
  const { partName, exercisesAmount } = props
  return (
      <p>{partName} {exercisesAmount}</p>
  )
}

const Sisalto = props => {
  const { partName1, exercisesAmount1, partName2, exercisesAmount2, partName3, exercisesAmount3 } = props
  return (
    <div>
      <Osa partName={partName1} exercisesAmount={exercisesAmount1} />
      <Osa partName={partName2} exercisesAmount={exercisesAmount2} />
      <Osa partName={partName3} exercisesAmount={exercisesAmount3} />
    </div>
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
      <Sisalto
        partName1={osa1}
        exercisesAmount1={tehtavia1}
        partName2={osa2}
        exercisesAmount2={tehtavia2}
        partName3={osa3}
        exercisesAmount3={tehtavia3}
      />
      <Yhteensa exercisesAmount1={tehtavia1} exercisesAmount2={tehtavia2} exercisesAmount3={tehtavia3} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
