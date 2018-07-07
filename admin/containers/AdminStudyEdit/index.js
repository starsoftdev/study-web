import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import StudyInfoSection from '../../components/StudyInfoSection';
import EditStudyTabs from '../../components/EditStudyTabs';

import {
  fetchNote,
  addNote,
  deleteNote,
  fetchLanding,
  fetchStudy,
} from './actions';

import {
  selectAdminDashboardNote,
  selectAdminDashboardEditNoteProcess,
  selectAdminDashboardEditNoteFormValues,
  selectStudy,
} from './selectors';

import { selectCurrentUser } from '../App/selectors';

const mapStateToProps = createStructuredSelector({
  note: selectAdminDashboardNote(),
  editNoteProcess: selectAdminDashboardEditNoteProcess(),
  formValues: selectAdminDashboardEditNoteFormValues(),
  currentUser: selectCurrentUser(),
  study: selectStudy(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchNote: (studyId) => dispatch(fetchNote(studyId)),
  addNote: (payload) => dispatch(addNote(payload)),
  deleteNote: (payload) => dispatch(deleteNote(payload)),
  fetchLanding: (studyId, utm) => dispatch(fetchLanding(studyId, utm)),
  fetchStudy: (studyId) => dispatch(fetchStudy(studyId)),
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
    study: PropTypes.object,
    fetchLanding: PropTypes.func,
    fetchStudy: PropTypes.func,
  };

  componentWillMount() {
    const { fetchNote, fetchLanding, fetchStudy } = this.props;
    const { studyId } = this.props.params;

    if (studyId) {
      // load studyId related data.
      fetchNote(studyId);
      fetchLanding(studyId, null);
      fetchStudy(studyId);

    }
  }

  render() {
    const { note, currentUser, addNote, deleteNote, formValues, study } = this.props;
    const { studyId } = this.props.params;
    const selectedStudy = { ...study, id: +studyId } || { id: +studyId };

    return (
      <div id="adminStudyEditPage">
        <StudyInfoSection study={selectedStudy} />
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
