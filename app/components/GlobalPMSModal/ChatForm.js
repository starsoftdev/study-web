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

import { setProcessingStatus } from '../../containers/GlobalNotifications/actions';

import {
  selectProcessingStatus,
} from '../../containers/GlobalNotifications/selectors';

import {
  selectCurrentUser,
} from '../../containers/App/selectors';
import { translate } from '../../../common/utilities/localization';

const formName = 'chatPatient';

@reduxForm({ form: formName, validate: formValidator })

class ChatForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.object,
    clientCredits: PropTypes.object,
    isSaving: PropTypes.any,
    setProcessingStatus: PropTypes.func,
    handleSubmit: PropTypes.func,
    selectedPatient: PropTypes.object,
    sendStudyPatientMessages: PropTypes.func,
    reset: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(message) {
    const { selectedPatient, sendStudyPatientMessages, currentUser, reset } = this.props;
    const options = {
      currentUserId: currentUser.id,
      isProxy: currentUser.isProxy,
      body: message.body,
      studyId: selectedPatient.study_id,
      patientId: selectedPatient.id,
      to: selectedPatient.phone,
    };

    sendStudyPatientMessages(options, (err, data) => { // eslint-disable-line
    });
    reset();
  }

  render() {
    const { handleSubmit, clientCredits, selectedPatient } = this.props;
    const disabled = (clientCredits.details.customerCredits === 0 || clientCredits.details.customerCredits === null);
    const unsubscribed = (selectedPatient) ? selectedPatient.unsubscribed : null;
    return (
      <Form onSubmit={handleSubmit(this.sendMessage)}>
        <fieldset>
          <Field
            name="body"
            component={ChatText}
            className="form-control"
            placeholder={translate('portals.component.globalPMSModal.chatForm.messagePlaceholder')}
            maxLength="160"
            disabled={disabled || unsubscribed || this.props.selectedPatient.id <= 0}
          />
          <Button type="submit" disabled={disabled || unsubscribed || this.props.selectedPatient.id <= 0}>
            {translate('portals.component.globalPMSModal.chatForm.sendBtn')}
          </Button>
        </fieldset>
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  isSaving: selectProcessingStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    setProcessingStatus: (payload) => dispatch(setProcessingStatus(payload)),
    reset: () => dispatch(reset(formName)),
  };
}

// export default ChatForm;

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
