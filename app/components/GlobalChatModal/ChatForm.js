/**
*
* ChatFrom
*
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, reset } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import ChatText from '../../components/Input/ChatText';

import formValidator from './validator';
const formName = 'globalChatForm';

@reduxForm({ form: formName, validate: formValidator })

class ChatForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.object,
    isSaving: PropTypes.any,
    setProcessingStatus: PropTypes.func,
    handleSubmit: PropTypes.func,
    reset: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(message) {
    const { /* selectedPatient, sendStudyPatientMessages, currentUser, */ reset } = this.props;
    // const options = {
    //   currentUserId: currentUser.id,
    //   body: message.body,
    //   studyId: selectedPatient.study_id,
    //   patientId: selectedPatient.id,
    //   to: selectedPatient.phone,
    // };

    // sendStudyPatientMessages(options, (err, data) => { // eslint-disable-line
    // });
    console.log('message', message);
    reset();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.sendMessage)}>
        <fieldset>
          <Field
            name="body"
            component={ChatText}
            className="form-control"
            placeholder="Type a message..."
            noLimit
          />
          <Button type="submit">
            Send
          </Button>
        </fieldset>
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    reset: () => dispatch(reset(formName)),
  };
}

// export default ChatForm;

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
