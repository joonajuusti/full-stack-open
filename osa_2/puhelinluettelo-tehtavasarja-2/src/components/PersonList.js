import React from 'react'

const PersonList = ({ persons, filter, deletePerson }) => {
  return(
    <div>
      <h2>Numerot</h2>
        {persons.filter(person => (
          person.name.toLowerCase().includes(filter.toLowerCase()))
        ).map(person => <PersonListItem key={person.id} person={person} deletePerson={deletePerson}/>)}
    </div>
  )
}

const PersonListItem = ({ person, deletePerson }) => {
  return(
    <div>
      {person.name} {person.number} 
      <button style={{margin: '5px 10px'}} onClick={deletePerson(person.id)}>poista</button>
    </div>
  )
}

export default PersonList