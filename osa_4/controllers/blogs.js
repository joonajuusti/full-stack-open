const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'one or more fields missing'})
    }

    const blog = new Blog(request.body)
    const savedBlog = await blog.save()

    response.status(201).json(savedBlog)
  }
  catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = blogsRouter