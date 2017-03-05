/*
 *
 * DashboardCROPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { DashboardCROSearch } from './DashboardCROSearch/index';
import { DashboardCROTable } from './DashboardCROTable';

import { fetchCro, addCro, editCro, deleteCro, setActiveSort } from './actions';
import { selectDashboardCro, selectDashboardEditCroProcess, selectDashboardCroSearchFormValues, selectPaginationOptions } from './selectors';

export class DashboardCROPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchCro: PropTypes.func,
    cro: PropTypes.object,
    addCro: PropTypes.func,
    editCro: PropTypes.func,
    deleteCro: PropTypes.func,
    setActiveSort: PropTypes.func,
    editCroProcess: PropTypes.object,
    croSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
  }

  componentWillMount() {
    this.props.fetchCro();
  }

  render() {
    return (
      <div className="container-fluid dashboard-cro">
        <h2 className="main-heading">CRO</h2>

        <DashboardCROSearch
          cro={this.props.cro}
          addCro={this.props.addCro}
          editCroProcess={this.props.editCroProcess}
        />
        <DashboardCROTable
          cro={this.props.cro}
          editCroProcess={this.props.editCroProcess}
          editCro={this.props.editCro}
          deleteCro={this.props.deleteCro}
          croSearchFormValues={this.props.croSearchFormValues}
          setActiveSort={this.props.setActiveSort}
          paginationOptions={this.props.paginationOptions}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cro: selectDashboardCro(),
  editCroProcess: selectDashboardEditCroProcess(),
  croSearchFormValues: selectDashboardCroSearchFormValues(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCro: () => dispatch(fetchCro()),
    addCro: (payload) => dispatch(addCro(payload)),
    editCro: (payload) => dispatch(editCro(payload)),
    deleteCro: (payload) => dispatch(deleteCro(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCROPage);
