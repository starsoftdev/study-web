/**
*
* ChangeTemporaryPasswordForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import Input from '../../components/Input';
import changeTemporaryPasswordFormValidator from './validator';

@reduxForm(
  {
    form: 'change_password',
    fields: ['old_password', 'new_password', 'new_password_confirm', 'user_id'],
    validate: changeTemporaryPasswordFormValidator,
  })
class ChangeTemporaryPasswordForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
  };

  render() {
    const { handleSubmit } = this.props; // eslint-disable-line
    return (
      <form onSubmit={handleSubmit} className="form-lightbox">
        <div className="field-row">
          <strong className="label required"><label>TEMPORARY PASSWORD</label></strong>
          <Field
            name="old_password"
            component={Input}
            disabled="true"
            type="password"
            placeholder=""
            className="field"
          />
        </div>
        <div className="field-row">
          <strong className="label required"><label>NEW PASSWORD</label></strong>
          <Field
            name="new_password"
            component={Input}
            disabled="true"
            type="password"
            placeholder=""
            className="field"
          />
        </div>
        <div className="field-row">
          <strong className="label required"><label>CONFIRM PASSWORD</label></strong>
          <Field
            name="new_password_confirm"
            component={Input}
            disabled="true"
            type="password"
            placeholder=""
            className="field"
          />
        </div>
        <div className="btn-block text-right">
          <input
            type="submit"
            value="SUBMIT"
            className="btn btn-default"
          />
        </div>
      </form>
    );
  }
}

export default ChangeTemporaryPasswordForm;
