/**
*
* Global Patient Message Suite
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { change, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import formValidator from './validator';
import MessageItem from './MessageItem';
import CallItem from './CallItem';
import ChatForm from './ChatForm';

@reduxForm({ form: 'globalChat', validate: formValidator })
@connect(mapStateToProps, null)
class GlobalChatModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    helpName: React.PropTypes.string,
    currentUser: React.PropTypes.object,
    showModal: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
    handleSubmit: React.PropTypes.func,
    hasError: React.PropTypes.bool,
    formValues: React.PropTypes.object,
    change: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.handleStartChatting = this.handleStartChatting.bind(this);

    this.state = {
      openModal: false,
      readyForChat: false,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      openModal: newProps.showModal,
    });
  }

  handleClose() {
    this.props.closeModal();
    this.setState({
      readyForChat: false,
    });
  }

  handleStartChatting() {
    this.setState({
      readyForChat: true,
    });
  }

  loadItems() {
    // const limit = 10;
    // const offset = this.props.globalPMSPaginationOptions.page * 10;
    // this.props.fetchSitePatients(this.props.currentUser.id, offset, limit);
  }

  renderChatRoom() {
    return (
      <div className="chatroom">
        <section className="chat-area" id="chat-room1">
          <div
            className="scroll-holder"
            ref={(scrollable) => {
              this.scrollable = scrollable;
            }}
          >
            <article className="post-msg">
              {}
            </article>
          </div>
          <footer>
            <ChatForm
              selectedPatient={this.state.selectedPatient}
              sendStudyPatientMessages={[]}
            />
          </footer>
        </section>
      </div>
    );
  }

  renderPrepareRoom() {
    return (
      <div className="prepareroom">
        <div className="field-row">
          <textarea
            className="form-control test"
            placeholder="Type a message..."
            onChange={this.textAreaChange}
            ref={(textarea) => {
              this.textarea = textarea;
            }}
          />
        </div>
        <div className="field-row center">
          <Button onClick={this.handleStartChatting}>
            Start Chatting
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { readyForChat, openModal } = this.state;
    const title = readyForChat ? `Chatting with ${this.props.helpName}` : 'Live Chat';
    return (
      <Collapse
        dimension="height"
        in={openModal}
        timeout={250}
        className="global-chat-modal"
      >
        <div className="form-area">
          <div className="form-head">
            <strong className="title">{title}</strong>
            <a className="btn-close" onClick={this.handleClose}>
              <i className="glyphicon glyphicon-menu-down" />
            </a>
          </div>
          {
            readyForChat ? this.renderChatRoom() : this.renderPrepareRoom()
          }
        </div>
      </Collapse>
    );
  }
}

const mapStateToProps = createStructuredSelector({

});

function mapDispatchToProps(dispatch) {
  return {
    change: (field, value) => dispatch(change('globalChat', field, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalChatModal);
