import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Home extends React.Component {
  render () {
    return (
      <div>
        <div>Landing Page</div>
        <Link to="/login">
          <span>Login</span>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
