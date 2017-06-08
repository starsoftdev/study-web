/*
 *
 * DashboardNotePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { DashboardNoteSearch } from './DashboardNoteSearch/index';
import { DashboardNoteTable } from './DashboardNoteTable';

import { fetchNote, addNote, editNote, deleteNote, setActiveSort, fetchSites } from './actions';
import { selectDashboardNote, selectDashboardEditNoteProcess, selectDashboardNoteSearchFormValues, selectPaginationOptions, selectDashboardClientSites } from './selectors';

export class DashboardNotePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    clientSites: PropTypes.object,
    fetchSites: PropTypes.func,
    fetchNote: PropTypes.func,
    note: PropTypes.object,
    addNote: PropTypes.func,
    editNote: PropTypes.func,
    deleteNote: PropTypes.func,
    setActiveSort: PropTypes.func,
    editNoteProcess: PropTypes.object,
    noteSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
  }

  componentWillMount() {
    this.props.fetchNote();
    this.props.fetchSites();
  }

  render() {
    return (
      <div className="container-fluid dashboard-note">
        <Helmet title="Notes - StudyKIK" />
        <h2 className="main-heading">NOTES</h2>

        <DashboardNoteSearch
          clientSites={this.props.clientSites}
          addNote={this.props.addNote}
          noteSearchFormValues={this.props.noteSearchFormValues}
          editNoteProcess={this.props.editNoteProcess}
        />
        <DashboardNoteTable
          note={this.props.note}
          editNoteProcess={this.props.editNoteProcess}
          editNote={this.props.editNote}
          deleteNote={this.props.deleteNote}
          noteSearchFormValues={this.props.noteSearchFormValues}
          setActiveSort={this.props.setActiveSort}
          paginationOptions={this.props.paginationOptions}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  note: selectDashboardNote(),
  clientSites : selectDashboardClientSites(),
  editNoteProcess: selectDashboardEditNoteProcess(),
  noteSearchFormValues: selectDashboardNoteSearchFormValues(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites:       () => dispatch(fetchSites()),
    fetchNote: () => dispatch(fetchNote()),
    addNote: (payload) => dispatch(addNote(payload)),
    editNote: (payload) => dispatch(editNote(payload)),
    deleteNote: (payload) => dispatch(deleteNote(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNotePage);
