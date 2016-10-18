/**
 * Created by mike on 10/16/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { change, Field, formValueSelector, reduxForm } from 'redux-form';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Checkbox from '../../../components/Input/Checkbox';
import Input from '../../../components/Input/index';
import { submitPatientUpdate } from '../actions';
import { formatPhone } from '../helper/functions';
import formValidator from './validator';

const formName = 'PatientDetailModal.Detail';


@reduxForm({
  form: formName,
  validate: formValidator,
})
class PatientDetailSection extends React.Component {
  static propTypes = {
    change: React.PropTypes.func.isRequired,
    currentPatient: React.PropTypes.object,
    email: React.PropTypes.object,
    phone: React.PropTypes.object,
    submitting: React.PropTypes.bool.isRequired,
    submitPatientUpdate: React.PropTypes.func.isRequired,
    unsubscribed: React.PropTypes.bool,
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
    if (!email.error) {
      submitPatientUpdate(currentPatient.id, {
        email: event.target.value,
      });
    }
  }

  changePatientPhone(event) {
    const { currentPatient, submitPatientUpdate } = this.props;
    submitPatientUpdate(currentPatient.id, {
      phone: event.target.value,
    });
  }

  changePatientUnsubscribe() {
    const { change, currentPatient, submitPatientUpdate, unsubscribed } = this.props;
    change('unsubscribed', !unsubscribed);
    submitPatientUpdate(currentPatient.id, {
      unsubscribed: !unsubscribed,
    });
  }

  render() {
    const { currentPatient, submitting } = this.props;
    let patientPhone;
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
                    input={{ required: true, defaultValue: currentPatient.firstName, onChange: this.changePatientFirstName }}
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
                    input={{ required: true, defaultValue: currentPatient.lastName, onChange: this.changePatientLastName }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field-row">
            <strong className="label"><label htmlFor="new-patient-email">email</label></strong>
            <div className="field">
              <Field type="email" name="email" component={Input} id="email" input={{ defaultValue: currentPatient.email, onChange: this.changePatientEmail }} />
            </div>
          </div>
          <div className="field-row">
            <strong className="label required"><label htmlFor="new-patient-phone">Phone</label></strong>
            <div className="field">
              <FormGroup >
                <Field type="tel" name="phone" component={Input} id="phone" input={{ defaultValue: patientPhone, onChange: this.changePatientPhone }} />
              </FormGroup>
            </div>
          </div>
          <div className="field-row">
            <strong className="label">&nbsp;</strong>
            <div className="field">
              <Field name="unsubscribed" id="unsubscribed" type="checkbox" component={Checkbox} className="pull-left" input={{ defaultValue: currentPatient.unsubscribed, checked: currentPatient.unsubscribed }} onChange={this.changePatientUnsubscribe} />
              <label htmlFor="unsubscribed">Unsubscribe</label>
            </div>
          </div>
        </Form>
      );
    }
    return null;
  }
}

const selector = formValueSelector(formName);

const mapStateToProps = state => (
  {
    email: selector(state, 'email'),
    phone: selector(state, 'phone'),
    unsubscribed: selector(state, 'unsubscribed'),
  }
);

function mapDispatchToProps(dispatch) {
  return {
    submitPatientUpdate: (patientId, fields) => dispatch(submitPatientUpdate(patientId, fields)),
    change: (field, value) => dispatch(change(formName, field, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailSection);
