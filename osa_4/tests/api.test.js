const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialBlogs, blogsInDb, initialUsers, usersInDb } = require('../utils/test_helper')

describe('/api/blogs', () => {
  beforeAll(async () => {
    await Blog.remove({})
    console.log('cleared blogs collection')

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    console.log('saved all blogs to blogs collection')
  })

  describe('GET', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('a specific blog is within the returned blogs', async () => {
      const blogs = await blogsInDb()
      const blogTitles = blogs.map(blog => blog.title)
      expect(blogTitles).toContain(initialBlogs[0].title)
    })
  })

  describe('POST', () => {
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
      const blogTitles = blogsAfter.map(blog => blog.title)

      expect(blogsAfter.length).toBe(blogsBefore.length + 1)
      expect(blogTitles).toContain(newBlog.title)
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

  describe('DELETE /:id', () => {
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
})

describe('/api/users', () => {
  beforeAll(async () => {
    await User.remove({})
    console.log('cleared users collection')

    const userObjects = initialUsers.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
    console.log('saved all users to users collection')
  })

  describe('GET', () => {
    test('users are returned as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('a specific user is within the returned users', async () => {
      const users = await usersInDb()
      const usernames = users.map(user => user.username)
      expect(usernames).toContain(initialUsers[0].username)
    })
  })

  describe('POST', () => {
    const newUser = {
      username: 'testusername',
      password: 'testpassword',
      name: 'Test User',
      isOfLegalAge: true
    }

    const userWithoutUniqueUsername = {
      username: 'admin',
      password: 'testpassword',
      name: 'Test User',
      isOfLegalAge: true
    }

    const userWithInvalidPassword = {
      username: 'username',
      password: 'pw',
      name: 'Test User',
      isOfLegalAge: true
    }

    const userWithoutIsOfLegalAge = {
      username: 'nolegalage',
      password: 'testpassword',
      name: 'Test User'
    }

    test('a valid user can be added', async () => {
      const usersBefore = await usersInDb()

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAfter = await usersInDb()
      const usernamesAfter = usersAfter.map(user => user.username)

      expect(usersAfter.length).toBe(usersBefore.length + 1)
      expect(usernamesAfter).toContain(newUser.username)
    })

    test('a user without unique username cannot be added', async () => {
      const usersBefore = await usersInDb()
      const result = await api
        .post('/api/users')
        .send(userWithoutUniqueUsername)
        .expect(400)

      expect(result.body).toEqual({ error: 'username already taken' })

      const usersAfter = await usersInDb()
      expect(usersAfter.length).toBe(usersBefore.length)
    })

    test('a user with invalid password cannot be added', async () => {
      const usersBefore = await usersInDb()
      const result = await api
        .post('/api/users')
        .send(userWithInvalidPassword)
        .expect(400)

      expect(result.body).toEqual({ error: 'invalid password' })

      const usersAfter = await usersInDb()
      expect(usersAfter.length).toBe(usersBefore.length)
    })

    test('a user without legal age info will have a default value of true', async () => {
      await api
        .post('api/users')
        .send(userWithoutIsOfLegalAge)

      const usersAfter = await usersInDb()
      console.log(usersAfter)
      expect(usersAfter.pop().isOfLegalAge).toBe(true)
    })
  })
})

afterAll(() => {
  server.close()
})