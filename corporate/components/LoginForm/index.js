import React from 'react';
import { Link } from 'react-router';
import inViewport from 'in-viewport';
import { Field, reduxForm, change, touch } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Alert from 'react-bootstrap/lib/Alert';
import ReCAPTCHA from 'react-google-recaptcha';
import { toastr } from 'react-redux-toastr';

import Input from '../../../app/components/Input';
import { selectLoginError, selectLoginFormSubmitState } from '../../../app/containers/App/selectors';
import loginFormValidator, { fields } from './validator';
import { selectSyncErrorBool, selectValues } from '../../../app/common/selectors/form.selector';
import { selectNewPassword } from '../../../app/containers/ResetPasswordPage/selectors';
import { translate } from '../../../common/utilities/localization';

const formName = 'login';
@reduxForm({
  form: formName,
  validate: loginFormValidator,
})
export class LoginForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    loginError: React.PropTypes.any,
    handleSubmit: React.PropTypes.func.isRequired,
    loginFormSubmitState: React.PropTypes.bool.isRequired,
    change: React.PropTypes.func,
    formError: React.PropTypes.bool.isRequired,
    touchFields: React.PropTypes.func.isRequired,
    formValues: React.PropTypes.object,
    loginPassword: React.PropTypes.string,
    newUser: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.setVisible = this.setVisible.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  componentDidMount() {
    this.watcher = inViewport(this.animatedForm, this.setVisible);
  }

  componentWillUnmount() {
    this.watcher.dispose();
  }

  onChange(value) {
    this.props.change('reCaptcha', value);
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  toggleCheckbox() {
    this.checkbox.classList.toggle('jcf-unchecked');
    this.checkbox.classList.toggle('jcf-checked');
  }

  submitLoginForm(e) {
    e.preventDefault();
    const { formError, touchFields, formValues, loginError } = this.props;
    const failedCount = loginError ? loginError.failedCount : 0;
    if (formError) {
      touchFields();
      return;
    } else if (failedCount >= 3 && !formValues.reCaptcha) {
      toastr.error('', translate('corporate.page.login.loginForm.reCaptchaError'));
      return;
    }
    // this.recaptcha.execute();
    this.props.handleSubmit();
    if (this.recaptcha) {
      this.recaptcha.reset();
    }
  }

  renderCaptcha() {
    const { loginError } = this.props;
    const failedCount = loginError ? loginError.failedCount : 0;
    if (failedCount >= 3) {
      return (
        <div className="field-row clearfix area">
          <Field
            name="reCaptcha"
            type="hidden"
            component={Input}
            className="field-row"
            bsClass="form-control input-lg"
          />
          <ReCAPTCHA
            ref={(ref) => { this.recaptcha = ref; }}
            sitekey={SITE_KEY}
            onChange={this.onChange}
            className="recaptcha-wrapper"
          />
        </div>
      );
    }

    return null;
  }

  render() {
    const { loginFormSubmitState, loginError, loginPassword, newUser } = this.props;
    const code = loginError ? loginError.code : null;
    const messageData = { newUser: (newUser ? '' : 'new') };

    return (
      <form
        ref={(animatedForm) => {
          this.animatedForm = animatedForm;
        }}
        className="form-login"
        data-formvalidation="true"
        data-view="fadeInUp"
        onSubmit={this.submitLoginForm}
      >
        <h2 className="main-heading">
          {translate('corporate.page.login.loginForm.header')}
        </h2>
        {code === 'LOGIN_FAILED' &&
          <Alert bsStyle="danger">
            <p>
              {translate('corporate.page.login.loginForm.loginFailedMessage')}
            </p>
          </Alert>
        }
        {code === 'USER_LOCKED' &&
          <Alert bsStyle="danger">
            <p>
              {translate('corporate.page.login.loginForm.loginLockedMessage')}
            </p>
          </Alert>
        }
        {loginPassword &&
          <div>
            <p>
              {translate('corporate.page.login.loginForm.newOrRestoredPasswordMessage', messageData)} <span id="new_password">{loginPassword}</span>
            </p>
            <p>
              {translate('corporate.page.login.loginForm.newOrRestoredPasswordWarning')}
            </p>
          </div>
        }
        <Field
          name="email"
          type="text"
          component={Input}
          placeholder={translate('corporate.page.login.loginForm.placeholder1')}
          className="field-row"
          bsClass="form-control input-lg"
        />
        <Field
          name="password"
          type="password"
          component={Input}
          placeholder={translate('corporate.page.login.loginForm.placeholder2')}
          className="field-row"
          bsClass="form-control input-lg"
        />
        <div className="field-row clearfix area">
          <div className="pull-left hidden">
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
            <label htmlFor="remember">
              {translate('corporate.page.login.loginForm.rememberLink')}
            </label>
          </div>
          <Link
            to="/reset-password"
            className="link pull-right"
          >
            {translate('corporate.page.login.loginForm.forgotPassword')}
          </Link>
        </div>
        {
          this.renderCaptcha()
        }
        <div className="field-row">
          <input
            disabled={loginFormSubmitState}
            type="submit"
            value={translate('corporate.page.login.loginForm.submitButtonText')}
            className="btn btn-default btn-block input-lg"
          />
        </div>
      </form>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  formError: selectSyncErrorBool(formName),
  formValues: selectValues(formName),
  loginError: selectLoginError(),
  loginPassword: selectNewPassword(),
  loginFormSubmitState: selectLoginFormSubmitState(),
});
function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
