const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', {
      _id: 1,
      likes: 1,
      author: 1,
      title: 1,
      url: 1
    })
  res.json(users.map(User.format))
})

usersRouter.post('/', async (req, res) => {
  try {
    const body = req.body

    if (body.password.length < 3) {
      return res.status(400).json({ error: 'invalid password' })
    }

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'username already taken' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({ ...body, password: passwordHash })
    await user.save()

    res.status(201).json(User.format(user))
  }
  catch (exception) {
    console.log(exception.message)
    res.status(500).json({ error: 'something went wrong' })
  }
})

module.exports = usersRouter