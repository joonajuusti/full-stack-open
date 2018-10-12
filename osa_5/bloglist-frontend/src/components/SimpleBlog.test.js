import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders the title, the author and the amount of likes of the blog', () => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      likes: 5
    }
    const onClick = () => {}

    const wrapper = shallow(<SimpleBlog blog={blog} onClick={onClick} />)
    const infoDiv = wrapper.find('.info')
    const likesDiv = wrapper.find('.likes')

    expect(infoDiv.text()).toContain(blog.title)
    expect(infoDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking like button twice invokes onClick method twice', () => {
    const mockHandler = jest.fn()
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      likes: 5
    }

    const wrapper = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const button = wrapper.find('button')
    
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})