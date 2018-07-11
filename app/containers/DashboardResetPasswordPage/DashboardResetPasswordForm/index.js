import React, { PropTypes } from 'react';
import { Field, reduxForm, touch } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Input from '../../../components/Input';
import LoadingSpinner from '../../../components/LoadingSpinner';
import formValidator, { fields } from './validator';
import { selectSyncErrorBool } from '../../../common/selectors/form.selector';

const formName = 'dashboardResetPasswordForm';
@reduxForm({ form: formName, validate: formValidator })

export class DashboardResetPasswordForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    updatePasswordProcess: PropTypes.object,
    handleSubmit: PropTypes.func,
    touchFields: PropTypes.func,
    formError: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm = (e) => {
    e.preventDefault();

    const { formError, touchFields } = this.props;
    if (formError) {
      touchFields();
      return;
    }
    this.props.handleSubmit();
  }


  render() {
    return (
      <form className="form-search selects-form clearfix" onSubmit={this.onSubmitForm}>
        <div className="fields-holder row">
          <div className="col custom-select no-left-padding">
            <Field
              name="userEmail"
              component={Input}
              placeholder="* Email"
            />
          </div>
        </div>

        <div className="fields-holder row second-row">
          <div className="col custom-select no-left-padding">
            <Field
              name="newPassword"
              component={Input}
              type="password"
              placeholder="* Password"
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

const mapStateToProps = createStructuredSelector({
  formError: selectSyncErrorBool(formName),
});

function mapDispatchToProps(dispatch) {
  return {
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardResetPasswordForm);
