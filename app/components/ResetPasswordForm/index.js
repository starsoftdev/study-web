/**
*
* ResetPasswordForm
*
*/

import React from 'react';
import { browserHistory } from 'react-router';
import inViewport from 'in-viewport';
import { Field, reduxForm } from 'redux-form';
import Input from '../../components/Input';
import resetPasswordFormValidator from './validator';

@reduxForm({
  form: 'resetPassword',
  validate: resetPasswordFormValidator,
})
class ResetPasswordForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func,
    clearResetPasswordSuccess: React.PropTypes.func,
    resetPasswordSuccess: React.PropTypes.bool,
    submitting: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.setVisible = this.setVisible.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  componentDidMount() {
    this.watcher = inViewport(this.animatedForm, this.setVisible);
  }

  componentWillReceiveProps(newProps) {
    const { resetForm } = this.props;
    if (newProps.resetPasswordSuccess) {
      resetForm();
    }
  }

  componentWillUnmount() {
    const { clearResetPasswordSuccess } = this.props;
    this.watcher.dispose();
    clearResetPasswordSuccess();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  redirect(ev) {
    ev.preventDefault();
    browserHistory.push('/login');
  }

  render() {
    const { handleSubmit, submitting, resetPasswordSuccess } = this.props;
    const buttonValue = (resetPasswordSuccess) ? 'back to login' : 'submit';
    const submitHandler = (resetPasswordSuccess) ? this.redirect : handleSubmit;
    let formContent = (<Field
      name="email"
      type="text"
      component={Input}
      placeholder="* Email"
      className="field-row"
      bsClass="form-control input-lg"
    />);

    if (resetPasswordSuccess) {
      formContent =
        (<p className="replace-text">
          We've sent password reset instructions to your email. Check your inbox and follow the link.
        </p>);
    }

    return (
      <form
        ref={(animatedForm) => {
          this.animatedForm = animatedForm;
        }}
        onSubmit={submitHandler}
        className="form-login"
        data-formvalidation="true"
        data-view="fadeInUp"
      >
        <h2 className="main-heading">Reset Password</h2>
        {formContent}
        <div className="field-row">
          <input
            type="submit"
            value={buttonValue}
            className="btn btn-default btn-block input-lg"
            disabled={submitting}
          />
        </div>
      </form>
    );
  }
}

export default ResetPasswordForm;
