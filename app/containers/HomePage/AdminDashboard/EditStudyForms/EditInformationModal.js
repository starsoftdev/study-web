/**
 * Created by mike on 10/11/16.
 */

import React, { PropTypes } from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import moment from 'moment';
import Toggle from '../../../../components/Input/Toggle';
import Input from '../../../../components/Input/index';
import DatePicker from '../../../../components/Input/DatePicker';
import ReactSelect from '../../../../components/Input/ReactSelect';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, FieldArray, reduxForm, change, arrayRemoveAll, arrayPush } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';
import RenderEmailsList from './RenderEmailsList';
import _ from 'lodash';
import { selectStudyCampaigns } from '../selectors';

const mapStateToProps = createStructuredSelector({
  studyCampaigns: selectStudyCampaigns(),
});

@reduxForm({ form: 'dashboardEditStudyForm' })
@connect(mapStateToProps)

export class EditInformationModal extends React.Component {
  static propTypes = {
    openModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    formValues: PropTypes.object,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    handleSubmit: PropTypes.func,
    usersByRoles: PropTypes.object,
    siteLocations: PropTypes.array,
    sponsors: PropTypes.array,
    protocols: PropTypes.array,
    cro: PropTypes.array,
    levels: PropTypes.array,
    indications: PropTypes.array,
    fetchAllClientUsersDashboard: PropTypes.func,
    allClientUsers: PropTypes.object,
    addEmailNotificationClick: PropTypes.func,
    studyCampaigns: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.siteLocationChanged = this.siteLocationChanged.bind(this);
    this.campaignChanged = this.campaignChanged.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.studyCampaigns.fetching && !newProps.studyCampaigns.fetching) {
      // newProps.allClientUsers.details
    }

    if (this.props.allClientUsers.fetching && !newProps.allClientUsers.fetching) {
      const fields = [];
      let isAllChecked = true;

      let studyEmailUsers = this.props.formValues.study_notification_users;

      if (studyEmailUsers) {
        studyEmailUsers = studyEmailUsers.substr(studyEmailUsers.indexOf('{') + 1);
        studyEmailUsers = studyEmailUsers.substr(0, studyEmailUsers.indexOf('}'));
        studyEmailUsers = studyEmailUsers.split(',');

        _.forEach(newProps.allClientUsers.details, (item) => {
          const isChecked = _.find(studyEmailUsers, (o) => (parseInt(o) === item.user_id));
          if (!isChecked) {
            isAllChecked = false;
          }
          fields.push({
            firstName: item.first_name,
            lastName: item.last_name,
            userId: item.user_id,
            isChecked,
          });
        });

        this.props.dispatch(arrayRemoveAll('dashboardEditStudyForm', 'emailNotifications'));
        fields.map((newItem) => (this.props.dispatch(arrayPush('dashboardEditStudyForm', 'emailNotifications', newItem))));
        this.props.dispatch(change('dashboardEditStudyForm', 'checkAllInput', isAllChecked));
      }
    }
  }

  siteLocationChanged(e) {
    const foundSiteLocation = _.find(this.props.siteLocations, (item) => (item.id === e));
    if (foundSiteLocation) {
      this.props.fetchAllClientUsersDashboard(foundSiteLocation.client_id);

      this.props.dispatch(change('dashboardEditStudyForm', 'site_id', foundSiteLocation.id));
      this.props.dispatch(change('dashboardEditStudyForm', 'site_address', foundSiteLocation.address));
      this.props.dispatch(change('dashboardEditStudyForm', 'site_city', foundSiteLocation.city));
      this.props.dispatch(change('dashboardEditStudyForm', 'site_state', foundSiteLocation.state));
      this.props.dispatch(change('dashboardEditStudyForm', 'site_zip', foundSiteLocation.zip));
      this.props.dispatch(change('dashboardEditStudyForm', 'redirect_phone', foundSiteLocation.redirect_phone));
      this.props.dispatch(change('dashboardEditStudyForm', 'client_id', foundSiteLocation.client_id));
    }
  }

  campaignChanged(e) {
    const foundCampaign = _.find(this.props.studyCampaigns.details, (item) => (item.id === e));
    if (foundCampaign) {
      this.props.dispatch(change('dashboardEditStudyForm', 'campaign_datefrom', foundCampaign.datefrom));
      this.props.dispatch(change('dashboardEditStudyForm', 'campaign_dateto', foundCampaign.dateto));
      this.props.dispatch(change('dashboardEditStudyForm', 'custom_patient_goal', foundCampaign.custom_patient_goal));
      this.props.dispatch(change('dashboardEditStudyForm', 'level_id', foundCampaign.level_id));
    }
  }


  render() {
    const { openModal, onClose } = this.props;
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

    const exposureLevelOptions = [];
    _.forEach(this.props.levels, (level) => {
      exposureLevelOptions.push({
        value: level.id,
        label: level.name,
      });
    });


    const messagingNumbers = [
      { label: '(524) 999-1234', value: '5249991234', id: 1 },
      { label: '(524) 666-2345', value: '524666-2345', id: 2 },
      { label: '(524) 111-1234', value: '524111-1234', id: 3 },
      { label: '(524) 440-9874', value: '524440-9874', id: 4 },
      { label: '(524) 599-3214', value: '524599-3214', id: 5 },
    ];

    let campaignOptions = [];

    for (let i = 0; i < this.props.studyCampaigns.details.length; i++) {
      if (i === 0) {
        campaignOptions.push({ label: 'Oldest', value: this.props.studyCampaigns.details[i].id });
      } else if ((i + 1) === this.props.studyCampaigns.details.length) {
        campaignOptions.push({ label: 'Newest', value: this.props.studyCampaigns.details[i].id });
      } else {
        campaignOptions.push({ label: i, value: this.props.studyCampaigns.details[i].id });
      }
    }

    campaignOptions = campaignOptions.reverse();

    const campaignDateFrom = moment(this.props.formValues.campaign_datefrom);

    return (
      <Collapse dimension="width" in={openModal} timeout={250} className="form-edit-information">
        <div>
          <div className="form-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">EDIT INFORMATION</strong>
                <a href="#" className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right"></i></a>
              </div>
            </div>
            <Form className="form-holder" onSubmit={this.props.handleSubmit}>
              <div className="frame">
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">Status</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="is_active"
                      component={Toggle}
                      className="field"
                      onChange={(e) => { this.props.dispatch(change('dashboardEditStudyForm', 'is_public', e.toString())); }}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">Study Number</label>
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
                    <label htmlFor="new-patient-phone">Site Location</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="site_location_form"
                      component={ReactSelect}
                      placeholder="Select Location"
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
                    <label htmlFor="new-patient-email">Site Number</label>
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
                  <strong className="label required">
                    <label htmlFor="new-patient-phone">Site Address</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="site_address"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">City</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="site_city"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">State / Province</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="site_state"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Postal Code</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      id="editInfo-postalCode"
                      name="site_zip"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Recruitment Phone</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="recruitment_phone"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label"><label>EMAIL NOTIFICATIONS</label></strong>
                  <div className="field">
                    <div className="emails-list-holder">
                      {<FieldArray
                        name="emailNotifications"
                        component={RenderEmailsList}
                        formValues={this.props.formValues}
                        dispatch={this.props.dispatch}
                        addEmailNotification={this.props.addEmailNotificationClick}
                        closeEmailNotification={this.closeAddEmailModal}
                      />}
                    </div>

                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Messaging Number</label>
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
                    />
                  </div>
                </div>
                <div className="field-row add-messaging-number-row">
                  <strong className="label"> </strong>
                  <a href="#popup-add-messaging-number" className="link-add-messaging-number lightbox-opener">+ Add Messaging Number</a>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Redirect Number</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="redirect_phone"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Protocol</label>
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
                    <label htmlFor="new-patient-phone">Sponsor</label>
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
                    <label htmlFor="new-patient-first-name">Sponsor Portal</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="should_show_in_sponsor_portal"
                      component={Toggle}
                      className="field"
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
                      placeholder="Select Cro"
                      searchPlaceholder="Search"
                      searchable
                      options={croOptions}
                      customSearchIconClass="icomoon-icon_search2"
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Indication</label>
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
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Exposure Level</label>
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
                    <label htmlFor="new-patient-phone">Campaign</label>
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
                    <label htmlFor="new-patient-phone">Start Date</label>
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
                    <label htmlFor="new-patient-phone">End Date</label>
                  </strong>
                  <div className="field">
                    <Field
                      id="end-date"
                      name="campaign_dateto"
                      component={DatePicker}
                      className="form-control datepicker-input"
                      initialDate={moment(this.props.formValues.campaign_dateto)}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Custom Goal</label>
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
                  <Button type="submit" bsStyle="primary"> Submit </Button>
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

