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
      this.sortBlogsByLikesDescending(blogs)
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
        const newBlogs = [...this.state.blogs]
        newBlogs.unshift(response)
        this.sortBlogsByLikesDescending(newBlogs)
        this.createNotification(true, `${response.title} by ${response.author} added`)
        this.blogForm.toggleVisibility()
      })
      .catch(error => console.log(error.message))
  }

  updateBlog = (updatedBlog, blogId) => {
    blogService
      .update(updatedBlog, blogId)
      .then(response => {
        const { blogs } = this.state
        const blogIndex = blogs.map(blog => blog.id).indexOf(blogId)
        const updatedBlogs = [...blogs]
        updatedBlogs[blogIndex].likes += 1
        this.sortBlogsByLikesDescending(updatedBlogs)
        this.createNotification(true, `you liked ${response.title} by ${response.author}`)
      })
      .catch(error => console.log(error.message))
  }

  createNotification = (success, message) => {
    this.setState({ notification: { success, message }})
    setTimeout(() => {
      this.setState({ notification: { success: true, message: ''}})
    }, 3000)
  }

  addLikeToBlog = blog => () => {
    const updatedBlog = {
      ...blog,
      user: blog.user[0]._id,
      likes: blog.likes + 1
    }
    delete updatedBlog.id
    this.updateBlog(updatedBlog, blog.id)
  }

  sortBlogsByLikesDescending = (blogs) => {
    const sortedBlogs = [...blogs]
    sortedBlogs.sort((firstBlog, secondBlog) => firstBlog.likes - secondBlog.likes)
    this.setState({ blogs: sortedBlogs })
  }

  render() {
    const { blogs, user, notification } = this.state
    return (
      <div>
        <Notification notification={notification}/>
        {user === null
          ? <Login setStateValue={this.setStateValue} createNotification={this.createNotification}/>
          : <div>
              <p>
                {`${user.name} logged in`}
                <button onClick={this.logout}>{'logout'}</button>
              </p>
              <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
                <BlogForm addBlog={this.addBlog}/>
              </Togglable>
              <h2>blogs</h2>
              {blogs.map(blog => 
                <Blog
                  key={blog.id}
                  blog={blog}
                  addLikeToBlog={this.addLikeToBlog}
                />
              )}
            </div>
        }
      </div>
    );
  }
}

export default App;
