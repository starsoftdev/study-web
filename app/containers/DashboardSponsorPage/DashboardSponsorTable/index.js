import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingSpinner from '../../../components/LoadingSpinner';
import RowItem from './RowItem';
import { selectDashboardSponsors, selectPaginationOptions } from '../selectors';

export class DashboardSponsorTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    sponsors: PropTypes.object,
    editSponsor: PropTypes.func,
    deleteSponsor: PropTypes.func,
    setActiveSort: PropTypes.func,
    editSponsorProcess: PropTypes.object,
    sponsorSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
    loadMore: PropTypes.func,
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
    if (!this.props.sponsors) {
      return null;
    }

    let sponsors = this.props.sponsors.details;
    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      sponsors = _.orderBy(sponsors, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    return (
      <div className="table-responsive table-holder table-indication alt">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.props.loadMore}
          initialLoad={false}
          hasMore={this.props.paginationOptions.hasMoreItems}
          loader={null}
        >
          <table className="table-manage-user table">
            <caption>&nbsp;</caption>

            <thead>
              <tr>
                <th onClick={this.sortBy} data-sort="name" className={`th ${(this.props.paginationOptions.activeSort === 'name') ? this.props.paginationOptions.activeDirection : ''}`}>Sponsor<i className="caret-arrow" /></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                sponsors.map((item, index) => (
                  <RowItem key={index} item={item} editSponsor={this.props.editSponsor} deleteSponsor={this.props.deleteSponsor} editSponsorProcess={this.props.editSponsorProcess} />
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
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
  sponsors: selectDashboardSponsors(),
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
)(DashboardSponsorTable);
