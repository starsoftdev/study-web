/*
 *
 * DashboardMessagingNumbersPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';

import { fetchMessagingNumbers, addMessagingNumber, editMessagingNumber, archiveMessagingNumber,
  setActiveSort, setSearchQuery } from './actions';
import { selectDashboardMessagingNumber, selectDashboardEditMessagingNumberProcess,
  selectDashboardMessagingNumberSearchFormValues, selectPaginationOptions } from './selectors';
import DashboardMessagingNumberSearch from './DashboardMessagingNumberSearch/index';
import DashboardMessagingNumbersTable from './DashboardMessagingNumbersTable/index';

// eslint-disable-line react/prefer-stateless-function
export class DashboardMessagingNumbersPage extends React.Component {

  static propTypes = {
    fetchMessagingNumbers: PropTypes.func,
    messagingNumber: PropTypes.object,
    addMessagingNumber: PropTypes.func,
    editMessagingNumber: PropTypes.func,
    deleteMessagingNumber: PropTypes.func,
    setActiveSort: PropTypes.func,
    editMessagingNumberProcess: PropTypes.object,
    messagingNumberSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
    setSearchQuery: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
  }

  componentWillMount() {
    this.props.fetchMessagingNumbers();
  }

  onSubmitQuery(query) {
    const { fetchMessagingNumbers } = this.props;
    this.props.setSearchQuery(query);
    const offset = 0;
    const limit = 10;
    fetchMessagingNumbers(query, limit, offset);
  }

  loadMore() {
    const { fetchMessagingNumbers, messagingNumber } = this.props;
    if (!messagingNumber.fetching) {
      const query = this.props.paginationOptions.query;
      const offset = this.props.paginationOptions.page * 10;
      const limit = 10;
      fetchMessagingNumbers(query, limit, offset);
    }
  }

  render() {
    return (
      <div className="container-fluid dashboard-note">
        <Helmet title="Messaging Numbers - StudyKIK" />
        <h2 className="main-heading">Messaging Numbers</h2>
        <DashboardMessagingNumberSearch
          messagingNumber={this.props.messagingNumber}
          messagingNumberSearchFormValues={this.props.messagingNumberSearchFormValues}
          onSubmitQuery={this.onSubmitQuery}
        />
        <DashboardMessagingNumbersTable
          editMessagingNumberProcess={this.props.editMessagingNumberProcess}
          editMessagingNumber={this.props.editMessagingNumber}
          deleteMessagingNumber={this.props.deleteMessagingNumber}
          messagingNumberSearchFormValues={this.props.messagingNumberSearchFormValues}
          setActiveSort={this.props.setActiveSort}
          loadMore={this.loadMore}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  messagingNumber: selectDashboardMessagingNumber(),
  editMessagingNumberProcess: selectDashboardEditMessagingNumberProcess(),
  messagingNumberSearchFormValues: selectDashboardMessagingNumberSearchFormValues(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchMessagingNumbers: (limit, offset) => dispatch(fetchMessagingNumbers(limit, offset)),
    addMessagingNumber: (payload) => dispatch(addMessagingNumber(payload)),
    editMessagingNumber: (payload) => dispatch(editMessagingNumber(payload)),
    deleteMessagingNumber: (payload) => dispatch(archiveMessagingNumber(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    setSearchQuery: (query) => dispatch(setSearchQuery(query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardMessagingNumbersPage);
