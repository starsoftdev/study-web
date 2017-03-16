import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';
import _ from 'lodash';

export class DashboardExposureLevelTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    level: PropTypes.object,
    editLevel: PropTypes.func,
    deleteLevel: PropTypes.func,
    setActiveSort: PropTypes.func,
    editLevelProcess: PropTypes.object,
    levelSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.sortBy = this.sortBy.bind(this);
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
    let level = this.props.level.details;

    if (this.props.levelSearchFormValues.level) {
      level = _.filter(level, (item) => (item.id === this.props.levelSearchFormValues.level));
    }

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      level = _.orderBy(level, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    return (
      <div className="table-responsive table-holder table-indication alt">
        <table className="table-manage-user table">
          <caption>&nbsp;</caption>

          <thead>
            <tr>
              <th onClick={this.sortBy} data-sort="name" className={`th ${(this.props.paginationOptions.activeSort === 'name') ? this.props.paginationOptions.activeDirection : ''}`}>EXPOSURE LEVEL<i className="caret-arrow"></i></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              level.map((item, index) => (
                <RowItem key={index} item={item} editLevel={this.props.editLevel} deleteLevel={this.props.deleteLevel} editLevelProcess={this.props.editLevelProcess} />
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
)(DashboardExposureLevelTable);
