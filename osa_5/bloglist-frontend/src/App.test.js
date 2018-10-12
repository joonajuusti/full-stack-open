import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import Login from './components/Login'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged in', () => {
    beforeAll(() => {
      app = mount(<App />)
    })
    
    it('renders the login form', () => {
      expect(app.find(Login).length).toBe(1)
    })

    it('renders no blogs', () => {
      expect(app.find(Blog).length).toBe(0)
    })
  })

  describe('when user is logged in', () => {
    beforeAll(() => {
      const user = {
        name: 'Test User',
        username: 'tester',
        token: 'stilldoesntmatter'
      }

      localStorage.setItem('loggedUser', JSON.stringify(user))

      app = mount(<App />)
    })

    it('renders all of the blogs', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toBe(blogService.blogs.length)
    })
  })

})