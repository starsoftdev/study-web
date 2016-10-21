/**
 * Created by mike on 10/16/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { blur, Field, reduxForm } from 'redux-form';

import Form from 'react-bootstrap/lib/Form';
import Checkbox from '../../../components/Input/Checkbox';
import Input from '../../../components/Input/index';
import { submitPatientUpdate } from '../actions';
import formValidator from './validator';
import { normalizePhone, normalizePhoneDisplay } from '../helper/functions';
import { selectSyncErrors } from '../../../common/selectors/form.selector';
import { createStructuredSelector } from 'reselect';
const formName = 'PatientDetailModal.Detail';

@reduxForm({
  form: formName,
  validate: formValidator,
})
class PatientDetailSection extends React.Component {
  static propTypes = {
    blur: React.PropTypes.func,
    initialValues: React.PropTypes.object,
    submitting: React.PropTypes.bool.isRequired,
    submitPatientUpdate: React.PropTypes.func.isRequired,
    unsubscribed: React.PropTypes.bool,
    formErrors: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.changePatientFirstName = this.changePatientFirstName.bind(this);
    this.changePatientLastName = this.changePatientLastName.bind(this);
    this.changePatientEmail = this.changePatientEmail.bind(this);
    this.changePatientPhone = this.changePatientPhone.bind(this);
    this.changePatientUnsubscribe = this.changePatientUnsubscribe.bind(this);
  }

  changePatientFirstName(event) {
    const { initialValues, submitPatientUpdate } = this.props;
    submitPatientUpdate(initialValues.id, {
      firstName: event.target.value,
    });
  }

  changePatientLastName(event) {
    const { initialValues, submitPatientUpdate } = this.props;
    submitPatientUpdate(initialValues.id, {
      lastName: event.target.value,
    });
  }

  changePatientEmail(event) {
    const { initialValues, submitPatientUpdate, formErrors } = this.props;
    if (!formErrors.email) {
      submitPatientUpdate(initialValues.id, {
        email: event.target.value,
      });
    }
  }

  changePatientPhone(event) {
    const { blur, initialValues, submitPatientUpdate } = this.props;
    const phoneNumber = normalizePhone(event.target.value);
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phone', formattedPhoneNumber);
    submitPatientUpdate(initialValues.id, {
      phone: phoneNumber,
    });
  }

  changePatientUnsubscribe(value) {
    const { initialValues, submitPatientUpdate } = this.props;
    submitPatientUpdate(initialValues.id, {
      unsubscribed: value,
    });
  }

  render() {
    const { submitting } = this.props;
    return (
      <Form className="form-lightbox form-patients-list">
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="new-patient-first-name">Name</label>
          </strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  type="text"
                  name="firstName"
                  component={Input}
                  placeholder="First Name"
                  isDisabled={submitting}
                  required
                  tooltipDisabled
                  onBlur={this.changePatientFirstName}
                />
              </div>
              <div className="col pull-right">
                <Field
                  type="text"
                  name="lastName"
                  component={Input}
                  placeholder="Last Name"
                  isDisabled={submitting}
                  required
                  tooltipDisabled
                  onBlur={this.changePatientLastName}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field-row">
          <strong className="label">
            <label htmlFor="new-patient-email">Email</label>
          </strong>
          <div className="field">
            <Field
              type="email"
              name="email"
              component={Input}
              tooltipDisabled
              onBlur={this.changePatientEmail}
            />
          </div>
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="new-patient-phone">Phone</label>
          </strong>
          <div className="field">
            <Field
              type="tel"
              name="phone"
              component={Input}
              required
              tooltipDisabled
              onBlur={this.changePatientPhone}
            />
          </div>
        </div>
        <div className="field-row">
          <strong className="label" />
          <div className="field">
            <Field
              name="unsubscribed"
              type="checkbox"
              component={Checkbox}
              className="pull-left"
              onChange={this.changePatientUnsubscribe}
            />
            <label htmlFor="unsubscribed">Unsubscribe</label>
          </div>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formErrors: selectSyncErrors(formName),
});

const mapDispatchToProps = (dispatch) => ({
  submitPatientUpdate: (patientId, fields) => dispatch(submitPatientUpdate(patientId, fields)),
  blur: (field, value) => dispatch(blur(formName, field, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailSection);
