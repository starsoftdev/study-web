import React from 'react';
import { Link } from 'react-router';
import FormGroup from 'react-bootstrap/lib/FormGroup';

export class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  componentDidMount() {
    // TODO: find or implement analog of JQuery in-viewport in react
    this.animatedForm.classList.add('in-viewport', 'fadeInUp');
  }

  onSubmitForm (e) {
    e.preventDefault();

    this.props.handleSubmit({
      email: this.email.value,
      password: this.password.value
    })
  }

  render() {
    return (
      <form
        ref={(animatedForm) => {
          this.animatedForm = animatedForm;
        }}
        className="form-login"
        data-formvalidation="true"
        data-view="fadeInUp"
        onSubmit={this.onSubmitForm}
      >
        <h2 className="main-heading">ACCOUNT LOGIN</h2>
        <FormGroup>
          <input
            ref={(email) => {
              this.email = email;
            }}
            name="email" type="email"
            className="form-control input-lg"
            data-required="true"
            placeholder="* Email"
          />
        </FormGroup>
        <FormGroup>
          <input
            ref={(password) => {
              this.password = password;
            }}
            name="password"
            type="password"
            className="form-control input-lg"
            data-required="true"
            placeholder="* Password"
          />
        </FormGroup>
        <div className="field-row clearfix area">
          <div className="pull-left">
            <input type="checkbox" id="remember"/>
            <label htmlFor="remember">Remember Me</label>
          </div>
          <a href="/app/reset-password" className="link pull-right" title="Forgot Password?">
            Forgot Password?
          </a>
        </div>
        <FormGroup>
          <input type="submit" value="submit" className="btn btn-default btn-block input-lg"/>
        </FormGroup>
      </form>
    );
  }
}

export default LoginForm;
