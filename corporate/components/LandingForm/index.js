import React, { PropTypes } from 'react';
import inViewport from 'in-viewport';
import { Field, reduxForm } from 'redux-form';
import landingFormValidator from './validator';
import Alert from 'react-bootstrap/lib/Alert';

import Input from '../../../app/components/Input';

@reduxForm({
  form: 'landing',
  validate: landingFormValidator,
})

export class LandingForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    study: PropTypes.object,
    landing: PropTypes.object,
    subscriptionError: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.watcher = null;

    this.setVisible = this.setVisible.bind(this);
  }

  componentDidMount() {
    this.watcher = inViewport(this.animatedFormContent, this.setVisible);
  }

  componentWillUnmount() {
    this.watcher.dispose();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  render() {
    const { study, landing, handleSubmit, subscriptionError } = this.props;

    const name = (study) ? study.name : '';
    const city = (study && study.site.city) ? study.site.city : '';
    const state = (study && study.site.state) ? study.site.state : '';

    const cityAndState = (city && state) ? ` ${city}, ${state}` : '';

    const fullNamePlaceholder = (landing.fullNamePlaceholder) ? landing.fullNamePlaceholder : '* Full Name';
    const emailPlaceholder = (landing.emailPlaceholder) ? landing.emailPlaceholder : '* Email';
    const phonePlaceholder = (landing.phonePlaceholder) ? landing.phonePlaceholder : '* Mobile phone';
    const instructions = (landing.instructions) ? landing.instructions : 'Enter your information to join!';
    const signupButtonText = (landing.signupButtonText) ? landing.signupButtonText : 'Sign up now!';
    const clickToCallButtonText = (landing.clickToCallButtonText) ? landing.clickToCallButtonText : 'Click to Call!';
    const clickToCallButtonNumber = (landing.clickToCallButtonNumber) ? landing.clickToCallButtonNumber : '360-718-5766';
    const clickToCallNumber = (landing.clickToCallButtonNumber) ? `tel:${landing.clickToCallButtonNumber}` : 'tel:3607185766';
    return (
      <form
        action="#"
        className="form-study text-center"
        onSubmit={handleSubmit}
      >
        <h1 className="main-heading">{name}</h1>
        {city &&
          <h2 className="txt-orange">
            <i className="icomoon-map-marker"></i>
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
              <p>Phone or Email is not unique.</p>
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
          />
          <div className="field-row">
            <input className="btn btn-default hidden input-lg" value="Reset" type="reset" />
            <input className="btn btn-default btn-block input-lg" value={signupButtonText} type="submit" />
          </div>
          <div className="field-row">
            <a
              href={clickToCallNumber}
              className="btn btn-deep btn-block small"
            >
              <i className="icomoon-phone-square"></i>
              <div className="inline">
                <span>{clickToCallButtonText}</span>
                <span>{clickToCallButtonNumber}</span>
              </div>
            </a>
          </div>
        </div>
      </form>
    );
  }
}

export default LandingForm;
