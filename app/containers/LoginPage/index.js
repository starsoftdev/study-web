/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LoginForm from '../../../corporate/components/LoginForm';
import { loginRequest } from './actions';
import { setNewPasswordRequest } from '../SetNewPasswordPage/actions';

export class LoginPage extends Component {

  static propTypes = {
    location: React.PropTypes.any,
    loginError: React.PropTypes.object,
    onSubmitForm: React.PropTypes.func,
    setNewPasswordRequest: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
    this.setNewPasswordRequest = this.props.setNewPasswordRequest.bind(this);
  }

  componentDidMount() {
    if (this.props.location.query.token) {
      this.setNewPasswordRequest(this.props.location.query.nu ? { newUser: 1 } : null);
    }
  }

  render() {
    const newUser = !!this.props.location.query.nu;
    return (
      <div className="login-page-wrapper">
        <div className="container">
          <LoginForm onSubmit={this.onSubmitForm} newUser={newUser} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => dispatch(loginRequest(values)),
    setNewPasswordRequest: (isNewUser) => dispatch(setNewPasswordRequest(isNewUser)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
