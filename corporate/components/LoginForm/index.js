import React from 'react';
import { Link } from 'react-router';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import { Field, reduxForm } from 'redux-form';
import loginFormValidator from './validator';

import Input from 'components/Input';

@reduxForm({
  form: 'login',
  validate: loginFormValidator,
})

export class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  componentDidMount() {
    // TODO: find or implement analog of JQuery in-viewport in react
    this.animatedForm.classList.add('in-viewport', 'fadeInUp');
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        ref={(animatedForm) => {
          this.animatedForm = animatedForm;
        }}
        className="form-login"
        data-formvalidation="true"
        data-view="fadeInUp"
        onSubmit={handleSubmit}
      >
        <h2 className="main-heading">ACCOUNT LOGIN</h2>
        <Field
          name="email"
          type="text"
          component={Input}
          placeholder="* Email"
          className="field-row"
          bsClass="form-control input-lg"
        />
        <Field
          name="password"
          type="password"
          component={Input}
          placeholder="* Password"
          className="field-row"
          bsClass="form-control input-lg"
        />
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
          <input disabled={submitting} type="submit" value="submit" className="btn btn-default btn-block input-lg"/>
        </FormGroup>
      </form>
    );
  }
}

export default LoginForm;
