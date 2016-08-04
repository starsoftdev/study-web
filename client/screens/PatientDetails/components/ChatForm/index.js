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
import $ from 'jquery'
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

  connect (nameSpace, cb) {
    let authData = this.props.authorization.authData
    //console.log(authData);
    if (authData) {
      if (!this.io) {
        this.io = io(`${HOST_URL}/${nameSpace}`)
        this.io.on('connect', () => {
          cb()
        })
      } else {
        cb()
      }
    } else {
      if (this.io) {
        this.io.disconnect()
        this.io = null
      }
    }
  }

  scrollMessContainer () {
    //console.log(ReactDOM.findDOMNode(this))
    let messContainer = $('#mess-container')
    if (messContainer.length > 0) {
      messContainer.scrollTop(messContainer[0].scrollHeight)
    }
  }

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
    const { setActiveChat, fetchTwilioMessages, joinTwilioChat } = this.props
    this.appDispatcher.register(function (payload) {
      if (payload.actionType === 'setActiveChat') {
        scope.connect(scope.namespace, () => {
          /*joinTwilioChat(scope.io, payload.data, (err, data, cb) => {
            cb(err, data)
          })*/

          setActiveChat(scope.io, payload.data, (err, data, cb) => {
            if (!err) {
              scope.open()
            }

            scope.io.on('notifyMessage', () => {
              fetchTwilioMessages(scope.io, {
                studyId: payload.data.studyId,
                patientId: payload.data.patientId
              }, (err, data, cb) => {
                scope.scrollMessContainer()
                cb(err, data)
              })
            })

            cb(err, data)
          })
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
    const { activeChat, saveTwilioMessage, fetchTwilioMessages } = this.props
    const value = this.refs.form.getValue()
    let options = {
      body: value.message,
      studyId: activeChat.data.studyId,
      patientId: activeChat.data.patientId,
      to: activeChat.data.phone
    }

    if (value) {
      saveTwilioMessage(this.io, options, (err, data, cb) => {
        if (!err) {
          fetchTwilioMessages(this.io, {
            studyId: data.studyId,
            patientId: data.patientId
          }, (err, data, cb) => {
            cb(err, data)
          })
        }

        cb(err, data)
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
            Chat with {this.props.activeChat.data.firstName + ' ' + this.props.activeChat.data.lastName}
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
  isSaving: state.savingTwilioMessage || state.fetchingTwilioMessages,
  activeChat: state.activeChat,
  twilioMessages: state.twilioMessages,
  fetchingTwilioMessages: state.fetchingTwilioMessages,
  savingTwilioMessage: state.savingTwilioMessage
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
