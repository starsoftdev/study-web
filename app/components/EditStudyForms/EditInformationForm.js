/**
 * Created by mike on 08/22/17.
 */

import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { arrayRemoveAll, arrayPush, blur, change, Field, FieldArray, reduxForm, startSubmit, stopSubmit } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Overlay from 'react-bootstrap/lib/Overlay';
import { createStructuredSelector } from 'reselect';
import { toastr } from 'react-redux-toastr';

import { normalizePhoneDisplay, normalizePhoneForServer } from '../../common/helper/functions';
import Toggle from '../../components/Input/Toggle';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import LoadingSpinner from '../../components/LoadingSpinner';
import RenderEmailsList from './RenderEmailsList';
import RenderCustomEmailsList from './RenderCustomEmailsList';
import {
  removeCustomEmailNotification,
} from '../../containers/App/actions';
import {
  selectCro,
  selectIndications,
  selectMessagingNumbers,
  selectProtocols,
  selectSiteLocations,
  selectSponsors,
  selectTaggedIndicationsForStudy,
  selectUsersByRoles,
} from '../../containers/HomePage/AdminDashboard/selectors';
import {
  addTaggedIndicationForStudy,
  fetchAllStudyEmailNotificationsDashboard,
  removeTaggedIndicationForStudy,
  updateDashboardStudy,
} from '../../containers/HomePage/AdminDashboard/actions';
import { selectInitialValues, selectSyncErrorBool, selectValues, selectSyncErrors } from '../../common/selectors/form.selector';
import IndicationOverlay from './IndicationOverlay';
import formValidator from './validator';

const formName = 'Dashboard.EditStudyForm';

const mapStateToProps = createStructuredSelector({
  cro: selectCro(),
  formError: selectSyncErrorBool(formName),
  formErrors: selectSyncErrors(formName),
  formValues: selectValues(formName),
  indications: selectIndications(),
  initialFormValues: selectInitialValues(formName),
  messagingNumbers: selectMessagingNumbers(),
  protocols: selectProtocols(),
  siteLocations: selectSiteLocations(),
  sponsors: selectSponsors(),
  taggedIndicationsForStudy: selectTaggedIndicationsForStudy(),
  usersByRoles: selectUsersByRoles(),
});

const mapDispatchToProps = (dispatch) => ({
  blur: (field, value) => dispatch(blur(formName, field, value)),
  addTaggedIndicationForStudy: (studyId, indication) => dispatch(addTaggedIndicationForStudy(studyId, indication)),
  arrayRemoveAll: (field) => dispatch(arrayRemoveAll(formName, field)),
  arrayPush: (field, value) => dispatch(arrayPush(formName, field, value)),
  change: (field, value) => dispatch(change(formName, field, value)),
  fetchAllStudyEmailNotificationsDashboard: (clientId, studyId) => dispatch(fetchAllStudyEmailNotificationsDashboard(clientId, studyId)),
  removeCustomEmailNotification: (id, email) => dispatch(removeCustomEmailNotification(id, email)),
  removeTaggedIndicationForStudy: (studyId, indication) => dispatch(removeTaggedIndicationForStudy(studyId, indication)),
  startSubmit: () => dispatch(startSubmit(formName)),
  stopSubmit: (errors) => dispatch(stopSubmit(formName, errors)),
  updateDashboardStudy: (id, params, stopSubmit, formValues) => dispatch(updateDashboardStudy(id, params, stopSubmit, formValues)),
});

@reduxForm({
  form: formName,
  validate: formValidator,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})
@connect(mapStateToProps, mapDispatchToProps)
export default class EditInformationForm extends React.Component {
  static propTypes = {
    addEmailNotificationClick: PropTypes.func.isRequired,
    blur: React.PropTypes.func.isRequired,
    arrayRemoveAll: PropTypes.func.isRequired,
    arrayPush: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    cro: PropTypes.array.isRequired,
    fetchAllStudyEmailNotificationsDashboard: PropTypes.func.isRequired,
    formError: PropTypes.bool.isRequired,
    formErrors: PropTypes.object,
    formValues: PropTypes.object,
    initialValues: PropTypes.object.isRequired,
    indications: PropTypes.array.isRequired,
    isOnTop: React.PropTypes.bool,
    removeCustomEmailNotification: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    initialFormValues: PropTypes.object,
    allCustomNotificationEmails: PropTypes.object,
    messagingNumbers: PropTypes.object.isRequired,
    protocols: PropTypes.array.isRequired,
    siteLocations: PropTypes.array.isRequired,
    sponsors: PropTypes.array.isRequired,
    usersByRoles: PropTypes.object.isRequired,
    setEditStudyFormValues: PropTypes.func,
    addTaggedIndicationForStudy: PropTypes.func,
    removeTaggedIndicationForStudy: PropTypes.func,
    startSubmit: PropTypes.func.isRequired,
    taggedIndicationsForStudy: PropTypes.object.isRequired,
    stopSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    updateDashboardStudy: PropTypes.func.isRequired,
  };

  static defaultProps = {
    formError: false,
    submitting: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      showIndicationPopover: false,
    };
    this.siteLocationChanged = this.siteLocationChanged.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.toggleIndicationPopover = this.toggleIndicationPopover.bind(this);
    this.onClose = this.onClose.bind(this);
    this.updateDashboardStudy = this.updateDashboardStudy.bind(this);
  }

  componentWillMount() {
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur(event.target.name, formattedPhoneNumber);
  }

  onClose() {
    const { onClose } = this.props;
    this.setState({ initial: true }, () => {
      onClose();
    });
  }

  siteLocationChanged(e) {
    const foundSiteLocation = _.find(this.props.siteLocations, (item) => (item.id === e));
    if (foundSiteLocation) {
      const { change, fetchAllStudyEmailNotificationsDashboard, initialFormValues } = this.props;
      fetchAllStudyEmailNotificationsDashboard(foundSiteLocation.client_id, initialFormValues.study_id);

      change('site_id', foundSiteLocation.id);
      change('site_city', foundSiteLocation.city);
      change('site_state', foundSiteLocation.state);
      change('site_country_code', foundSiteLocation.country_code);
      change('site_zip', foundSiteLocation.zip);
      change('client_id', foundSiteLocation.client_id);
      this.geoSuggest.update(foundSiteLocation.address);
    }
  }

  toggleIndicationPopover() {
    this.setState({
      showIndicationPopover: !this.state.showIndicationPopover,
    });
  }

  updateDashboardStudy(event) {
    event.preventDefault();
    const { formError, formErrors, formValues, initialFormValues, startSubmit, stopSubmit, updateDashboardStudy } = this.props;
    if (!formError) {
      startSubmit();
      // diff the updated form values
      const newParam = _.pickBy(formValues, (value, key) => (
        value !== initialFormValues[key]
      ));
      // delete tagged indications from the request because we already submitted the changes for the tagged indications
      delete newParam.taggedIndicationsForStudy;
      if (newParam.recruitment_phone) {
        newParam.recruitment_phone = normalizePhoneForServer(newParam.recruitment_phone);
      }
      // check the diff between the initial values of email notifications
      if (newParam.emailNotifications) {
        if (initialFormValues.emailNotifications) {
          newParam.emailNotifications = newParam.emailNotifications.filter((value, key) => (
            value.isChecked !== initialFormValues.emailNotifications[key].isChecked
          ));
        }
        // the diff'ed email notifications are empty, don't include in the request
        if (newParam.emailNotifications.length === 0) {
          delete newParam.emailNotifications;
        }
      }
      // check the diff between the initial values of custom email notifications
      if (newParam.customEmailNotifications) {
        if (initialFormValues.customEmailNotifications) {
          newParam.customEmailNotifications = newParam.customEmailNotifications.filter((value, key) => (
            value.isChecked !== initialFormValues.customEmailNotifications[key].isChecked
          ));
        }
        // the diff'ed email notifications are empty, don't include in the request
        if (newParam.customEmailNotifications.length === 0) {
          delete newParam.customEmailNotifications;
        }
      }
      updateDashboardStudy(initialFormValues.study_id, newParam, stopSubmit, formValues);
    } else if (formErrors.landingPageUrl) {
      toastr.error('', 'Error! Study Url is required.');
    }
  }

  renderIndications() {
    const { formValues, initialFormValues, removeTaggedIndicationForStudy } = this.props;
    if (formValues.taggedIndicationsForStudy) {
      return (
        <div className="category-list">
          {formValues.taggedIndicationsForStudy.map((indication) => (
            <div key={indication.value} className="category">
              <span className="link">
                <span className="text">{indication.label}</span>
                <span
                  className="icomoon-icon_trash"
                  onClick={() => {
                    removeTaggedIndicationForStudy(initialFormValues.study_id, indication);
                  }}
                />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

  render() {
    const { addEmailNotificationClick, addTaggedIndicationForStudy, change, cro, formValues, indications, initialFormValues, messagingNumbers, protocols,
      removeCustomEmailNotification, siteLocations, sponsors, submitting, usersByRoles } = this.props;

    if (formValues) {
      const smOptions = usersByRoles.sm.map(item => ({ value: item.id, label: `${item.first_name} ${item.last_name}` }));

      const bdOptions = usersByRoles.bd.map(item => ({ value: item.id, label: `${item.first_name} ${item.last_name}` }));

      const aeOptions = usersByRoles.ae.map(item => ({ value: item.id, label: `${item.first_name} ${item.last_name}` }));

      const siteLocationsOptions = siteLocations.map(item => ({ value: item.id, label: item.location }));

      const sponsorsOptions = sponsors.map(item => ({ value: item.id, label: item.name }));

      const protocolsOptions = protocols.map(item => ({ value: item.id, label: item.number }));

      const croOptions = cro.map(item => ({ value: item.id, label: item.name }));

      const indicationsOptions = indications.map(item => ({ value: item.id, label: item.name }));

      const studyValues = {
        id: initialFormValues.study_id ? initialFormValues.study_id : null,
        taggedIndicationsForStudy: formValues.taggedIndicationsForStudy ? formValues.taggedIndicationsForStudy : [],
      };

      const messagingNumbersOptions = messagingNumbers.details.map(item => ({
        value: item.id,
        label: item.phone_number,
      }));
      if (initialFormValues.text_number_id) {
        messagingNumbersOptions.unshift({
          value: initialFormValues.text_number_id,
          label: initialFormValues.phone_number,
        });
      }

      return (
        <Form className="form-holder" onSubmit={this.updateDashboardStudy}>
          <div className="frame">
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-first-name">STATUS</label>
              </strong>
              <div className="field">
                <Field
                  name="isPublic"
                  component={Toggle}
                  className="field"
                  onChange={(e) => {
                    change('isPublic', e);
                  }}
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label required">
                <label htmlFor="new-patient-first-name">STUDY URL</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  id="edit-information-page-name"
                  name="landingPageUrl"
                  component={Input}
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-first-name">STUDY NUMBER</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  id="edit-information-page-name"
                  name="study_id"
                  component={Input}
                  isDisabled
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">Ad Operation</label>
              </strong>
              <div className="field">
                <Field
                  name="sm_user_id"
                  component={ReactSelect}
                  placeholder="Select Ad Operation"
                  searchPlaceholder="Search"
                  searchable
                  options={smOptions}
                  customSearchIconClass="icomoon-icon_search2"
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">Business Development</label>
              </strong>
              <div className="field">
                <Field
                  name="bd_user_id"
                  component={ReactSelect}
                  placeholder="Select Business Development"
                  searchPlaceholder="Search"
                  searchable
                  options={bdOptions}
                  customSearchIconClass="icomoon-icon_search2"
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">Call Center</label>
              </strong>
              <div className="field">
                <Field
                  name="ae_user_id"
                  component={ReactSelect}
                  placeholder="Select Call Center"
                  searchPlaceholder="Search"
                  searchable
                  options={aeOptions}
                  customSearchIconClass="icomoon-icon_search2"
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">SITE LOCATION</label>
              </strong>
              <div className="field">
                <Field
                  name="site"
                  component={ReactSelect}
                  placeholder="Select Site Location"
                  searchPlaceholder="Search"
                  searchable
                  options={siteLocationsOptions}
                  onChange={(e) => {
                    this.siteLocationChanged(e);
                  }}
                  customSearchIconClass="icomoon-icon_search2"
                  clearable={false}
                  backspaceRemoves={false}
                  deleteRemoves={false}
                  disabled
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-email">SITE NUMBER</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  name="site"
                  component={Input}
                  isDisabled
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">SITE ADDRESS</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  name="site_address"
                  component={Input}
                  initialValue={initialFormValues.site_address}
                  isDisabled
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">CITY</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  name="site_city"
                  component={Input}
                  isDisabled
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">STATE / PROVINCE</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  name="site_state"
                  component={Input}
                  isDisabled
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">COUNTRY</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  name="site_country_code"
                  component={Input}
                  isDisabled
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">POSTAL CODE</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  id="editInfo-postalCode"
                  name="site_zip"
                  component={Input}
                  isDisabled
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">RECRUITMENT PHONE</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  name="recruitment_phone"
                  component={Input}
                  onBlur={this.onPhoneBlur}
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label>PRINCIPAL INVESTIGATOR</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  name="piName"
                  component={Input}
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label"><label>USER EMAIL NOTIFICATIONS</label></strong>
              <div className="field">
                <div className="emails-list-holder">
                  {<FieldArray
                    name="emailNotifications"
                    component={RenderEmailsList}
                    change={change}
                    formValues={formValues}
                    addEmailNotificationClick={addEmailNotificationClick}
                  />}
                </div>
              </div>
            </div>
            <div className="field-row">
              <strong className="label"><label>EMAIL NOTIFICATIONS</label></strong>
              <div className="field">
                <div className="emails-list-holder">
                  {<FieldArray
                    name="customEmailNotifications"
                    component={RenderCustomEmailsList}
                    change={change}
                    formValues={formValues}
                    addEmailNotificationClick={addEmailNotificationClick}
                    removeCustomEmailNotification={removeCustomEmailNotification}
                  />}
                </div>
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-first-name">PMS</label>
              </strong>
              <div className="field">
                <Field
                  name="patientMessagingSuite"
                  component={Toggle}
                  className="field"
                  onChange={(e) => {
                    change('patientMessagingSuite', e);
                  }}
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">MESSAGING NUMBER</label>
              </strong>
              <div className="field">
                <Field
                  name="messagingNumber"
                  component={ReactSelect}
                  placeholder="Select Messaging Number"
                  searchPlaceholder="Search"
                  searchable
                  options={messagingNumbersOptions}
                  customSearchIconClass="icomoon-icon_search2"
                  onChange={(messagingNumberId) => {
                    if (messagingNumberId) {
                      change('messagingNumber', parseInt(messagingNumberId));
                    }
                  }}
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">PROTOCOL</label>
              </strong>
              <div className="field">
                <Field
                  name="protocol_id"
                  component={ReactSelect}
                  placeholder="Select Protocol"
                  searchPlaceholder="Search"
                  searchable
                  clearable={false}
                  backspaceRemoves={false}
                  deleteRemoves={false}
                  options={protocolsOptions}
                  customSearchIconClass="icomoon-icon_search2"
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">SPONSOR</label>
              </strong>
              <div className="field">
                <Field
                  name="sponsor_id"
                  component={ReactSelect}
                  placeholder="Select Sponsor"
                  searchPlaceholder="Search"
                  searchable
                  options={sponsorsOptions}
                  customSearchIconClass="icomoon-icon_search2"
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-first-name">SPONSOR PORTAL</label>
              </strong>
              <div className="field">
                <Field
                  name="shouldShowInSponsorPortal"
                  component={Toggle}
                  className="field"
                  onChange={(e) => {
                    change('shouldShowInSponsorPortal', e);
                  }}
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">CRO</label>
              </strong>
              <div className="field">
                <Field
                  name="cro_id"
                  component={ReactSelect}
                  placeholder="Select CRO"
                  searchPlaceholder="Search"
                  searchable
                  options={croOptions}
                  customSearchIconClass="icomoon-icon_search2"
                  onChange={(e) => {
                    change('croId', e ? e.toString() : null);
                  }}
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">INDICATION</label>
              </strong>
              <div className="field">
                <Field
                  name="indication_id"
                  component={ReactSelect}
                  placeholder="Select Indication"
                  searchPlaceholder="Search"
                  searchable
                  clearable={false}
                  backspaceRemoves={false}
                  deleteRemoves={false}
                  options={indicationsOptions}
                  customSearchIconClass="icomoon-icon_search2"
                />
              </div>
            </div>
            <div className="field-row study-indication-hidden">
              <strong className="label">
                <label htmlFor="new-patient-phone"> </label>
              </strong>
              <div className="field">
                <Field
                  name="taggedIndicationsForStudy"
                  component={ReactSelect}
                  placeholder="Select Indication"
                  options={indicationsOptions}
                  multi
                  joinValues
                  objectValue
                  clearable={false}
                  disabled={submitting}
                  className="multiSelectWrap field"
                />
              </div>
            </div>
            <div className="field-row small-spacing">
              <strong className="label"> </strong>
              <div
                className="field add-indications"
                ref={(parent) => (
                  this.parent = parent
                )}
              >
                <Button
                  bsStyle="primary"
                  ref={(target) => (
                    this.target = target
                  )}
                  onClick={this.toggleIndicationPopover}
                >
                  + Add Indication
                </Button>
                <Overlay
                  show={this.state.showIndicationPopover}
                  placement="bottom"
                  container={this.parent}
                  target={() => this.target}
                  rootClose
                  onHide={() => {
                    this.toggleIndicationPopover();
                  }}
                >
                  <IndicationOverlay indications={indications} selectIndication={addTaggedIndicationForStudy} study={studyValues} onClose={this.toggleIndicationPopover} />
                </Overlay>
              </div>
            </div>
            {
              formValues.taggedIndicationsForStudy && formValues.taggedIndicationsForStudy.length > 0 &&
              <div className="field-row remove-indication small-spacing">
                <span className="label" />
                <div className="field">
                  {this.renderIndications()}
                </div>
              </div>
            }
            <div className="field-row">
              <strong className="label">
                <label>SUVODA CODE</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  name="suvoda_protocol_id"
                  component={Input}
                  placeholder=""
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">DELETE PATIENT</label>
              </strong>
              <div className="field">
                <Field
                  name="canDeletePatient"
                  component={Toggle}
                  className="field"
                  onChange={(e) => {
                    if (e === false) change('canDeletePatient', e.toString());
                  }}
                />
              </div>
            </div>
            <div className="field-row text-right">
              <Button type="submit" bsStyle="primary" className="fixed-small-btn" disabled={submitting}>
                {submitting
                  ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                  : <span>UPDATE</span>
                }
              </Button>
            </div>
          </div>
        </Form>
      );
    }
    return null;
  }
}
