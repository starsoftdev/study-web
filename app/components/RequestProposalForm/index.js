/**
*
* ReferForm
*
*/

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import moment from 'moment-timezone';
import DatePicker from '../../components/Input/DatePicker';

import Input from '../../components/Input';
import Toggle from '../../components/Input/Toggle';
import ReactSelect from '../../components/Input/ReactSelect';

import { CAMPAIGN_LENGTH_LIST } from '../../common/constants';
import {
  selectCallTracking,
  selectLeadsCount,
} from './selectors';
import formValidator from './validator';
import { translate } from '../../../common/utilities/localization';

const mapStateToProps = createStructuredSelector({
  callTracking: selectCallTracking(),
  mediaTypesCount: selectLeadsCount(),
});

@reduxForm({ form: 'requestProposal', validate: formValidator })
@connect(mapStateToProps)
class RequestProposalForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    siteLocations: PropTypes.array,
    indications: PropTypes.array,
    studyLevels: PropTypes.array,
    callTracking: PropTypes.bool,
    mediaTypesCount: PropTypes.number,
    formValues: PropTypes.object,
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.campaignLengthChanged = this.campaignLengthChanged.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // If media types are all removed, set `callTracking` value to false
    if (newProps.mediaTypesCount === 0 && this.props.mediaTypesCount === 1) {
      this.props.dispatch(change('requestProposal', 'callTracking', false));
    }

    let messagingSuiteToggled = false;
    let qualificationSuiteToggled = false;

    if (newProps.formValues.patientQualificationSuite === true &&
      typeof this.props.formValues.patientQualificationSuite === 'undefined') {
      qualificationSuiteToggled = true;
    } else if (newProps.formValues.patientMessagingSuite === true &&
      typeof this.props.formValues.patientMessagingSuite === 'undefined') {
      messagingSuiteToggled = true;
    }

    if (qualificationSuiteToggled && newProps.formValues.patientMessagingSuite === true) {
      this.props.dispatch(change('requestProposal', 'patientMessagingSuite', false));
    } else if (messagingSuiteToggled && newProps.formValues.patientQualificationSuite === true) {
      this.props.dispatch(change('requestProposal', 'patientQualificationSuite', false));
    }

    let bDisabled = true;
    if (newProps.currentUser && newProps.currentUser.roleForClient) {
      bDisabled = !(
        newProps.currentUser.roleForClient.canPurchase || newProps.currentUser.roleForClient.canRedeemRewards ||
        newProps.currentUser.roleForClient.name === 'Super Admin' || newProps.currentUser.roleForClient.name === 'Admin');
    }
    if (bDisabled) {
      this.props.dispatch(change('requestProposal', 'site', newProps.currentUser.site_id));
      if (newProps.currentUser && newProps.currentUser.roleForClient) {
        this.props.dispatch(change('requestProposal', 'site', newProps.currentUser.roleForClient.site_id));
      }
    }
  }

  campaignLengthChanged(campaignLength) {
    if (campaignLength !== 1) {
      this.props.dispatch(change('requestProposal', 'condenseTwoWeeks', false));
    }
  }

  render() {
    const { siteLocations, indications, studyLevels, currentUser } = this.props;

    const isAdmin = currentUser && (currentUser.roleForClient && currentUser.roleForClient.name) === 'Super Admin';
    let bDisabled = true;
    if (currentUser && currentUser.roleForClient) {
      bDisabled = !(currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin' || currentUser.roleForClient.name === 'Admin');
    }
    let defaultValue = null;
    if (!isAdmin && bDisabled) {
      defaultValue = currentUser.site_id;
      if (currentUser && currentUser.roleForClient) {
        defaultValue = currentUser.roleForClient.site_id;
      }
    }

    return (
      <div className="form-study">
        <div className="form-fields">
          <div className="field-row">
            <strong className="label required"><label>{translate('portals.component.requestProposalForm.siteLabel')}</label></strong>
            <Field
              name="site"
              component={ReactSelect}
              placeholder={translate('portals.component.requestProposalForm.sitePlaceholder')}
              options={siteLocations}
              disabled={bDisabled}
              selectedValue={defaultValue || undefined}
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>{translate('portals.component.requestProposalForm.indicationLabel')}</label></strong>
            <Field
              name="indication_id"
              component={ReactSelect}
              placeholder={translate('portals.component.requestProposalForm.indicationPlaceholder')}
              options={indications}
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>{translate('portals.component.requestProposalForm.protocolLabel')}</label></strong>
            <Field
              name="protocol"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>{translate('portals.component.requestProposalForm.sponsorNameLabel')}</label></strong>
            <Field
              name="sponsorName"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>{translate('portals.component.requestProposalForm.sponsorEmailLabel')}</label></strong>
            <Field
              name="sponsorEmail"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>{translate('portals.component.requestProposalForm.croNameLabel')}</label></strong>
            <Field
              name="croName"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>{translate('portals.component.requestProposalForm.croEmailLabel')}</label></strong>
            <Field
              name="croEmail"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>{translate('portals.component.requestProposalForm.irbNameLabel')}</label></strong>
            <Field
              name="irbName"
              component={Input}
              type="text"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label"><label>{translate('portals.component.requestProposalForm.irbEmailLabel')}</label></strong>
            <Field
              name="irbEmail"
              component={Input}
              type="email"
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>{translate('portals.component.requestProposalForm.levelLabel')}</label></strong>
            <Field
              name="level_id"
              component={ReactSelect}
              placeholder={translate('portals.component.requestProposalForm.levelPlaceholder')}
              options={studyLevels}
              className="field"
            />
          </div>

          <div className="field-row">
            <strong className="label required"><label>{translate('portals.component.requestProposalForm.campaignLengthLabel')}</label></strong>
            <Field
              name="campaignLength"
              component={ReactSelect}
              placeholder={translate('portals.component.requestProposalForm.campaignLengthPlaceholder')}
              options={CAMPAIGN_LENGTH_LIST}
              className="field"
              onChange={this.campaignLengthChanged}
            />
          </div>

          {(() => {
            if (this.props.formValues.campaignLength === 1) {
              return (
                <div className="field-row">
                  <strong className="label"><label>{translate('portals.component.requestProposalForm.condense2weeksLabel')}</label></strong>
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
            <strong className="label"><label dangerouslySetInnerHTML={{ __html: `${translate('portals.component.requestProposalForm.pqsLabel')} $897` }} /></strong>
            <Field
              name="patientQualificationSuite"
              component={Toggle}
              className="field"
            />
          </div>

          {
            <div className="tracking-source global-invisible-item">
              <div className="field-row">
                <strong className="label"><label>{translate('portals.component.requestProposalForm.mediaTrackingLabel')} $247</label></strong>
                <Field
                  name="callTracking"
                  component={Toggle}
                  className="field"
                />
              </div>
            </div>
          }

          <div className="field-row">
            <strong className="label"><label>Start Date</label></strong>
            <Field
              id="start-date"
              name="startDate"
              component={DatePicker}
              className="form-control field datepicker-input"
              initialDate={moment()}
            />
          </div>

        </div>
      </div>
    );
  }
}

export default RequestProposalForm;
