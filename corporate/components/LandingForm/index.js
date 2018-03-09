import React, { PropTypes } from 'react';
import inViewport from 'in-viewport';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { blur, change, Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import Alert from 'react-bootstrap/lib/Alert';

import Input from '../../../app/components/Input';
import mixIntlTelInput from '../../../app/components/Input/MixIntlTelInput';
import landingFormValidator from './validator';
import { normalizePhoneDisplay, formatPhone } from '../../../app/common/helper/functions';
import {
  patientSubscriptionError,
} from '../../../app/containers/App/actions';

const formName = 'landing';

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  blur: (field, value) => dispatch(blur(formName, field, value)),
  change: (name, value) => dispatch(change(formName, name, value)),
  patientSubscriptionError: (params) => dispatch(patientSubscriptionError(params)),
});

@reduxForm({
  form: formName,
  validate: landingFormValidator,
  onSubmitFail: (errors, dispatch) => {
    dispatch(patientSubscriptionError(null));
  },
})
@connect(mapStateToProps, mapDispatchToProps)

export class LandingForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    landing: PropTypes.object,
    subscriptionError: PropTypes.object,
    blur: React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.state = {
      phone: '',
      codeLength: null,
      selectedCountryData: null,
    };

    this.setVisible = this.setVisible.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onSelectFlag = this.onSelectFlag.bind(this);
  }

  componentDidMount() {
    this.watcher = inViewport(this.animatedFormContent, this.setVisible);
  }

  componentWillUnmount() {
    this.watcher.dispose();
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const { selectedCountryData } = this.state;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value, selectedCountryData);

    blur('phone', formattedPhoneNumber);
  }

  onCodeChange(status, value, countryData, number) {
    const { change } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(number, countryData);
    this.setState({ phone: formattedPhoneNumber, codeLength: countryData.dialCode.length, selectedCountryData: countryData }, () => {
      change('code', value);
    });
  }

  onSelectFlag(code, selectedCountryData) {
    this.setState({ codeLength: selectedCountryData.dialCode.length, selectedCountryData });
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  render() {
    const { landing, handleSubmit, subscriptionError } = this.props;

    const city = (landing.city) ? landing.city : '';
    const state = (landing.state) ? landing.state : '';

    const cityAndState = (city && state) ? ` ${city}, ${state}` : '';
    const location = landing.locationMask ? ` ${landing.locationMask}` : cityAndState;

    const title = (landing.title) ? landing.title : landing.studyName;
    const fullNamePlaceholder = (landing.fullNamePlaceholder) ? landing.fullNamePlaceholder : '* Full Name';
    const emailPlaceholder = (landing.emailPlaceholder) ? landing.emailPlaceholder : '* Email';
    const phonePlaceholder = (landing.phonePlaceholder) ? landing.phonePlaceholder : '* Mobile Phone';
    const instructions = (landing.instructions) ? landing.instructions : 'Enter your information to join!';
    const signupButtonText = (landing.signupButtonText) ? landing.signupButtonText : 'Sign up now!';
    const clickToCallButtonText = (landing.clickToCallButtonText) ? landing.clickToCallButtonText : 'Click to Call!';
    const clickToCallNumber = (landing.clickToCallButtonNumber) ? `tel:${landing.clickToCallButtonNumber}` : false;
    const ipcountryValue = document.head.querySelector('[property=ipcountry]').content;
    const inputWrap = (ipcountryValue !== 'US') ? mixIntlTelInput : Input;
    const bsClass = `form-control input-lg ${(this.state.codeLength) ? `length-${this.state.codeLength}` : ''}`;
    let errorMessage = '';
    const phoneInput =
      (<Field
        name="phone"
        ccName="code"
        type="tel"
        component={inputWrap}
        placeholder={phonePlaceholder}
        className="field-row"
        bsClass={bsClass}
        onBlur={this.onPhoneBlur}
        preferredCountries={[ipcountryValue.toLowerCase()]}
        onSelectFlag={this.onSelectFlag}
        onCodeChange={this.onCodeChange}
      />);

    if (subscriptionError) {
      if (subscriptionError.status === 422) {
        if (subscriptionError.details.codes.phone) {
          errorMessage = 'Mobile Phone is not unique.';
        }
        if (subscriptionError.details.codes.email) {
          errorMessage = 'Email is not unique.';
        }
        if (subscriptionError.details.codes.lastName) {
          errorMessage = 'Last name is required.';
        }
      } else {
        errorMessage = subscriptionError.message;
      }
    }

    return (
      <form
        action="#"
        className="form-study text-center landing-form fs-hide"
        noValidate="novalidate"
        onSubmit={handleSubmit}
      >
        <h1 className="main-heading">
          {title}
        </h1>
        {location &&
          <h2 className="txt-orange">
            <i className="icomoon-map-marker" />
            {location}
          </h2>
        }
        <div
          ref={(animatedFormContent) => { this.animatedFormContent = animatedFormContent; }}
          data-view="fadeInUp"
        >
          <h3>{instructions}</h3>
          {subscriptionError &&
            <Alert bsStyle="danger">
              <p>
                {errorMessage}
              </p>
            </Alert>
          }
          <Field
            name="name"
            type="text"
            component={Input}
            placeholder={fullNamePlaceholder}
            className="field-row"
            bsClass="form-control input-lg"
          />
          <Field
            name="email"
            type="email"
            component={Input}
            placeholder={emailPlaceholder}
            className="field-row"
            bsClass="form-control input-lg"
          />
          {phoneInput}
          <div className="field-row">
            <input className="btn btn-default hidden input-lg" value="Reset" type="reset" />
            <input className="btn btn-default btn-block input-lg" value={signupButtonText} type="submit" />
          </div>
          <div className="field-row">
            {!landing.hideClickToCall &&
              <a
                href={clickToCallNumber}
                className={classNames({ 'btn btn-deep btn-block small': true, disabled: !clickToCallNumber })}
              >
                <i className="icomoon-phone-square" />
                <div className="inline">
                  <span>{clickToCallButtonText}</span>
                  {clickToCallNumber &&
                    <span>{formatPhone(landing.clickToCallButtonNumber)}</span>
                  }
                </div>
              </a>
            }
          </div>
        </div>
      </form>
    );
  }
}

export default LandingForm;
