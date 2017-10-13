import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingSpinner from '../../../components/LoadingSpinner';

import RowItem from './RowItem';
import { selectDashboardCro, selectPaginationOptions } from '../selectors';


export class DashboardCROTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    cros: PropTypes.object,
    editCro: PropTypes.func,
    deleteCro: PropTypes.func,
    setActiveSort: PropTypes.func,
    editCroProcess: PropTypes.object,
    croSearchFormValues: PropTypes.object,
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
    if (!this.props.cros) {
      return null;
    }

    let cro = this.props.cros.details;

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      cro = _.orderBy(cro, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
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
                <th onClick={this.sortBy} data-sort="name" className={`th ${(this.props.paginationOptions.activeSort === 'name') ? this.props.paginationOptions.activeDirection : ''}`}>CRO<i className="caret-arrow" /></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                cro.map((item, index) => (
                  <RowItem key={index} item={item} editCro={this.props.editCro} deleteCro={this.props.deleteCro} editCroProcess={this.props.editCroProcess} />
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
                  {this.props.cros.fetching && <div className="text-center"><LoadingSpinner showOnlyIcon /></div>}
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
  cros: selectDashboardCro(),
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
)(DashboardCROTable);
