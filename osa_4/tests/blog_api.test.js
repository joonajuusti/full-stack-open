const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

const formatBlog = blog => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
  }
}

beforeAll(async () => {
  await Blog.remove({})
  console.log('cleared blogs collection')

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  console.log('saved all blogs to blogs collection')
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('a correct amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const formattedBlogs = response.body.map(blog => formatBlog(blog))
    expect(formattedBlogs).toContainEqual(initialBlogs[0])
  })
})

describe('POST /api/blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test title',
      author: 'Test author',
      url: 'Test url',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const formattedBlogs = response.body.map(blog => formatBlog(blog))

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(formattedBlogs).toContainEqual(newBlog)
  })

  test('a blog without likes gets 0 as the amount of likes when saved to database', async () => {
    const blogWithoutLikes = {
      title: 'Test title',
      author: 'Test author',
      url: 'Test url'
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
    const response = await api.get('/api/blogs')
    const blogLikes = response.body.map(blog => blog.likes)
    expect(blogLikes).toContain(0)
  })

  test('a blog without a title or a url will get a response with the status of 400', async () => {
    const blogWithoutTitle = {
      author: 'Test author',
      url: 'Test url'
    }
    const blogWithoutUrl = {
      title: 'Test title',
      author: 'Test author',
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)
  })
})

afterAll(() => {
  server.close()
})