import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';

import Input from '../../../components/Input';
import LoadingSpinner from '../../../components/LoadingSpinner';
import formValidator from './validator';

@reduxForm({ form: 'dashboardResetPasswordForm', validate: formValidator })

export class DashboardResetPasswordForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    updatePasswordProcess: PropTypes.object,
    handleSubmit: PropTypes.func,
    submitForm: PropTypes.func,
    formValues: PropTypes.object,
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    console.log('formValues: ', this.props.formValues);
    this.props.submitForm(this.props.formValues);
  }


  render() {
    return (
      <form className="form-search selects-form clearfix" onSubmit={this.props.handleSubmit(this.props.submitForm)}>
        <div className="fields-holder row">
          <div className="col custom-select no-left-padding">
            <Field
              name="userEmail"
              component={Input}
              placeholder="User's email"
            />
          </div>
        </div>

        <div className="fields-holder row second-row">
          <div className="col custom-select no-left-padding">
            <Field
              name="newPassword"
              component={Input}
              type="password"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="fields-holder row second-row">
          <div className="pull-left col custom-select no-left-padding">
            <button type="submit" className="btn btn-default">
              {this.props.updatePasswordProcess.submitting
                ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                : <span>Submit</span>
              }
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default DashboardResetPasswordForm;
