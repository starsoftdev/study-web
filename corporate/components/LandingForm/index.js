import React from 'react';
import inViewport from 'in-viewport';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { blur, change, Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import Alert from 'react-bootstrap/lib/Alert';

import Checkbox from '../../../app/components/Input/Checkbox';
import Input from '../../../app/components/Input';
import mixIntlTelInput from '../../../app/components/Input/MixIntlTelInput';
import landingFormValidator from './validator';
import { normalizePhoneDisplay, formatPhone } from '../../../app/common/helper/functions';
import {
  patientSubscriptionError,
} from '../../../app/containers/App/actions';
import { translate } from '../../../common/utilities/localization';
import './styles.less';

const formName = 'LandingPage';

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
    blur: React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    landing: React.PropTypes.object,
    onSubmit: React.PropTypes.func.isRequired,
    subscriptionError: React.PropTypes.object,
    submitting: React.PropTypes.bool.isRequired,
    valid: React.PropTypes.bool, // provided by redux-form and required by lint
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.state = {
      phone: '',
      codeLength: null,
      selectedCountryData: null,
      gdprPhoneNumber: true,
      gdprTermsAndConditions: false,
    };

    this.setVisible = this.setVisible.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onSelectFlag = this.onSelectFlag.bind(this);

    this.changeGdprPhoneNumber = this.changeGdprPhoneNumber.bind(this);
    this.changeGdprToc = this.changeGdprToc.bind(this);
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
    const ipcountryValue = landing.country.toLowerCase();
    const inputWrap = mixIntlTelInput;
    const bsClass = `form-control input-lg ${(this.state.codeLength) ? `length-${this.state.codeLength}` : ''}`;
    let errorMessage = '';
    const phoneInput =
      (<Field
        name="phone"
        ccName="code"
        type="tel"
        component={inputWrap}
        placeholder={phonePlaceholder}
        className="field-row fixed-height"
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
            className="field-row fixed-height"
            bsClass="form-control input-lg"
          />
          <Field
            name="email"
            type="email"
            component={Input}
            placeholder={emailPlaceholder}
            className="field-row fixed-height"
            bsClass="form-control input-lg"
          />
          {phoneInput}
          {ipcountryValue !== 'US' && this.renderGdprPhone()}
          {ipcountryValue !== 'US' && this.renderGdprToc()}
          <div className="field-row fixed-height">
            <input className="btn btn-default btn-block input-lg" disabled={this.isButtonDisabled()} value={signupButtonText} type="submit" />
          </div>
          {!landing.hideClickToCall &&
            <div className="field-row">
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
            </div>
          }
        </div>
      </form>
    );
  }

  isButtonDisabled(ipcountryValue) {
    let countryCheck = false;
    if (ipcountryValue !== 'US') {
      countryCheck = this.state.gdprPhoneNumber && this.state.gdprTermsAndConditions;
    }

    return !countryCheck || this.props.submitting || !this.props.valid;
  }

  changeGdprPhoneNumber(e) {
    e.preventDefault();
    this.setState({
      gdprPhoneNumber: !this.state.gdprPhoneNumber,
    });
  }

  changeGdprToc(e) {
    e.preventDefault();
    this.setState({
      gdprTermsAndConditions: !this.state.gdprTermsAndConditions,
    });
  }

  renderGdprPhone() {
    return (
      <div className="field-row checkbox">
        <label onClick={this.changeGdprPhoneNumber}>
          <Checkbox
            name="gdprPhoneNumber"
            input={{ checked: this.state.gdprPhoneNumber }}
          />
          <span>{translate('client.component.landingPage.gdpr.phoneNumber')}</span>
        </label>
      </div>
    );
  }
  renderGdprToc() {
    return (
      <div className="field-row checkbox">
        <label onClick={this.changeGdprToc}>
          <Checkbox
            name="gdprTermsAndConditions"
            input={{ checked: this.state.gdprTermsAndConditions }}
          />
          <span>{translate('client.component.landingPage.gdpr.termsAndConditions')}</span>
        </label>
      </div>
    );
  }
}

export default LandingForm;
