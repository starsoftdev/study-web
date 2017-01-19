import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import { Field, reduxForm } from 'redux-form';
import loginFormValidator from './validator';

import Input from 'components/Input';

@reduxForm({
  form: 'login',
  validate: loginFormValidator,
})

export class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this)
  }

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  componentDidMount() {
    // TODO: find or implement analog of JQuery in-viewport in react
    this.animatedForm.classList.add('in-viewport', 'fadeInUp');
  }

  onChange (ev) {
    console.log('remember', ev.target.checked);
    this.checkbox.classList.toggle('jcf-unchecked');
    this.checkbox.classList.toggle('jcf-checked');
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
            <span
              className="jcf-checkbox jcf-unchecked"
              ref={(checkbox) => {
                this.checkbox = checkbox;
              }}
            >
              <span></span>
              <input
                type="checkbox"
                className="remember"
                onChange={this.onChange}
              />
            </span>
            <label htmlFor="remember">Remember Me</label>
          </div>
          <a href="/app/reset-password" className="link pull-right" title="Forgot Password?">
            Forgot Password?
          </a>
        </div>
        <div className="field-row">
          <input disabled={submitting} type="submit" value="submit" className="btn btn-default btn-block input-lg" />
        </div>
      </form>
    );
  }
}

export default LoginForm;
