import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';

export class DashboardNoteTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    note: PropTypes.object,
    editNote: PropTypes.func,
    deleteNote: PropTypes.func,
    editNoteProcess: PropTypes.object,
    siteId: PropTypes.number,
    tableName: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.editNote = this.editNote.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentWillUnmount() {
    // this.props.setActiveSort(defaultSort, null);
  }

  editNote(params) {
    const nParam = {
      id: params.id,
      noteData: params.noteData,
      site_id: this.props.siteId,
    };
    this.props.editNote(nParam);
  }

  sortBy(ev) {
    ev.preventDefault();
  }

  render() {
    let note = this.props.note.details;
    if (this.props.siteId) {
      note = _.filter(note, (item) => (item.site_id === this.props.siteId));
    } else {
      return null;
    }

    // if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
    //   const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
    //   note = _.orderBy(note, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    // }

    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>{this.props.tableName ? this.props.tableName : '\u00A0'}</caption>
          <colgroup>
            <col style={{ width: '66%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Note<i className="caret-arrow" /></th>
              <th>DATE <i className="caret-arrow" /></th>
              <th>TIME <i className="caret-arrow" /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              note.map((item, index) => (
                <RowItem key={index} item={item} editNote={this.editNote} deleteNote={this.props.deleteNote} editNoteProcess={this.props.editNoteProcess} />
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardNoteTable);
