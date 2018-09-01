const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, formatBlog, blogsInDb } = require('../utils/blog_test_helper')

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

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const formattedBlogs = response.body.map(blog => formatBlog(blog))
    expect(formattedBlogs).toContainEqual(initialBlogs[0])
  })
})

describe('POST /api/blogs', () => {
  const newBlog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 0
  }

  const blogWithoutLikes = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url'
  }

  const blogWithoutTitle = {
    author: 'Test author',
    url: 'Test url'
  }
  const blogWithoutUrl = {
    title: 'Test title',
    author: 'Test author',
  }

  test('a valid blog can be added', async () => {
    const blogsBefore = await blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await blogsInDb()
    const formattedBlogs = blogsAfter.map(blog => formatBlog(blog))

    expect(blogsAfter.length).toBe(blogsBefore.length + 1)
    expect(formattedBlogs).toContainEqual(newBlog)
  })

  test('a blog without likes gets 0 as the amount of likes when saved to database', async () => {
    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
    const blogsAfter = await blogsInDb()
    const blogLikes = blogsAfter.map(blog => blog.likes)
    expect(blogLikes).toContain(0)
  })

  test('a blog without a title or a url will get a response with the status of 400', async () => {
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

describe('DELETE /api/blogs/:id', () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: 'Test title',
      author: 'Test author',
      url: 'Test url',
      likes: 0
    })
    await addedBlog.save()
    addedBlog = Blog.format(addedBlog)
  })
  test('deletion succeeds with proper status code', async () => {
    const blogsBefore = await blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog.id}`)
      .expect(204)

    const blogsAfter = await blogsInDb()

    expect(blogsAfter).not.toContainEqual(addedBlog)
    expect(blogsAfter.length).toBe(blogsBefore.length - 1)
  })

  test('deletion fails with status code of 400 if id is malformatted', async () => {
    await api
      .delete('/api/blogs/malformatted_id')
      .expect(400)
  })
})

afterAll(() => {
  server.close()
})