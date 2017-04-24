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
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../../common/helper/functions';
import { selectIndications, selectSiteLocations, selectSources, selectCurrentUser } from '../../App/selectors';
import Input from '../../../components/Input/index';
import ReactSelect from '../../../components/Input/ReactSelect';
import CenteredModal from '../../../components/CenteredModal/index';
import sanitizeProps from '../../../utils/sanitizeProps';
import { fetchFilteredProtcols, submitAddPatient } from '../actions';
import { selectAddPatientStatus, selectProtocols, selectIsFetchingProtocols } from '../selectors';
import formValidator, { fields } from './validator';

const formName = 'PatientDatabase.AddPatientModal';

const mapStateToProps = createStructuredSelector({
  addPatientStatus: selectAddPatientStatus(),
  currentUser: selectCurrentUser(),
  formError: selectSyncErrorBool(formName),
  indications: selectIndications(),
  isFetchingProtocols: selectIsFetchingProtocols(formName),
  newPatient: selectValues(formName),
  protocols: selectProtocols(formName),
  sites: selectSiteLocations(),
  sources: selectSources(),
});

const mapDispatchToProps = (dispatch) => ({
  blur: (field, value) => dispatch(blur(formName, field, value)),
  fetchFilteredProtcols: (clientId, siteId) => dispatch(fetchFilteredProtcols(clientId, siteId)),
  resetForm: () => dispatch(reset(formName)),
  submitAddPatient: (patient, onClose) => dispatch(submitAddPatient(patient, onClose)),
  touchFields: () => dispatch(touch(formName, ...fields)),
});

@reduxForm({ form: formName, validate: formValidator })
@connect(mapStateToProps, mapDispatchToProps)
export default class AddPatient extends React.Component {
  static propTypes = {
    addPatientStatus: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    blur: React.PropTypes.func.isRequired,
    fetchFilteredProtcols: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    indications: React.PropTypes.array.isRequired,
    isFetchingProtocols: React.PropTypes.bool.isRequired,
    newPatient: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired,
    sites: React.PropTypes.array.isRequired,
    sources: React.PropTypes.array.isRequired,
    submitAddPatient: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    touchFields: React.PropTypes.func.isRequired,
    protocols: React.PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.onHide = this.onHide.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.changeSiteLocation = this.changeSiteLocation.bind(this);
    this.addPatient = this.addPatient.bind(this);
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

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phone', formattedPhoneNumber);
  }

  changeSiteLocation(siteId) {
    const { currentUser, fetchFilteredProtcols } = this.props;
    fetchFilteredProtcols(currentUser.roleForClient.id, siteId);
  }

  addPatient(event) {
    event.preventDefault();
    const { currentUser, formError, newPatient, submitAddPatient, touchFields } = this.props;

    if (formError) {
      touchFields();
      return;
    }

    const patient = Object.assign({}, newPatient);
    patient.client_id = currentUser.roleForClient.client_id;
    /* normalizing the phone number */
    patient.phone = normalizePhoneForServer(newPatient.phone);
    // swap out the "protocol" for the study_id for adding the patient (in reality, we're storing studyId in the protocol field,
    // since it's easier to transform and display this way while still displaying studies by protocol
    if (newPatient.protocol) {
      patient.study_id = newPatient.protocol;
    }
    delete patient.protocol;
    if (newPatient.source) {
      patient.source_id = newPatient.source;
    }
    delete patient.source;
    submitAddPatient(patient, this.onClose);
  }

  render() {
    const { addPatientStatus, indications, isFetchingProtocols, protocols, sites, sources, ...props } = this.props;
    const indicationOptions = indications.map(indicationIterator => ({
      label: indicationIterator.name,
      value: indicationIterator.id,
    }));

    const siteOptions = sites.map(siteIterator => ({
      label: siteIterator.name,
      value: siteIterator.id,
    }));
    const protocolOptions = protocols.map(protocolIterator => ({
      label: protocolIterator.number,
      value: protocolIterator.studyId,
    }));
    const sourceOptions = sources.map(source => ({
      label: source.type,
      value: source.id,
    }));
    const sanitizedProps = sanitizeProps(props);
    delete sanitizedProps.currentUser;
    delete sanitizedProps.fetchFilteredProtcols;
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
            <strong>Add Patient</strong>
          </Modal.Title>
          <a className="close" onClick={this.onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <Form className="form-lightbox" onSubmit={this.addPatient}>
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
                  />
                  <Field
                    name="lastName"
                    component={Input}
                    type="text"
                    placeholder="Last Name"
                    className="col pull-left"
                    id="import-patient-last-name"
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
                onBlur={this.onPhoneBlur}
              />
            </div>
            <div className="field-row form-group">
              <strong className="label required">
                <label>Indication</label>
              </strong>
              <Field
                name="indication"
                component={ReactSelect}
                className="field"
                placeholder="Select Indication"
                options={indicationOptions}
                clearable={false}
              />
            </div>
            <div className="field-row form-group">
              <strong className="label required">
                <label>Site Location</label>
              </strong>
              <Field
                name="site"
                component={ReactSelect}
                className="field"
                placeholder="Select Site Location"
                options={siteOptions}
                onChange={this.changeSiteLocation}
              />
            </div>
            <div className="field-row form-group">
              <strong className="label">
                <label>Protocol</label>
              </strong>
              <Field
                name="protocol"
                component={ReactSelect}
                className="field"
                placeholder="Select Protocol"
                options={protocolOptions}
                disabled={isFetchingProtocols}
              />
            </div>
            <div className="field-row">
              <strong className="label required">
                <label>Source</label>
              </strong>
              <Field
                name="source"
                component={ReactSelect}
                className="field"
                placeholder="Select Source"
                options={sourceOptions}
              />
            </div>
            <div className="text-right">
              <Button type="submit" disabled={addPatientStatus.adding}>Submit</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
