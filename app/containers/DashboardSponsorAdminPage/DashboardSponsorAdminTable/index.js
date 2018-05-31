import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingSpinner from '../../../components/LoadingSpinner';
import RowItem from './RowItem';
import {
  selectDashboardSponsorAdminsSponsors,
  selectPaginationOptions,
} from '../selectors';

export class DashboardSponsorAdminTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    sponsors: PropTypes.object,
    sponsorsWithoutAdmin: PropTypes.object,
    usersByRoles: PropTypes.object,
    editUserProcess: PropTypes.object,
    editSponsorAdmin: PropTypes.func,
    deleteSponsorAdmin: PropTypes.func,
    paginationOptions: PropTypes.object,
    sponsorAdminSearchFormValues: PropTypes.object,
    setActiveSort: PropTypes.func,
    loadMore: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.sortBy = this.sortBy.bind(this);
  }

  componentWillUnmount() {
    const defaultSort = 'first_name';
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
    if (!this.props.sponsors) {
      return null;
    }

    let sponsors = this.props.sponsors.details;

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      sponsors = _.orderBy(sponsors, [(o) => {
        if (this.props.paginationOptions.activeSort === 'first_name') {
          const firstName = _.get(o, 'first_name', '');
          const lastName = _.get(o, 'last_name', '');
          const name = `${firstName} ${lastName}`;
          return name;
        }
        return o[this.props.paginationOptions.activeSort];
      }], [dir]);
    }

    return (
      <div className="table-responsive table-holder table-sponsor-admin alt">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.props.loadMore}
          initialLoad={false}
          hasMore={this.props.paginationOptions.hasMoreItems}
          loader={null}
        >

          <table className="table-manage-user table">
            <caption>Admins</caption>

            <thead>
              <tr>
                <th onClick={this.sortBy} data-sort="name" className={`th ${(this.props.paginationOptions.activeSort === 'name') ? this.props.paginationOptions.activeDirection : ''}`}>Sponsor <i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="first_name" className={`th ${(this.props.paginationOptions.activeSort === 'first_name') ? this.props.paginationOptions.activeDirection : ''}`}>Name <i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="email" className={`th ${(this.props.paginationOptions.activeSort === 'email') ? this.props.paginationOptions.activeDirection : ''}`}>EMAIL <i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="bd_user_first_name" className={`th ${(this.props.paginationOptions.activeSort === 'bd_user_first_name') ? this.props.paginationOptions.activeDirection : ''}`}>BUSINESS DEVELOPMENT <i className="caret-arrow" /></th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {
                sponsors.map((item, index) => (
                  <RowItem key={index} item={item} sponsorsWithoutAdmin={this.props.sponsorsWithoutAdmin} usersByRoles={this.props.usersByRoles} editUserProcess={this.props.editUserProcess} editSponsorAdmin={this.props.editSponsorAdmin} deleteSponsorAdmin={this.props.deleteSponsorAdmin} />
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5">
                  {this.props.sponsors.fetching && <div className="text-center"><LoadingSpinner showOnlyIcon /></div>}
                </td>
              </tr>
            </tfoot>
          </table>
        </InfiniteScroll>

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  sponsors: selectDashboardSponsorAdminsSponsors(),
  paginationOptions: selectPaginationOptions(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardSponsorAdminTable);
