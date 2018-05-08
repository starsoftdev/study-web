/**
*
* PaymentMethodsForm
*
*/

import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import _ from 'lodash';

import CardItem from '../../components/CardItem';
import { translate } from '../../../common/utilities/localization';

class PaymentMethodsForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clientId: PropTypes.any,
    customerId: PropTypes.any,
    deleteCreditCard: PropTypes.func,
    creditCards: PropTypes.array,
    paginationOptions: PropTypes.object,
    setActiveSort: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.sortBy = this.sortBy.bind(this);
  }

  componentWillUnmount() {
    const defaultSort = 'brand';
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
    let sorted = this.props.creditCards;

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');

      sorted = _.orderBy(this.props.creditCards, [(o) => {
        if (this.props.paginationOptions.activeSort === 'expDate') {
          const expMonthStr = (o.exp_month < 10) ? `0${o.exp_month}` : o.exp_month.toString();
          const date = moment(`${o.exp_year}-${expMonthStr}-01`);
          return date;
        }
        return o[this.props.paginationOptions.activeSort];
      }], [dir]);
    }

    const cardsListContents = sorted.map((item, index) => (
      <CardItem
        {...item}
        key={index}
        deleteCreditCard={this.props.deleteCreditCard}
        clientId={this.props.clientId}
        customerId={this.props.customerId}
      />
    ));

    return (
      <div>
        <div className="table-holder payment-table-holder">
          <header>
            <h2>{translate('client.component.paymentMethodsForm.header')}</h2>
          </header>
          <table className="table table-payment-info">
            <colgroup>
              <col style={{ width: '24%' }} />
              <col style={{ width: '24%' }} />
              <col style={{ width: '24%' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
            <thead>
              <tr>
                <th onClick={this.sortBy} data-sort="brand" className={(this.props.paginationOptions.activeSort === 'brand') ? this.props.paginationOptions.activeDirection : ''}>{translate('client.component.paymentMethodsForm.titleType')} <i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="name" className={(this.props.paginationOptions.activeSort === 'name') ? this.props.paginationOptions.activeDirection : ''}>{translate('client.component.paymentMethodsForm.titleName')} <i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="last4" className={(this.props.paginationOptions.activeSort === 'last4') ? this.props.paginationOptions.activeDirection : ''}>{translate('client.component.paymentMethodsForm.titleLastDigits')} <i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="expDate" className={(this.props.paginationOptions.activeSort === 'expDate') ? this.props.paginationOptions.activeDirection : ''}>{translate('client.component.paymentMethodsForm.titleExpiration')} <i className="caret-arrow" /></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cardsListContents}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PaymentMethodsForm;
