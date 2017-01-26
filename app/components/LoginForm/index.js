import React from 'react';
import inViewport from 'in-viewport';
import { Field, reduxForm } from 'redux-form';
import loginFormValidator from './validator';
import { Alert } from 'react-bootstrap';

import Input from 'components/Input';

@reduxForm({
  form: 'login',
  validate: loginFormValidator,
})

export class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    loginError: React.PropTypes.any,
    handleSubmit: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.setVisible = this.setVisible.bind(this);
  }

  componentDidMount() {
    this.watcher = inViewport(this.animatedForm, this.setVisible);
  }

  componentWillUnmount() {
    this.watcher.dispose();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  toggleCheckbox() {
    this.checkbox.classList.toggle('jcf-unchecked');
    this.checkbox.classList.toggle('jcf-checked');
  }

  render() {
    const { handleSubmit, submitting, loginError } = this.props;

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
        {loginError &&
        <Alert bsStyle="danger">
          <p>The email or password is incorrect!</p>
        </Alert>
        }
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
                id="remember"
                onChange={this.toggleCheckbox}
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
