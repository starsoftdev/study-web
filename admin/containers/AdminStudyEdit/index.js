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
} from './actions';

import {
  selectAdminDashboardNote,
  selectAdminDashboardEditNoteProcess,
  selectAdminDashboardEditNoteFormValues,
} from './selectors';

import { selectCurrentUser } from '../../containers/App/selectors';

const mapStateToProps = createStructuredSelector({
  note: selectAdminDashboardNote(),
  editNoteProcess: selectAdminDashboardEditNoteProcess(),
  formValues: selectAdminDashboardEditNoteFormValues(),
  currentUser: selectCurrentUser(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchNote: (studyId) => dispatch(fetchNote(studyId)),
  addNote: (payload) => dispatch(addNote(payload)),
  deleteNote: (payload) => dispatch(deleteNote(payload)),
  fetchLanding: (studyId, utm) => dispatch(fetchLanding(studyId, utm)),
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
    fetchLanding: PropTypes.func,
  };

  componentDidMount() {
    const { fetchNote, fetchLanding } = this.props;
    const { studyId } = this.props.params;

    if (studyId) {
      // load studyId related data.
      fetchNote(studyId);
      fetchLanding(studyId, null);
    }
  }

  render() {
    const { note, currentUser, addNote, deleteNote, formValues } = this.props;
    const { studyId } = this.props.params;

    return (
      <div id="adminStudyEditPage">
        <StudyInfoSection study={{ id: studyId }} />
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
