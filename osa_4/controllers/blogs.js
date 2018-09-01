const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'one or more fields missing' })
    }

    const blog = new Blog(request.body)
    const savedBlog = await blog.save()

    response.status(201).json(Blog.format(savedBlog))
  }
  catch (exception) {
    console.log(exception.message)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  catch (exception) {
    console.log(exception.message)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(Blog.format(updatedBlog))
  }
  catch (exception) {
    console.log(exception.message)
    response.status(400).send(({ error: 'malformatted id' }))
  }
})

module.exports = blogsRouter