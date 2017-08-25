/**
 * Created by mike on 10/11/16.
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Collapse from 'react-bootstrap/lib/Collapse';
import { normalizePhoneDisplay } from '../../common/helper/functions';
import {
  selectAllClientUsers,
  selectAllCustomNotificationEmails,
  selectMessagingNumbers,
  selectTaggedIndicationsForStudy,
} from '../../containers/HomePage/AdminDashboard/selectors';
import {
  fetchAllClientUsersDashboard,
  fetchCustomNotificationEmails,
  fetchMessagingNumbersDashboard,
  fetchTaggedIndicationsForStudy,
} from '../../containers/HomePage/AdminDashboard/actions';

import EditInformationForm from './EditInformationForm';

const mapStateToProps = createStructuredSelector({
  allClientUsers: selectAllClientUsers(),
  customNotificationEmails: selectAllCustomNotificationEmails(),
  messagingNumbers: selectMessagingNumbers(),
  taggedIndicationsForStudy: selectTaggedIndicationsForStudy(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllClientUsersDashboard: (clientId, siteId) => dispatch(fetchAllClientUsersDashboard(clientId, siteId)),
  fetchCustomNotificationEmails: (studyId) => dispatch(fetchCustomNotificationEmails(studyId)),
  fetchMessagingNumbersDashboard: () => dispatch(fetchMessagingNumbersDashboard()),
  fetchTaggedIndicationsForStudy: (studyId) => dispatch(fetchTaggedIndicationsForStudy(studyId)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class EditInformationModal extends React.Component {
  static propTypes = {
    allClientUsers: PropTypes.object.isRequired,
    addEmailNotificationClick: PropTypes.func.isRequired,
    customNotificationEmails: PropTypes.object.isRequired,
    fetchAllClientUsersDashboard: PropTypes.func.isRequired,
    fetchCustomNotificationEmails: PropTypes.func.isRequired,
    fetchMessagingNumbersDashboard: PropTypes.func.isRequired,
    fetchTaggedIndicationsForStudy: PropTypes.func.isRequired,
    messagingNumbers: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    openModal: PropTypes.bool.isRequired,
    study: PropTypes.object,
    taggedIndicationsForStudy: PropTypes.object.isRequired,
  };

  static emailNotificationFields = [];
  static checkAllEmailNotificationFields = false;
  static customEmailNotificationFields = [];
  static checkAllCustomEmailNotificationFields = false;
  static taggedIndicationsForStudy = false;

  constructor(props) {
    super(props);
    this.getEditStudyInitialValues = this.getEditStudyInitialValues.bind(this);
  }

  componentDidMount() {
  }

  componentWillUpdate(nextProps) {
    const { allClientUsers, customNotificationEmails, openModal, study, taggedIndicationsForStudy } = this.props;
    if (study) {
      if (allClientUsers.fetching && !nextProps.allClientUsers.fetching) {
        let studyEmailUsers = study.study_notification_users;

        this.emailNotificationFields = [];
        if (studyEmailUsers) { // notification emails
          studyEmailUsers = studyEmailUsers.substr(studyEmailUsers.indexOf('{') + 1);
          studyEmailUsers = studyEmailUsers.substr(0, studyEmailUsers.indexOf('}'));
          studyEmailUsers = studyEmailUsers.split(',');

          let isAllChecked = true;
          nextProps.allClientUsers.details.forEach(item => {
            const isChecked = _.find(studyEmailUsers, (o) => (parseInt(o) === item.user_id));
            if (!isChecked) {
              isAllChecked = false;
            }
            // set internal state to hold the value for the fields without re-rendering
            this.emailNotificationFields.push({
              email: item.email,
              userId: item.user_id,
              isChecked,
            });
          });
          // set internal state to hold the value for the field boolean without re-rendering
          this.checkAllEmailNotificationFields = isAllChecked;
        }
      } else if (customNotificationEmails.fetching && !nextProps.customNotificationEmails.fetching) {
        const customEmailNotifications = study.customEmailNotifications;

        this.customEmailNotificationFields = [];
        let isAllCustomChecked = (nextProps.customNotificationEmails.details.length);
        nextProps.customNotificationEmails.details.forEach(item => {
          const local = _.find(customEmailNotifications, (o) => (o.id === item.id));
          let isChecked = (item.type === 'active');
          if (local) {
            isChecked = local.isChecked;
            if (!isChecked) {
              isAllCustomChecked = false;
            }
          }
          // set internal state to hold the value for the field boolean without re-rendering
          this.customEmailNotificationFields.push({
            id: item.id,
            email: item.email,
            isChecked,
          });
        });
        // set internal state to hold the value for the field boolean without re-rendering
        this.checkAllCustomEmailNotificationFields = isAllCustomChecked;
      } else if (taggedIndicationsForStudy.fetching && !nextProps.taggedIndicationsForStudy.fetching) {
        // set the tagged indications for the study
        this.taggedIndicationsForStudy = nextProps.taggedIndicationsForStudy.details.map(item => ({
          value: item.indication_id,
          label: item.name
        }));
      } else if (!openModal && nextProps.openModal) {
        const {fetchAllClientUsersDashboard, fetchCustomNotificationEmails, fetchMessagingNumbersDashboard, fetchTaggedIndicationsForStudy} = this.props;
        console.log(study);
        // fetch more information about the users, the tagged indications, and the messaging numbers
        fetchAllClientUsersDashboard(study.client_id, study.site_id);
        fetchCustomNotificationEmails(study.study_id);
        // fetchMessagingNumbersDashboard();
        // fetchTaggedIndicationsForStudy(study.study_id);
      }
    }
  }

  getEditStudyInitialValues(study) {
    if (study) {
      const initialValues = Object.assign({}, study);
      initialValues.recruitment_phone = normalizePhoneDisplay(initialValues.recruitment_phone);
      initialValues.site = study.site_id;
      delete initialValues.site_id;
      initialValues.messagingNumber = study.text_number_id;
      delete initialValues.text_number_id;
      // populate the user email notifications
      initialValues.emailNotifications = this.emailNotificationFields;
      initialValues.checkAllInput = this.checkAllEmailNotificationFields;
      // populate the custom email notifications
      initialValues.customEmailNotifications = this.customEmailNotificationFields;
      initialValues.checkAllCustomInput = this.checkAllCustomEmailNotificationFields;
      // set the tagged indications for the study
      initialValues.taggedIndicationsForStudy = this.taggedIndicationsForStudy;

      return initialValues;
    }
    return {};
  }

  renderModalContent() {
    const { addEmailNotificationClick, openModal, onClose, study } = this.props;
    if (openModal) {
      const initialValues = this.getEditStudyInitialValues(study);
      return (
        <div>
          <div className="form-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">INFO</strong>
                <a className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right" /></a>
              </div>
            </div>
            <EditInformationForm
              addEmailNotificationClick={addEmailNotificationClick}
              initialValues={initialValues}
              onClose={onClose}
            />
          </div>
        </div>
      );
    }
    return (
      <div />
    );
  }

  render() {
    const { openModal } = this.props;

    return (
      <Collapse dimension="width" in={openModal} timeout={250} className="form-lightbox form-edit-information">
        {this.renderModalContent()}
      </Collapse>
    );
  }
}
