import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Blog } from './Blog'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'

describe('<SimpleBlog />', () => {
  it('renders the title, the author and the amount of likes of the blog', () => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      likes: 5,
      url: 'testurl',
      user: [{ name: 'User Name' }]
    }
    const addLikeToBlog = () => {}
    const classes = {}

    const wrapper = shallow(<Blog blog={blog} classes={classes} addLikeToBlog={addLikeToBlog} />)
    const panelSummary = wrapper.find(ExpansionPanelSummary).find(Typography)
    console.log(wrapper.debug())
  })
})