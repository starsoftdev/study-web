import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import StatsItem from './StatsItem'

import styles from './styles.less'

class StatsBar extends React.Component {
  render () {
    const patientSignups = {
      headerLabel: 'PATIENT SIGN UPS',
      headerValue: 119,
      firstLabel: 'Today',
      firstValue: 94,
      secondLabel: 'Yesterday',
      secondValue: 25,
    }
    return (
      <div className="stats-bar">
        <div className="row">
          <StatsItem data={patientSignups} />
          <StatsItem data={patientSignups} />
          <StatsItem data={patientSignups} />
          <StatsItem data={patientSignups} />
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
)(StatsBar)
