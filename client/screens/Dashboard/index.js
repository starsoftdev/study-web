import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class Dashboard extends React.Component {

  render () {
    return (
      <div>Dashboard Page For Authenticated Users</div>
    )
  }
}

export default connect(state => ({
}), {
})(Dashboard)
