/*
 *
 * DashboardLockedUsers
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import DashboardLockedUsersSearch from './DashboardLockedUsersSearch';
import DashboardLockedUsersTable from './DashboardLockedUsersTable';
import { selectPaginationOptions, selectLockedUsers } from './selectors';
import { fetchLockedUsers, setSearchQuery } from './actions';

export class DashboardLockedUsers extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchLockedUsers: PropTypes.func,
    lockedUsers: PropTypes.object,
    paginationOptions: PropTypes.object,
    setSearchQuery: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
  }


  componentWillMount() {
    this.props.fetchLockedUsers();
  }

  onSubmitQuery(query) {
    const { fetchLockedUsers } = this.props;
    this.props.setSearchQuery(query);
    const offset = 0;
    const limit = 10;
    fetchLockedUsers(query, limit, offset);
  }

  loadMore() {
    const { fetchLockedUsers, lockedUsers } = this.props;
    if (!lockedUsers.fetching) {
      const query = this.props.paginationOptions.query;
      const offset = this.props.paginationOptions.page * 10;
      const limit = 10;
      fetchLockedUsers(query, limit, offset);
    }
  }

  render() {
    return (
      <div className="container-fluid dashboard-locked-users">
        <Helmet title="Locked Users - StudyKIK" />
        <h2 className="main-heading">LOCKED USERS</h2>

        <DashboardLockedUsersSearch
          onSubmitQuery={this.onSubmitQuery}
        />
        <DashboardLockedUsersTable
          admins={this.props.lockedUsers}
          loadMore={this.loadMore}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  lockedUsers: selectLockedUsers(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchLockedUsers: (query, limit, skip) => dispatch(fetchLockedUsers(query, limit, skip)),
    setSearchQuery: (query) => dispatch(setSearchQuery(query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLockedUsers);
