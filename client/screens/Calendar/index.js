import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import './styles.less'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
import 'react-big-calendar/lib/css/react-big-calendar.css'

class Calendar extends React.Component {
  render () {
    const myEventsList = [
      {
        'title': 'All Day Event',
        'allDay': true,
        'start': new Date(2015, 3, 0),
        'end': new Date(2015, 3, 0)
      },
      {
        'title': 'Long Event',
        'start': new Date(2015, 3, 7),
        'end': new Date(2015, 3, 10)
      }
    ]

    return (
      <div className="container">
        <div className="calendar-box">
          <BigCalendar
            popup
            events={myEventsList}
            defaultDate={new Date(2015, 3, 1)}
          />
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
)(Calendar)
