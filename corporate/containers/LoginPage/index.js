/**
 * Login Page
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../../components/LoginForm';
import { loginRequest } from './actions';

export class LoginPage extends Component {

  static propTypes = {
    onSubmitForm: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);
  }

  render() {
    return (
      <div className="login-page-wrapper">
        <div className="container">
          <LoginForm onSubmit={this.onSubmitForm} />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => dispatch(loginRequest(values)),
  };
}

export default connect(null, mapDispatchToProps)(LoginPage);
