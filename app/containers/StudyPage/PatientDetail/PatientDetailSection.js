/**
 * Created by mike on 10/16/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';

import Form from 'react-bootstrap/lib/Form';
import Checkbox from '../../../components/Input/Checkbox';
import Input from '../../../components/Input/index';
import { submitPatientUpdate } from '../actions';
import { formatPhone } from '../helper/functions';

const formName = 'PatientDetailModal.Detail';

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = 'Required'
  } else if (values.firstName.length > 0) {
    errors.firstName = 'First name is required.'
  }
  if (!values.lastName) {
    errors.lastName = 'Required'
  } else if (values.lastName.length > 0) {
    errors.lastName = 'First name is required.'
  }
  if (!values.phone) {
    errors.phone = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.phone)) {
    errors.phone = 'Invalid phone number'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

@reduxForm({
  form: formName,
  validate
})
class PatientDetailSection extends React.Component {
  static propTypes = {
    currentPatient: React.PropTypes.object,
    email: React.PropTypes.object,
    phone: React.PropTypes.object,
    submitting: React.PropTypes.bool.isRequired,
    submitPatientUpdate: React.PropTypes.func.isRequired,
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
    const { currentPatient, submitPatientUpdate } = this.props;
    submitPatientUpdate(currentPatient.id, {
      firstName: event.target.value,
    });
  }

  changePatientLastName(event) {
    const { currentPatient, submitPatientUpdate } = this.props;
    submitPatientUpdate(currentPatient.id, {
      lastName: event.target.value,
    });
  }

  changePatientEmail(event) {
    const { currentPatient, email, submitPatientUpdate } = this.props;
    console.log(email);
    if (!email.error) {
      submitPatientUpdate(currentPatient.id, {
        email: event.target.value,
      });
    }
  }

  changePatientPhone(event) {
    const { currentPatient, phone, submitPatientUpdate } = this.props;
    if (!phone.error) {
      submitPatientUpdate(currentPatient.id, {
        phone: event.target.value,
      });
    }
  }

  changePatientUnsubscribe(event) {
    const { currentPatient, submitPatientUpdate } = this.props;
    submitPatientUpdate(currentPatient.id, {
      unsubscribed: event.target.value,
    });
  }

  render() {
    const { currentPatient, submitting } = this.props;
    let patientPhone
    if (currentPatient) {
      patientPhone = formatPhone(currentPatient.phone);
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
                    id="new-patient-first-name"
                    placeholder="First Name"
                    isDisabled={submitting}
                    input={{required: true, defaultValue: currentPatient.firstName, onChange: this.changePatientFirstName}}
                  />
                </div>
                <div className="col pull-right">
                  <Field
                    type="text"
                    name="lastName"
                    component={Input}
                    id="new-patient-last-name"
                    placeholder="Last Name"
                    isDisabled={submitting}
                    input={{required: true, defaultValue: currentPatient.lastName, onChange: this.changePatientLastName}}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field-row">
            <strong className="label required"><label htmlFor="new-patient-email">email</label></strong>
            <div className="field">
              <Field type="email" name="email" component={Input} id="new-patient-email" input={{defaultValue: currentPatient.email, onChange: this.changePatientEmail}} />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required"><label htmlFor="new-patient-phone">Phone</label></strong>
            <div className="field">
              <Field type="tel" name="phone" component={Input} id="new-patient-phone" input={{defaultValue: patientPhone, onChange: this.changePatientPhone}} />
            </div>
          </div>
          <div className="field-row">
            <strong className="label">&nbsp;</strong>
            <div className="field">
              <Field name="unsubscribe" type="checkbox" component={Checkbox} className="pull-left" input={{defaultValue: currentPatient.unsubscribed, checked: currentPatient.unsubscribed}} onChange={this.changePatientUnsubscribe} />
              <label htmlFor="unsubscribe">Unsubscribe</label>
            </div>
          </div>
        </Form>
      );
    } else {
      return null;
    }
  }
}

const selector = formValueSelector(formName)

const mapStateToProps = state => {
  return {
    email: selector(state, 'email'),
    phone: selector(state, 'phone'),
  }
};

function mapDispatchToProps(dispatch) {
  return {
    submitPatientUpdate: (patientId, fields) => dispatch(submitPatientUpdate(patientId, fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailSection);
