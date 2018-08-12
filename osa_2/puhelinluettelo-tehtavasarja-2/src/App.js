import React from 'react';

const FilterForm = ({ filter, handleFilterChange }) => {
  return(
    <div>
      rajaa: 
      <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
  return(
    <div>
      <h2>Lisää uusi</h2>
        <form onSubmit={addPerson}>
          <div>
            nimi: 
            <input
              value={newName}
              onChange={handleNameChange}
            />
            <br />
            numero: 
            <input
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
    </div>
  )
}

const PersonList = ({ persons, filter }) => {
  return(
    <div>
      <h2>Numerot</h2>
        {persons.filter(person => (
          person.name.toLowerCase().includes(filter.toLowerCase()))
        ).map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.addPerson = this.addPerson.bind(this)
  }

  handleNameChange = event => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = event => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = event => {
    this.setState({ filter: event.target.value })
  }

  addPerson = event => {
    event.preventDefault()
    const { persons, newName, newNumber } = this.state
    if(persons.map(personObject => personObject.name).includes(newName)) {
      alert('Nimi on jo käytössä!')
      return
    }
    const person = { name: newName, number: newNumber }
    const newPersons = persons.concat(person)
    this.setState({ persons: newPersons, newName: '', newNumber: '' })
  }

  render() {
    const { persons, newName, newNumber, filter } = this.state
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <FilterForm filter={filter} handleFilterChange={this.handleFilterChange}/>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
          addPerson={this.addPerson}
        />
        <PersonList persons={persons} filter={filter}/>
      </div>
    )
  }
}

export default App
