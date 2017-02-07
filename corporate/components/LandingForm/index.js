import React, { PropTypes } from 'react';
import inViewport from 'in-viewport';
import { Field, reduxForm } from 'redux-form';
import landingFormValidator from './validator';
import Input from 'components/Input';
import { Alert } from 'react-bootstrap';

@reduxForm({
  form: 'landing',
  validate: landingFormValidator,
})

export class LandingForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    name: PropTypes.any,
    city: PropTypes.any,
    state: PropTypes.any,
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
    const { name, city, state, handleSubmit, subscriptionError } = this.props;
    const cityAndState = (city && state) ? ` ${city}, ${state}` : '';
    return (
      <form
        action="#"
        className="form-study text-center"
        onSubmit={handleSubmit}
      >
        <h1 className="main-heading">{name}</h1>
        <h2 className="txt-orange">
          {city &&
            <i className="icon-map-marker"></i>
          }
          {cityAndState}
        </h2>
        <div
          ref={(animatedFormContent) => { this.animatedFormContent = animatedFormContent; }}
          data-view="fadeInUp"
        >
          <h3>Enter your information to join!</h3>
          {subscriptionError &&
            <Alert bsStyle="danger">
              <p>{subscriptionError.message}</p>
            </Alert>
          }
          <Field
            name="name"
            type="text"
            component={Input}
            placeholder="* Full Name"
            className="field-row"
            bsClass="form-control input-lg"
          />
          <Field
            name="email"
            type="email"
            component={Input}
            placeholder="* Email"
            className="field-row"
            bsClass="form-control input-lg"
          />
          <Field
            name="phone"
            type="phone"
            component={Input}
            placeholder="* Mobile phone"
            className="field-row"
            bsClass="form-control input-lg"
          />
          <div className="field-row">
            <input className="btn btn-default hidden input-lg" value="Reset" type="reset" />
            <input className="btn btn-default btn-block input-lg" value="Sign up now!" type="submit" />
          </div>
          <div className="field-row">
            <a href="tel:3607185766" className="btn btn-deep btn-block small">
              <i className="icon-phone-square"></i>
              <div className="inline">
                <span>Click to Call!</span>
                <span>360-718-5766</span>
              </div>
            </a>
          </div>
        </div>
      </form>
    );
  }
}

export default LandingForm;
