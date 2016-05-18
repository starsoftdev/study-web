import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {
  render () {
    return (
      <div>Landing Page</div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
