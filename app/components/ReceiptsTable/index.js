/**
*
* Proposals Table
*
*/

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import './styles.less';
import { StickyContainer, Sticky } from 'react-sticky';
import InfiniteScroll from 'react-infinite-scroller';

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
    sort: 'payment',
  },
  {
    text: 'Total',
    sort: 'total',
  },
];

class ReceiptsTable extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    selectCurrent: PropTypes.func,
    selectAll: PropTypes.func,
    searchBy: PropTypes.any,
    receipts: PropTypes.array,
    getReceipts: PropTypes.func,
    paginationOptions: PropTypes.object,
    searchOptions: PropTypes.array,
    setActiveSort: PropTypes.func,
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
      activeSort: null,
      activeDirection: null,
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
    const limit = 15;
    const offset = (this.props.paginationOptions.page) * 15;
    this.props.getReceipts(limit, offset, this.props.receipts, this.props.paginationOptions.activeSort, this.props.paginationOptions.activeDirection, this.props.searchOptions);
  }

  sortBy(ev) {
    ev.preventDefault();
    const sort = ev.currentTarget.dataset.sort;
    let direction = 'down';

    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = 'up';
    }

    if (sort !== 'payment') {
      this.props.setActiveSort(sort, direction);
      this.props.getReceipts(15, 0, this.props.receipts, sort, direction, this.props.searchOptions);
    }
  }

  mapHeaders(raw, state, result) {
    _.map(raw, (header, key) => {
      let width = '';
      switch (key) {
        case 0:
          width = '9.6%';
          break;
        case 1:
          width = '17.4%';
          break;
        case 2:
          width = '18.4%';
          break;
        case 3:
          width = '19.7%';
          break;
        case 4:
          width = '17.4%';
          break;
        case 5:
          width = '9.5%';
          break;
        default:
          width = 'auto';
          break;
      }

      result.push(
        <div
          key={key}
          data-sort={header.sort}
          onClick={this.sortBy}
          className={`th ${(this.props.paginationOptions.activeSort === header.sort) ? this.props.paginationOptions.activeDirection : ''}`}
          style={{ width }}
        >
          {header.text} <i className="caret-arrow" />
        </div>
      );
    });
  }

  mapReceipts(raw, result) {
    _.map(raw, (source, key) => {
      const date = new Date(source.created);
      const dateWrapper = moment(date).format('MM/DD/YY');
      const sub = ((source.total % 100) === 0) ? '.00' : false;

      result.push(
        <div className="tr" key={key}>
          <div className="td" style={{ width: '8%' }}>
            <span className={(source.selected) ? 'sm-container checked' : 'sm-container'}>
              <span className="input-style" onClick={this.onClickCurrent}>
                <input type="checkbox" name={key} />
              </span>
            </span>
            <span>{(key + 1)}</span>
          </div>
          <div className="td" style={{ width: '9.6%' }}>{dateWrapper}</div>
          <div className="td" style={{ width: '17.4%' }}>{source.site_name}</div>
          <div className="td" style={{ width: '18.4%' }}>{source.invoice_id}</div>
          <div className="td" style={{ width: '19.7%' }}>{source.protocol_number}</div>
          <div className="td" style={{ width: '17.4%' }}>card</div>
          <div className="td" style={{ width: '9.5%' }}>${(sub) ? `${(source.total / 100)}${sub}` : `${(source.total / 100).toFixed(2)}` }</div>
        </div>
      );
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
        <StickyContainer className="table-sticky">
          <Sticky className="header">
            <div className="tr">
              <div className="th" style={{ width: '8%' }}>
                <span className={(this.state.checkAll) ? 'sm-container checked' : 'sm-container'}>
                  <span className="input-style" onClick={this.onClickAll}>
                    <input name="all" type="checkbox" />
                  </span>
                </span>
                <span>#</span><i className="caret-arrow" />
              </div>
              {heads}
            </div>
          </Sticky>

          <InfiniteScroll
            className="tbody"
            pageStart={0}
            loadMore={this.loadItems}
            initialLoad={false}
            hasMore={this.props.paginationOptions.hasMoreItems}
            loader={<div>Loading...</div>}
          >
            {receipts}
          </InfiniteScroll>

        </StickyContainer>
      </div>
    );
  }
}

export default ReceiptsTable;
