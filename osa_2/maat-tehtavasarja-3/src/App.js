import React, { Component } from 'react'
import axios from 'axios'

const CountryInfo = ({ country }) => {
  return(
    <div>
      <h2>{country.name}, {country.nativeName}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt="Flag not found" style={{ width: '50%', height: '50%' }}/>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      countries: [],
      filter: '',
    }

    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  
  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => this.setState({ countries: response.data }))
      .catch(error => console.log(error.message))
  }

  handleFilterChange = event => {
    this.setState({ filter: event.target.value })
  }

  handleClick = country  => () => {
    // clicking a country name actually sets the country name as the filter which triggers a new render
    // and thus the clicked country gets selected as the only country in countriesToShow (in most cases)
    this.setState({ filter: country.name })
  }

  render() {
    const { countries, filter } = this.state
    const countriesToShow = countries
      .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    return (
      <div>
        rajaa: 
        <input
          value={filter}
          onChange={this.handleFilterChange}
        />
        {countriesToShow.length >= 10
          ? <p>too many matches, specify another filter</p>
          : countriesToShow.length === 1
            ? <CountryInfo country={countriesToShow[0]} />
            : countriesToShow.map(country => <div key={country.name} onClick={this.handleClick(country)}>{country.name}</div>)}
      </div>
    );
  }
}

export default App;
