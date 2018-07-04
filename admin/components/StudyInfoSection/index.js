import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { arrayRemoveAll, arrayPush, blur, change, Field, FieldArray, reduxForm, startSubmit, stopSubmit } from 'redux-form';
import Toggle from '../../components/Input/Toggle';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import RenderEmailsList from './RenderEmailsList';

import { selectStudyInfo, selectIndications, selectProtocols, selectSponsors, selectCro, selectSiteLocations, selectUsersByRoles, selectMessagingNumbers } from  '../../containers/AdminStudyEdit/selectors';
import Checkbox from '../Input/Checkbox';

const formName = 'Admin.EditStudyForm';
import formValidator from './validator';

@reduxForm({
  form: formName,
  validate: formValidator,
})
@connect(mapStateToProps, mapDispatchToProps)
export class StudyInfoSection extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    studyId: PropTypes.string,
    studyInfo: PropTypes.object,
    change: PropTypes.func.isRequired,
    indications: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    siteLocations: PropTypes.array.isRequired,
    usersByRoles: PropTypes.object.isRequired,
    messagingNumbers: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.onCheckboxClick = this.onCheckboxClick.bind(this);

    this.state = {
      userEmailNotif: [
        {
          email: 'mo@studykik.com',
          checked: false,
        },
        {
          email: 'bob@studykik.com',
          checked: true,
        },
      ],
      emailNotif: [
        {
          email: 'joe@studykik.com',
          checked: false,
        },
        {
          email: 'chris@studykik.com',
          checked: true,
        },
        {
          email: 'roy@studykik.com',
          checked: true,
        },
      ],
    };
  }

  onCheckboxClick(arrayName, index, value) {
    this.setState({
      [arrayName]: this.state[arrayName].map((e, i) => {
        return i === index ? { ...e, checked: value } : e;
      }),
    });
  }

  render() {
    const { userEmailNotif, emailNotif } = this.state;
    const { change, indications, sponsors, protocols, cro, siteLocations, usersByRoles, messagingNumbers } = this.props;

    const indicationsOptions = indications.map(item => ({ value: item.id, label: item.name }));
    const sponsorsOptions = sponsors.map(item => ({ value: item.id, label: item.name }));
    const protocolsOptions = protocols.map(item => ({ value: item.id, label: item.number }));
    const croOptions = cro.map(item => ({ value: item.id, label: item.name }));
    const siteLocationsOptions = siteLocations.map(item => ({ value: item.id, label: item.location }));
    const smOptions = usersByRoles.sm.map(item => ({ value: item.id, label: `${item.first_name} ${item.last_name}` }));
    const bdOptions = usersByRoles.bd.map(item => ({ value: item.id, label: `${item.first_name} ${item.last_name}` }));
    const ccOptions = usersByRoles.cc.map(item => ({ value: item.id, label: `${item.first_name} ${item.last_name}` }));

    const messagingNumbersOptions = messagingNumbers.details.map(item => ({
      value: item.id,
      label: item.phone_number,
    }));
    if (this.props.studyInfo.text_number_id) {
      messagingNumbersOptions.unshift({
        value: this.props.studyInfo.text_number_id,
        label: this.props.studyInfo.phone_number,
      });
    }

    return (
      <form id="studyInfoSection" onSubmit={this.props.handleSubmit}>
        <h2>{this.props.studyId}</h2>
        <ul className="section">
          <li>
            <div className="field-row">
              <strong className="label">
                <label htmlFor="new-patient-first-name">STATUS:</label>
              </strong>
              <div className="field text-right">
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
          </li>
          <li><div className="field-row">
            <strong className="label required">
              <label htmlFor="new-patient-first-name">STUDY URL:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                id="edit-information-page-name"
                name="landingPageUrl"
                component={Input}
              />
            </div>
          </div></li>
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">INDICATION:</label>
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
          </div></li>
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">PROTOCOL:</label>
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
          </div></li>
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">SPONSOR:</label>
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
          </div></li>
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">CRO:</label>
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
          </div></li>
        </ul>
        <ul className="section">
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">SITE LOCATION:</label>
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
          </div></li>
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-email">SITE NUMBER:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="site"
                component={Input}
                isDisabled
              />
            </div>
          </div></li>
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">SITE ADDRESS:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="site_address"
                component={Input}

                isDisabled
              />
            </div>
          </div></li>
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">RECRUITMENT PHONE:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="recruitment_phone"
                component={Input}
                onBlur={this.onPhoneBlur}
              />
            </div>
          </div></li>
          <li><div className="field-row">
            <strong className="label">
              <label>PRINCIPAL INVESTIGATOR:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                name="piName"
                component={Input}
                placeholder="Full Name"
              />
            </div>
          </div></li>
        </ul>
        <ul className="section">
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">AO:</label>
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
          </div></li>
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">BD:</label>
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
          </div></li>
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">CC:</label>
            </strong>
            <div className="field">
              <Field
                name="cc_user_id"
                component={ReactSelect}
                placeholder="Select Call Center"
                searchPlaceholder="Search"
                searchable
                options={ccOptions}
                customSearchIconClass="icomoon-icon_search2"
              />
            </div>
          </div></li>
        </ul>
        <div className="section">
          <div className="smallSection">
            <h3>USER EMAIL NOTIFICATION</h3>
            <ul>
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
            </ul>
            <Button bsStyle="primary" type="submit">Add</Button>
          </div>
          <div className="smallSection">
            <h4>EMAIL NOTIFICATION</h4>
            <ul>
              {
                emailNotif.map((e, i) => {
                  return (
                    <li key={i} className="hasCheckbox">
                      <Checkbox name="emailNotif" input={{ checked: e.checked, onChange: (v) => this.onCheckboxClick('emailNotif', i, v) }} />
                      {e.email}
                    </li>
                  );
                })
              }
            </ul>
            <Button bsStyle="primary" type="submit">Add</Button>
          </div>
        </div>
        <ul className="section">
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-first-name">SPONSOR PORTAL:</label>
            </strong>
            <div className="field text-right">
              <Field
                name="shouldShowInSponsorPortal"
                component={Toggle}
                className="field"
                onChange={(e) => {
                  change('shouldShowInSponsorPortal', e);
                }}
              />
            </div>
          </div></li>
          <li>CENTRAL: </li>
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-first-name">PMS:</label>
            </strong>
            <div className="field text-right">
              <Field
                name="patientMessagingSuite"
                component={Toggle}
                className="field"
                onChange={(e) => {
                  change('patientMessagingSuite', e);
                }}
              />
            </div>
          </div></li>
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">DELETE PATIENT:</label>
            </strong>
            <div className="field text-right">
              <Field
                name="canDeletePatient"
                component={Toggle}
                className="field"
                onChange={(e) => {
                  if (e === false) change('canDeletePatient', e.toString());
                }}
              />
            </div>
          </div></li>
        </ul>
        <ul className="section">
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-phone">MESSAGING NUMBER:</label>
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
          </div></li>
          <li>FACEBOOK URL: </li>
          <li>CNS CODE: </li>
        </ul>
        <div className="btn-block text-right">
          <button type="submit" className="btn btn-default btn-add-row">
            <span>Update</span>
          </button>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    change: (field, value) => dispatch(change(formName, field, value)),
  };
}

const mapStateToProps = createStructuredSelector({
  studyInfo: selectStudyInfo(),
  indications: selectIndications(),
  sponsors: selectSponsors(),
  protocols: selectProtocols(),
  cro: selectCro(),
  siteLocations: selectSiteLocations(),
  usersByRoles: selectUsersByRoles(),
  messagingNumbers: selectMessagingNumbers(),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyInfoSection);
