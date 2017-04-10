import React, { PropTypes } from 'react';
import inViewport from 'in-viewport';
import { connect } from 'react-redux';
import { blur, Field, reduxForm, touch } from 'redux-form';
import classNames from 'classnames';
import Alert from 'react-bootstrap/lib/Alert';

import Input from '../../../app/components/Input';
import landingFormValidator, { fields } from './validator';
import { normalizePhoneDisplay } from '../../../app/common/helper/functions';

const formName = 'landing';

const mapDispatchToProps = (dispatch) => ({
  blur: (field, value) => dispatch(blur(formName, field, value)),
  touchFields: () => dispatch(touch(formName, ...fields)),
});

@reduxForm({
  form: formName,
  validate: landingFormValidator,
})
@connect(null, mapDispatchToProps)

export class LandingForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    landing: PropTypes.object,
    subscriptionError: PropTypes.object,
    blur: React.PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.setVisible = this.setVisible.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
  }

  componentDidMount() {
    this.watcher = inViewport(this.animatedFormContent, this.setVisible);
  }

  componentWillUnmount() {
    this.watcher.dispose();
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phone', formattedPhoneNumber);
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  render() {
    const { landing, handleSubmit, subscriptionError } = this.props;

    const indication = (landing.indication) ? landing.indication : '';
    const city = (landing.city) ? landing.city : '';
    const state = (landing.state) ? landing.state : '';

    const cityAndState = (city && state) ? ` ${city}, ${state}` : '';

    const fullNamePlaceholder = (landing.fullNamePlaceholder) ? landing.fullNamePlaceholder : '* Full Name';
    const emailPlaceholder = (landing.emailPlaceholder) ? landing.emailPlaceholder : '* Email';
    const phonePlaceholder = (landing.phonePlaceholder) ? landing.phonePlaceholder : '* Mobile Phone';
    const instructions = (landing.instructions) ? landing.instructions : 'Enter your information to join!';
    const signupButtonText = (landing.signupButtonText) ? landing.signupButtonText : 'Sign up now!';
    const clickToCallButtonText = (landing.clickToCallButtonText) ? landing.clickToCallButtonText : 'Click to Call!';
    const clickToCallNumber = (landing.clickToCallButtonNumber) ? `tel:${landing.clickToCallButtonNumber}` : false;

    let errorMessage = '';

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
        className="form-study text-center landing-form"
        noValidate="novalidate"
        onSubmit={handleSubmit}
      >
        <h1 className="main-heading">
          {indication}
        </h1>
        {city &&
          <h2 className="txt-orange">
            <i className="icomoon-map-marker" />
            {cityAndState}
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
          <Field
            name="phone"
            type="phone"
            component={Input}
            placeholder={phonePlaceholder}
            className="field-row"
            bsClass="form-control input-lg"
            onBlur={this.onPhoneBlur}
          />
          <div className="field-row">
            <input className="btn btn-default hidden input-lg" value="Reset" type="reset" />
            <input className="btn btn-default btn-block input-lg" value={signupButtonText} type="submit" />
          </div>
          <div className="field-row">
            {!landing.isHideClickToCallButton &&
              <a
                href={clickToCallNumber}
                className={classNames({ 'btn btn-deep btn-block small': true, disabled: !clickToCallNumber })}
              >
                <i className="icomoon-phone-square" />
                <div className="inline">
                  <span>{clickToCallButtonText}</span>
                  {clickToCallNumber &&
                    <span>{landing.clickToCallButtonNumber}</span>
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
