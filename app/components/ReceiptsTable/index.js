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
    sort: 'date',
  },
  {
    text: 'Site name',
    sort: 'site',
  },
  {
    text: 'Invoice number',
    sort: 'invoice',
  },
  {
    text: 'Protocol number',
    sort: 'protocol',
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
    hasMoreItems: PropTypes.bool,
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

  loadItems(page) {
    console.log('load items ', page);
    this.props.getReceipts(15, 0);
  }

  sortBy(ev) {
    ev.preventDefault();
    const sort = ev.currentTarget.dataset.sort;
    let direction = 'down';

    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = 'up';
    }
    console.log(direction);

    const receiptsArr = this.state.filteredReceipts || this.props.receipts;
    const directionUnits = (direction === 'up') ? {
      more: 1,
      less: -1,
    } : {
      more: -1,
      less: 1,
    };

    switch (sort) {
      case 'date':
        receiptsArr.sort((a, b) => {
          const aDate = new Date(a.created).getTime();
          const bDate = new Date(b.created).getTime();

          if (aDate > bDate) {
            return directionUnits.more;
          }
          if (aDate < bDate) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      case 'site':
        receiptsArr.sort((a, b) => {
          const siteNameA = (a.invoiceDetails[0].campaign) ? a.invoiceDetails[0].campaign.site.name : a.sites.name;
          const siteNameB = (b.invoiceDetails[0].campaign) ? b.invoiceDetails[0].campaign.site.name : b.sites.name;

          if (siteNameA > siteNameB) {
            return directionUnits.more;
          }
          if (siteNameA < siteNameB) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      case 'payment':
        receiptsArr.sort((a, b) => {
          if ((a.payment_method_id !== null && b.payment_method_id !== null)
            && a.paymentMethod.nickname > b.paymentMethod.nickname) {
            return directionUnits.more;
          }
          if ((a.payment_method_id !== null && b.payment_method_id !== null)
            && a.paymentMethod.nickname < b.paymentMethod.nickname) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      case 'protocol':
        receiptsArr.sort((a, b) => {
          const protocolNumberA = (a.invoiceDetails[0].campaign) ? a.invoiceDetails[0].campaign.study.protocolNumber : '-';
          const protocolNumberB = (b.invoiceDetails[0].campaign) ? b.invoiceDetails[0].campaign.study.protocolNumber : '-';

          if (protocolNumberA > protocolNumberB) {
            return directionUnits.more;
          }
          if (protocolNumberA < protocolNumberB) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      case 'total':
        receiptsArr.sort((a, b) => {
          if (a.total > b.total) {
            return directionUnits.more;
          }
          if (a.total < b.total) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      case 'invoice':
        receiptsArr.sort((a, b) => {
          if (a.id > b.id) {
            return directionUnits.more;
          }
          if (a.id < b.id) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      default:
        break;
    }

    this.setState({
      filteredReceipts: receiptsArr,
      activeSort: sort,
      activeDirection: direction,
    });
  }

  mapHeaders(raw, state, result) {
    _.map(raw, (header, key) => {

      let width = '';
      switch(key){
        case 0:
          width = '9.6%'
          break;
        case 1:
          width = '17.4%'
          break;
        case 2:
          width = '18.4%'
          break;
        case 3:
          width = '20.7%'
          break;
        case 4:
          width = '17.4%'
          break;
        case 5:
          width = '9.5%'
          break;
      }

      result.push(
        <div
          key={key}
          data-sort={header.sort}
          onClick={this.sortBy}
          className={`th ${(state.activeSort === header.sort) ? state.activeDirection : ''}`}
          style={{ width: width }}
        >
          {header.text} <i className="caret-arrow" />
        </div>
      );
    });
  }

  mapReceipts(raw, result) {
    _.map(raw, (source, key) => {
      const date = new Date(source.created);
      const dateWrapper = moment(date).format('YYYY/MM/DD');
      const sub = ((source.total % 100) === 0) ? '.00' : false;

      if (source.invoiceDetails.length) {
        let site = '-';
        const protocol = (source.invoiceDetails[0].campaign) ? source.invoiceDetails[0].campaign.study.protocolNumber : '-';
        if (source.invoiceDetails[0].campaign) {
          site = source.invoiceDetails[0].campaign.site.name;
        } else if (source.sites) {
          site = source.sites.name;
        }

        result.push(
          <tr key={key}>
            <td>
              <span className={(source.selected) ? 'sm-container checked' : 'sm-container'}>
                <span className="input-style" onClick={this.onClickCurrent}>
                  <input type="checkbox" name={key} />
                </span>
              </span>
            </td>
            <td>{dateWrapper}</td>
            <td>{site}</td>
            <td>{source.invoiceDetails[0].invoice_id}</td>
            <td>{protocol}</td>
            <td>card</td>
            <td>${(sub) ? `${(source.total / 100)}${sub}` : `${(source.total / 100).toFixed(2)}` }</td>
          </tr>
        );
      }
    });
  }

  mapReceipts2(raw, result) {
    _.map(raw, (source, key) => {
      const date = new Date(source.created);
      const dateWrapper = moment(date).format('YYYY/MM/DD');
      const sub = ((source.total % 100) === 0) ? '.00' : false;

      if (source.invoiceDetails.length) {
        let site = '-';
        const protocol = (source.invoiceDetails[0].campaign) ? source.invoiceDetails[0].campaign.study.protocolNumber : '-';
        if (source.invoiceDetails[0].campaign) {
          site = source.invoiceDetails[0].campaign.site.name;
        } else if (source.sites) {
          site = source.sites.name;
        }

        result.push(
          <div className="tr" key={key}>
            <div className="td" style={{ width: '7%' }}>
              <span className={(source.selected) ? 'sm-container checked' : 'sm-container'}>
                <span className="input-style" onClick={this.onClickCurrent}>
                  <input type="checkbox" name={key} />
                </span>
              </span>
            </div>
            <div className="td" style={{ width: '9.6%' }}>{dateWrapper}</div>
            <div className="td" style={{ width: '17.4%' }}>{site}</div>
            <div className="td" style={{ width: '18.4%' }}>{source.invoiceDetails[0].invoice_id}</div>
            <div className="td" style={{ width: '20.7%' }}>{protocol}</div>
            <div className="td" style={{ width: '17.4%' }}>card</div>
            <div className="td" style={{ width: '9.5%' }}>${(sub) ? `${(source.total / 100)}${sub}` : `${(source.total / 100).toFixed(2)}` }</div>
          </div>
        );
      }
    });
  }

  render() {
    console.log('render');
    const state = this.state;
    //const receiptsArr = state.filteredReceipts || this.props.receipts;
    const receipts = [];
    const receipts2 = [];
    const heads = [];

    this.mapHeaders(headers, state, heads);
    this.mapReceipts(this.props.receipts, receipts);
    this.mapReceipts2(this.props.receipts, receipts2);

    return (
      <div className="table-holder">
        <StickyContainer className="table-sticky">
          <Sticky className="header">
            <div className="tr">
              <div className="th" style={{ width: '7%' }}>
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
            hasMore={this.props.hasMoreItems}
            loader={<div>Loading...</div>}
          >
            {receipts2}
          </InfiniteScroll>

          {/*<table className="table">
            <colgroup>
              <col style={{ width: '7%' }} />
              <col style={{ width: '9.6%' }} />
              <col style={{ width: '17.4%' }} />
              <col style={{ width: '18.4%' }} />
              <col style={{ width: '20.7%' }} />
              <col style={{ width: '17.4%' }} />
              <col style={{ width: '9.5%' }} />
            </colgroup>

            <tbody>
            {receipts}
            </tbody>

            
          </table>*/}
          
        </StickyContainer>
      </div>
    );
  }
}

export default ReceiptsTable;
