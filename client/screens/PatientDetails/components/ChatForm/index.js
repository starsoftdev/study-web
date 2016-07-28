import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { Modal, Button } from 'react-bootstrap'
import { fetchTwilioMessages, saveTwilioMessage, unsetActiveChat } from 'actions'
import { isValidCurrency, strToFloat } from 'utils/number'
import LoadingResults from 'components/LoadingResults'

import _ from 'lodash'
import t from 'tcomb-form'

import './styles.less'

const TCombForm = t.form.Form

let formData = {
  message: '',
}

const schema = t.struct({
  message: t.maybe(t.String)
})

const layout = function (locals) {
  return (
    <fieldset>
      <div className="row">
        <div className="col-md-12">
          {locals.inputs.message}
        </div>
      </div>
    </fieldset>
  )
}

const options = {
  template: layout,
  auto: 'none',
  fields: {
    message: {
      type: 'textarea',
      attrs: {
        rows: 2
      }
    }
  }
}

class ChatForm extends React.Component {
  static propTypes = {
    isSaving: PropTypes.bool,
    showModal: PropTypes.bool,
    activeChat: PropTypes.object,
    unsetActiveChat: PropTypes.func,
    twilioMessages: PropTypes.object,
    fetchTwilioMessages: PropTypes.func,
    saveTwilioMessage: PropTypes.func,
    fetchingTwilioMessages: PropTypes.bool,
    savingTwilioMessage: PropTypes.bool
  }

  state = {
    showModal: false,
    messages: null
  }

  close () {
    const { unsetActiveChat } = this.props
    this.setState({ showModal: false }, () => {
      unsetActiveChat()
    })
  }

  open () {
    this.setState({ showModal: true })
  }

  ID () {
    return '_' + Math.random().toString(36).substr(2, 9)
  }

  componentDidMount () {
    //..
  }

  componentWillMount () {
    //..
  }

  componentWillReceiveProps (nextProps) {
    const { activeChat } = nextProps
    if (!_.isEmpty(activeChat.data)) {
      this.open()
    }
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const { activeChat, saveTwilioMessage, fetchTwilioMessages } = this.props
    const value = this.refs.form.getValue()

    if (value) {
      saveTwilioMessage({
        body: value.message,
        studyId: activeChat.data.studyId,
        patientId: activeChat.data.patientId
      }, (err, payload) => {
        if (err) {
          console.error(err)
        } else {
          fetchTwilioMessages({
            studyId: payload.studyId,
            patientId: payload.patientId
          })
        }
      })
    }
  }

  render () {
    let scope = this
    const { isSaving } = scope.props
    const listMessages =
      (scope.props.twilioMessages.messages.length) ? scope.props.twilioMessages.messages.map((item, index) => (
      <span
        key={item.twilioTextMessage.sid}
        className={'message ' + item.twilioTextMessage.direction}
      >
        {item.twilioTextMessage.body}
      </span>
    )) : ''

    return (
      <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Chat with {this.props.activeChat.data.firstName + ' ' + this.props.activeChat.data.lastName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="form-green chat-form"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <div className="messages">
              {listMessages}
            </div>
            <TCombForm
              ref="form"
              type={schema}
              options={options}
              value={formData}
            />
            <div className="form-group pull-right">
              <Button
                type="submit"
                className=""
                bsStyle="primary"
                disabled={isSaving}
              >
                {isSaving ? <i className="fa fa-repeat fa-spin" /> : 'Send'}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  isSaving: state.savingTwilioMessage || state.fetchingTwilioMessages,
  activeChat: state.activeChat,
  twilioMessages: state.twilioMessages,
  fetchingTwilioMessages: state.fetchingTwilioMessages,
  savingTwilioMessage: state.savingTwilioMessage
})

const mapDispatchToProps = {
  fetchTwilioMessages,
  saveTwilioMessage,
  unsetActiveChat
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatForm)
