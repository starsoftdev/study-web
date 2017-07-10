import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';

import LoadingSpinner from '../../../components/LoadingSpinner';
import { selectDashboardMessagingNumber, selectPaginationOptions } from '../selectors';
import RowItem from './RowItem';

export class DashboardMessagingNumbersTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    messagingNumber: PropTypes.object,
    editMessagingNumber: PropTypes.func,
    deleteMessagingNumber: PropTypes.func,
    setActiveSort: PropTypes.func,
    editMessagingNumberProcess: PropTypes.object,
    messagingNumberSearchFormValues: PropTypes.object,
    paginationOptions: PropTypes.object,
    loadMore: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.sortBy = this.sortBy.bind(this);
  }

  componentWillUnmount() {
    const defaultSort = 'noteData';
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
    if (!this.props.messagingNumber) {
      return null;
    }

    let messagingNumbers = this.props.messagingNumber.details;

    if (this.props.messagingNumberSearchFormValues && this.props.messagingNumberSearchFormValues.messagingNumber) {
      messagingNumbers = messagingNumbers.filter(item => item.id === this.props.messagingNumberSearchFormValues.messagingNumber);
    }

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      messagingNumbers = _.orderBy(messagingNumbers, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    return (
      <div className="table-responsive table-holder table-indication alt">
        <InfiniteScroll
          className="test-test"
          pageStart={0}
          loadMore={this.props.loadMore}
          initialLoad={false}
          hasMore={this.props.paginationOptions.hasMoreItems}
          loader={null}
        >

          <table className="table-manage-user table">
            <caption>&nbsp;</caption>
            <colgroup>
              <col style={{ width: '23%' }} />
              <col style={{ width: '23%' }} />
              <col style={{ width: '23%' }} />
              <col style={{ width: '23%' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
            <thead>
              <tr>
                <th onClick={this.sortBy} data-sort="noteData" className={`th ${(this.props.paginationOptions.activeSort === 'noteData') ? this.props.paginationOptions.activeDirection : ''}`}>Messaging Number<i className="caret-arrow" /></th>
                <th>Study Number <i className="caret-arrow" /></th>
                <th>Site Location <i className="caret-arrow" /></th>
                <th>Friendly Name <i className="caret-arrow" /></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                messagingNumbers.map((item, index) => (
                  <RowItem
                    key={index}
                    item={item}
                    editMessagingNumber={this.props.editMessagingNumber}
                    deleteMessagingNumber={this.props.deleteMessagingNumber}
                    editMessagingNumberProcess={this.props.editMessagingNumberProcess}
                  />
                ))
              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5">
                  {this.props.messagingNumber.fetching && <div className="text-center"><LoadingSpinner showOnlyIcon /></div>}
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
  messagingNumber: selectDashboardMessagingNumber(),
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
)(DashboardMessagingNumbersTable);
