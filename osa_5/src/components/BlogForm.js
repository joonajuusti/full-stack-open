import React, { Component } from 'react'

class BlogForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      author: '',
      url: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.addBlog = this.addBlog.bind(this)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = event => {
    event.preventDefault()
    const { title, author, url } = this.state
    const newBlog = { title, author, url }
    this.props.addBlog(newBlog)
  }

  render() {
    const { title, author, url } = this.state
    return (
      <div>
        <form onSubmit={this.addBlog}>
          <div>
            title: 
            <input
              name="title"
              value={title}
              onChange={this.handleChange}
            />
            <br />
            author: 
            <input
              name="author"
              value={author}
              onChange={this.handleChange}
            />
            <br />
            url: 
            <input
              name="url"
              value={url}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">create</button>
          </div>
        </form>
      </div>
    );
  }
}

export default BlogForm;