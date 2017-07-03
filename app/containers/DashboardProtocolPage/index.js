/*
 *
 * DashboardProtocolPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import DashboardProtocolSearch from './DashboardProtocolSearch/index';
import DashboardProtocolTable from './DashboardProtocolTable';

import { fetchProtocol, addProtocol, editProtocol, deleteProtocol, setActiveSort } from './actions';
import { selectDashboardProtocol, selectDashboardEditProtocolProcess, selectDashboardProtocolSearchFormValues, selectPaginationOptions } from './selectors';

export class DashboardProtocolPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchProtocols: PropTypes.func,
    protocol: PropTypes.object,
    addProtocol: PropTypes.func,
    editProtocol: PropTypes.func,
    deleteProtocol: PropTypes.func,
    editProtocolProcess: PropTypes.object,
    protocolSearchFormValues: PropTypes.object,
    setActiveSort: PropTypes.func,
    paginationOptions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
  }

  componentWillMount() {
    this.props.fetchProtocols();
  }

  loadMore() {
    const { fetchProtocols } = this.props;
    const offset = this.props.paginationOptions.page * 10;
    const limit = 10;
    fetchProtocols(limit, offset);
  }

  render() {
    return (
      <div className="container-fluid dashboard-protocol">
        <Helmet title="Protocol - StudyKIK" />
        <h2 className="main-heading">Protocol</h2>

        <DashboardProtocolSearch
          protocol={this.props.protocol}
          addProtocol={this.props.addProtocol}
          editProtocolProcess={this.props.editProtocolProcess}
        />
        <DashboardProtocolTable
          editProtocolProcess={this.props.editProtocolProcess}
          editProtocol={this.props.editProtocol}
          deleteProtocol={this.props.deleteProtocol}
          protocolSearchFormValues={this.props.protocolSearchFormValues}
          loadMore={this.loadMore}
          setActiveSort={this.props.setActiveSort}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  protocol: selectDashboardProtocol(),
  editProtocolProcess: selectDashboardEditProtocolProcess(),
  protocolSearchFormValues: selectDashboardProtocolSearchFormValues(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchProtocols: (limit, offset) => dispatch(fetchProtocol(limit, offset)),
    addProtocol: (payload) => dispatch(addProtocol(payload)),
    editProtocol: (payload) => dispatch(editProtocol(payload)),
    deleteProtocol: (payload) => dispatch(deleteProtocol(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProtocolPage);
