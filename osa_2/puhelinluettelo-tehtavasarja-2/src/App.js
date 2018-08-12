import React from 'react'
import personService from './services/persons'

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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.addPerson = this.addPerson.bind(this)
    this.deletePerson = this.deletePerson.bind(this)
    this.updatePerson = this.updatePerson.bind(this)
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => this.setState({ persons: response }))
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
      if(window.confirm(`${newName} on jo luettelossa, korvataanko hänen vanha numeronsa uudella?`)) {
        this.updatePerson(persons.find(person => person.name === newName).id)
      }
      return
    }
    const person = { name: newName, number: newNumber }
    personService
      .create(person)
      .then(newPerson => this.setState({ persons: persons.concat(newPerson), newName: '', newNumber: '' }))
  }

  deletePerson = id => () => {
    const { persons } = this.state
    if(window.confirm(`poistetaanko ${persons.find(person => person.id === id).name}`)) {
      personService
        .deletePerson(id)
        .then(response => this.setState({ persons: persons.filter(person => person.id !== id) }))
    }
  }

  updatePerson = id => {
    const { persons, newNumber } = this.state
    const personToChange = persons.find(person => person.id === id)
    const changedPerson = { ...personToChange, number: newNumber }
    personService
      .update(id, changedPerson)
      .then(response => {
        this.setState({
          persons: persons.map(person => person.id !== id ? person : response)
        })
      })
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
        <PersonList persons={persons} filter={filter} deletePerson={this.deletePerson}/>
      </div>
    )
  }
}

export default App
