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
        <div className="container">
          <div className="row">
            {/*<StatsBar />*/}
          </div>
          <div className="row">
            <div className="col-sm-10">
              <SearchStudiesFormPanel />
            </div>
          </div>
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
