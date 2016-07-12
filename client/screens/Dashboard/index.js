import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchAvailNumbers } from 'actions'

class Dashboard extends React.Component {
  static propTypes = {
    fetchAvailNumbers: PropTypes.func
  }

  componentDidMount () {
    this.props.fetchAvailNumbers({
      country: 'US',
      areaCode: '510',
      contains: '151055****'
    })
  }

  render () {
    return (
      <div>Dashboard Page For Authenticated Users</div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = {
  fetchAvailNumbers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
