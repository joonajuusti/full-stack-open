import React from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      notification: { success: true, message: '' }
    }

    this.logout = this.logout.bind(this)
    this.addBlog = this.addBlog.bind(this)
    this.createNotification = this.createNotification.bind(this)
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
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

  addBlog = newBlog => {
    blogService
      .create(newBlog)
      .then(response => {
        const blogs = this.state.blogs.concat(response)
        this.setState({ blogs })
        this.createNotification(true, `${response.title} by ${response.author} added`)
        this.blogForm.toggleVisibility()
      })
      .catch(error => console.log(error.message))
  }

  createNotification = (success, message) => {
    this.setState({ notification: { success, message }})
    setTimeout(() => {
      this.setState({ notification: { success: true, message: ''}})
    }, 3000)
  }

  render() {
    return (
      <div>
        <Notification notification={this.state.notification}/>
        {this.state.user === null
          ? <Login setStateValue={this.setStateValue} createNotification={this.createNotification}/>
          : <div>
              <p>
                {`${this.state.user.name} logged in`}
                <button onClick={this.logout}>{'logout'}</button>
              </p>
              <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
                <BlogForm addBlog={this.addBlog}/>
              </Togglable>
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
