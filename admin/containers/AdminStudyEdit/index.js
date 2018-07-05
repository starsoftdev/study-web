import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { stopSubmit } from 'redux-form';
import StudyInfoSection from '../../components/StudyInfoSection';
import EditStudyTabs from '../../components/EditStudyTabs';
import { normalizePhoneDisplay, normalizePhoneForServer } from '../../common/helper/functions';

import {
  fetchCro,
  fetchIndications,
  fetchSponsors,
  fetchProtocols,
  fetchUsersByRole,
} from '../../../app/containers/App/actions';

import {
  fetchNote,
  addNote,
  deleteNote,
  fetchLanding,
  fetchStudiesDashboard,
  fetchSiteLocations,
  fetchMessagingNumbersDashboard,
  fetchAllStudyEmailNotificationsDashboard,
  fetchCustomNotificationEmails,
  updateDashboardStudy,
} from './actions';

import {
  selectAdminDashboardNote,
  selectAdminDashboardEditNoteProcess,
  selectAdminDashboardEditNoteFormValues,
  selectStudyInfo,
  selectAllClientUsers,
  selectAllCustomNotificationEmails,
} from './selectors';

import { selectCurrentUser, selectStudies } from '../App/selectors';

const mapStateToProps = createStructuredSelector({
  note: selectAdminDashboardNote(),
  editNoteProcess: selectAdminDashboardEditNoteProcess(),
  formValues: selectAdminDashboardEditNoteFormValues(),
  currentUser: selectCurrentUser(),
  studies: selectStudies(),
  studyInfo: selectStudyInfo(),
  allClientUsers: selectAllClientUsers(),
  customNotificationEmails: selectAllCustomNotificationEmails(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchNote: (studyId) => dispatch(fetchNote(studyId)),
  addNote: (payload) => dispatch(addNote(payload)),
  deleteNote: (payload) => dispatch(deleteNote(payload)),
  fetchLanding: (studyId, utm) => dispatch(fetchLanding(studyId, utm)),
  fetchStudiesDashboard: (params, limit, offset) => dispatch(fetchStudiesDashboard(params, limit, offset)),
  fetchIndications: () => dispatch(fetchIndications()),
  fetchProtocols: () => dispatch(fetchProtocols()),
  fetchSponsors: () => dispatch(fetchSponsors()),
  fetchCro: () => dispatch(fetchCro()),
  fetchSiteLocations: () => dispatch(fetchSiteLocations()),
  fetchUsersByRole: () => dispatch(fetchUsersByRole()),
  fetchMessagingNumbersDashboard: () => dispatch(fetchMessagingNumbersDashboard()),
  fetchAllStudyEmailNotificationsDashboard: (clientId, studyId) => dispatch(fetchAllStudyEmailNotificationsDashboard(clientId, studyId)),
  fetchCustomNotificationEmails: (studyId) => dispatch(fetchCustomNotificationEmails(studyId)),
  updateDashboardStudy: (id, params, stopSubmit, formValues) => dispatch(updateDashboardStudy(id, params, stopSubmit, formValues)),
  stopSubmit: (errors) => dispatch(stopSubmit('Admin.EditStudyForm', errors)),
});

@connect(mapStateToProps, mapDispatchToProps)
export class AdminStudyEditPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    updateDashboardStudy: PropTypes.func.isRequired,
    params: PropTypes.object,
    editNoteProcess: PropTypes.object,
    fetchNote: PropTypes.func,
    addNote: PropTypes.func,
    deleteNote: PropTypes.func,
    formValues: PropTypes.any,
    note: PropTypes.object,
    currentUser: PropTypes.object,
    studies: PropTypes.object,
    fetchLanding: PropTypes.func,
    fetchStudiesDashboard: PropTypes.func,
    fetchIndications: PropTypes.func,
    fetchProtocols: PropTypes.func,
    fetchSponsors: PropTypes.func,
    fetchCro: PropTypes.func,
    fetchSiteLocations: PropTypes.func,
    fetchUsersByRole: PropTypes.func,
    studyInfo: PropTypes.object,
    fetchMessagingNumbersDashboard: PropTypes.func,
    allClientUsers: PropTypes.object.isRequired,
    fetchAllStudyEmailNotificationsDashboard: PropTypes.func,
    customNotificationEmails: PropTypes.object.isRequired,
    fetchCustomNotificationEmails: PropTypes.func.isRequired,
    stopSubmit: PropTypes.func.isRequired,
  };

  static emailNotificationFields = [];

  componentDidMount() {
    const { fetchNote, fetchLanding, fetchStudiesDashboard } = this.props;
    const { studyId } = this.props.params;

    if (studyId) {
      // load studyId related data.
      fetchNote(studyId);
      fetchLanding(studyId, null);
      fetchStudiesDashboard({search: {value: studyId} }, 1, 0);

      this.props.fetchIndications();
      this.props.fetchSponsors();
      this.props.fetchProtocols();
      this.props.fetchCro();
      this.props.fetchSiteLocations();
      this.props.fetchUsersByRole();
      this.props.fetchMessagingNumbersDashboard();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { allClientUsers, customNotificationEmails } = this.props;
    if (this.props.studyInfo.fetching && !nextProps.studyInfo.fetching){
      this.props.fetchAllStudyEmailNotificationsDashboard(nextProps.studyInfo.details.client_id, nextProps.studyInfo.details.study_id);
      this.props.fetchCustomNotificationEmails(nextProps.studyInfo.details.study_id);
    }

    if (allClientUsers.fetching && !nextProps.allClientUsers.fetching) {
      this.emailNotificationFields = [];
      // notification email records for users
      for (const item of nextProps.allClientUsers.details) {
        // set internal state to hold the value for the fields without triggering component updates
        this.emailNotificationFields.push({
          email: item.email,
          userId: item.user_id,
          isChecked: item.isChecked,
        });
      }
    }else if (customNotificationEmails.fetching && !nextProps.customNotificationEmails.fetching) {
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
    }
  }

  getEditStudyInitialValues = (study) => {
    if (study) {
      const initialValues = Object.assign({}, study);
      initialValues.recruitment_phone = normalizePhoneDisplay(initialValues.recruitment_phone);
      initialValues.site = study.site_id;
      delete initialValues.site_id;
      initialValues.messagingNumber = study.text_number_id;

      // populate the user email notifications
      initialValues.emailNotifications = this.emailNotificationFields;

      // populate the custom email notifications
      initialValues.customEmailNotifications = this.customEmailNotificationFields;

      return initialValues;
    }
    return null;
  }

  updateStudy = (values) => {
    const { studyInfo, updateDashboardStudy, stopSubmit } = this.props;
    const initialFormValues = this.getEditStudyInitialValues(studyInfo.details);
    // diff the updated form values
    const newParam = _.pickBy(values, (value, key) => (
      value !== initialFormValues[key]
    ));
    // delete tagged indications from the request because we already submitted the changes for the tagged indications
    delete newParam.taggedIndicationsForStudy;
    if (newParam.recruitment_phone) {
        newParam.recruitment_phone = normalizePhoneForServer(newParam.recruitment_phone);
    }
    // check the diff between the initial values of email notifications
    if (newParam.emailNotifications) {
      if (initialFormValues.emailNotifications) {
        newParam.emailNotifications = newParam.emailNotifications.filter((value, key) => {
          if (initialFormValues.emailNotifications[key]){
            return value.isChecked !== initialFormValues.emailNotifications[key].isChecked
          }
          return true;
        });
      }
      // the diff'ed email notifications are empty, don't include in the request
      if (newParam.emailNotifications.length === 0) {
        delete newParam.emailNotifications;
      }
    }
    // check the diff between the initial values of custom email notifications
    if (newParam.customEmailNotifications) {
      if (initialFormValues.customEmailNotifications) {
        newParam.customEmailNotifications = newParam.customEmailNotifications.filter((value, key) => {
          if (initialFormValues.customEmailNotifications[key]){
            return value.isChecked !== initialFormValues.customEmailNotifications[key].isChecked;
          }
          return true;
        });
      }
      // the diff'ed email notifications are empty, don't include in the request
      if (newParam.customEmailNotifications.length === 0) {
        delete newParam.customEmailNotifications;
      }
    }

    if (newParam.cnsCode){
      delete newParam.cnsCode

    }

    console.log(newParam);
    //updateDashboardStudy(initialFormValues.study_id, newParam, stopSubmit, values);
  }

  render() {
    const { note, currentUser, addNote, deleteNote, formValues, studyInfo, studies } = this.props;
    const { studyId } = this.props.params;
    let foundStudy = null;
    if (studies && studies.details.length) {
      foundStudy = studies.details.find(s => s.id === +studyId);
    }
    const selectedStudy = { ...foundStudy, id: +studyId } || { id: +studyId };
    const initialValues = this.getEditStudyInitialValues(studyInfo.details);

    return (
      <div id="adminStudyEditPage">
        {initialValues && <StudyInfoSection currentUser={currentUser} initialValues={initialValues} studyId={studyId} onSubmit={this.updateStudy} />}
        <div id="studyEditSection">
          <EditStudyTabs
            study={selectedStudy}
            note={note}
            currentUser={currentUser}
            addNote={addNote}
            deleteNote={deleteNote}
            formValues={formValues}
          />
        </div>
      </div>
    );
  }
}

export default AdminStudyEditPage;
