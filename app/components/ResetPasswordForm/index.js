/**
 *
 * ResetPasswordForm
 *
 */

import React from 'react';
import { browserHistory } from 'react-router';
import inViewport from 'in-viewport';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import ReCAPTCHA from 'react-google-recaptcha';

import Input from '../../components/Input';
import { translate } from '../../../common/utilities/localization';
import resetPasswordFormValidator from './validator';

@reduxForm({
  form: 'resetPassword',
  validate: resetPasswordFormValidator,
})
class ResetPasswordForm extends React.Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func,
    clearResetPasswordSuccess: React.PropTypes.func,
    resetPasswordSuccess: React.PropTypes.bool,
    submitting: React.PropTypes.bool.isRequired,
    change: React.PropTypes.func,
    reCaptcha: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.setVisible = this.setVisible.bind(this);
    this.redirect = this.redirect.bind(this);
    this.onChange = this.onChange.bind(this);
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

  onChange(value) {
    this.props.change('reCaptcha', value);
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
    const { submitting, resetPasswordSuccess, reCaptcha } = this.props;
    const buttonValue = resetPasswordSuccess ? translate('corporate.page.resetPassword.resetPasswordForm.buttonValue1') :
      translate('corporate.page.resetPassword.resetPasswordForm.buttonValue2');
    const submitHandler = resetPasswordSuccess
      ? this.redirect
      : e => {
        e.preventDefault();
        if (!reCaptcha) {
          toastr.error('', translate('corporate.page.resetPassword.resetPasswordForm.recaptcha'));
          return;
        }
        this.props.handleSubmit();
        this.recaptcha.reset();
      };

    let formContent = (
      <div className="field-row clearfix area">
        <Field
          name="email"
          type="text"
          component={Input}
          placeholder={translate('corporate.page.resetPassword.resetPasswordForm.placeholder')}
          className="field-row"
          bsClass="form-control input-lg"
        />
        <Field
          name="reCaptcha"
          type="hidden"
          component={Input}
          className="field-row"
          bsClass="form-control input-lg"
        />
        <ReCAPTCHA
          ref={ref => {
            this.recaptcha = ref;
          }}
          sitekey={SITE_KEY}
          onChange={this.onChange}
          className="recaptcha-wrapper"
        />,
      </div>
    );

    if (resetPasswordSuccess) {
      formContent = (
        <p className="replace-text">{translate('corporate.page.resetPassword.resetPasswordForm.replaceText')} </p>
      );
    }

    return (
      <form
        ref={animatedForm => {
          this.animatedForm = animatedForm;
        }}
        onSubmit={submitHandler}
        className="form-login"
        data-formvalidation="true"
        data-view="fadeInUp"
      >
        <h2 className="main-heading">{translate('corporate.page.resetPassword.resetPasswordForm.header')}</h2>
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

const selector = formValueSelector('resetPassword');

const mapStateToProps = state => ({
  reCaptcha: selector(state, 'reCaptcha'),
});

function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change('resetPassword', name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
