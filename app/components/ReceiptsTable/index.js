/**
*
* Proposals Table
*
*/

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import moment from 'moment';
import './styles.less';

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
    range: PropTypes.any,
    searchBy: PropTypes.any,
    receipts: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.onClickAll = this.onClickAll.bind(this);
    this.onClickCurrent = this.onClickCurrent.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.sort = this.sort.bind(this);

    this.state = {
      checkAll: false,
      receipts: false,
      filteredReceipts: null,
      activeSort: null,
      activeDirection: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    //  console.log('componentWillReceiveProps', nextProps);

    if (nextProps.proposals) {
      this.setState({
        filteredReceipts: null,
      });
    }

    if (nextProps.range) {
      this.rangeSort(nextProps.range);
    }

    if (nextProps.site || nextProps.searchBy) {
      this.sort(nextProps.site, nextProps.searchBy);
    } else {
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

  sort(site, searchBy) {
    const receiptsMatch = [];
    const receiptsArr = this.props.receipts;

    switch (true) {
      case site !== null && searchBy !== null:
        const number = parseInt(searchBy, 10);
        for (const receipt of receiptsArr) {
          const name = (receipt.invoiceDetails[0].campaign) ? receipt.invoiceDetails[0].campaign.site.name : receipt.sites.name;
          const protocol = (receipt.invoiceDetails[0].campaign) ? receipt.invoiceDetails[0].campaign.study.protocolNumber : '-';
          if (name === site.name) {
            if (!_.isNaN(number)) {
              if (number === receipt.id) {
                receiptsMatch.push(receipt);
              }
            } else if (searchBy === name) {
              receiptsMatch.push(receipt);
            } else if (searchBy === protocol) {
              receiptsMatch.push(receipt);
            }
          }
        }
        break;
      case searchBy !== null:
        for (const receipt of receiptsArr) {
          const number = parseInt(searchBy, 10);
          const name = (receipt.invoiceDetails[0].campaign) ? receipt.invoiceDetails[0].campaign.site.name : receipt.sites.name;
          const protocol = (receipt.invoiceDetails[0].campaign) ? receipt.invoiceDetails[0].campaign.study.protocolNumber : '-';
          if (!_.isNaN(number)) {
            if (number === receipt.id) {
              receiptsMatch.push(receipt);
            }
          } else if (searchBy === name) {
            receiptsMatch.push(receipt);
          } else if (searchBy === protocol) {
            receiptsMatch.push(receipt);
          }
        }
        break;
      case site !== null:
        for (const receipt of receiptsArr) {
          const name = (receipt.invoiceDetails[0].campaign) ? receipt.invoiceDetails[0].campaign.site.name : receipt.sites.name;
          if (name === site.name) {
            receiptsMatch.push(receipt);
          }
        }
        break;
      default:
        break;
    }

    this.setState({ filteredReceipts: receiptsMatch });
  }

  get selectedReceipts() {
    return this.SelectedReceipts;
  }

  set selectedReceipts(value) {
    this.SelectedReceipts = value;
  }

  sortBy(ev) {
    ev.preventDefault();
    const sort = ev.currentTarget.dataset.sort;
    let direction = 'down';

    if (ev.currentTarget.className && ev.currentTarget.className === 'down') {
      direction = 'up';
    }

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

    this.setState({ filteredReceipts: receiptsArr, activeSort: sort, activeDirection: direction });
  }

  rangeSort(range) {
    const receiptsInRange = [];
    const receiptsArr = this.props.receipts;
    for (const receipt of receiptsArr) {
      const created = new Date(receipt.created).getTime();
      const startDate = new Date(range.startDate).getTime();
      const endDate = new Date(range.endDate).getTime();

      if (created > startDate && created < endDate) {
        receiptsInRange.push(receipt);
      }
    }

    this.setState({ filteredReceipts: receiptsInRange });
  }

  mapHeaders(raw, state, result) {
    _.map(raw, (header, key) => {
      result.push(
        <th
          key={key}
          data-sort={header.sort}
          onClick={this.sortBy}
          className={(state.activeSort === header.sort) ? state.activeDirection : ''}
        >
          {header.text} <i className="caret-arrow" />
        </th>
      );
    });
  }

  mapProposals(raw, result) {
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
              <span
                className="input-style"
                onClick={this.onClickCurrent}
              >
                <input
                  type="checkbox"
                  name={key}
                />
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

  render() {
    const state = this.state;
    const receiptsArr = state.filteredReceipts || this.props.receipts;
    const receipts = [];
    const heads = [];

    this.mapHeaders(headers, state, heads);
    this.mapProposals(receiptsArr, receipts);

    return (
      <div className="table-holder">
        <table className="table">
          <colgroup>
            <col style={{ width: '7%' }} />
            <col style={{ width: '9.6%' }} />
            <col style={{ width: '17.4%' }} />
            <col style={{ width: '18.4%' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '17.4%' }} />
            <col style={{ width: '9.5%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>
                <span className={(this.state.checkAll) ? 'sm-container checked' : 'sm-container'}>
                  <span className="input-style" onClick={this.onClickAll}>
                    <input name="all" type="checkbox" />
                  </span>
                </span>
                <span>#</span><i className="caret-arrow" />
              </th>
              {heads}
            </tr>
          </thead>
          <tbody>
            {receipts}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ReceiptsTable;
