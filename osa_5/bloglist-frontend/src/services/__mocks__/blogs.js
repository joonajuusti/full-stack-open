let token = null

const blogs = [
  {
    id: '1',
    title: 'Test Title',
    author: 'Test Author',
    likes: 5,
    url: 'testurl',
    user: [{
      name: 'User Name',
      username: 'testuser',
      _id: "doesntmatter"
    }]
  },
  {
    id: '2',
    title: 'Another Title',
    author: 'Test Author',
    likes: 1,
    url: 'anotherurl',
    user: [{
      name: 'User Name',
      username: 'testuser',
      _id: "doesntmatter"
    }]
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = token => {
  token = `bearer ${token}`
}

export default { blogs, getAll, setToken }