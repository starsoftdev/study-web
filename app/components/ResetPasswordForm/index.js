/**
*
* ResetPasswordForm
*
*/

import React from 'react';
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
    submitting: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

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

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form
        ref={(animatedForm) => {
          this.animatedForm = animatedForm;
        }}
        onSubmit={handleSubmit}
        className="form-login"
        data-formvalidation="true"
        data-view="fadeInUp"
      >
        <h2 className="main-heading">Reset Password</h2>
        <Field
          name="email"
          type="text"
          component={Input}
          placeholder="* Email"
          className="field-row"
          bsClass="form-control input-lg"
        />
        <div className="field-row">
          <input
            type="submit"
            value="submit"
            className="btn btn-default btn-block input-lg"
            disabled={submitting}
          />
        </div>
      </form>
    );
  }
}

export default ResetPasswordForm;
