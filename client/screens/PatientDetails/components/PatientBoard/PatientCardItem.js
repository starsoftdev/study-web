import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Glyphicon } from 'react-bootstrap'
import ReactDOM from 'react-dom'

import { setActiveChat } from 'actions'

export default class PatientCardItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    activeChat: PropTypes.object,
    setActiveChat: PropTypes.func
  }

  initChat (ev) {
    const { item, setActiveChat } = this.props
    setActiveChat({
      studyId: item.studyPatientCategory.studyId,
      patientId: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone
    })
  }

  render () {
    let scope = this
    const { item } = this.props
    return (
      <li data-id={item.id} id={item.id}>
        <div><strong>{item.firstName + ' ' + item.lastName}</strong></div>
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

const mapStateToProps = (state) => ({
  activeChat: state.activeChat
})
const mapDispatchToProps = {
  setActiveChat
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatientCardItem)
