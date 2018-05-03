/**
*
* ChangePasswordForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../../components/Input';
import changePasswordFormValidator from './validator';
import { translate } from '../../../common/utilities/localization';

@reduxForm(
  {
    form: 'change_password',
    fields: ['old_password', 'new_password', 'new_password_confirm', 'user_id'],
    validate: changePasswordFormValidator,
  })
class ChangePasswordForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    pristine: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit} className="form-lightbox">


        <div className="field-row">
          <strong className="label required"><label>{translate('corporate.page.profile.changePasswordForm.labelOldPassword')}</label></strong>
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
          <strong className="label required"><label>{translate('corporate.page.profile.changePasswordForm.labelNewPassword')}</label></strong>
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
          <strong className="label required"><label>{translate('corporate.page.profile.changePasswordForm.labelConfirmPassword')}</label></strong>
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
            value="UPDATE"
            className="btn btn-default"
            disabled={submitting}
          />
        </div>

      </form>
    );
  }
}

export default ChangePasswordForm;
