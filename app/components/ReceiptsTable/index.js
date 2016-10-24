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
    selectCurrent:  PropTypes.func,
    selectAll:  PropTypes.func,
    range:  PropTypes.any,
    searchBy:  PropTypes.any,
    receipts:  PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.onClickAll = this.onClickAll.bind(this);
    this.onClickCurrent = this.onClickCurrent.bind(this);

    this.state = {
      checkAll: false,
      receipts: false,
      filteredReceipts: null,
      activeSort: null,
      activeDirection: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.proposals) {
      this.setState({
        filteredReceipts: null,
      });
    }

    if (nextProps.range) {
      this.rangeSort(nextProps.range);
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

  rangeSort(range) {
    const receiptsInRange = [];
    const receiptsArr = this.props.receipts;
    for (const receipt of receiptsArr) {
      const created = new Date(receipt.created).getTime();
      const endDate = new Date(range.endDate).getTime();
      const startDate = new Date(range.startDate).getTime();

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
      const dateWrapper = moment(date);
      const sub = ((source.total % 100) === 0) ? '.00' : false;
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
          <td>{dateWrapper.calendar()}</td>
          <td>{source.invoiceDetails[0].campaign.site.name}</td>
          <td>{source.invoiceDetails[0].invoice_id}</td>
          <td>{source.invoiceDetails[0].campaign.study.protocolNumber}</td>
          <td>{(source.paymentMethod) ? source.paymentMethod.nickname : '-'}</td>
          <td>${(sub) ? `${(source.total / 100)}${sub}` : `${(source.total / 100).toFixed(2)}` }</td>
        </tr>
      );
    });
  }

  render() {
    const state = this.state;
    const receiptsArr = state.filteredReceipts || this.props.receipts;
    let receipts = [];
    let heads = [];

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
