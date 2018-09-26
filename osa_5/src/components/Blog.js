import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expanded: false
    }

    this.expand = this.expand.bind(this)
  }

  expand() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    const { blog } = this.props
    const { expanded } = this.state
    return(
      <div>
        <div onClick={this.expand}>
          {blog.title} {blog.author}
        </div>
        { expanded && (
          <div>
            <p>{blog.url}</p>
            <p>{blog.likes} <button>like</button></p>
            <p>{`added by ${blog.user[0].name}`}</p>
          </div>
        )}
      </div>
    )
  }
}

export default Blog