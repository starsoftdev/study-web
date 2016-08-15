import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Glyphicon } from 'react-bootstrap'
import Dispatcher from 'utils/dispatcher'
import ReactDOM from 'react-dom'

export default class PatientCardItem extends Component {
  static propTypes = {
    item: PropTypes.object
  }

  initChat (ev) {
    const appDispatcher = new Dispatcher()
    const { item } = this.props
    let params = {
      studyId: item.studyPatientCategory.studyId,
      patientId: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone
    }

    appDispatcher.dispatch({
      actionType: 'setActiveChat',
      data: params
    })
  }

  render () {
    let scope = this
    const { item } = this.props
    return (
      <li data-id={item.id} id={item.id}>
        <div>
          <strong>{item.firstName + ' ' + item.lastName}</strong>
        </div>
        <div>{item.email}</div>
        <div>{item.phone}</div>
        <div className="ui-parts">
          <Glyphicon
            className="open-chat"
            glyph="envelope"
            onClick={this.initChat.bind(this)}
          />
        </div>
      </li>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = {}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientCardItem)
