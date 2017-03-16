/*
 *
 * DashboardExposureLevelPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { DashboardExposureLevelSearch } from './DashboardExposureLevelSearch/index';
import { DashboardExposureLevelTable } from './DashboardExposureLevelTable';

import { fetchLevel, addLevel, editLevel, deleteLevel, setActiveSort } from './actions';
import { selectDashboardLevel, selectDashboardEditLevelProcess, selectDashboardLevelSearchFormValues, selectPaginationOptions } from './selectors';

export class DashboardExposureLevelPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchLevel: PropTypes.func,
    level: PropTypes.object,
    addLevel: PropTypes.func,
    editLevel: PropTypes.func,
    deleteLevel: PropTypes.func,
    setActiveSort: PropTypes.func,
    editLevelProcess: PropTypes.object,
    levelSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
  }

  componentWillMount() {
    this.props.fetchLevel();
  }

  render() {
    return (
      <div className="container-fluid dashboard-cro">
        <h2 className="main-heading">Exposure Level</h2>

        <DashboardExposureLevelSearch
          level={this.props.level}
          addLevel={this.props.addLevel}
          editLevelProcess={this.props.editLevelProcess}
        />
        <DashboardExposureLevelTable
          level={this.props.level}
          editLevelProcess={this.props.editLevelProcess}
          editLevel={this.props.editLevel}
          deleteLevel={this.props.deleteLevel}
          levelSearchFormValues={this.props.levelSearchFormValues}
          setActiveSort={this.props.setActiveSort}
          paginationOptions={this.props.paginationOptions}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  level: selectDashboardLevel(),
  editLevelProcess: selectDashboardEditLevelProcess(),
  levelSearchFormValues: selectDashboardLevelSearchFormValues(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchLevel: () => dispatch(fetchLevel()),
    addLevel: (payload) => dispatch(addLevel(payload)),
    editLevel: (payload) => dispatch(editLevel(payload)),
    deleteLevel: (payload) => dispatch(deleteLevel(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardExposureLevelPage);
