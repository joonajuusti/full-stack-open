const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  name: String,
  isOfLegalAge: { type: Boolean, default: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = function(user) {
  const formattedUser = {
    username: user.username,
    name: user.name,
    isOfLegalAge: user.isOfLegalAge,
    id: user._id,
    blogs: user.blogs
  }
  return formattedUser
}

const User = mongoose.model('User', userSchema)

module.exports = User