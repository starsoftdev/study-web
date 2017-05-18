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

import { fetchNote, addNote, editNote, deleteNote, setActiveSort } from './actions';
import { selectDashboardNote, selectDashboardEditNoteProcess, selectDashboardNoteSearchFormValues, selectPaginationOptions } from './selectors';

export class DashboardNotePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
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
  }

  render() {
    return (
      <div className="container-fluid dashboard-note">
        <Helmet title="NOTE - StudyKIK" />
        <h2 className="main-heading">NOTE</h2>

        <DashboardNoteSearch
          note={this.props.note}
          addNote={this.props.addNote}
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
  editNoteProcess: selectDashboardEditNoteProcess(),
  noteSearchFormValues: selectDashboardNoteSearchFormValues(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchNote: () => dispatch(fetchNote()),
    addNote: (payload) => dispatch(addNote(payload)),
    editNote: (payload) => dispatch(editNote(payload)),
    deleteNote: (payload) => dispatch(deleteNote(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardNotePage);
