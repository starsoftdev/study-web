import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingSpinner from '../../../components/LoadingSpinner';

import RowItem from './RowItem';
import { selectLockedUsers, selectUnlockUserProcess, selectDashboardLockedUsersSearchFormValues, selectPaginationOptions } from '../selectors';
import { unlockUser, setActiveSort } from '../actions';

const mapStateToProps = createStructuredSelector({
  unlockUserProcess: selectUnlockUserProcess(),
  searchFormValues: selectDashboardLockedUsersSearchFormValues(),
  paginationOptions: selectPaginationOptions(),
  lockedUsers: selectLockedUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    unlockUser: (payload) => dispatch(unlockUser(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class DashboardLockedUsersTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    lockedUsers: React.PropTypes.object,
    unlockUser: React.PropTypes.func,
    unlockUserProcess: React.PropTypes.object,
    searchFormValues: React.PropTypes.object,
    setActiveSort: React.PropTypes.func,
    paginationOptions: React.PropTypes.object,
    loadMore: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.unlockUser = this.unlockUser.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentWillUnmount() {
    const defaultSort = 'email';
    this.props.setActiveSort(defaultSort, null);
  }

  unlockUser(userId) {
    this.props.unlockUser(userId);
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
    if (!this.props.lockedUsers) {
      return null;
    }

    let lockedUsers = this.props.lockedUsers.details;

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      lockedUsers = _.orderBy(lockedUsers, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    return (
      <div className="table-holder">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.props.loadMore}
          initialLoad={false}
          hasMore={this.props.paginationOptions.hasMoreItems}
          loader={null}
        >
          <table className="table-locked-user table client-admins">
            <caption>&nbsp;</caption>

            <thead>
              <tr>
                <th onClick={this.sortBy} data-sort="email" className={`th ${(this.props.paginationOptions.activeSort === 'email') ? this.props.paginationOptions.activeDirection : ''}`}>Email<i className="caret-arrow" /></th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {
                lockedUsers.map((item, index) => (
                  <RowItem key={index} item={item} unlockUser={this.unlockUser} />
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
                  {this.props.lockedUsers.fetching && <div className="text-center"><LoadingSpinner showOnlyIcon /></div>}
                </td>
              </tr>
            </tfoot>
          </table>
        </InfiniteScroll>
      </div>
    );
  }
}
