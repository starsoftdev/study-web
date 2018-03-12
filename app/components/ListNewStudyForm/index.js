/**
*
* ListNewStudyForm
*
*/

import React, { PropTypes } from 'react';
import { Field, FieldArray, reduxForm, change, blur } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment-timezone';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';

import { normalizePhoneDisplay } from '../../../app/common/helper/functions';
import CenteredModal from '../../components/CenteredModal/index';
import Input from '../../components/Input';
import Toggle from '../../components/Input/Toggle';
import DatePicker from '../../components/Input/DatePicker';
import formValidator from './validator';
import ReactSelect from '../../components/Input/ReactSelect';
import RenderLeads from '../../components/RenderLeads';
import RenderEmailsList from './RenderEmailsList';
import EditSiteForm from '../../components/EditSiteForm/index';
import { selectCurrentUserClientId, selectSavedSite } from '../../containers/App/selectors';
import { selectAddNotificationProcess } from '../../containers/ListNewStudyPage/selectors';
import {
  selectCallTracking,
  selectLeadsCount,
} from './selectors';
import { addEmailNotificationUser } from '../../containers/App/actions';
import { CAMPAIGN_LENGTH_LIST } from '../../common/constants';

import {
  hideAddEmailModal,
  showAddEmailModal,
  hideSiteLocationModal,
  showSiteLocationModal,
} from '../../containers/ListNewStudyPage/actions';

import { parseTimezone } from '../../utils/time';

const mapStateToProps = createStructuredSelector({
  callTracking: selectCallTracking(),
  leadsCount: selectLeadsCount(),
  currentUserClientId: selectCurrentUserClientId(),
  addNotificationProcess: selectAddNotificationProcess(),
  savedSite: selectSavedSite(),
});

const formName = 'listNewStudy';

const mapDispatchToProps = (dispatch) => ({
  addEmailNotificationUser: (payload) => dispatch(addEmailNotificationUser(payload)),
  change: (field, value) => dispatch(change(formName, field, value)),
  blur: (field, value) => dispatch(blur(formName, field, value)),
  hideAddEmailModal: () => dispatch(hideAddEmailModal()),
  showAddEmailModal: () => dispatch(showAddEmailModal()),
  hideSiteLocationModal: () => dispatch(hideSiteLocationModal()),
  showSiteLocationModal: () => dispatch(showSiteLocationModal()),
});

@reduxForm({ form: formName, validate: formValidator })
@connect(mapStateToProps, mapDispatchToProps)
class ListNewStudyForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    addEmailNotificationUser: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    blur: React.PropTypes.func.isRequired,
    clientAdmins: PropTypes.object,
    fileInputRef: PropTypes.func.isRequired,
    hideSiteLocationModal: PropTypes.func.isRequired,
    showSiteLocationModal: PropTypes.func.isRequired,
    hideAddEmailModal: PropTypes.func.isRequired,
    showAddEmailModal: PropTypes.func.isRequired,
    indications: PropTypes.array,
    studyLevels: PropTypes.array,
    listNewStudyState: PropTypes.object,
    callTracking: PropTypes.bool,
    leadsCount: PropTypes.number,
    fullSiteLocations: PropTypes.object,
    formValues: PropTypes.object,
    saveSite: PropTypes.func,
    currentUserClientId: PropTypes.number,
    availPhoneNumbers: PropTypes.array,
    addNotificationProcess: PropTypes.object,
    savedSite: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.handleSiteLocationChoose = this.handleSiteLocationChoose.bind(this);
    this.closeAddSiteModal = this.closeAddSiteModal.bind(this);
    this.addSite = this.addSite.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { change } = this.props;
    // If leads are all removed, set `callTracking` value to false
    if (newProps.leadsCount === 0 && this.props.leadsCount === 1) {
      change('callTracking', false);
    }

    if (this.props.addNotificationProcess.saving && !newProps.addNotificationProcess.saving && newProps.addNotificationProcess.savedUser) {
      let addFields = this.props.formValues.emailNotifications;
      const values = {
        firstName: newProps.addNotificationProcess.savedUser.firstName,
        lastName: newProps.addNotificationProcess.savedUser.lastName,
        userId: newProps.addNotificationProcess.savedUser.id,
        isChecked: true,
      };
      if (!addFields) {
        addFields = [values];
      } else {
        addFields.push(values);
      }
      change('emailNotifications', addFields);
      if (addFields.length === 1) {
        change('checkAllInput', true);
      }
    }

    if (this.props.savedSite.saving && !newProps.addNotificationProcess.saving) {
      this.closeAddSiteModal();
      change('siteLocation', null);
    }

    if (typeof newProps.formValues.startDate === 'undefined') {
      change('startDate', moment());
    }
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('recruitmentPhone', formattedPhoneNumber);
  }

  closeAddSiteModal() {
    const { hideSiteLocationModal } = this.props;
    hideSiteLocationModal();
  }

  handleSiteLocationChoose(e) {
    const { change, clientAdmins, fullSiteLocations, showSiteLocationModal } = this.props;
    if (e === 'add-new-location') {
      showSiteLocationModal();
    } else {
      change('siteLocation', e);

      const fullSiteLocation = _.find(fullSiteLocations.details, (o) => (o.id === e));
      if (fullSiteLocation) {
        const fields = [];
        // add admin users
        _.forEach(clientAdmins.details, (role) => {
          fields.push({
            firstName: role.firstName,
            lastName: role.lastName,
            userId: role.userId,
            isChecked: true,
          });
        });
        // add site users
        _.forEach(fullSiteLocation.roles, (role) => {
          if (role.user) {
            fields.push({
              firstName: role.user.firstName,
              lastName: role.user.lastName,
              userId: role.user.id,
              isChecked: true,
            });
          }
        });

        change('emailNotifications', fields);
        if (fields.length > 0) {
          change('checkAllInput', true);
        }
      }
    }
  }

  addSite(siteData) {
    const { currentUserClientId, saveSite } = this.props;
    saveSite(currentUserClientId, null, {
      ...siteData,
      timezone: parseTimezone(siteData.timezone),
    });
    saveSite(currentUserClientId, null, siteData);
  }

  render() {
    const { addEmailNotificationUser, callTracking, change, currentUserClientId, fileInputRef, formValues, hideAddEmailModal, listNewStudyState, indications, showAddEmailModal, studyLevels } = this.props;

    const siteLocations = _.map(this.props.fullSiteLocations.details, row => ({
      id: row.id,
      name: row.name,
    }));
    siteLocations.push({ id: 'add-new-location', name: 'Add Site Location' });
    return (
      <div className="form-study">
        <div className="form-fields">
          <div className="field-row">
            <strong className="label required"><label>Site Location</label></strong>
            <Field
              name="siteLocation"
              component={ReactSelect}
              placeholder="Select Site Location"
              options={siteLocations}
              className="field"
              onChange={this.handleSiteLocationChoose}
            />
          </div>

          {(() => {
            if (formValues.siteLocation && formValues.siteLocation !== 'add-new-location') {
              return (
                <div className="field-row label-top">
                  <strong className="label"><label>EMAIL NOTIFICATIONS</label></strong>
                  <div className="field">
                    <div className="emails-list-holder">
                      <FieldArray
                        name="emailNotifications"
                        component={RenderEmailsList}
                        formValues={formValues}
                        listNewStudyState={listNewStudyState}
                        change={change}
                        showAddEmailModal={showAddEmailModal}
                        hideAddEmailModal={hideAddEmailModal}
                        addEmailNotificationUser={addEmailNotificationUser}
                        currentUserClientId={currentUserClientId}
                      />
                    </div>

                  </div>
                </div>
              );
            }
            return false;
          })()}

          <div className="field-row">
            <strong className="label required"><label>RECRUITMENT PHONE</label></strong>
            <Field
              name="recruitmentPhone"
              component={Input}
              type="text"
              className="field"
              onBlur={this.onPhoneBlur}
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>Indication</label></strong>
            <Field
              name="indication_id"
              component={ReactSelect}
              placeholder="Select Indication"
              options={indications}
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label htmlFor="clinicaltrialGovLink">UPLOAD STUDY AD</label></strong>
            <div className="field">
              <label htmlFor="study_file" data-text="Browse" data-hover-text="Attach File" className="btn btn-gray upload-btn" />
              <Field
                id="study_file"
                name="file"
                inputRef={fileInputRef}
                component={Input}
                type="file"
              />
              <strong className="label lfilename"><label className="filename" htmlFor="irb_filename">{formValues.file && formValues.file.length > 0 ? formValues.file[0].name : ''}</label></strong>
            </div>
          </div>

          <div className="field-row">
            <strong className="label required"><label>PROTOCOL</label></strong>
            <Field
              name="protocolNumber"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>SPONSOR NAME</label></strong>
            <Field
              name="sponsorName"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>Sponsor Email</label></strong>
            <Field
              name="sponsorEmail"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>CRO Name</label></strong>
            <Field
              name="croContactName"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>CRO Email</label></strong>
            <Field
              name="croContactEmail"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>IRB Name</label></strong>
            <Field
              name="irbName"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>IRB Email</label></strong>
            <Field
              name="irbEmail"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>Exposure Level</label></strong>
            <Field
              name="exposureLevel"
              component={ReactSelect}
              placeholder="Select Exposure Level"
              options={studyLevels}
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>Campaign Length</label></strong>
            <Field
              name="campaignLength"
              component={ReactSelect}
              placeholder="Select Campaign Length"
              options={CAMPAIGN_LENGTH_LIST}
              className="field"
            />
          </div>

          {(() => {
            if (formValues.campaignLength === 1) {
              return (
                <div className="field-row">
                  <strong className="label"><label>CONDENSE TO 2 WEEKS</label></strong>
                  <Field
                    name="condenseTwoWeeks"
                    component={Toggle}
                    className="field"
                  />
                </div>
              );
            }
            return false;
          })()}

          <div className="field-row">
            <strong className="label"><label>Patient qualification <br />
              Suite: $897 </label>
            </strong>
            <Field
              name="patientQualificationSuite"
              component={Toggle}
              className="field"
            />
          </div>

          {
            <div className="tracking-source">
              <div className="field-row">
                <strong className="label"><label>CALL TRACKING: $247</label></strong>
                <Field
                  name="callTracking"
                  component={Toggle}
                  className="field"
                />
              </div>
            </div>
          }

          {callTracking &&
            <FieldArray
              name="leadSource"
              component={RenderLeads}
              formValues={formValues}
            />
          }

          <div className="field-row">
            <strong className="label required"><label>Start Date</label></strong>
            <Field
              id="start-date"
              name="startDate"
              component={DatePicker}
              className="form-control field datepicker-input"
              initialDate={moment()}
              minDate={moment()}
            />
          </div>

          <div className="field-row textarea">
            <strong className="label"><label htmlFor="notes">NOTES</label></strong>
            <div className="field">
              <Field
                name="description"
                component={Input}
                componentClass="textarea"
              />
            </div>
          </div>
        </div>

        <Modal dialogComponentClass={CenteredModal} show={this.props.listNewStudyState.showAddSiteLocationModal} onHide={this.closeAddSiteModal}>
          <Modal.Header>
            <Modal.Title>ADD SITE LOCATION</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddSiteModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <EditSiteForm onSubmit={this.addSite} />
          </Modal.Body>
        </Modal>

      </div>

    );
  }
}

export default ListNewStudyForm;
