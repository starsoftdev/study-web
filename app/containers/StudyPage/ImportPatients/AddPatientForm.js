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
import { selectStudyId, selectAddPatientStatus, selectStudySources } from '../selectors';
import formValidator, { fields } from './validator';
import { translate } from '../../../../common/utilities/localization';

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
    studySources: React.PropTypes.object,
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
    const { addPatientStatus, studySources } = this.props;

    const sourceOptions = studySources.details.filter(s => !s.isMediaType).map((studySource) => {
      const sourceName = studySource.sourceName ? studySource.sourceName : studySource.source.label;
      return {
        label: sourceName,
        value: studySource.studySourceId,
      };
    });

    return (
      <Form className="form-lightbox" onSubmit={this.addPatient} noValidate="novalidate">
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="import-patient-first-name">{translate('client.component.addPatientForm.labelPatientName')}</label></strong>
          <div className="field">
            <div className="row">
              <Field
                name="firstName"
                component={Input}
                type="text"
                placeholder={translate('client.component.addPatientForm.placeholderFirstName')}
                className="col pull-left"
                id="import-patient-first-name"
                required
              />
              <Field
                name="lastName"
                component={Input}
                type="text"
                placeholder={translate('client.component.addPatientForm.placeholderLastName')}
                className="col pull-left"
                id="import-patient-last-name"
                required
              />
            </div>
          </div>
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="import-patient-email">{translate('client.component.addPatientForm.labelPatientEmail')}</label>
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
            <label htmlFor="import-patient-phone">{translate('client.component.addPatientForm.labelPatientPhone')}</label>
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
            <label>{translate('client.component.addPatientForm.labelSource')}</label>
          </strong>
          <Field
            name="source"
            component={ReactSelect}
            className="field required"
            placeholder={translate('client.component.addPatientForm.placeholderSource')}
            options={sourceOptions}
          />
        </div>
        <div className="text-right">
          <Button type="submit" disabled={addPatientStatus.adding}>{translate('client.component.addPatientForm.submit')}</Button>
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
  studySources: selectStudySources(),
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
