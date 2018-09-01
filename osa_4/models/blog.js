const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 }
})

blogSchema.statics.format = function(blog) {
  const formattedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id
  }
  return formattedBlog
}

// if likes is undefined, it will default to 0
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog