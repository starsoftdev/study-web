import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { selectDashboardProtocol, selectPaginationOptions } from '../selectors';

import RowItem from './RowItem';

export class DashboardProtocolTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    protocol: PropTypes.object,
    editProtocol: PropTypes.func,
    deleteProtocol: PropTypes.func,
    uploadFile: PropTypes.func,
    setActiveSort: PropTypes.func,
    editProtocolProcess: PropTypes.object,
    protocolSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
    loadMore: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.sortBy = this.sortBy.bind(this);
    this.loadItems = this.loadItems.bind(this);
  }

  componentWillUnmount() {
    const defaultSort = 'number';
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

  loadItems() {
    this.props.loadMore();
  }

  render() {
    if (!this.props.protocol) {
      return null;
    }
    let protocol = this.props.protocol.details;

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      protocol = _.orderBy(protocol, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    return (
      <div className="table-responsive table-holder table-indication alt">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems}
          initialLoad={false}
          hasMore={this.props.paginationOptions.hasMoreItems}
          loader={null}
        >
          <table className="table-manage-user table">
            <caption>&nbsp;</caption>
            <thead>
              <tr>
                <th onClick={this.sortBy} data-sort="number" className={`th ${(this.props.paginationOptions.activeSort === 'number') ? this.props.paginationOptions.activeDirection : ''}`}>Protocol<i className="caret-arrow" /></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                protocol.map((item, index) => (
                  <RowItem key={index} item={item} editProtocol={this.props.editProtocol} uploadFile={this.props.uploadFile} deleteProtocol={this.props.deleteProtocol} editProtocolProcess={this.props.editProtocolProcess} />
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
                  {this.props.protocol.fetching && <div className="text-center"><LoadingSpinner showOnlyIcon /></div>}
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
  protocol: selectDashboardProtocol(),
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
)(DashboardProtocolTable);
