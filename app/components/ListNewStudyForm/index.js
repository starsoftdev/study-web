/**
*
* ListNewStudyForm
*
*/

import React, { PropTypes } from 'react';
import Input from 'components/Input';
import Toggle from 'components/Input/Toggle';
import DatePicker from 'components/Input/DatePicker';
import formValidator from './validator';
import ReactSelect from 'components/Input/ReactSelect';
import { Field, FieldArray, reduxForm, change } from 'redux-form';
import _ from 'lodash';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import RenderLeads from 'components/RequestProposalForm/RenderLeads';
import RenderEmailsList from './RenderEmailsList';
import {
  selectCallTracking,
  selectLeadsCount,
} from './selectors';

import { CAMPAIGN_LENGTH_LIST } from 'common/constants';

import {
  showSiteLocationModal,
  hideSiteLocationModal,
} from 'containers/ListNewStudyPage/actions';
import './styles.less';

const mapStateToProps = createStructuredSelector({
  callTracking: selectCallTracking(),
  leadsCount: selectLeadsCount(),
});

@reduxForm({ form: 'listNewStudy', validate: formValidator })
@connect(mapStateToProps)
class ListNewStudyForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    siteLocations: PropTypes.array,
    indications: PropTypes.array,
    studyLevels: PropTypes.array,
    listNewStudyState: PropTypes.object,
    callTracking: PropTypes.bool,
    leadsCount: PropTypes.number,
    fullSiteLocations: PropTypes.array,
    formValues: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.handleSiteLocationChoose = this.handleSiteLocationChoose.bind(this);
    this.closeAddSiteModal = this.closeAddSiteModal.bind(this);
    this.selectAll = this.selectAll.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // If leads are all removed, set `callTracking` value to false
    if (newProps.leadsCount === 0 && this.props.leadsCount === 1) {
      this.props.dispatch(change('listNewStudy', 'callTracking', false));
    }
  }

  closeAddSiteModal() {
    this.props.dispatch(hideSiteLocationModal());
  }

  handleSiteLocationChoose(e) {
    if (e === 'add-new-location') {
      this.props.dispatch(showSiteLocationModal());
    } else {
      this.props.dispatch(change('listNewStudy', 'site', e));

      const fullSiteLocation = _.find(this.props.fullSiteLocations, (o) => (o.id === e));
      if (fullSiteLocation) {
        this.props.dispatch(change('listNewStudy', 'emailNotifications', fullSiteLocation.users));
      }
    }
  }

  selectAll(e) {
    if (this.props.formValues.emailNotifications) {
      _.forEach(this.props.formValues.emailNotifications, (value, index) => {
        this.props.dispatch(change('listNewStudy', `emailNotifications[${index}].isChecked`, e.target.checked));
      });
    }
  }

  render() {
    const { siteLocations, indications, studyLevels, callTracking, formValues } = this.props;

    if (!_.find(siteLocations, (o) => (o.id === 'add-new-location'))) {
      siteLocations.push({
        id: 'add-new-location',
        name: 'Add New Location',
      });
    }

    let isAllChecked = false;
    if (this.props.formValues.emailNotifications) {
      const checkedArr = _.filter(this.props.formValues.emailNotifications, (o) => o.isChecked);
      if (checkedArr.length === this.props.formValues.emailNotifications.length) {
        isAllChecked = true;
      }
    }

    return (
      <div className="form-study">
        <div className="form-fields">
          <div className="field-row">
            <strong className="label required"><label>Site Location</label></strong>
            <Field
              name="site"
              component={ReactSelect}
              placeholder="Select Site Location"
              options={siteLocations}
              className="field"
              onChange={this.handleSiteLocationChoose}
            />
          </div>

          {(() => {
            if (this.props.formValues.site) {
              return (
                <div className="field-row label-top">
                  <strong className="label"><label>EMAIL NOTIFICATIONS</label></strong>
                  <div className="field">

                    <div className="emails-list-holder">
                      <div className="heading-area">
                        <span className="jcf-checkbox input-checked-parent parent-active jcf-checked">
                          <input
                            type="checkbox"
                            id="email-notifications"
                            data-check-pattern="[name^='email-']"
                            className="field-active"
                            onChange={this.selectAll}
                            checked={isAllChecked}
                          />
                        </span>
                        <strong className="email">RECEIVE EMAIL NOTIFICATION</strong>
                      </div>

                      <FieldArray
                        name="emailNotifications"
                        component={RenderEmailsList}
                        formValues={formValues}
                        listNewStudyState={this.props.listNewStudyState}
                        dispatch={this.props.dispatch}
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
              name="recruitment"
              component={Input}
              type="text"
              className="field"
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
              <label htmlFor="study_file" data-text="Browse" data-hover-text="Attach File" className="btn btn-gray upload-btn"></label>
              <input type="file" id="study_file" />
            </div>
          </div>

          <div className="field-row">
            <strong className="label required"><label>PROTOCOL NUMBER</label></strong>
            <Field
              name="protocol"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>SPONSOR CONTACT NAME</label></strong>
            <Field
              name="sponsor"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>Sponsor Contact Email</label></strong>
            <Field
              name="sponsorEmail"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>CRO Contact Name</label></strong>
            <Field
              name="croName"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>CRO Contact Email</label></strong>
            <Field
              name="croEmail"
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
              name="level_id"
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
              className="field top-positioned"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>Patient messaging <br />
            Suite: $247</label></strong>
            <Field
              name="addPatientMessagingSuite"
              component={Toggle}
              className="field"
            />
          </div>

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

          {callTracking &&
            <FieldArray name="leads" component={RenderLeads} />
          }

          <div className="field-row">
            <strong className="label required"><label>Start Date</label></strong>
            <Field
              id="start-date"
              name="date"
              component={DatePicker}
              className="form-control field datepicker-input"
              initialDate={moment()}
            />
          </div>

          <div className="field-row textarea">
            <strong className="label"><label htmlFor="notes">NOTES</label></strong>
            <div className="field">
              <Field
                name="notes"
                component={Input}
                componentClass="textarea"
              />
            </div>
          </div>


        </div>

        <Modal className="custom-modal" show={this.props.listNewStudyState.showAddSiteLocationModal} onHide={this.closeAddSiteModal}>
          <Modal.Header>
            <Modal.Title>ADD CREDITS</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddSiteModal}>
              <i className="icon-icon_close"></i>
            </a>
          </Modal.Header>
          <Modal.Body>
            123
          </Modal.Body>
        </Modal>

      </div>

    );
  }
}

export default ListNewStudyForm;
