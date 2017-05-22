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

    this.sortBy = this.sortBy.bind(this);
  }

  componentWillUnmount() {
    const defaultSort = 'name';
    this.props.setActiveSort(defaultSort, null);
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

    if (this.props.noteSearchFormValues.note) {
      note = _.filter(note, (item) => (item.id === this.props.noteSearchFormValues.note));
    }

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      note = _.orderBy(note, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>

          <thead>
            <tr>
              <th onClick={this.sortBy} data-sort="name" className={`th ${(this.props.paginationOptions.activeSort === 'name') ? this.props.paginationOptions.activeDirection : ''}`}>Note<i className="caret-arrow" /></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              note.map((item, index) => (
                <RowItem key={index} item={item} editNote={this.props.editNote} deleteNote={this.props.deleteNote} editNoteProcess={this.props.editNoteProcess} />
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
