import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import classnames from 'classnames';
const pure = require('../../../styles/pure');
const styles = require('./styles/Login');

@CSSModules(styles)
export default class Login extends Component {
  static propTypes = {
    createSession: PropTypes.func.isRequired,
    redirect: PropTypes.string.isRequired,
    replace: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.ensureNotLoggedIn(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.ensureNotLoggedIn(nextProps);
  }

  ensureNotLoggedIn(props) {
    const { isAuthenticated, replace, redirect } = props;

    if (isAuthenticated) {
      replace(redirect);
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    if (!password || !email) {
      return;
    }

    this.props.createSession({ email, password });
  }

  render() {
    return (
      <div className={classnames(styles.container, pure['pure-g'])}>
        <div className={styles.center}>
          <form className={classnames(pure['pure-form'], pure['pure-form-stacked'])}
            onSubmit={this.handleSubmit}>
            <fieldset>
              <input
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <button type="submit" className={styles.button}>Login</button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}
