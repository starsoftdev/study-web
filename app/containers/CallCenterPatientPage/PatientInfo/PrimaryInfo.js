import moment from 'moment-timezone';
import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import { connect } from 'react-redux';
import { reset, blur, Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import Input from '../../../../common/components/Input/index';
import { translate } from '../../../../common/utilities/localization';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../../common/helper/functions';
import { selectSyncErrors, selectValues, selectFormDidChange } from '../../../common/selectors/form.selector';

import { submitPatientDetails } from '../actions';

import formValidator from './primaryValidator';

function formatDate(date, timezone, format = 'MM/DD/YY [at] hh:mm a') {
  return moment.tz(date, timezone).format(format);
}

const formName = 'CallCenterPatientPage.PrimaryInfo';

const mapStateToProps = createStructuredSelector({
  formSyncErrors: selectSyncErrors(formName),
  formValues: selectValues(formName),
  formDidChange: selectFormDidChange(formName),
});

const mapDispatchToProps = (dispatch) => ({
  blur: (field, value) => dispatch(blur(formName, field, value)),
  reset: () => dispatch(reset(formName)),
  submitPatientDetails: (patientId, fields) => dispatch(submitPatientDetails(patientId, fields)),
});

@reduxForm({
  form: formName,
  validate: formValidator,
  enableReinitialize: true,
})
@connect(mapStateToProps, mapDispatchToProps)
class PrimaryInfo extends Component {
  static propTypes = {
    blur: React.PropTypes.func,
    initialValues: React.PropTypes.object,
    reset: React.PropTypes.func,
    formDidChange: React.PropTypes.bool,
    formSyncErrors: React.PropTypes.object,
    formValues: React.PropTypes.object,
    submitting: React.PropTypes.bool.isRequired,
    submitPatientDetails: React.PropTypes.func.isRequired,
    timezone: React.PropTypes.string.isRequired,
  };

  handleReset = () => {
    this.props.reset();
  }

  handlePhoneBlur = (event) => {
    event.preventDefault();
    const { blur } = this.props;
    // change the phone number to be formatted for display
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phone', formattedPhoneNumber);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { blur, formSyncErrors, formValues, initialValues, reset, submitPatientDetails, timezone } = this.props;
    if (!formSyncErrors.firstName && !formSyncErrors.lastName && !formSyncErrors.email && !formSyncErrors.phone) {
      // change the phone number to be formatted for display
      const formattedPhoneNumber = normalizePhoneDisplay(formValues.phone);
      blur('phone', formattedPhoneNumber);
      // normalize the number in international format for submission to the server
      const phoneNumber = normalizePhoneForServer(formValues.phone);
      submitPatientDetails(initialValues.id, {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phone: phoneNumber,
        unsubscribed: formValues.unsubscribed,
        updatedAt: moment().tz(timezone).format(),
      });
    } else {
      reset(formName);
    }
  }

  renderUpdateButtons = () => {
    const { formDidChange, submitting } = this.props;
    if (formDidChange) {
      return (
        <div className="pull-right buttons">
          <Button bsStyle="primary" onClick={this.handleReset}>
            {translate('container.page.callCenterPatient.button.cancel')}
          </Button>
          <Button type="submit" disabled={submitting}>
            {translate('container.page.callCenterPatient.button.update')}
          </Button>
        </div>
      );
    }
    return null;
  }

  render() {
    const { submitting, initialValues, timezone } = this.props;
    return (
      <Form className="form-lightbox form-patients-list" onSubmit={this.handleSubmit}>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="new-patient-first-name">{translate('container.page.callCenterPatient.label.name')}</label>
          </strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  type="text"
                  name="firstName"
                  component={Input}
                  placeholder={translate('container.page.callCenterPatient.placeholder.firstName')}
                  isDisabled={submitting}
                  required
                />
              </div>
              <div className="col pull-right">
                <Field
                  type="text"
                  name="lastName"
                  component={Input}
                  placeholder={translate('container.page.callCenterPatient.placeholder.lastName')}
                  isDisabled={submitting}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field-row">
          <strong className="label">
            <label htmlFor="new-patient-email">{translate('container.page.callCenterPatient.label.email')}</label>
          </strong>
          <div className="field">
            <Field
              type="email"
              name="email"
              component={Input}
            />
          </div>
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="new-patient-phone">{translate('container.page.callCenterPatient.label.phone')}</label>
          </strong>
          <div className="field">
            <Field
              type="tel"
              name="phone"
              component={Input}
              onBlur={this.handlePhoneBlur}
              required
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label>{translate('container.page.callCenterPatient.label.signedUp')}</label>
          </strong>
          <div className="field">
            <time dateTime={initialValues.createdAt}>{formatDate(initialValues.createdAt, timezone)}</time>
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label>{translate('container.page.callCenterPatient.label.updated')}</label>
          </strong>
          <div className="field">
            <time dateTime={initialValues.updatedAt}>{formatDate(initialValues.updatedAt, timezone)}</time>
          </div>
        </div>

        {this.renderUpdateButtons()}
        <div className="clearfix" />
      </Form>
    );
  }
}

export default PrimaryInfo;
