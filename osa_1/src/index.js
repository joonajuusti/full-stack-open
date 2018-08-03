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
  const { osat } = props
  return (
    <div>
      <Osa osa={osat[0]} />
      <Osa osa={osat[1]} />
      <Osa osa={osat[2]} />
    </div>
  )
}

const Yhteensa = props => {
  const { tehtavat } = props
  const tehtaviaYhteensa = tehtavat[0] + tehtavat[1] + tehtavat[2]
  return (
    <p>yhteensä {tehtaviaYhteensa} tehtävää</p>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko otsikko={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa tehtavat={kurssi.osat.map(osa => osa.tehtavia)}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
