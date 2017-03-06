/*
 *
 * ResetPasswordPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { resetPasswordRequest } from './actions';
import ResetPasswordForm from '../../components/ResetPasswordForm';

import './styles.less';

export class ResetPasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    onSubmitForm: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
  }
  render() {
    return (
      <div className="container">
        <ResetPasswordForm onSubmit={this.onSubmitForm} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => dispatch(resetPasswordRequest(values)),
  };
}

export default connect(null, mapDispatchToProps)(ResetPasswordPage);
