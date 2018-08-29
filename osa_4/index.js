const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const http = require('http')

mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true })
  .then(() => console.log('connected to database', config.mongoUrl))
  .catch(err => console.log(err))

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
  console.log('closed mongodb connection')
})

module.exports = {
  app, server
}
