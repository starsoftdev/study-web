import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { blur, change, Field, FieldArray, reduxForm, touch } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../common/helper/functions';
import { selectIndications, selectSiteLocations, selectSources, selectCurrentUser } from '../../containers/App/selectors';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import { fetchFilteredProtcols, submitAddPatient } from '../../containers/UploadPatients/actions';
import { selectIsFetchingProtocols, selectProtocols } from '../../containers/UploadPatients/selectors';
import formValidator, { fields } from './validator';

const formName = 'UploadPatients.UploadPatientsForm';

const mapStateToProps = createStructuredSelector({
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
  change: (field, value) => dispatch(change(formName, field, value)),
  fetchFilteredProtcols: (clientId, siteId) => dispatch(fetchFilteredProtcols(clientId, siteId)),
  submitAddPatient: (patient, onClose) => dispatch(submitAddPatient(patient, onClose)),
  touchFields: () => dispatch(touch(formName, ...fields)),
});

@reduxForm({ form: formName, validate: formValidator })
@connect(mapStateToProps, mapDispatchToProps)
export default class UploadPatientsForm extends React.Component {
  static propTypes = {
    addPatientStatus: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    blur: React.PropTypes.func,
    change: React.PropTypes.func,
    fetchFilteredProtcols: React.PropTypes.func,
    formError: React.PropTypes.bool,
    indications: React.PropTypes.array,
    isFetchingProtocols: React.PropTypes.bool,
    newPatients: React.PropTypes.object,
    onClose: React.PropTypes.func,
    sites: React.PropTypes.array,
    sources: React.PropTypes.array,
    submitting: React.PropTypes.bool,
    submitAddPatient: React.PropTypes.func,
    touchFields: React.PropTypes.func,
    protocols: React.PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      siteLocation: null,
    };

    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.changeSiteLocation = this.changeSiteLocation.bind(this);
    this.addPatient = this.addPatient.bind(this);
    this.selectIndication = this.selectIndication.bind(this);
    this.selectProtocol = this.selectProtocol.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // console.log('componentWillReceiveProps', newProps);
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phone', formattedPhoneNumber);
  }

  changeSiteLocation(siteId) {
    this.setState({ siteLocation: siteId });
    if (siteId) {
      const { currentUser, fetchFilteredProtcols } = this.props;
      fetchFilteredProtcols(currentUser.roleForClient.id, siteId);
    } else {
      const { change } = this.props;
      // clear the protocol value if there is no site id
      change('protocol', null);
    }
  }

  addPatient(event) {
    event.preventDefault();
    const { currentUser, formError, onClose, newPatients, submitAddPatient, touchFields } = this.props;

    if (formError) {
      touchFields();
      return;
    }

    const patient = Object.assign({}, newPatients);
    patient.client_id = currentUser.roleForClient.client_id;
    /* normalizing the phone number */
    patient.phone = normalizePhoneForServer(newPatients.phone);
    patient.indication_id = newPatients.indication;
    delete patient.indication;
    patient.site_id = newPatients.site;
    delete patient.site;
    // swap out the "protocol" for the study_id for adding the patient (in reality, we're storing studyId in the protocol field,
    // since it's easier to transform and display this way while still displaying studies by protocol
    if (newPatients.protocol) {
      patient.study_id = newPatients.protocol;
    }
    delete patient.protocol;
    patient.source_id = newPatients.source;
    delete patient.source;
    submitAddPatient(patient, onClose);
  }

  selectIndication(indicationId) {
    if (indicationId) {
      const { change, protocols } = this.props;
      const protocol = _.find(protocols, { indicationId });
      if (protocol) {
        change('protocol', protocol.studyId);
      } else {
        // clear the protocol value if the indicationId doesn't match
        change('protocol', null);
      }
    }
  }

  selectProtocol(studyId) {
    if (studyId) {
      const { change, protocols } = this.props;
      const protocol = _.find(protocols, { studyId });
      change('indication', protocol.indicationId);
    }
  }

  render() {
    const { submitting, indications, isFetchingProtocols, protocols, sites, sources } = this.props;
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

    const renderPatient = ({ input, label, type, meta: { touched, error } }) => (
      <div className="field-row">
        <strong className="label required">
          <label htmlFor="import-patient-email">{label}</label>
        </strong>
        <Field
          name="email"
          component={Input}
          type={type}
          className="field"
          placeholder={label}
          id="import-patient-email"
        />
      </div>
    );

    const renderPatients = ({ fields, meta: { error } }) => (
      <ul>
        <li>
          <button type="button" onClick={() => fields.push()}>Add Patient</button>
        </li>
        {fields.map((patient, index) => (
          <li key={index}>
            <button
              type="button"
              title="Remove Patient"
              onClick={() => fields.remove(index)}
            >
              Remove Patient
            </button>
            <div className="field-row">
              <strong className="label required">
                <label htmlFor="import-patient-email">Email</label>
              </strong>
              <Field
                name={`${patient}.email`}
                component={Input}
                type="text"
                className="field"
                id="import-patient-email"
              />
            </div>
            <div className="field-row">
              <strong className="label required">
                <label htmlFor="import-patient-phone">Phone </label>
              </strong>
              <Field
                name={`${patient}.phone`}
                component={Input}
                type="tel"
                className="field"
                id="import-patient-phone"
                onBlur={this.onPhoneBlur}
              />
            </div>
            {/*<Field
              name={`${patient}.email`}
              type="text"
              component={renderPatient}
              label="email"
            />*/}
            {/*<Field
              name={`${patient}.phone`}
              type="text"
              component={renderPatient}
              label="phone"
            />*/}
          </li>
        ))}
        {error && <li className="error">{error}</li>}
      </ul>
    );

    return (
      <Form className="upload-patients-form" onSubmit={this.addPatient}>
        {/*<div className="field-row">
          <strong className="label required">
            <label htmlFor="import-patient-first-name">Patient Name</label>
          </strong>
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
        </div>*/}
        {/*<div className="field-row">
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
        </div>*/}
        {/*<div className="field-row">
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
        </div>*/}
        <div className="field-row">
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
        <div className="field-row">
          <strong className="label">
            <label>Protocol</label>
          </strong>
          <Field
            name="protocol"
            component={ReactSelect}
            placeholder={this.state.siteLocation ? 'Select Protocol' : 'N/A'}
            className="field"
            options={protocolOptions}
            disabled={isFetchingProtocols || !this.state.siteLocation}
            onChange={this.selectProtocol}
          />
        </div>
        <div className="field-row">
          <strong className="label required">
            <label>Indication</label>
          </strong>
          <Field
            name="indication"
            component={ReactSelect}
            className="field"
            placeholder="Select Indication"
            options={indicationOptions}
            onChange={this.selectIndication}
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
        <FieldArray name="patients" component={renderPatients} />
        <div className="text-right">
          <Button type="submit" disabled={submitting}>Submit</Button>
        </div>
      </Form>
    );
  }
}
