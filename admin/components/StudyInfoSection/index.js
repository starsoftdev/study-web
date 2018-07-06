import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { change, Field, FieldArray, reduxForm } from 'redux-form';
import Toggle from '../../components/Input/Toggle';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import RenderEmailsList from './RenderEmailsList';
import RenderCustomEmailsList from './RenderCustomEmailsList';
import { selectValues } from '../../common/selectors/form.selector';
import { selectStudyInfo, selectIndications, selectProtocols, selectSponsors, selectCro, selectSiteLocations, selectUsersByRoles, selectMessagingNumbers } from  '../../containers/AdminStudyEdit/selectors';
import { addEmailNotificationUser, addCustomEmailNotification } from '../../containers/AdminStudyEdit/actions';
import CenteredModal from '../../components/CenteredModal';
import AddEmailNotificationForm from '../../components/AddEmailNotificationForm';
import formValidator from './validator';

const formName = 'Admin.EditStudyForm';

@reduxForm({
  form: formName,
  validate: formValidator,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
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
    formValues: PropTypes.object,
    currentUser: PropTypes.object,
    addCustomEmailNotification: PropTypes.func,
    addEmailNotificationUser: PropTypes.func,
    sponsors: PropTypes.array,
    protocols: PropTypes.array,
    cro: PropTypes.array,
  };

  constructor() {
    super();

    this.onCheckboxClick = this.onCheckboxClick.bind(this);

    this.state = {
      addEmailModalShow: false,
      customAddEmailModal: false,
    };
  }

  onCheckboxClick(arrayName, index, value) {
    this.setState({
      [arrayName]: this.state[arrayName].map((e, i) => {
        return i === index ? { ...e, checked: value } : e;
      }),
    });
  }

  addEmailNotificationClick = (custom = false) => {
    this.setState({ addEmailModalShow: true, customAddEmailModal: custom });
  }

  closeAddEmailModal = (custom = false) => {
    this.setState({ addEmailModalShow: false, customAddEmailModal: custom });
  }

  addEmailNotificationSubmit = (values) => {
    const { addEmailNotificationUser, addCustomEmailNotification, studyInfo } = this.props;
    const { customAddEmailModal } = this.state;
    if (!customAddEmailModal) {
      addEmailNotificationUser({
        ...values,
        clientId: studyInfo.details.client_id,
        clientRole: {
          siteId: studyInfo.details.site_id,
        },
      });
    } else {
      addCustomEmailNotification({
        ...values,
        type: 'inactive',
        clientId: studyInfo.details.client_id,
        studyId: studyInfo.details.study_id,
      });
    }

    this.closeAddEmailModal();
  }

  render() {
    const { change, indications, sponsors, protocols, cro, siteLocations, usersByRoles, messagingNumbers, formValues } = this.props;

    const indicationsOptions = indications.map(item => ({ value: item.id, label: item.name }));
    const sponsorsOptions = sponsors.map(item => ({ value: item.id, label: item.name }));
    const protocolsOptions = protocols.map(item => ({ value: item.id, label: item.number }));
    const croOptions = cro.map(item => ({ value: item.id, label: item.name }));
    const siteLocationsOptions = siteLocations.map(item => ({ value: item.id, label: item.location }));
    const smOptions = usersByRoles.sm ? usersByRoles.sm.map(item => ({ value: item.id, label: `${item.first_name} ${item.last_name}` })) : [];
    const bdOptions = usersByRoles.bd ? usersByRoles.bd.map(item => ({ value: item.id, label: `${item.first_name} ${item.last_name}` })) : [];
    const ccOptions = usersByRoles.cc ? usersByRoles.cc.map(item => ({ value: item.id, label: `${item.first_name} ${item.last_name}` })) : [];

    const messagingNumbersOptions = messagingNumbers.details.map(item => ({
      value: item.id,
      label: item.phone_number,
    }));
    if (this.props.studyInfo.details && this.props.studyInfo.details.text_number_id) {
      messagingNumbersOptions.unshift({
        value: this.props.studyInfo.details.text_number_id,
        label: this.props.studyInfo.details.phone_number,
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
              <div className="field">
                <div className="text-right">
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
            <div>
              {<FieldArray
                name="emailNotifications"
                component={RenderEmailsList}
                change={change}
                formValues={formValues}
                addEmailNotificationClick={this.addEmailNotificationClick}
              />}
            </div>
          </div>
          <div className="smallSection">
            <h4>EMAIL NOTIFICATION</h4>
            <div>
              {<FieldArray
                name="customEmailNotifications"
                component={RenderCustomEmailsList}
                change={change}
                formValues={formValues}
                addEmailNotificationClick={this.addEmailNotificationClick}
              />}
            </div>
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
          <li><div className="field-row">
            <strong className="label">
              <label htmlFor="new-patient-first-name">CENTRAL:</label>
            </strong>
            <div className="field text-right">
              <Field
                name="central"
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
          <li><div className="field-row">
            <strong className="label required">
              <label htmlFor="new-patient-first-name">FACEBOOK URL:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                id="edit-information-page-name"
                name="facebookUrl"
                component={Input}
              />
            </div>
          </div></li>
          <li><div className="field-row">
            <strong className="label required">
              <label htmlFor="new-patient-first-name">CNS CODE:</label>
            </strong>
            <div className="field">
              <Field
                type="text"
                id="edit-information-page-name"
                name="cnsCode"
                component={Input}
              />
            </div>
          </div></li>
        </ul>
        <div className="btn-block text-right">
          <button type="submit" className="btn btn-default btn-add-row">
            <span>Update</span>
          </button>
        </div>
        <Modal
          dialogComponentClass={CenteredModal}
          show={this.state.addEmailModalShow}
          onHide={this.closeAddEmailModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>ADD EMAIL NOTIFICATION</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddEmailModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <AddEmailNotificationForm
              onSubmit={this.addEmailNotificationSubmit}
              custom={this.state.customAddEmailModal}
            />
          </Modal.Body>
        </Modal>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    change: (field, value) => dispatch(change(formName, field, value)),
    addEmailNotificationUser: (payload) => dispatch(addEmailNotificationUser(payload)),
    addCustomEmailNotification: (payload) => dispatch(addCustomEmailNotification(payload)),
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
  formValues: selectValues(formName),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyInfoSection);
