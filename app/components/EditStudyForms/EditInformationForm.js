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

import { normalizePhoneDisplay, normalizePhoneForServer } from '../../common/helper/functions';
import Toggle from '../../components/Input/Toggle';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import LoadingSpinner from '../../components/LoadingSpinner';
import RenderEmailsList from './RenderEmailsList';
import RenderCustomEmailsList from './RenderCustomEmailsList';
import FormGeosuggest from '../../components/Input/Geosuggest';
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
  fetchAllClientUsersDashboard,
  removeTaggedIndicationForStudy,
  updateDashboardStudy,
} from '../../containers/HomePage/AdminDashboard/actions';
import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';
import IndicationOverlay from './IndicationOverlay';
import formValidator from './validator';

const formName = 'Dashboard.EditStudyForm';

const mapStateToProps = createStructuredSelector({
  cro: selectCro(),
  formError: selectSyncErrorBool(formName),
  formValues: selectValues(formName),
  indications: selectIndications(),
  messagingNumbers: selectMessagingNumbers(),
  protocols: selectProtocols(),
  siteLocations: selectSiteLocations(),
  sponsors: selectSponsors(),
  taggedIndicationsForStudy: selectTaggedIndicationsForStudy(),
  usersByRoles: selectUsersByRoles(),
});

const mapDispatchToProps = (dispatch) => ({
  blur: (field, value) => dispatch(blur(formName, field, value)),
  addTaggedIndicationForStudy: (studyId, indicationId) => dispatch(addTaggedIndicationForStudy(studyId, indicationId)),
  arrayRemoveAll: (field) => dispatch(arrayRemoveAll(formName, field)),
  arrayPush: (field, value) => dispatch(arrayPush(formName, field, value)),
  change: (field, value) => dispatch(change(formName, field, value)),
  fetchAllClientUsersDashboard: (clientId, siteId) => dispatch(fetchAllClientUsersDashboard(clientId, siteId)),
  removeCustomEmailNotification: (payload) => dispatch(removeCustomEmailNotification(payload)),
  removeTaggedIndicationForStudy: (studyId, indicationId) => dispatch(removeTaggedIndicationForStudy(studyId, indicationId)),
  startSubmit: () => dispatch(startSubmit(formName)),
  stopSubmit: (errors) => dispatch(stopSubmit(formName, errors)),
  updateDashboardStudy: (id, params, stopSubmit) => dispatch(updateDashboardStudy(id, params, stopSubmit)),
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
    fetchAllClientUsersDashboard: PropTypes.func.isRequired,
    formError: PropTypes.bool.isRequired,
    formValues: PropTypes.object,
    initialValues: PropTypes.object.isRequired,
    indications: PropTypes.array.isRequired,
    isOnTop: React.PropTypes.bool,
    removeCustomEmailNotification: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
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
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.toggleIndicationPopover = this.toggleIndicationPopover.bind(this);
    this.onClose = this.onClose.bind(this);
    this.updateDashboardStudy = this.updateDashboardStudy.bind(this);
  }

  componentWillMount() {
  }

  onSuggestSelect(e) {
    let city = '';
    let state = '';
    let postalCode = '';
    let streetNmber = '';
    let countryCode = '';
    let route = '';
    const { change } = this.props;
    if (e.gmaps && e.gmaps.address_components) {
      const addressComponents = e.gmaps.address_components;

      for (const val of addressComponents) {
        if (!city) {
          city = _.find(val.types, (o) => (o === 'locality'));
          if (city) {
            change('site_city', val.long_name);
          }
        }
        if (!state) {
          state = _.find(val.types, (o) => (o === 'administrative_area_level_1'));
          if (state) {
            change('site_state', val.short_name);
          }
        }
        if (!countryCode) {
          countryCode = _.find(val.types, (o) => (o === 'country'));
          if (countryCode) {
            change('site_country_code', val.short_name);
          }
        }
        if (!postalCode) {
          postalCode = _.find(val.types, (o) => (o === 'postal_code'));
          if (postalCode) {
            change('site_zip', val.long_name);
          }
        }
        if (!streetNmber && _.find(val.types, (o) => (o === 'street_number'))) {
          streetNmber = val.long_name;
        }
        if (!route && _.find(val.types, (o) => (o === 'route'))) {
          route = val.long_name;
        }
        if (streetNmber && route) {
          this.geoSuggest.update(`${streetNmber} ${route}`);
        } else {
          const addressArr = e.label.split(',');
          this.geoSuggest.update(`${addressArr[0]}`);
        }
      }
    } else {
      const addressArr = e.label.split(',');
      if (addressArr[1]) {
        change('site_city', addressArr[1]);
      }
      if (addressArr[2]) {
        change('site_state', addressArr[2]);
      }
      if (addressArr[3]) {
        change('site_country_code', addressArr[3]);
      }
      this.geoSuggest.update(`${addressArr[0]}`);
    }
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
      const { change, fetchAllClientUsersDashboard } = this.props;
      fetchAllClientUsersDashboard(foundSiteLocation.client_id, foundSiteLocation.id);

      change('site_id', foundSiteLocation.id);
      change('site_city', foundSiteLocation.city);
      change('site_state', foundSiteLocation.state);
      change('site_country_code', foundSiteLocation.country_code);
      change('site_zip', foundSiteLocation.zip);
      change('client_id', foundSiteLocation.client_id);
      this.geoSuggest.update(foundSiteLocation.address);
    }
  }

  deleteIndication(studyId, indication) {
    const { change, formValues: { taggedIndicationsForStudy }, removeTaggedIndicationForStudy } = this.props;
    // submit the tagged indication to be added
    removeTaggedIndicationForStudy(studyId, indication.value);
  }

  toggleIndicationPopover() {
    this.setState({
      showIndicationPopover: !this.state.showIndicationPopover,
    });
  }

  updateDashboardStudy(event) {
    event.preventDefault();
    const { formError, formValues, initialValues, startSubmit, stopSubmit, updateDashboardStudy } = this.props;
    if (!formError) {
      startSubmit();
      // diff the updated form values
      const newParam = _.pickBy(formValues, (value, key) => (
        value !== initialValues[key]
      ));
      if (newParam.recruitment_phone) {
        newParam.recruitment_phone = normalizePhoneForServer(newParam.recruitment_phone);
      }
      updateDashboardStudy(initialValues.study_id, newParam, stopSubmit);
    }
  }

  renderIndications() {
    const { formValues, initialValues } = this.props;
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
                    this.deleteIndication(initialValues.study_id, indication);
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
    const { addEmailNotificationClick, addTaggedIndicationForStudy, change, cro, formValues, indications, initialValues, messagingNumbers, protocols,
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
        id: initialValues.study_id ? initialValues.study_id : null,
        taggedIndicationsForStudy: formValues.taggedIndicationsForStudy ? formValues.taggedIndicationsForStudy : [],
      };

      const messagingNumbersOptions = messagingNumbers.details.map(item => ({
        value: item.id,
        label: item.phone_number,
      }));
      if (formValues.text_number_id) {
        messagingNumbersOptions.unshift({
          value: formValues.text_number_id,
          label: formValues.phone_number,
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
                  name="is_active"
                  component={Toggle}
                  className="field"
                  onChange={(e) => {
                    change('is_public', e.toString());
                  }}
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-first-name">STUDY URL</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  id="edit-information-page-name"
                  name="landing_page_url"
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
                <label htmlFor="new-patient-phone">SM</label>
              </strong>
              <div className="field">
                <Field
                  name="sm_user_id"
                  component={ReactSelect}
                  placeholder="Select SM"
                  searchPlaceholder="Search"
                  searchable
                  options={smOptions}
                  customSearchIconClass="icomoon-icon_search2"
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">BD</label>
              </strong>
              <div className="field">
                <Field
                  name="bd_user_id"
                  component={ReactSelect}
                  placeholder="Select BD"
                  searchPlaceholder="Search"
                  searchable
                  options={bdOptions}
                  customSearchIconClass="icomoon-icon_search2"
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-phone">AE</label>
              </strong>
              <div className="field">
                <Field
                  name="ae_user_id"
                  component={ReactSelect}
                  placeholder="Select AE"
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
                  name="site_id"
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
                  name="site_address"
                  component={FormGeosuggest}
                  initialValue={initialValues.site_address}
                  refObj={(el) => {
                    this.geoSuggest = el;
                  }}
                  onSuggestSelect={this.onSuggestSelect}
                  placeholder=""
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
                    addEmailNotification={addEmailNotificationClick}
                    closeEmailNotification={this.closeAddEmailModal}
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
                    addEmailNotification={addEmailNotificationClick}
                    closeEmailNotification={this.closeAddEmailModal}
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
                  name="patient_messaging_suite"
                  component={Toggle}
                  className="field"
                  onChange={(e) => {
                    change('patientMessagingSuite', e.toString());
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
                  onChange={(e) => {
                    change('messaging_number', e.toString());
                  }}
                />
              </div>
            </div>
            {/* <div className="field-row add-messaging-number-row">
            <strong className="label"> </strong>
            <a href="#popup-add-messaging-number" className="link-add-messaging-number lightbox-opener">+ Add Messaging Number</a>
          </div> */}
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
                  name="should_show_in_sponsor_portal"
                  component={Toggle}
                  className="field"
                  onChange={(e) => {
                    change('shouldShowInSponsorPortal', e.toString());
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
                  <IndicationOverlay indications={indications} selectIndication={addTaggedIndicationForStudy} study={studyValues} onClose={this.toggleIndicationPopover}/>
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
