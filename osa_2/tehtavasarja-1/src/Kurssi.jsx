import React from 'react';

const Otsikko = ({ otsikko }) => {
  return (
      <h1>{otsikko}</h1>
  )
}

const Osa = ({ osa }) => {
  return (
      <p>{osa.nimi} {osa.tehtavia}</p>
  )
}

const Sisalto = ({ osat }) => {
  return (
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa}/>)}
    </div>
  )
}

const Yhteensa = ({ tehtavat }) => {
  const tehtaviaYhteensa = tehtavat.reduce(
    ( accumulator, currentValue ) => accumulator + currentValue
  )
  return (
    <p>yhteensä {tehtaviaYhteensa} tehtävää</p>
  )
}

const Kurssi = ({ kurssi }) => {
  return(
    <div>
      <Otsikko otsikko={kurssi.nimi}/>
      <Sisalto osat={kurssi.osat}/>
      <Yhteensa tehtavat={kurssi.osat.map(osa => osa.tehtavia)}/>
    </div>
  )
}

export default Kurssi;