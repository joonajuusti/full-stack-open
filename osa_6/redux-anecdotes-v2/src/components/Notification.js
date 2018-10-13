import React from 'react'

class Notification extends React.Component {
  getNotification = () => {
    return this.props.store.getState().notification
  }

  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div>
        {
          this.getNotification() ?
            <div style={style}>
              {this.getNotification()}
            </div> : <div></div>
        }
      </div>
    )
  }
}

export default Notification
