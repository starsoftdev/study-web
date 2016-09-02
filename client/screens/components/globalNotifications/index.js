const ReactToastr = require('react-toastr')
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { displayNotification } from 'actions'
import { resetNotification } from 'actions'

let { ToastContainer } = ReactToastr
let ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation)

import './styles.less'

class GlobalNotifications extends React.Component {
  static propTypes = {
    displayNotification: PropTypes.func,
    resetNotification: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.addAlert = this.addAlert.bind(this)
  }

  componentDidMount () {}

  componentWillReceiveProps (nextprops) {
    if (this.props.newNotification.event_params !== nextprops.newNotification.event_params &&
      nextprops.newNotification.event_params !== '') {
      this.addAlert(nextprops.newNotification)
      //this.props.resetNotification()
    }
  }

  render () {
    return (
      <ToastContainer toastMessageFactory={ToastMessageFactory} ref="container"
                      className="toast-container toast-top-right" />
    )
  }

  addAlert (data) {
    const message =
      'entity_ref: ' + data.entity_ref + '. ' + data.event_params

    this.refs.container.success(
      message,
      data.event,
      {
        closeButton: false,
        timeOut: 7000,
        extendedTimeOut: 20000
      }
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newNotification: state.notification.newNotification
  }
}

const mapDispatchToProps = {
  displayNotification,
  resetNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalNotifications)
