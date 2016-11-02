/**
*
* ChatFrom
*
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';
import Button from 'react-bootstrap/lib/Button';
import Input from 'components/Input';

import formValidator from './validator';

import { setProcessingStatus } from 'containers/GlobalNotifications/actions';
import {
  selectProcessingStatus,
} from 'containers/GlobalNotifications/selectors';

import './styles.less';

@reduxForm({ form: 'chatPatient', validate: formValidator })

class ChatForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isSaving: PropTypes.any,
    handleSubmit: PropTypes.func,
    setProcessingStatus: PropTypes.func,
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <Field
            name="body"
            component={Input}
            componentClass="textarea"
            // disabled={isSaving}
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
  isSaving: selectProcessingStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    setProcessingStatus: (payload) => dispatch(setProcessingStatus(payload)),
  };
}

// export default ChatForm;

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
