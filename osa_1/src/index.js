import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = props => {
  const { otsikko } = props
  return (
      <h1>{otsikko}</h1>
  )
}

const Osa = props => {
  const { osa } = props
  return (
      <p>{osa.nimi} {osa.tehtavia}</p>
  )
}

const Sisalto = props => {
  const { osa1, osa2, osa3 } = props
  return (
    <div>
      <Osa osa={osa1} />
      <Osa osa={osa2} />
      <Osa osa={osa3} />
    </div>
  )
}

const Yhteensa = props => {
  const { tehtavia1, tehtavia2, tehtavia3 } = props
  const tehtaviaYhteensa = tehtavia1 + tehtavia2 + tehtavia3
  return (
    <p>yhteensä {tehtaviaYhteensa} tehtävää</p>
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <Otsikko otsikko={kurssi}/>
      <Sisalto osa1={osa1} osa2={osa2} osa3={osa3}/>
      <Yhteensa tehtavia1={osa1.tehtavia} tehtavia2={osa2.tehtavia} tehtavia3={osa3.tehtavia}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
