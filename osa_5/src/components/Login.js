import React, { Component } from 'react';
import loginService from '../services/login'
import blogService from '../services/blogs'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    const { setStateValue, createNotification } = this.props
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)
      setStateValue('user', user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch(exception) {
      createNotification(false, 'invalid username or password')
    }
  }

  render() {
    return (
      <form onSubmit={this.login}>
        <div>
          { 'username' }
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div>
          { 'password' }
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    );
  }
}

export default Login;