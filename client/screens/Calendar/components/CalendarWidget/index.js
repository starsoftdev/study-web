import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import SchedulePatientModal from '../SchedulePatientModal'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
import 'react-big-calendar/lib/css/react-big-calendar.css'

class CalendarWidget extends React.Component {
  state = {
    isModalVisible: true,
  }

  currentDate = new Date(2015, 3, 1)

  handleCloseModal () {
    this.setState({
      isModalVisible: false,
    })
  }

  handleSubmit (data) {
    console.log(data)
  }

  render () {
    // const { submitting } = this.props
    const submitting = false

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
      <div className="calendar-box">
        <BigCalendar
          popup
          selectable
          events={myEventsList}
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
              this.setState({
                isModalVisible: true,
              })
            }
          }}
        />
        <SchedulePatientModal
          siteLocationOptions={[{label:'aa', value: 'aa'}, {label:'bb', value:'bb'}]}
          protocolOptions={[{label:'aa', value: 'aa'}, {label:'bb', value:'bb'}]}
          patientOptions={[{label:'aa', value: 'aa'}, {label:'bb', value:'bb'}]}
          onSubmit={this.handleSubmit.bind(this)}
          handleCloseModal={this.handleCloseModal.bind(this)}
          submitting={false}
          loading={false}
          visible={this.state.isModalVisible}
          initialValues={{am: 'AM'}}
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
