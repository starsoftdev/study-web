import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'

import { SchedulePatientModalType } from 'constants'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
import 'react-big-calendar/lib/css/react-big-calendar.css'

class CalendarWidget extends React.Component {
  static propTypes = {
    schedules: PropTypes.array.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
  }

  currentDate = new Date()

  render () {
    const eventsList = this.props.schedules.map(s => {
      return {
        'data': s,
        'title': s.patient.firstName + ' ' + s.patient.lastName + ' ' + moment(s.time).format('h:mm A'),
        'start': s.time,
        'end': s.time,
      }
    })

    return (
      <div className="calendar-box">
        <BigCalendar
          popup
          selectable
          events={eventsList}
          defaultDate={this.currentDate}
          onNavigate={(date)=>{
            this.currentDate = date
          }}
          eventPropGetter={(event, start, end, isSelected)=>{
            return {
              style: {
                color: 'gray',
                backgroundColor: '#f3f3f3'
              }
            }
          }}
          onSelectSlot={({start, end, slots})=>{
            if (slots.length === 1 && moment(this.currentDate).month() === moment(start).month()) {
              this.props.handleOpenModal(SchedulePatientModalType.CREATE, {selectedDate: start})
            }
          }}
          onSelectEvent={(event) => {
            this.props.handleOpenModal(SchedulePatientModalType.UPDATE, event)
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarWidget)
