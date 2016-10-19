/**
*
* ChatFrom
*
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Input from 'components/Input';

import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';

import {
  selectChat,
} from 'containers/PatientDatabasePage/selectors';
import {
  selectSocket,
  selectProcessingStatus,
} from 'containers/GlobalNotifications/selectors';
import {
  fetchStudyPatientMessages,
  setProcessingStatus,
} from 'containers/GlobalNotifications/actions';

import './styles.less';

@reduxForm({ form: 'chatPatient', validate: formValidator })

class ChatForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isSaving: PropTypes.any,
    handleSubmit: PropTypes.func,
    fetchStudyPatientMessages: PropTypes.func,
    setProcessingStatus: PropTypes.func,
    socket: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.fetchStudyPatientMessages = this.fetchStudyPatientMessages.bind(this);

    this.state = {
      twilioMessages : [],
    };
  }

  componentDidMount() {
    this.fetchStudyPatientMessages(this.props);
  }

  fetchStudyPatientMessages(props) {
    const scrollable = this.refs.scrollable;
    const inputContainer = this.refs.inputContainer;
    this.props.fetchStudyPatientMessages({
      studyId: props.chat.details.study_id,
      patientId:  props.chat.details.id,
      cb: (err, data) => {
        if (!err) {
          if (this.state.twilioMessages !== data.messages) {
            this.setState({ twilioMessages: data.messages }, () => {
              scrollable.scrollTop = scrollable.scrollHeight;
              inputContainer.childNodes[0].childNodes[0].value = '';
            });
          }
        } else {
          console.log(err);
        }
        this.props.setProcessingStatus({ status: false });
      },
    });
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps', newProps);
    this.props.socket.on('notifyMessage', () => {
      console.log('notifyMessage');
      this.fetchStudyPatientMessages(newProps);
    });
  }

  componentDidUpdate() {
  }

  render() {
    const { isSaving, handleSubmit } = this.props;
    const listMessages =
      (this.state.twilioMessages.length) ? this.state.twilioMessages.map((item, index) => (
        <span
          key={item.twilioTextMessage.sid}
          className={`message ${item.twilioTextMessage.direction}`}
        >
        {item.twilioTextMessage.body}
      </span>
      )) : 'in this chat, are no posts';

    return (
      <div className="">
        <form
          className="form-green chat-form"
          onSubmit={handleSubmit}
        >
          <fieldset>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group messages" id="mess-container" ref="scrollable">
                  {listMessages}
                </div>
                <div className="row form-group">
                  <div className="field col-sm-12" ref="inputContainer">
                    <Field
                      name="body"
                      component={Input}
                      type="text"
                      disabled={isSaving}
                    />
                  </div>
                </div>
                <div className="form-group pull-right">
                  <button type="submit" className="btn btn-default btn-add-row" disabled={isSaving}>
                    {isSaving
                      ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-patient" /></span>
                      : <span>Submit</span>
                    }
                  </button>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  chat: selectChat(),
  socket: selectSocket(),
  isSaving: selectProcessingStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchStudyPatientMessages: (payload) => dispatch(fetchStudyPatientMessages(payload)),
    setProcessingStatus: (payload) => dispatch(setProcessingStatus(payload)),
  };
}

// export default ChatForm;

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
