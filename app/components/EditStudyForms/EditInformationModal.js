/**
 * Created by mike on 10/11/16.
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Collapse from 'react-bootstrap/lib/Collapse';
import { normalizePhoneDisplay } from '../../common/helper/functions';
import {
  selectAllClientUsers,
  selectAllCustomNotificationEmails,
  selectTaggedIndicationsForStudy,
} from '../../containers/HomePage/AdminDashboard/selectors';
import {
  fetchAllStudyEmailNotificationsDashboard,
  fetchCustomNotificationEmails,
  fetchMessagingNumbersDashboard,
  fetchTaggedIndicationsForStudy,
} from '../../containers/HomePage/AdminDashboard/actions';

import EditInformationForm from './EditInformationForm';

const mapStateToProps = createStructuredSelector({
  allClientUsers: selectAllClientUsers(),
  customNotificationEmails: selectAllCustomNotificationEmails(),
  taggedIndicationsForStudy: selectTaggedIndicationsForStudy(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllStudyEmailNotificationsDashboard: (clientId, studyId) => dispatch(fetchAllStudyEmailNotificationsDashboard(clientId, studyId)),
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
    fetchAllStudyEmailNotificationsDashboard: PropTypes.func.isRequired,
    fetchCustomNotificationEmails: PropTypes.func.isRequired,
    fetchMessagingNumbersDashboard: PropTypes.func.isRequired,
    fetchTaggedIndicationsForStudy: PropTypes.func.isRequired,
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
        this.emailNotificationFields = [];
        // notification email records for users
        let isAllChecked = true;
        for (const item of nextProps.allClientUsers.details) {
          // compare and expand the details for the list of user ids in the notification array (this is because we're getting user IDs by custom SQL in the request)
          if (!item.isChecked) {
            isAllChecked = false;
          }
          // set internal state to hold the value for the fields without triggering component updates
          this.emailNotificationFields.push({
            email: item.email,
            userId: item.user_id,
            isChecked: item.isChecked,
          });
        }
        // set internal state to hold the value for the field boolean without triggering component updates
        this.checkAllEmailNotificationFields = isAllChecked;
      } else if (customNotificationEmails.fetching && !nextProps.customNotificationEmails.fetching) {
        this.customEmailNotificationFields = [];
        let isAllCustomChecked = true;
        nextProps.customNotificationEmails.details.forEach(item => {
          const isChecked = item.type === 'active';
          if (!isChecked) {
            isAllCustomChecked = false;
          }
          // set internal state to hold the value for the field boolean without triggering component updates
          this.customEmailNotificationFields.push({
            id: item.id,
            email: item.email,
            isChecked,
          });
        });
        // set internal state to hold the value for the field boolean without triggering component updates
        this.checkAllCustomEmailNotificationFields = isAllCustomChecked;
      } else if (taggedIndicationsForStudy.fetching && !nextProps.taggedIndicationsForStudy.fetching) {
        // set the tagged indications for the study
        this.taggedIndicationsForStudy = nextProps.taggedIndicationsForStudy.details.map(item => ({
          label: item.name,
          value: item.id,
        }));
      } else if (!openModal && nextProps.openModal) {
        const { fetchAllStudyEmailNotificationsDashboard, fetchCustomNotificationEmails, fetchMessagingNumbersDashboard, fetchTaggedIndicationsForStudy, study } = this.props;
        // fetch more information about the users, the tagged indications, and the messaging numbers
        fetchAllStudyEmailNotificationsDashboard(study.client_id, study.study_id);
        fetchCustomNotificationEmails(study.study_id);
        fetchMessagingNumbersDashboard();
        fetchTaggedIndicationsForStudy(study.study_id);
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
    const { addEmailNotificationClick, onClose, study } = this.props;
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

  render() {
    const { openModal } = this.props;

    return (
      <Collapse dimension="width" in={openModal} timeout={250} className="form-lightbox form-edit-information">
        {this.renderModalContent()}
      </Collapse>
    );
  }
}
