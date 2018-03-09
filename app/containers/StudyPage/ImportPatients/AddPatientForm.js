/**
 * Created by mike on 10/9/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import { blur, Field, reduxForm, touch, change } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import ReactSelect from '../../../components/Input/ReactSelect';
import { selectSyncErrorBool, selectValues } from '../../../common/selectors/form.selector';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../../common/helper/functions';
import { selectSources, selectCurrentUserClientId } from '../../App/selectors';
import Input from '../../../components/Input/index';
import { submitAddPatient } from '../actions';
import { selectStudyId, selectAddPatientStatus, selectStudyLeadSources } from '../selectors';
import formValidator, { fields } from './validator';

const formName = 'addPatient';

@reduxForm({ form: formName, validate: formValidator })
class AddPatientForm extends React.Component {
  static propTypes = {
    clientId: React.PropTypes.number,
    addPatientStatus: React.PropTypes.object,
    blur: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    newPatient: React.PropTypes.object,
    studyId: React.PropTypes.number.isRequired,
    submitAddPatient: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    sources: React.PropTypes.array.isRequired,
    touchFields: React.PropTypes.func.isRequired,
    changeField: React.PropTypes.func.isRequired,
    sourceMapped: React.PropTypes.array,
    studyLeadSources: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.addPatient = this.addPatient.bind(this);
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phone', formattedPhoneNumber);
  }

  addPatient(event) {
    event.preventDefault();
    const { clientId, formError, onClose, newPatient, studyId, submitAddPatient, touchFields } = this.props;

    if (formError) {
      touchFields();
      return;
    }

    const patient = Object.assign({}, newPatient);
    patient.client_id = clientId;
    /* normalizing the phone number */
    patient.phone = normalizePhoneForServer(newPatient.phone);
    patient.studySourceId = newPatient.source;
    delete patient.source;
    submitAddPatient(studyId, patient, onClose);
  }

  render() {
    const { addPatientStatus, studyLeadSources } = this.props;

    const sourceOptions = studyLeadSources.details.map((studySource) => {
      const sourceName = studySource.source_name ? studySource.source_name : studySource.source_id.label;
      return {
        label: sourceName,
        value: studySource.studySourceId,
      };
    });

    return (
      <Form className="form-lightbox" onSubmit={this.addPatient} noValidate="novalidate">
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="import-patient-first-name">Patient Name</label></strong>
          <div className="field">
            <div className="row">
              <Field
                name="firstName"
                component={Input}
                type="text"
                placeholder="First Name"
                className="col pull-left"
                id="import-patient-first-name"
                required
              />
              <Field
                name="lastName"
                component={Input}
                type="text"
                placeholder="Last Name"
                className="col pull-left"
                id="import-patient-last-name"
                required
              />
            </div>
          </div>
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="import-patient-email"> Patient Email </label>
          </strong>
          <Field
            name="email"
            component={Input}
            type="text"
            className="field"
            id="import-patient-email"
            required
          />
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="import-patient-phone"> Patient Phone </label>
          </strong>
          <Field
            name="phone"
            component={Input}
            type="tel"
            className="field"
            id="import-patient-phone"
            required
            onBlur={this.onPhoneBlur}
          />
        </div>
        <div className="field-row">
          <strong className="label required">
            <label>Source</label>
          </strong>
          <Field
            name="source"
            component={ReactSelect}
            className="field required"
            placeholder="Select Source"
            options={sourceOptions}
          />
        </div>
        <div className="text-right">
          <Button type="submit" disabled={addPatientStatus.adding}>Submit</Button>
        </div>
      </Form>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  clientId: selectCurrentUserClientId(),
  addPatientStatus: selectAddPatientStatus(),
  formError: selectSyncErrorBool(formName),
  newPatient: selectValues(formName),
  studyId: selectStudyId(),
  sources: selectSources(),
  studyLeadSources: selectStudyLeadSources(),
});

function mapDispatchToProps(dispatch) {
  return {
    blur: (field, value) => dispatch(blur(formName, field, value)),
    submitAddPatient: (studyId, patient, onClose) => dispatch(submitAddPatient(studyId, patient, onClose)),
    touchFields: () => dispatch(touch(formName, ...fields)),
    changeField: (field, value) => dispatch(change(formName, field, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPatientForm);
