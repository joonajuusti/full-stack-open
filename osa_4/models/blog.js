const mongoose = require('mongoose')

// if likes is undefined, it will default to 0
const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 }
})

module.exports = Blog