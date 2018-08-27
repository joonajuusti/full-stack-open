const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0
  }
  return blogs.reduce((accumulator, currentBlog) => (
    accumulator + currentBlog.likes
  ), 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 1) {
    return blogs[0]
  }
  return blogs.sort((a, b) => b.likes - a.likes)[0]
}

// since there is no context for where and how the following functions would be used,
// I decided to make them return empty objects if empty array is given as parameter
const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return {}
  }
  else if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1
    }
  }
  const authorsWithBlogAmount = blogs.reduce((acc, currentBlog) => {
    if (!acc.map(blog => blog.author).includes(currentBlog.author)) {
      acc.push({ author: currentBlog.author, blogs: 1 })
      return acc
    }
    acc.find(blog => blog.author === currentBlog.author).blogs += 1
    return acc
  }, [])
  return authorsWithBlogAmount.sort((a, b) => b.blogs - a.blogs)[0]
}

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return {}
  }
  else if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  }
  const authorsWithBlogAmount = blogs.reduce((acc, currentBlog) => {
    if (!acc.map(blog => blog.author).includes(currentBlog.author)) {
      acc.push({ author: currentBlog.author, likes: currentBlog.likes })
      return acc
    }
    acc.find(blog => blog.author === currentBlog.author).likes += currentBlog.likes
    return acc
  }, [])
  return authorsWithBlogAmount.sort((a, b) => b.likes - a.likes)[0]
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}