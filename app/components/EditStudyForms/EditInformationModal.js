/**
 * Created by mike on 10/11/16.
 */

import classNames from 'classnames';
import _ from 'lodash';
import React, { PropTypes } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { arrayRemoveAll, arrayPush, change, Field, FieldArray, reduxForm, blur } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Collapse from 'react-bootstrap/lib/Collapse';
import Form from 'react-bootstrap/lib/Form';
import Overlay from 'react-bootstrap/lib/Overlay';

import IndicationOverlay from './IndicationOverlay';
import Toggle from '../../components/Input/Toggle';
import Input from '../../components/Input/index';
import DatePicker from '../../components/Input/DatePicker';
import ReactSelect from '../../components/Input/ReactSelect';
import LoadingSpinner from '../../components/LoadingSpinner';
import RenderEmailsList from './RenderEmailsList';
import RenderCustomEmailsList from './RenderCustomEmailsList';
import { selectStudyCampaigns } from '../../containers/HomePage/AdminDashboard/selectors';
import FormGeosuggest from '../../components/Input/Geosuggest';
import { normalizePhoneDisplay } from '../../common/helper/functions';
import { addStudyIndicationTag, removeStudyIndicationTag } from '../../containers/HomePage/AdminDashboard/actions';

const formName = 'dashboardEditStudyForm';

const mapStateToProps = createStructuredSelector({
  studyCampaigns: selectStudyCampaigns(),
  // formValues: selectValues(formName),
});

const mapDispatchToProps = (dispatch) => ({
  blur: (field, value) => dispatch(blur(formName, field, value)),
  arrayRemoveAll: (field) => dispatch(arrayRemoveAll(formName, field)),
  arrayPush: (field, value) => dispatch(arrayPush(formName, field, value)),
  change: (field, value) => dispatch(change(formName, field, value)),
  addStudyIndicationTag: (studyId, indicationId) => dispatch(addStudyIndicationTag(studyId, indicationId)),
  removeStudyIndicationTag: (studyId, indicationId) => dispatch(removeStudyIndicationTag(studyId, indicationId)),
});

@reduxForm({ form: formName })
@connect(mapStateToProps, mapDispatchToProps)
export class EditInformationModal extends React.Component {
  static propTypes = {
    addEmailNotificationClick: PropTypes.func.isRequired,
    blur: React.PropTypes.func.isRequired,
    allClientUsers: PropTypes.object,
    arrayRemoveAll: PropTypes.func.isRequired,
    arrayPush: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    cro: PropTypes.array,
    fetchAllClientUsersDashboard: PropTypes.func.isRequired,
    formValues: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    removeCustomEmailNotification: PropTypes.func.isRequired,
    indications: PropTypes.array,
    isOnTop: React.PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onHide: PropTypes.func,
    openModal: PropTypes.bool.isRequired,
    onShow: PropTypes.func,
    levels: PropTypes.array,
    allCustomNotificationEmails: PropTypes.object,
    messagingNumbers: PropTypes.object,
    protocols: PropTypes.array,
    siteLocations: PropTypes.array,
    sponsors: PropTypes.array,
    study: PropTypes.object,
    studyCampaigns: PropTypes.object,
    usersByRoles: PropTypes.object,
    setEditStudyFormValues: PropTypes.func,
    studyUpdateProcess: PropTypes.object,
    addStudyIndicationTag: PropTypes.func,
    removeStudyIndicationTag: PropTypes.func,
    studyIndicationTags: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      showIndicationPopover: false,
    };
    this.siteLocationChanged = this.siteLocationChanged.bind(this);
    this.campaignChanged = this.campaignChanged.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.toggleIndicationPopover = this.toggleIndicationPopover.bind(this);
    this.selectIndication = this.selectIndication.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { allClientUsers, formValues } = this.props;
    if (allClientUsers.fetching && !newProps.allClientUsers.fetching) {
      const fields = [];
      let isAllChecked = true;

      let studyEmailUsers = formValues.study_notification_users;

      if (studyEmailUsers) { // notification emails
        studyEmailUsers = studyEmailUsers.substr(studyEmailUsers.indexOf('{') + 1);
        studyEmailUsers = studyEmailUsers.substr(0, studyEmailUsers.indexOf('}'));
        studyEmailUsers = studyEmailUsers.split(',');

        _.forEach(newProps.allClientUsers.details, (item) => {
          const isChecked = _.find(studyEmailUsers, (o) => (parseInt(o) === item.user_id));
          if (!isChecked) {
            isAllChecked = false;
          }
          fields.push({
            email: item.email,
            userId: item.user_id,
            isChecked,
          });
        });

        const newFormValues = {};
        newFormValues.emailNotifications = fields;
        newFormValues.checkAllInput = isAllChecked;
        this.props.setEditStudyFormValues(newFormValues);
      }
    }

    if (!newProps.allCustomNotificationEmails.fetching && newProps.allCustomNotificationEmails.details) {
      const customFields = [];
      let isAllCustomChecked = (newProps.allCustomNotificationEmails.details.length);
      const customEmailNotifications = newProps.formValues.customEmailNotifications;

      _.forEach(newProps.allCustomNotificationEmails.details, (item) => {
        const local = _.find(customEmailNotifications, (o) => (o.id === item.id));
        let isChecked = (item.type === 'active');
        if (local) {
          isChecked = local.isChecked;
          if (!isChecked) {
            isAllCustomChecked = false;
          }
        }

        customFields.push({
          id: item.id,
          email: item.email,
          isChecked,
        });
      });

      const newFormValues = {};
      newFormValues.customEmailNotifications = customFields;
      newFormValues.checkAllCustomInput = isAllCustomChecked;
      this.props.setEditStudyFormValues(newFormValues);
    }

    if (!newProps.studyIndicationTags.fetching && newProps.studyIndicationTags.details) {
      const customFields = [];
      _.forEach(newProps.studyIndicationTags.details, (item) => {
        customFields.push({
          value: item.indication_id,
          label: item.name,
        });
      });

      const newFormValues = {};
      newFormValues.indicationTags = customFields;
      this.props.setEditStudyFormValues(newFormValues);
    }
  }

  onSuggestSelect(e) {
    let city = '';
    let state = '';
    let postalCode = '';
    let streetNmber = '';
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
        if (!postalCode) {
          postalCode = _.find(val.types, (o) => (o === 'postal_code'));
          if (postalCode) {
            change('site_zip', val.long_name);
          }
        }
        if (!streetNmber && _.find(val.types, (o) => (o === 'street_number'))) {
          streetNmber = val.short_name;
        }
        if (!route && _.find(val.types, (o) => (o === 'route'))) {
          route = val.short_name;
        }
        if (streetNmber && route) {
          this.geoSuggest.update(`${streetNmber} ${route}`);
          change('site_address', `${streetNmber} ${route}`);
        } else {
          const addressArr = e.label.split(',');
          this.geoSuggest.update(`${addressArr[0]}`);
          change('site_address', `${addressArr[0]}`);
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
      this.geoSuggest.update(`${addressArr[0]}`);
      change('site_address', `${addressArr[0]}`);
    }
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur(event.target.name, formattedPhoneNumber);
  }

  siteLocationChanged(e) {
    const foundSiteLocation = _.find(this.props.siteLocations, (item) => (item.id === e));
    if (foundSiteLocation) {
      const { change, fetchAllClientUsersDashboard } = this.props;
      fetchAllClientUsersDashboard({ clientId: foundSiteLocation.client_id, siteId: foundSiteLocation.id });

      change('site_id', foundSiteLocation.id);
      change('site_address', foundSiteLocation.address);
      change('site_city', foundSiteLocation.city);
      change('site_state', foundSiteLocation.state);
      change('site_zip', foundSiteLocation.zip);
      change('client_id', foundSiteLocation.client_id);
    }
  }

  campaignChanged(e) {
    const foundCampaign = _.find(this.props.studyCampaigns.details, (item) => (item.id === e));
    if (foundCampaign) {
      const { change } = this.props;
      change('campaign_datefrom', foundCampaign.datefrom);
      change('campaign_dateto', foundCampaign.dateto);
      change('custom_patient_goal', foundCampaign.custom_patient_goal);
      change('level_id', foundCampaign.level_id);
      change('patient_qualification_suite', foundCampaign.patient_qualification_suite);
    }
  }

  selectIndication(studyId, indication) {
    const { change, formValues, addStudyIndicationTag } = this.props;
    change('indicationTags', formValues.indicationTags.concat([{
      value: indication.id,
      label: indication.name,
    }]));
    addStudyIndicationTag(studyId, indication.id);
  }

  deleteIndication(studyId, indication) {
    const { change, formValues: { indicationTags }, removeStudyIndicationTag } = this.props;
    const newArr = _.remove(indicationTags, (n) => (n.id !== indication.id));
    change('indicationTags', newArr);
    removeStudyIndicationTag(studyId, indication.value);
  }

  toggleIndicationPopover() {
    this.setState({
      showIndicationPopover: !this.state.showIndicationPopover,
    });
  }

  renderIndications() {
    const { formValues } = this.props;
    if (formValues.indicationTags) {
      return (
        <div className="category-list">
          {formValues.indicationTags.map((indication) => (
            <div key={indication.id} className="category">
              <span className="link">
                <span className="text">{indication.label}</span>
                <span
                  className="icomoon-icon_trash"
                  onClick={() => {
                    this.deleteIndication(formValues.study_id, indication);
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
    const { change, openModal, onClose } = this.props;
    const smOptions = [];

    _.forEach(this.props.usersByRoles.sm, (item) => {
      smOptions.push({
        value: item.id,
        label: `${item.first_name} ${item.last_name}`,
      });
    });

    const bdOptions = [];
    _.forEach(this.props.usersByRoles.bd, (item) => {
      bdOptions.push({
        value: item.id,
        label: `${item.first_name} ${item.last_name}`,
      });
    });

    const aeOptions = [];
    _.forEach(this.props.usersByRoles.ae, (item) => {
      aeOptions.push({
        value: item.id,
        label: `${item.first_name} ${item.last_name}`,
      });
    });

    const siteLocationsOptions = [];
    _.forEach(this.props.siteLocations, (item) => {
      siteLocationsOptions.push({
        value: item.id,
        label: item.location,
      });
    });

    const sponsorsOptions = [];
    _.forEach(this.props.sponsors, (item) => {
      sponsorsOptions.push({
        value: item.id,
        label: item.name,
      });
    });

    const protocolsOptions = [];
    _.forEach(this.props.protocols, (item) => {
      protocolsOptions.push({
        value: item.id,
        label: item.number,
      });
    });

    const croOptions = [];
    _.forEach(this.props.cro, (item) => {
      croOptions.push({
        value: item.id,
        label: item.name,
      });
    });

    const indicationsOptions = [];
    _.forEach(this.props.indications, (item) => {
      indicationsOptions.push({
        value: item.id,
        label: item.name,
      });
    });

    const studyValues = {
      id: this.props.formValues.study_id ? this.props.formValues.study_id : null,
      indicationTags: [],
    };

    const exposureLevelOptions = [];
    _.forEach(this.props.levels, (level) => {
      exposureLevelOptions.push({
        value: level.id,
        label: level.name,
      });
    });

    const messagingNumbers = [];
    if (this.props.formValues.text_number_id) {
      messagingNumbers.push({
        value: this.props.formValues.text_number_id,
        label: this.props.formValues.phone_number,
      });
    }
    _.forEach(this.props.messagingNumbers.details, (number) => {
      messagingNumbers.push({
        value: number.id,
        label: number.phone_number,
      });
    });


    let campaignOptions = [];

    for (let i = 0; i < this.props.studyCampaigns.details.length; i++) {
      if (i === 0) {
        campaignOptions.push({ label: '1', value: this.props.studyCampaigns.details[i].id });
      } else if (this.props.studyCampaigns.details[i].is_current) {
        campaignOptions.push({ label: 'Current', value: this.props.studyCampaigns.details[i].id });
      } else {
        campaignOptions.push({ label: (i + 1), value: this.props.studyCampaigns.details[i].id });
      }
    }

    campaignOptions = campaignOptions.reverse();

    const campaignDateFrom = this.props.formValues.campaign_datefrom ? moment(this.props.formValues.campaign_datefrom) : null;
    const campaignDateTo = this.props.formValues.campaign_dateto ? moment(this.props.formValues.campaign_dateto) : null;

    return (
      <Collapse dimension="width" in={openModal} timeout={250} className={classNames('form-lightbox', 'form-edit-information', (this.props.isOnTop > 0 ? 'slider-on-top' : ''))}>
        <div>
          <div className="form-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">EDIT INFORMATION</strong>
                <a className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right" /></a>
              </div>
            </div>
            <Form className="form-holder" onSubmit={this.props.handleSubmit}>
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
                      onChange={(e) => { change('is_public', e.toString()); }}
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
                      name="site_location_form"
                      component={ReactSelect}
                      placeholder="Select Site Location"
                      searchPlaceholder="Search"
                      searchable
                      options={siteLocationsOptions}
                      onChange={(e) => { this.siteLocationChanged(e); }}
                      customSearchIconClass="icomoon-icon_search2"
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
                      refObj={(el) => { this.geoSuggest = el; }}
                      onSuggestSelect={this.onSuggestSelect}
                      initialValue={this.props.formValues.site_address}
                      placeholder=""
                    />
                    {/* <Field
                      type="text"
                      name="site_address"
                      component={Input}
                    />*/}
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
                  <strong className="label required">
                    <label>PRINCIPAL INVESTIGATOR</label>
                  </strong>
                  <div className="field">
                    <div className="row">
                      <div className="col pull-left dashboard-edit-study-pi">
                        <Field
                          name="piFirstName"
                          component={Input}
                          type="text"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="col pull-left dashboard-edit-study-pi">
                        <Field
                          name="piLastName"
                          component={Input}
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label"><label>USER EMAIL NOTIFICATIONS</label></strong>
                  <div className="field">
                    <div className="emails-list-holder">
                      {<FieldArray
                        name="emailNotifications"
                        component={RenderEmailsList}
                        formValues={this.props.formValues}
                        change={change}
                        addEmailNotification={this.props.addEmailNotificationClick}
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
                        formValues={this.props.formValues}
                        change={change}
                        addEmailNotification={this.props.addEmailNotificationClick}
                        closeEmailNotification={this.closeAddEmailModal}
                        removeCustomEmailNotification={this.props.removeCustomEmailNotification}
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
                      onChange={(e) => { change('patientMessagingSuite', e.toString()); }}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">PQS</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="patient_qualification_suite"
                      component={Toggle}
                      className="field"
                      onChange={(e) => { change('patientQualificationSuite', e.toString()); }}
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
                      options={messagingNumbers}
                      customSearchIconClass="icomoon-icon_search2"
                      onChange={(e) => { change('messaging_number', e.toString()); }}
                    />
                  </div>
                </div>
                {/* <div className="field-row add-messaging-number-row">
                  <strong className="label"> </strong>
                  <a href="#popup-add-messaging-number" className="link-add-messaging-number lightbox-opener">+ Add Messaging Number</a>
                </div>*/}
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
                      onChange={(e) => { change('shouldShowInSponsorPortal', e.toString()); }}
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
                      onChange={(e) => { change('croId', e ? e.toString() : null); }}
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
                      name="indicationTags"
                      component={ReactSelect}
                      placeholder="Select Indication"
                      options={indicationsOptions}
                      multi
                      joinValues
                      objectValue
                      clearable={false}
                      disabled={this.props.studyUpdateProcess.saving}
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
                      onHide={() => { this.toggleIndicationPopover(); }}
                    >
                      <IndicationOverlay indications={this.props.indications} selectIndication={this.selectIndication} study={studyValues} onClose={this.toggleIndicationPopover} />
                    </Overlay>
                  </div>
                </div>
                {
                  this.props.formValues.indicationTags && this.props.formValues.indicationTags.length > 0 &&
                  <div className="field-row remove-indication small-spacing">
                    <span className="label" />
                    <div className="field">
                      {this.renderIndications()}
                    </div>
                  </div>
                }
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">EXPOSURE LEVEL</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="level_id"
                      component={ReactSelect}
                      placeholder="Select Exposure Level"
                      searchPlaceholder="Search"
                      searchable
                      options={exposureLevelOptions}
                      customSearchIconClass="icomoon-icon_search2"
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">CAMPAIGN</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="campaign_id"
                      component={ReactSelect}
                      placeholder="Select Campaign"
                      searchPlaceholder="Search"
                      searchable
                      options={campaignOptions}
                      onChange={(e) => { this.campaignChanged(e); }}
                      customSearchIconClass="icomoon-icon_search2"
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">START DATE</label>
                  </strong>
                  <div className="field">
                    <Field
                      id="start-date"
                      name="campaign_datefrom"
                      component={DatePicker}
                      className="form-control datepicker-input"
                      initialDate={campaignDateFrom}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">END DATE</label>
                  </strong>
                  <div className="field">
                    <Field
                      id="end-date"
                      name="campaign_dateto"
                      component={DatePicker}
                      className="form-control datepicker-input"
                      initialDate={campaignDateTo}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">CUSTOM GOAL</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="custom_patient_goal"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row text-right">
                  <Button type="submit" bsStyle="primary" className="fixed-small-btn">
                    {this.props.studyUpdateProcess.saving
                      ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                      : <span>UPDATE</span>
                    }
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Collapse>
    );
  }
}

export default EditInformationModal;

