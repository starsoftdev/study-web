/**
 * Created by mike on 10/9/16.
 */

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { blur, change, Field, reduxForm, touch, reset } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import { selectSyncErrorBool, selectValues } from '../../../common/selectors/form.selector';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../../common/helper/functions';
import { selectIndications, selectSiteLocations, selectSources, selectCurrentUser } from '../../App/selectors';
import { fetchStudySources } from '../../App/actions';
import Input from '../../../components/Input/index';
import ReactSelect from '../../../components/Input/ReactSelect';
import { fetchFilteredProtcols, submitAddPatient } from '../actions';
import { selectIsFetchingProtocols, selectAddPatientStatus, selectProtocols, selectStudySources } from '../selectors';
import formValidator, { fields } from './validator';
import { translate } from '../../../../common/utilities/localization';

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
  studySources: selectStudySources(),
});

const mapDispatchToProps = (dispatch) => ({
  blur: (field, value) => dispatch(blur(formName, field, value)),
  reset: (form) => dispatch(reset(form)),
  change: (field, value) => dispatch(change(formName, field, value)),
  fetchFilteredProtcols: (clientId, siteId) => dispatch(fetchFilteredProtcols(clientId, siteId)),
  submitAddPatient: (patient, onClose) => dispatch(submitAddPatient(patient, onClose)),
  touchFields: () => dispatch(touch(formName, ...fields)),
  fetchStudySources: (studyId) => dispatch(fetchStudySources(studyId)),
});

@reduxForm({ form: formName, validate: formValidator, destroyOnUnmount: false, keepDirtyOnReinitialize: true })
@connect(mapStateToProps, mapDispatchToProps)
export default class AddPatientForm extends React.Component {
  static propTypes = {
    addPatientStatus: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    blur: React.PropTypes.func.isRequired,
    change: React.PropTypes.func.isRequired,
    fetchFilteredProtcols: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    indications: React.PropTypes.array.isRequired,
    isFetchingProtocols: React.PropTypes.bool.isRequired,
    newPatient: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    sites: React.PropTypes.array.isRequired,
    sources: React.PropTypes.array.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    submitAddPatient: React.PropTypes.func.isRequired,
    touchFields: React.PropTypes.func.isRequired,
    switchShowAddProtocolModal: React.PropTypes.func.isRequired,
    protocols: React.PropTypes.array,
    fetchStudySources: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    studySources: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      siteLocation: null,
      selectedStudyId: null,
    };

    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.changeSiteLocation = this.changeSiteLocation.bind(this);
    this.addPatient = this.addPatient.bind(this);
    this.selectProtocol = this.selectProtocol.bind(this);
  }

  componentWillMount() {
    const { newPatient } = this.props;
    if (newPatient.site) {
      this.setState({ siteLocation: newPatient.site });
    }
    if (newPatient.protocol) {
      this.setState({ selectedStudyId: newPatient.protocol });
    }
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phone', formattedPhoneNumber);
  }

  changeSiteLocation(siteId) {
    const { change, currentUser, fetchFilteredProtcols } = this.props;
    change('protocol', null);
    change('source', null);
    this.setState({ siteLocation: siteId });
    if (siteId) {
      fetchFilteredProtcols(currentUser.roleForClient.id, siteId);
    }
  }

  addPatient(event) {
    event.preventDefault();
    const { currentUser, formError, onClose, newPatient, submitAddPatient, touchFields, reset } = this.props;

    if (formError) {
      touchFields();
      return;
    }

    const patient = Object.assign({}, newPatient);
    patient.client_id = currentUser.roleForClient.client_id;
    /* normalizing the phone number */
    patient.phone = normalizePhoneForServer(newPatient.phone);
    patient.indication_id = newPatient.indication;
    delete patient.indication;
    patient.site_id = newPatient.site;
    delete patient.site;
    // swap out the "protocol" for the study_id for adding the patient (in reality, we're storing studyId in the protocol field,
    // since it's easier to transform and display this way while still displaying studies by protocol
    if (newPatient.protocol) {
      patient.study_id = newPatient.protocol;
    }
    delete patient.protocol;
    patient.studySourceId = newPatient.source;
    delete patient.source;
    submitAddPatient(patient, onClose);
    reset(formName);
  }

  selectProtocol(studyId) {
    this.setState({ selectedStudyId: studyId });
    const { protocols, change, switchShowAddProtocolModal, fetchStudySources } = this.props;
    change('source', null);
    if (studyId === 'add-new-protocol') {
      change('protocol', null);
      change('indication', null);
      switchShowAddProtocolModal();
    } else {
      if (studyId) {
        fetchStudySources(studyId);
      }
      const protocol = _.find(protocols, { studyId });
      change('indication', protocol.indicationId);
    }
  }

  render() {
    const { submitting, indications, isFetchingProtocols, protocols, sites, currentUser, studySources } = this.props;
    const userIsAdmin = currentUser.roleForClient.name === 'Super Admin' || currentUser.roleForClient.name === 'Admin';

    const indicationOptions = indications.map(indicationIterator => ({
      label: indicationIterator.name,
      value: indicationIterator.id,
    }));

    let siteOptions = sites.map(siteIterator => ({
      label: siteIterator.name,
      value: siteIterator.id,
    }));

    if (sites.length > 0 && !userIsAdmin) {
      const usersSite = _.find(sites, { id: currentUser.roleForClient.site_id });
      siteOptions = [{
        label: usersSite.name,
        value: usersSite.id,
      }];
    }

    const protocolOptions = protocols.map(protocolIterator => ({
      label: protocolIterator.number,
      value: protocolIterator.studyId,
    }));
    protocolOptions.unshift({ id: 'add-new-protocol', name: translate('client.component.addPatientForm.addNewProtocol') });

    const sourceOptions = studySources.details.filter(s => !s.isMediaType).map((studySource) => {
      const sourceName = studySource.sourceName ? studySource.sourceName : studySource.source.label;
      return {
        label: sourceName,
        value: studySource.studySourceId,
      };
    });

    return (
      <Form className="form-lightbox" onSubmit={this.addPatient}>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="import-patient-first-name">{translate('client.component.addPatientForm.labelPatientName')}</label>
          </strong>
          <div className="field">
            <div className="row">
              <Field
                name="firstName"
                component={Input}
                type="text"
                placeholder={translate('client.component.addPatientForm.placeholderFirstName')}
                className="col pull-left"
                id="import-patient-first-name"
              />
              <Field
                name="lastName"
                component={Input}
                type="text"
                placeholder={translate('client.component.addPatientForm.placeholderLastName')}
                className="col pull-left"
                id="import-patient-last-name"
              />
            </div>
          </div>
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="import-patient-first-name">{translate('client.component.addPatientForm.labelPatientEmail')}</label>
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
            <label htmlFor="import-patient-first-name">{translate('client.component.addPatientForm.labelPatientPhone')}</label>
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
            <label htmlFor="import-patient-first-name">{translate('client.component.addPatientForm.labelSiteLocation')}</label>
          </strong>
          <Field
            name="site"
            component={ReactSelect}
            className="field"
            placeholder={translate('client.component.addPatientForm.placeholderSiteLocation')}
            options={siteOptions}
            onChange={this.changeSiteLocation}
          />
        </div>
        <div className="field-row form-group">
          <strong className="label required">
            <label htmlFor="import-patient-first-name">{translate('client.component.addPatientForm.labelProtocol')}</label>
          </strong>
          <Field
            name="protocol"
            component={ReactSelect}
            placeholder={translate('client.component.addPatientForm.placeholderProtocol')}
            className="field"
            options={protocolOptions}
            disabled={isFetchingProtocols || !this.state.siteLocation}
            onChange={this.selectProtocol}
          />
        </div>
        <div className="field-row form-group">
          <strong className="label">
            <label htmlFor="import-patient-first-name">{translate('client.component.addPatientForm.labelIndication')}</label>
          </strong>
          <Field
            name="indication"
            component={ReactSelect}
            className="field"
            placeholder={translate('client.component.addPatientForm.placeholderIndication')}
            disabled
            options={indicationOptions}
          />
        </div>
        <div className="field-row form-group">
          <strong className="label required">
            <label htmlFor="import-patient-first-name">{translate('client.component.addPatientForm.labelSource')}</label>
          </strong>
          <Field
            name="source"
            component={ReactSelect}
            className="field required"
            placeholder={translate('client.component.addPatientForm.placeholderSource')}
            options={sourceOptions}
            disabled={studySources.fetching || !this.state.selectedStudyId}
          />
        </div>
        <div className="text-right">
          <Button type="submit" disabled={submitting}>{translate('client.component.addPatientForm.submit')}</Button>
        </div>
      </Form>
    );
  }
}
