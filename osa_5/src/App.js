import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null
    }

    this.logout = this.logout.bind(this)
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({ user })
    }
  }

  setStateValue = (key, value) => {
    this.setState({ [key]: value })
  }

  logout = () => {
    window.localStorage.clear()
    this.setState({ user: null })
  }

  render() {
    return (
      <div>
        {this.state.user === null
          ? <Login setStateValue={this.setStateValue}/>
          : <div>
              <p>{`${this.state.user.name} logged in`}</p>
              <button onClick={this.logout}>{'logout'}</button>
              <h2>blogs</h2>
              {this.state.blogs.map(blog => 
                <Blog key={blog.id} blog={blog}/>
              )}
            </div>
        }
      </div>
    );
  }
}

export default App;
