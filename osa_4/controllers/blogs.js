const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, _id: 1 })

  res.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    let decodedToken
    if (req.token) {
      decodedToken = jwt.verify(req.token, process.env.SECRET)
    }
    else {
      return res.status(401).json({ error: 'token missing' })
    }
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    if (!body.title || !body.url) {
      return res.status(400).json({ error: 'one or more fields missing' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({ ...body, user: user._id })
    await blog.save()

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    res.status(201).json(Blog.format(blog))
  }
  catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      res.status(401).json({ error: exception.message })
    }
    else {
      res.status(500).json({ error: 'something went wrong' })
    }
    console.log(exception.message)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    let decodedToken
    if (req.token) {
      decodedToken = jwt.verify(req.token, process.env.SECRET)
    }
    else {
      return res.status(401).json({ error: 'token missing' })
    }
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }
    const blog = await Blog.findById(req.params.id)
    if (blog.user.toString() === decodedToken.id) {
      blog.remove()
    }
    else {
      res.status(403).json({ error: 'unauthorized to remove blog' })
    }
    res.status(204).end()
  }
  catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      res.status(401).json({ error: exception.message })
    }
    else if(exception.name === 'CastError') {
      res.status(400).json({ error: 'malformatted id' })
    }
    else {
      res.status(500).json({ error: 'something went wrong' })
    }
    console.log(exception.message)
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