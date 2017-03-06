/**
*
* ResetPasswordForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../../components/Input';
import resetPasswordFormValidator from './validator';
import { FormGroup, Col } from 'react-bootstrap';

@reduxForm({
  form: 'resetPassword',
  validate: resetPasswordFormValidator,
})
class ResetPasswordForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        onSubmit={handleSubmit}
        className="form-login"
        data-formvalidation="true"
        data-view="fadeInUp"
      >
        <h2 className="main-heading">Reset Password</h2>
        <Field
          name="email"
          type="text"
          component={Input}
          placeholder="* Email"
          className="field-row"
          bsClass="form-control input-lg"
        />
        <div className="field-row">
          <input
            type="submit"
            value="submit"
            className="btn btn-default btn-block input-lg"
            disabled={submitting}
          />
        </div>
      </form>
    );
  }
}

export default ResetPasswordForm;
