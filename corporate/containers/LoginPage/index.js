import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import LoginForm from '../../components/LoginForm';
import { loginRequest } from './actions';
import { selectLoginError } from '../../../app/containers/App/selectors';

import './styles.less';

export class LoginPage extends Component {

  static propTypes = {
    loginError: React.PropTypes.object,
    onSubmitForm: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onSubmitForm = this.props.onSubmitForm.bind(this);

    this.state = {
      loginError: null
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.loginError && newProps.loginError.code === 'LOGIN_FAILED') {
      this.setState({loginError: true});
    }
  }

  render() {
    const { loginError } = this.state;
    return (
      <div className="login-page-wrapper">
        <div className="container">
          <LoginForm onSubmit={this.onSubmitForm} loginError={loginError}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loginError: selectLoginError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: (values) => dispatch(loginRequest(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
