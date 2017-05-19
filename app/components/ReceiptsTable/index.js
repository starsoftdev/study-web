/**
*
* Proposals Table
*
*/

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment-timezone';
import InfiniteScroll from 'react-infinite-scroller';
import Money from '../../components/Money';

const headers = [
  {
    text: 'Date',
    sort: 'created',
  },
  {
    text: 'Site name',
    sort: 'site_name',
  },
  {
    text: 'Invoice number',
    sort: 'invoice_id',
  },
  {
    text: 'Protocol number',
    sort: 'protocol_number',
  },
  {
    text: 'Payment type',
    sort: 'payment_type',
  },
  {
    text: 'Total',
    sort: 'total',
  },
];

class ReceiptsTable extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.object,
    selectCurrent: PropTypes.func,
    selectAll: PropTypes.func,
    searchBy: PropTypes.any,
    receipts: PropTypes.array,
    getReceipts: PropTypes.func,
    paginationOptions: PropTypes.object,
    searchOptions: PropTypes.array,
    setActiveSort: PropTypes.func,
    siteLocations: PropTypes.array,
    showInvoicePdf: PropTypes.func,
    sortProposalsSuccess: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onClickAll = this.onClickAll.bind(this);
    this.onClickCurrent = this.onClickCurrent.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.loadItems = this.loadItems.bind(this);

    this.state = {
      checkAll: false,
      receipts: false,
      filteredReceipts: null,
      activeSort: 'created',
      activeDirection: 'down',
    };
  }

  componentWillReceiveProps() {
    if (this.state.filteredReceipts) {
      this.setState({
        filteredReceipts: null,
      });
    }
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    const defaultSort = '';
    this.props.setActiveSort(defaultSort, null);
  }

  onClickCurrent(ev) {
    ev.preventDefault();
    const scope = this;
    let selectedArr = [];
    let key = 0;
    const receipts = this.props.receipts;

    for (const receipt of receipts) {
      if (key === parseInt(ev.currentTarget.firstChild.name, 10)) {
        receipt.selected = (!receipt.selected);

        if (receipt.selected) {
          if (_.isEmpty(this.selectedReceipts)) {
            this.selectedReceipts = [];
            this.selectedReceipts.push(receipt);
          } else {
            selectedArr = this.selectedReceipts;
            selectedArr.push(receipt);

            this.selectedReceipts = selectedArr;
          }
        } else {
          this.selectedReceipts = _.filter(this.selectedReceipts, (o) => o.site !== receipt.site);
          if (!this.selectedReceipts.length) {
            this.selectedReceipts = null;
          }
        }
      }
      key++;
    }

    this.props.selectCurrent(this.selectedReceipts);

    this.setState({ receipts }, () => {
      let all = true;
      this.props.receipts.forEach((receipt) => {
        if (!receipt.selected) {
          all = false;
        }
      });

      if (scope.state.checkAll && !all) {
        this.setState({ checkAll: false });
      } else if (!scope.state.checkAll && all) {
        this.setState({ checkAll: true });
      }
    });
  }

  onClickAll(ev) {
    ev.preventDefault();
    const receipts = this.props.receipts;
    for (const receipt of receipts) {
      receipt.selected = (!this.state.checkAll);
    }

    this.setState({ checkAll: (!this.state.checkAll), receipts }, () => {
      this.selectedReceipts = (this.state.checkAll) ? receipts : null;
      this.props.selectAll(this.selectedReceipts);
    });
  }

  get selectedReceipts() {
    return this.SelectedReceipts;
  }

  set selectedReceipts(value) {
    this.SelectedReceipts = value;
  }

  loadItems() {
    const { currentUser, getReceipts, paginationOptions, receipts, searchOptions } = this.props;
    const limit = 15;
    const offset = (paginationOptions.page) * 15;
    getReceipts(currentUser.roleForClient.id, limit, offset, receipts, paginationOptions.activeSort, paginationOptions.activeDirection, searchOptions);
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

    const { currentUser, getReceipts, receipts, setActiveSort, sortProposalsSuccess, searchOptions } = this.props;
    if (sort === 'orderNumber') {
      const dir = ((direction === 'down') ? 'desc' : 'asc');
      const sortedProposals = _.orderBy(receipts, [function (o) {
        return o.orderNumber;
      }], [dir]);
      setActiveSort(sort, direction);
      sortProposalsSuccess(sortedProposals);
    } else if (sort !== 'payment') {
      setActiveSort(sort, direction);
      getReceipts(currentUser.roleForClient.id, 15, 0, receipts, sort, direction, searchOptions);
    }
  }

  mapHeaders(raw, state, result) {
    _.map(raw, (header, key) => {
      result.push(
        <th
          key={key}
          data-sort={header.sort}
          onClick={this.sortBy}
          className={`${(this.props.paginationOptions.activeSort === header.sort) ? this.props.paginationOptions.activeDirection : ''}`}
        >
          {header.text} <i className="caret-arrow" />
        </th>
      );
    });
  }

  mapReceipts(raw, result) {
    let invoiceId = null;
    _.map(raw, (receipt, key) => {
      const dateWrapper = moment(receipt.created).tz(this.props.currentUser.timezone).format('MM/DD/YY');
      const siteName = receipt.site_name || '-';

      let invoiceIdLink = receipt.invoice_id;
      if (receipt.invoice_pdf_id) {
        invoiceIdLink = <a className="show-pdf-link" onClick={() => this.props.showInvoicePdf(receipt.invoice_id)}>{receipt.invoice_id}</a>;
      }

      if (key === 0 || invoiceId !== receipt.invoice_id) {
        invoiceId = receipt.invoice_id;
        result.push(
          <tr key={key}>
            <td>
              <span className={(receipt.selected) ? 'sm-container checked' : 'sm-container'}>
                <span className="input-style" onClick={this.onClickCurrent}>
                  <input type="checkbox" name={key} />
                </span>
              </span>
              <span>{receipt.orderNumber}</span>
            </td>
            <td>{dateWrapper}</td>
            <td>{siteName}</td>
            <td>{invoiceIdLink}</td>
            <td>{receipt.protocol_number || ''}</td>
            <td>{receipt.payment_type}</td>
            <td><Money value={receipt.total / 100} className="price" /></td>
          </tr>
        );
      }
    });
  }

  render() {
    const state = this.state;
    const receipts = [];
    const heads = [];
    this.mapHeaders(headers, state, heads);
    this.mapReceipts(this.props.receipts, receipts);

    return (
      <div className="table-holder">
        <table className="table">
          <caption />
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '9.6%' }} />
            <col style={{ width: '17.4%' }} />
            <col style={{ width: '18.4%' }} />
            <col style={{ width: '19.7%' }} />
            <col style={{ width: '17.4%' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr>
              <th
                className="default-cursor"
              >
                <span className={(this.state.checkAll) ? 'sm-container checked' : 'sm-container'}>
                  <span className="input-style" onClick={this.onClickAll}>
                    <input name="all" type="checkbox" />
                  </span>
                </span>
                <span
                  className={`${(this.props.paginationOptions.activeSort === 'orderNumber') ? this.props.paginationOptions.activeDirection : ''}`}
                >#</span>
                <i className="caret-arrow" />
              </th>
              {heads}
            </tr>
          </thead>
          <InfiniteScroll
            element="tbody"
            pageStart={0}
            loadMore={this.loadItems}
            initialLoad={false}
            hasMore={this.props.paginationOptions.hasMoreItems}
            loader={<tr><td>Loading...</td></tr>}
          >
            {receipts}
          </InfiniteScroll>
        </table>
      </div>
    );
  }
}

export default ReceiptsTable;
