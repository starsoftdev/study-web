import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

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
  fetchStudiesDashboard,
  fetchSiteLocations,
  fetchMessagingNumbersDashboard,
} from './actions';

import {
  selectAdminDashboardNote,
  selectAdminDashboardEditNoteProcess,
  selectAdminDashboardEditNoteFormValues,
  selectStudyInfo,
} from './selectors';

import { selectCurrentUser } from '../../containers/App/selectors';

const mapStateToProps = createStructuredSelector({
  note: selectAdminDashboardNote(),
  editNoteProcess: selectAdminDashboardEditNoteProcess(),
  formValues: selectAdminDashboardEditNoteFormValues(),
  currentUser: selectCurrentUser(),
  studyInfo: selectStudyInfo(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchNote: (studyId) => dispatch(fetchNote(studyId)),
  addNote: (payload) => dispatch(addNote(payload)),
  deleteNote: (payload) => dispatch(deleteNote(payload)),
  fetchStudiesDashboard: (params, limit, offset) => dispatch(fetchStudiesDashboard(params, limit, offset)),
  fetchIndications: () => dispatch(fetchIndications()),
  fetchProtocols: () => dispatch(fetchProtocols()),
  fetchSponsors: () => dispatch(fetchSponsors()),
  fetchCro: () => dispatch(fetchCro()),
  fetchSiteLocations: () => dispatch(fetchSiteLocations()),
  fetchUsersByRole: () => dispatch(fetchUsersByRole()),
  fetchMessagingNumbersDashboard: () => dispatch(fetchMessagingNumbersDashboard()),
});

@connect(mapStateToProps, mapDispatchToProps)
export class AdminStudyEditPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    params: PropTypes.object,
    editNoteProcess: PropTypes.object,
    fetchNote: PropTypes.func,
    addNote: PropTypes.func,
    deleteNote: PropTypes.func,
    formValues: PropTypes.any,
    note: PropTypes.object,
    currentUser: PropTypes.object,
    fetchStudiesDashboard: PropTypes.func,
    fetchIndications: PropTypes.func,
    fetchProtocols: PropTypes.func,
    fetchSponsors: PropTypes.func,
    fetchCro: PropTypes.func,
    fetchSiteLocations: PropTypes.func,
    fetchUsersByRole: PropTypes.func,
    studyInfo: PropTypes.object,
    fetchMessagingNumbersDashboard: PropTypes.func,
  };

  componentDidMount() {
    const { fetchNote, fetchStudiesDashboard } = this.props;
    const { studyId } = this.props.params;

    if (studyId) {
      // load studyId related data.
      fetchNote(studyId);
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

  getEditStudyInitialValues = (study) => {
    if (study) {
      const initialValues = Object.assign({}, study);
      initialValues.recruitment_phone = normalizePhoneDisplay(initialValues.recruitment_phone);
      initialValues.site = study.site_id;
      delete initialValues.site_id;
      initialValues.messagingNumber = study.text_number_id;
      // populate the user email notifications
      //initialValues.emailNotifications = this.emailNotificationFields;
      //initialValues.checkAllInput = this.checkAllEmailNotificationFields;
      // populate the custom email notifications
      //initialValues.customEmailNotifications = this.customEmailNotificationFields;
      //initialValues.checkAllCustomInput = this.checkAllCustomEmailNotificationFields;
      // set the tagged indications for the study
      //initialValues.taggedIndicationsForStudy = this.taggedIndicationsForStudy;
      return initialValues;
    }
    return null;
  }

  updateStudy = (values) => {
    console.log('updateStudy', values);
    const { studyInfo } = this.props;
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
        newParam.emailNotifications = newParam.emailNotifications.filter((value, key) => (
          value.isChecked !== initialFormValues.emailNotifications[key].isChecked
        ));
      }
      // the diff'ed email notifications are empty, don't include in the request
      if (newParam.emailNotifications.length === 0) {
        delete newParam.emailNotifications;
      }
    }
    // check the diff between the initial values of custom email notifications
    if (newParam.customEmailNotifications) {
      if (initialFormValues.customEmailNotifications) {
        newParam.customEmailNotifications = newParam.customEmailNotifications.filter((value, key) => (
          value.isChecked !== initialFormValues.customEmailNotifications[key].isChecked
        ));
      }
      // the diff'ed email notifications are empty, don't include in the request
      if (newParam.customEmailNotifications.length === 0) {
        delete newParam.customEmailNotifications;
      }
    }

    console.log(newParam);

    //updateDashboardStudy(initialFormValues.study_id, newParam, stopSubmit, formValues);
  }

  render() {
    const { note, currentUser, addNote, deleteNote, formValues, studyInfo } = this.props;
    const { studyId } = this.props.params;
    const initialValues = this.getEditStudyInitialValues(studyInfo.details);

    return (
      <div id="adminStudyEditPage">
        {initialValues && <StudyInfoSection initialValues={initialValues} studyId={studyId} onSubmit={this.updateStudy} />}
        <div id="studyEditSection">
          <EditStudyTabs
            studyId={studyId}
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
