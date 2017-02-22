/**
 * Created by mike on 10/9/16.
 */
import React from 'react';
import { connect } from 'react-redux';
import { blur, Field, reduxForm, reset, touch } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import { selectSyncErrorBool, selectValues } from '../../../common/selectors/form.selector';
import { normalizePhone, normalizePhoneDisplay } from '../../../common/helper/functions';
import { selectSources } from '../../App/selectors';
import Input from '../../../components/Input/index';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import sanitizeProps from '../../../utils/sanitizeProps';
import { submitAddPatient } from '../actions';
import { selectStudyId, selectAddPatientStatus } from '../selectors';
import formValidator, { fields } from './validator';

const formName = 'addPatient';

@reduxForm({ form: formName, validate: formValidator })
class AddPatientModal extends React.Component {
  static propTypes = {
    addPatientStatus: React.PropTypes.object,
    blur: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    newPatient: React.PropTypes.object,
    show: React.PropTypes.bool.isRequired,
    studyId: React.PropTypes.number.isRequired,
    submitAddPatient: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    sources: React.PropTypes.array.isRequired,
    touchFields: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.addPatient = this.addPatient.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onHide = this.onHide.bind(this);
  }

  onClose() {
    const { onClose, resetForm } = this.props;
    resetForm();
    onClose();
  }

  onHide() {
    const { onHide, resetForm } = this.props;
    resetForm();
    onHide();
  }

  addPatient(event) {
    event.preventDefault();
    const { blur, formError, newPatient, studyId, submitAddPatient, touchFields } = this.props;

    if (formError) {
      touchFields();
      return;
    }

    const formattedPhoneNumber = normalizePhoneDisplay(newPatient.phone);
    blur('phone', formattedPhoneNumber);
    const patient = Object.assign({}, newPatient);
    /* normalizing the phone number */
    patient.phone = normalizePhone(newPatient.phone);
    patient.source_id = newPatient.source;
    delete patient.source;
    submitAddPatient(studyId, patient, this.onClose);
  }

  render() {
    const { addPatientStatus, sources, ...props } = this.props;
    const sourceOptions = sources.map(source => ({
      label: source.type,
      value: source.id,
    }));
    const sanitizedProps = sanitizeProps(props);
    delete sanitizedProps.studyId;
    delete sanitizedProps.formError;
    delete sanitizedProps.onClose;
    delete sanitizedProps.newPatient;
    delete sanitizedProps.resetForm;
    delete sanitizedProps.submitAddPatient;
    delete sanitizedProps.touchFields;
    return (
      <Modal
        {...sanitizedProps}
        id="add-patient-info-import"
        dialogComponentClass={CenteredModal}
        onHide={this.onHide}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong>Import</strong>
          </Modal.Title>
          <a className="close" onClick={this.onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <div className="scroll-holder jcf--scrollable">
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
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  addPatientStatus: selectAddPatientStatus(),
  formError: selectSyncErrorBool(formName),
  newPatient: selectValues(formName),
  studyId: selectStudyId(),
  sources: selectSources(),
});

function mapDispatchToProps(dispatch) {
  return {
    blur: (field, value) => dispatch(blur(formName, field, value)),
    resetForm: () => dispatch(reset(formName)),
    submitAddPatient: (studyId, patient, onClose) => dispatch(submitAddPatient(studyId, patient, onClose)),
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPatientModal);
