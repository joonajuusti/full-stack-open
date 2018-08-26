const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

const mongoUrl = process.env.MONGODB_URL

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log('connected to database', mongoUrl))
  .catch(err => console.log(err))

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
