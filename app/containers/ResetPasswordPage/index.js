/*
 *
 * ResetPasswordPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import ResetPasswordForm from '../../components/ResetPasswordForm';

import './styles.less';

import {
  clearResetPasswordSuccess,
  resetPasswordRequest,
} from './actions';

import {
  selectResetPasswordSuccess,
} from './selectors';

export class ResetPasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onSubmitForm: React.PropTypes.func,
    clearResetPasswordSuccess: React.PropTypes.func,
    resetForm: React.PropTypes.func,
    resetPasswordSuccess: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
  }

  render() {
    return (
      <div className="container">
        <ResetPasswordForm onSubmit={this.onSubmitForm} {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  resetPasswordSuccess: selectResetPasswordSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => dispatch(resetPasswordRequest(values)),
    resetForm: () => dispatch(reset('resetPassword')),
    clearResetPasswordSuccess: () => dispatch(clearResetPasswordSuccess()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);
