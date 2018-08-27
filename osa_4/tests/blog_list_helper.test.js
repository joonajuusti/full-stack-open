const blogListHelper = require('../utils/blog_list_helper')

test('dummy is called', () => {
  const blogs = []
  const result = blogListHelper.dummy(blogs)
  expect(result).toBe(1)
})

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('totalLikes', () => {
  test('of empty list is zero', () => {
    expect(blogListHelper.totalLikes([])).toBe(0)
  })

  test('calculates total like amount correctly', () => {
    expect(blogListHelper.totalLikes(blogs)).toBe(36)
  })
})

describe('favoriteBlog', () => {
  test('returns correct blog', () => {
    const blogWithMostLikes = blogs[2]
    expect(blogListHelper.favoriteBlog(blogs))
      .toEqual(blogWithMostLikes)
  })

  test('returns the only blog in the list if it has only one blog', () => {
    expect(blogListHelper.favoriteBlog([blogs[0]]))
      .toEqual(blogs[0])
  })
})

describe('mostBlogs', () => {
  test('returns the correct author and blog amount', () => {
    const expectedObject = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(blogListHelper.mostBlogs(blogs))
      .toEqual(expectedObject)
  })

  test('returns the only author with blog amount of one if list only has one blog', () => {
    expect(blogListHelper.mostBlogs([blogs[0]]))
      .toEqual({
        author: blogs[0].author,
        blogs: 1
      })
  })

  test('returns empty object if parameter array is empty', () => {
    expect(blogListHelper.mostBlogs([])).toEqual({})
  })
})

describe('mostLikes', () => {
  test('returns the correct author and like amount', () => {
    const expectedObject = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(blogListHelper.mostLikes(blogs))
      .toEqual(expectedObject)
  })

  test('returns the only author with like amount of his single blog if list only has one blog', () => {
    expect(blogListHelper.mostLikes([blogs[0]]))
      .toEqual({
        author: blogs[0].author,
        likes: blogs[0].likes
      })
  })

  test('returns empty object if parameter array is empty', () => {
    expect(blogListHelper.mostLikes([])).toEqual({})
  })
})