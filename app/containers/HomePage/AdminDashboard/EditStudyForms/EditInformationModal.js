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
import { Field, FieldArray } from 'redux-form';
import Form from 'react-bootstrap/lib/Form';
import RenderEmailsList from './RenderEmailsList';

export class EditInformationModal extends React.Component {
  static propTypes = {
    openModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    formValues: PropTypes.object,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
  };

  addEmailNotificationClick() {
    this.setState({ addEmailModalShow: true });
    this.props.onHide(true);
  }

  closeAddEmailModal() {
    this.setState({ addEmailModalShow: false });
    this.props.onShow();
  }

  render() {
    const { openModal, onClose } = this.props;
    const smUsers = [
      { label: 'Will Graham', value: 'Will Graham', id: 15 },
      { label: 'Alan Walker', value: 'Alan Walker', id: 16 },
      { label: 'Penny Worth', value: 'Penny Worth', id: 17 },
    ];
    const bdUsers = [
      { label: 'Bruce Wayne', value: 'Bruce Wayne', id: 15 },
      { label: 'Ray Palmer', value: 'Ray Palmer', id: 16 },
      { label: 'Oliver Queen', value: 'Oliver Queen', id: 17 },
    ];
    const aeUsers = [
      { label: 'Richard Hendriks', value: 'Richard Hendriks', id: 15 },
      { label: 'Mary Stuart', value: 'Mary Stuart', id: 16 },
      { label: 'Austin Baron', value: 'Austin Baron', id: 17 },
    ];
    const siteLocations = [
      { label: 'Catalina Research Institute', value: 'Catalina Research Institute', id: 15 },
      { label: 'Ace Chemicals', value: 'Ace Chemicals', id: 16 },
      { label: 'Acme Corporation', value: 'Acme Corporation', id: 17 },
    ];
    const messagingNumbers = [
      { label: '(524) 999-1234', value: '5249991234', id: 1 },
      { label: '(524) 666-2345', value: '524666-2345', id: 2 },
      { label: '(524) 111-1234', value: '524111-1234', id: 3 },
      { label: '(524) 440-9874', value: '524440-9874', id: 4 },
      { label: '(524) 599-3214', value: '524599-3214', id: 5 },
    ];
    const protocols = [
      { label: 'A4071059', value: 'A4071059', id: 15 },
      { label: 'ALK-502', value: 'ALK-502', id: 16 },
      { label: 'COL MID-302', value: 'COL MID-302', id: 17 },
    ];
    const sponsors = [
      { label: 'Pfizer', value: 'Pfizer', id: 15 },
      { label: 'Jacob Smith', value: 'Jacob Smith', id: 16 },
      { label: 'William Martin', value: 'William Martin', id: 17 },
    ];
    const cros = [
      { label: 'inVentiv Health', value: 'inVentiv Health', id: 15 },
      { label: 'INC_Research', value: 'INC_Research', id: 16 },
      { label: 'Quintiles', value: 'Quintiles', id: 17 },
    ];
    const indications = [
      { label: 'Acne', value: 'Acne', id: 15 },
      { label: 'INC_Research', value: 'INC_Research', id: 16 },
      { label: 'Quintiles', value: 'Quintiles', id: 17 },
    ];
    const exposureLevels = [
      { label: 'Platinum', value: 'Platinum', id: 15 },
      { label: 'Diamond', value: 'Diamond', id: 16 },
      { label: 'Gold', value: 'Gold', id: 17 },
      { label: 'Silver', value: 'Silver', id: 17 },
      { label: 'Bronze', value: 'Bronze', id: 17 },
    ];
    const campaigns = [
      { label: 'Newest', value: '0', id: 1 },
      { label: '10', value: '10', id: 2 },
      { label: '9', value: '9', id: 3 },
      { label: '8', value: '8', id: 4 },
      { label: '7', value: '7', id: 5 },
      { label: '6', value: '6', id: 6 },
      { label: '5', value: '5', id: 7 },
      { label: '4', value: '4', id: 8 },
      { label: '3', value: '3', id: 9 },
      { label: '2', value: '2', id: 10 },
      { label: 'Oldest', value: '1', id: 11 },
    ];
    const formValues = {};
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
            <Form className="form-holder" onSubmit={this.onSubmit}>
              <div className="frame">
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">Status</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="status"
                      component={Toggle}
                      className="field"
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
                      name="studyNumber"
                      component={Input}
                      required
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">SM</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="sm"
                      component={ReactSelect}
                      placeholder="Select SM"
                      searchPlaceholder="Search"
                      searchable
                      options={smUsers}
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
                      name="bd"
                      component={ReactSelect}
                      placeholder="Select BD"
                      searchPlaceholder="Search"
                      searchable
                      options={bdUsers}
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
                      name="ae"
                      component={ReactSelect}
                      placeholder="Select AE"
                      searchPlaceholder="Search"
                      searchable
                      options={aeUsers}
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
                      name="siteLocation"
                      component={ReactSelect}
                      placeholder="Select Location"
                      searchPlaceholder="Search"
                      searchable
                      options={siteLocations}
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
                      name="siteNumber"
                      component={Input}
                      required
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
                      name="siteAddress"
                      component={Input}
                      required
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
                      name="city"
                      component={Input}
                      required
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
                      name="state"
                      component={Input}
                      required
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
                      name="postalCode"
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
                      name="recuritmentPhone"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label"><label>EMAIL NOTIFICATIONS</label></strong>
                  <div className="field">
                    <div className="emails-list-holder">
                      {false && <FieldArray
                        name="emailNotifications"
                        component={RenderEmailsList}
                        formValues={formValues}
                        dispatch={this.props.dispatch}
                        addEmailNotification={this.addEmailNotificationClick}
                        closeEmailNotification={this.closeAddEmailModal}
                        emailFields={this.state.emailFields}
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
                      name="redirectNumber"
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
                      name="protocol"
                      component={ReactSelect}
                      placeholder="Select Protocol"
                      searchPlaceholder="Search"
                      searchable
                      options={protocols}
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
                      name="protocol"
                      component={ReactSelect}
                      placeholder="Select Sponsor"
                      searchPlaceholder="Search"
                      searchable
                      options={sponsors}
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
                      name="sponsorPortal"
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
                      name="cro"
                      component={ReactSelect}
                      placeholder="Select Cro"
                      searchPlaceholder="Search"
                      searchable
                      options={cros}
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
                      name="indication"
                      component={ReactSelect}
                      placeholder="Select Indication"
                      searchPlaceholder="Search"
                      searchable
                      options={indications}
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
                      name="exposureLevel"
                      component={ReactSelect}
                      placeholder="Select Exposure Level"
                      searchPlaceholder="Search"
                      searchable
                      options={exposureLevels}
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
                      name="campaign"
                      component={ReactSelect}
                      placeholder="Select Campaign"
                      searchPlaceholder="Search"
                      searchable
                      options={campaigns}
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
                      name="startDate"
                      component={DatePicker}
                      className="form-control datepicker-input"
                      initialDate={moment()}
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
                      name="endDate"
                      component={DatePicker}
                      className="form-control datepicker-input"
                      initialDate={moment()}
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
                      name="customGoal"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row text-right">
                  <Button bsStyle="primary"> Submit </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Collapse>
    );
  }
}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(EditInformationModal);
