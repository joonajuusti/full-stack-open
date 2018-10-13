import React from 'react'
import { filterChanging } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = event => {
    this.props.store.dispatch(filterChanging(event.target.value))
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default Filter