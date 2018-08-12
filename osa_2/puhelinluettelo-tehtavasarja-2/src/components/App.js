import React from 'react'
import personService from '../services/persons'
import FilterForm from './FilterForm'
import PersonForm from './PersonForm'
import PersonList from './PersonList'
import Notification from './Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: { status: '', message: '' }
    }
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.addPerson = this.addPerson.bind(this)
    this.deletePerson = this.deletePerson.bind(this)
    this.updatePerson = this.updatePerson.bind(this)
    this.createNotification = this.createNotification.bind(this)
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
      .then(newPerson => this.setState({
        persons: persons.concat(newPerson),
        newName: '',
        newNumber: '',
      }))
      this.createNotification('success', `${person.name} lisättiin`)
  }

  deletePerson = id => () => {
    const { persons } = this.state
    if(window.confirm(`poistetaanko ${persons.find(person => person.id === id).name}`)) {
      personService
        .deletePerson(id)
        .then(response => this.setState({
          persons: persons.filter(person => person.id !== id),
        }))
        this.createNotification('success', `${persons.find(person => person.id === id).name} poistettiin`)
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
          persons: persons.map(person => person.id !== id ? person : response),
        })
        this.createNotification('success', `${changedPerson.name} päivitettiin`)
      })
      .catch(error => {
        this.setState({
          persons: persons.filter(person => person.id !== id),
        })
        this.createNotification('error', `${changedPerson.name} on jo poistettu`)
      })
  }

  createNotification = (status, message) => {
    this.setState({ notification: { status, message }})
    setTimeout(() => {
      this.setState({ notification: { status: '', message: ''}})
    }, 3000)
  }

  render() {
    const { persons, newName, newNumber, filter, notification } = this.state
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification notification={notification}/>
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
