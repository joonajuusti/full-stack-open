const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (req, res) => {
  try {
    const body = req.body

    if (!body.title || !body.url) {
      return res.status(400).json({ error: 'one or more fields missing' })
    }

    const blog = new Blog(body)
    await blog.save()

    res.status(201).json(Blog.format(blog))
  }
  catch (exception) {
    console.log(exception.message)
    res.status(500).json({ error: 'something went wrong' })
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  }
  catch (exception) {
    console.log(exception.message)
    res.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.json(Blog.format(updatedBlog))
  }
  catch (exception) {
    console.log(exception.message)
    res.status(400).send(({ error: 'malformatted id' }))
  }
})

module.exports = blogsRouter