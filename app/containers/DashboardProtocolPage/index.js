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

import { fetchProtocol, addProtocol, editProtocol, uploadFile, deleteProtocol, setActiveSort, setSearchQuery } from './actions';
import { selectDashboardProtocol, selectDashboardEditProtocolProcess, selectDashboardProtocolSearchFormValues, selectPaginationOptions } from './selectors';

export class DashboardProtocolPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchProtocols: PropTypes.func,
    protocol: PropTypes.object,
    addProtocol: PropTypes.func,
    editProtocol: PropTypes.func,
    uploadFile: PropTypes.func,
    deleteProtocol: PropTypes.func,
    editProtocolProcess: PropTypes.object,
    protocolSearchFormValues: PropTypes.object,
    setActiveSort: PropTypes.func,
    paginationOptions: PropTypes.object,
    setSearchQuery: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
  }

  componentWillMount() {
    this.props.fetchProtocols();
  }

  onSubmitQuery(query) {
    const { fetchProtocols } = this.props;
    this.props.setSearchQuery(query);
    const offset = 0;
    const limit = 50;
    fetchProtocols(query, limit, offset);
  }

  loadMore() {
    const { fetchProtocols, protocol } = this.props;
    if (!protocol.fetching) {
      const query = this.props.paginationOptions.query;
      const offset = this.props.paginationOptions.page * 50;
      const limit = 50;
      fetchProtocols(query, limit, offset);
    }
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
          onSubmitQuery={this.onSubmitQuery}
        />
        <DashboardProtocolTable
          editProtocolProcess={this.props.editProtocolProcess}
          editProtocol={this.props.editProtocol}
          deleteProtocol={this.props.deleteProtocol}
          uploadFile={this.props.uploadFile}
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
    fetchProtocols: (query, limit, offset) => dispatch(fetchProtocol(query, limit, offset)),
    addProtocol: (payload) => dispatch(addProtocol(payload)),
    editProtocol: (payload) => dispatch(editProtocol(payload)),
    uploadFile: (payload) => dispatch(uploadFile(payload)),
    deleteProtocol: (payload) => dispatch(deleteProtocol(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    setSearchQuery: (query) => dispatch(setSearchQuery(query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProtocolPage);
