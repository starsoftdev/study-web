import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SearchStudiesFormPanel from './components/SearchStudiesFormPanel'
import StatsBar from './components/StatsBar'

import './styles.less'

class Dashboard extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="dashboard">
        <div className="container-fluid">
          <StatsBar />
          <SearchStudiesFormPanel />
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
