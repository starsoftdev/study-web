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
    setActiveSort: PropTypes.func,
    editNoteProcess: PropTypes.object,
    noteSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.editNote = this.editNote.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentWillUnmount() {
    const defaultSort = 'noteData';
    this.props.setActiveSort(defaultSort, null);
  }

  editNote(params) {
    const nParam = {
      id: params.id,
      noteData: params.noteData,
      site_id: this.props.noteSearchFormValues.site,
    };
    console.log('---param---', nParam);
    this.props.editNote(nParam);
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';


    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);
  }

  render() {
    let note = this.props.note.details;
    if (this.props.noteSearchFormValues.site) {
      note = _.filter(note, (item) => (item.site_id === this.props.noteSearchFormValues.site));
    } else {
      return null;
    }

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      note = _.orderBy(note, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>
          <colgroup>
            <col style={{ width: '70%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: '8%' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr>
              <th onClick={this.sortBy} data-sort="noteData" className={`th ${(this.props.paginationOptions.activeSort === 'noteData') ? this.props.paginationOptions.activeDirection : ''}`}>Note<i className="caret-arrow" /></th>
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
