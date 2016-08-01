import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import CalendarWidget from './components/CalendarWidget'

import './styles.less'

class Calendar extends React.Component {
  render () {
    return (
      <div className="calendar-page">
        <CalendarWidget />
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
