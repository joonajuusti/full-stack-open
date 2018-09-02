const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

blogSchema.statics.format = function(blog) {
  const formattedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    id: blog._id,
    user: blog.user
  }
  return formattedBlog
}

// if likes is undefined, it will default to 0
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog