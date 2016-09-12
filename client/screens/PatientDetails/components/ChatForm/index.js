import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import {
  fetchTwilioMessages,
  saveTwilioMessage,
  setActiveChat,
  unsetActiveChat,
  joinTwilioChat,
  leaveTwilioChat
} from 'actions'
import { isValidCurrency, strToFloat } from 'utils/number'
import Dispatcher from 'utils/dispatcher'
//import LoadingResults from 'components/LoadingResults'

import _ from 'lodash'
import t from 'tcomb-form'
import './styles.less'

const TCombForm = t.form.Form

let formData = {
  message: ''
}

const schema = t.struct({
  message: t.maybe(t.String)
})

const layout = (locals) => {
  return (
    <div className="form-group">
      {locals.inputs.message}
    </div>
  )
}

const options = {
  template: layout,
  auto: 'none',
  fields: {
    message: {
      type: 'textarea',
      attrs: {
        autoFocus: true,
        rows: 2,
        onBlur: () => {}
      }
    }
  }
}

class ChatForm extends React.Component {
  constructor (props) {
    super(props)
    this.namespace = 'nsp'
    this.appDispatcher = new Dispatcher()
    this.state = {
      showModal: false,
      messages: null
    }
  }

  static propTypes = {
    authorization: PropTypes.any,
    socket: PropTypes.any,
    isSaving: PropTypes.bool,
    showModal: PropTypes.bool,
    activeChat: PropTypes.object,
    setActiveChat: PropTypes.func,
    unsetActiveChat: PropTypes.func,
    joinTwilioChat: PropTypes.func,
    leaveTwilioChat: PropTypes.func,
    twilioMessages: PropTypes.object,
    fetchTwilioMessages: PropTypes.func,
    saveTwilioMessage: PropTypes.func,
    fetchingTwilioMessages: PropTypes.bool,
    savingTwilioMessage: PropTypes.bool
  }

  scrollMessContainer () {}

  close () {
    let scope = this
    const { activeChat, leaveTwilioChat, unsetActiveChat } = scope.props
    scope.setState({ showModal: false }, () => {
      /*leaveTwilioChat(scope.io, activeChat.data, (err, data, cb) => {
        cb(err, data)
      })*/
      unsetActiveChat()
    })
  }

  open () {
    this.setState({ showModal: true })
  }

  componentDidMount () {
    let scope = this
    const { setActiveChat, fetchTwilioMessages, joinTwilioChat, socket } = this.props
    this.appDispatcher.register(function (payload) {
      if (payload.actionType === 'setActiveChat') {

        setActiveChat(scope.props.socket, payload.data, (err, data, cb) => {
          if (!err) {
            scope.open()
          }

          /*joinTwilioChat(scope.io, payload.data, (err, data, cb) => {
           cb(err, data)
           })*/

          if (!_.isEmpty(scope.props.socket)) {
            scope.props.socket.on('notifyMessage', () => {
              fetchTwilioMessages(scope.io, {
                studyId: payload.data.studyId,
                patientId: payload.data.patientId
              }, (err, data, cb) => {
                scope.scrollMessContainer()
                cb(err, data)
              })
            })
          } else {
            console.error('problem with  socket connection')
          }

          cb(err, data)
        })
      }
    })
  }

  componentWillMount () {
    //..
  }

  componentWillReceiveProps (nextProps) {
    const { activeChat } = nextProps
    if (!_.isEmpty(activeChat.data)) {}
  }

  componentDidUpdate (prevProps, prevState) {
    this.scrollMessContainer()
  }

  handleSubmit (ev) {
    ev.preventDefault()
    const { activeChat, saveTwilioMessage, fetchTwilioMessages, socket } = this.props
    const value = this.refs.form.getValue()
    let options = {
      body: value.message,
      studyId: activeChat.data.studyId,
      patientId: activeChat.data.patientId,
      to: activeChat.data.phone
    }

    if (value) {
      saveTwilioMessage(socket, options, (err, data, cb) => {
        if (!err) {
          fetchTwilioMessages(socket, {
            studyId: data.studyId,
            patientId: data.patientId
          }, (err, data, cb) => {
            cb(err, data)
          })
        } else {
          cb(err, data)
        }
      })
    }
  }

  render () {
    const { isSaving } = this.props
    const listMessages =
      (this.props.twilioMessages.messages.length) ? this.props.twilioMessages.messages.map((item, index) => (
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
            Chat with {this.props.activeChat.data.firstName + (this.props.activeChat.data.lastName ? ' ' + this.props.activeChat.data.lastName : '')}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="form-green chat-form"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <fieldset>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group messages" id="mess-container">
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
                </div>
              </div>
            </fieldset>
          </form>
        </Modal.Body>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  authorization: state.authorization,
  isSaving: state.fetchingTwilioMessages,
  activeChat: state.activeChat,
  twilioMessages: state.twilioMessages,
  fetchingTwilioMessages: state.fetchingTwilioMessages,
  savingTwilioMessage: state.savingTwilioMessage,
  socket: state.socket
})

const mapDispatchToProps = {
  fetchTwilioMessages,
  saveTwilioMessage,
  setActiveChat,
  unsetActiveChat,
  joinTwilioChat,
  leaveTwilioChat
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatForm)
