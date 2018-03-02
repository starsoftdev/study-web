/*
 *
 * DashboardResetPasswordPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import { DashboardResetPasswordForm } from './DashboardResetPasswordForm';
import { updatePassword } from './actions';
import { selectDashboardResetPasswordFormValues, selectDashboardResetPasswordProcess } from './selectors';

export class DashboardResetPasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    updatePasswordProcess: PropTypes.object,
    submitForm: PropTypes.func,
    formValues: PropTypes.object,
  };

  render() {
    return (
      <div className="container-fluid dashboard-portals">
        <Helmet title="Reset Password - StudyKIK" />
        <h2 className="main-heading">RESET PASSWORD</h2>
        <DashboardResetPasswordForm
          updatePasswordProcess={this.props.updatePasswordProcess}
          formValues={this.props.formValues}
          submitForm={this.props.submitForm}
        />
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  formValues: selectDashboardResetPasswordFormValues(),
  updatePasswordProcess: selectDashboardResetPasswordProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    submitForm: (values) => dispatch(updatePassword(values)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardResetPasswordPage);
