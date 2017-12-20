import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';

import Input from '../Input/index';
import formValidator from './validator';
const formName = 'PatientDetailModal.Email';

@reduxForm({
  form: formName,
  validate: formValidator,
})
@connect(null, null)
class EmailSectionSendForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: React.PropTypes.func.isRequired,
    active: React.PropTypes.any,
    submitEmailBlast: React.PropTypes.func.isRequired,
    switchCompose: React.PropTypes.func.isRequired,
    noBackBtn: React.PropTypes.bool,
  };

  render() {
    const { active, submitEmailBlast, switchCompose, noBackBtn } = this.props;
    return (
      <Form onSubmit={submitEmailBlast} className={classNames('item emails-info', { active })}>
        <div className="emails-info-holder">
          <div className="sender-field-holder">
            <div className="sender-field-prev">
              From
            </div>
            <Field
              name="email"
              component={Input}
              bsClass="form-control sender"
              className="sender-field"
              type="text"
              placeholder="Enter your email address"
            />
          </div>
          <Field
            name="subject"
            component={Input}
            bsClass="form-control subject"
            type="text"
            placeholder="Subject"
          />
          <Field
            name="message"
            component={Input}
            componentClass="textarea"
            className="message-box"
            bsClass="form-control"
            placeholder="Type message..."
          />
        </div>
        <div className="textarea">
          {!noBackBtn &&
            <input type="button" value="back" className="btn btn-gray-outline left" onClick={switchCompose} />
          }
          <input type="submit" value="Send" className="btn btn-default right" />
        </div>
      </Form>
    );
  }
}

export default EmailSectionSendForm;
