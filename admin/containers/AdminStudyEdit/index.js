import React, { Component, PropTypes } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import StudyInfoSection from '../../components/StudyInfoSection';
import EditStudyTabs from '../../components/EditStudyTabs';

import {
  fetchNote,
  addNote,
  deleteNote,
} from './actions';

import {
  selectAdminDashboardNote,
  selectAdminDashboardEditNoteProcess,
  selectAdminDashboardEditNoteFormValues,
} from './selectors';

import { selectCurrentUser, selectStudies } from '../App/selectors';

const mapStateToProps = createStructuredSelector({
  note: selectAdminDashboardNote(),
  editNoteProcess: selectAdminDashboardEditNoteProcess(),
  formValues: selectAdminDashboardEditNoteFormValues(),
  currentUser: selectCurrentUser(),
  studies: selectStudies(),
});

const mapDispatchToProps = (dispatch) => ({
  fetchNote: (studyId) => dispatch(fetchNote(studyId)),
  addNote: (payload) => dispatch(addNote(payload)),
  deleteNote: (payload) => dispatch(deleteNote(payload)),
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
    studies: PropTypes.object,
  };

  componentDidMount() {
    const { fetchNote } = this.props;
    const { studyId } = this.props.params;

    if (studyId) {
      // load studyId related data.
      fetchNote(studyId);
    }
  }

  render() {
    const { note, currentUser, addNote, deleteNote, formValues, studies } = this.props;
    const { studyId } = this.props.params;
    let foundStudy = null;
    if (studies && studies.details.length) {
      foundStudy = studies.details.find(s => s.id === +studyId);
    }
    const selectedStudy = { ...foundStudy, id: +studyId } || { id: +studyId };

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
