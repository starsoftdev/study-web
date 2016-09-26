/**
 *
 * Shopping Cart Form
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { sumBy, map } from 'lodash';
import { Field, reduxForm } from 'redux-form';

import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';
import { selectCouponId, selectShoppingCartFormError } from './selectors';
import { selectCoupon, selectCards, selectCurrentUser } from 'containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';
import Money from 'components/Money';
import { fetchCoupon, fetchCards } from 'containers/App/actions';
import './styles.less';

const mapStateToProps = createStructuredSelector({
  couponId: selectCouponId(),
  coupon: selectCoupon(),
  cards: selectCards(),
  currentUser: selectCurrentUser(),
  hasError: selectShoppingCartFormError(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCoupon: (id) => dispatch(fetchCoupon(id)),
    fetchCards: (customerId) => dispatch(fetchCards(customerId)),
  };
}

@reduxForm({ form: 'shoppingCart', validate: formValidator })
@connect(mapStateToProps, mapDispatchToProps)

class ShoppingCartForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
    addOns: PropTypes.array.isRequired,
    couponId: PropTypes.string,
    coupon: PropTypes.object,
    cards: PropTypes.object,
    hasError: PropTypes.bool,
    fetchCoupon: PropTypes.func,
    fetchCards: PropTypes.func,
    handleSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onFetchCoupon = this.onFetchCoupon.bind(this);
    this.props.fetchCards(this.props.currentUser.roleForClient.client.stripeCustomerId);
  }

  onFetchCoupon() {
    this.props.fetchCoupon(this.props.couponId);
  }

  calculateTotal() {
    const { coupon, addOns } = this.props;
    const subTotal = sumBy(addOns, 'total');
    let discount = 0;
    if (coupon.details) {
      if (coupon.details.amount_off) {
        discount = coupon.details.amount_off;
      } else if (coupon.details.percent_off) {
        discount = subTotal * (coupon.details.percent_off / 100);
      }
    }
    const total = parseFloat((subTotal - discount).toFixed(2));

    return { subTotal, discount, total };
  }

  render() {
    const { addOns, coupon, cards, hasError, handleSubmit } = this.props;
    const { subTotal, discount, total } = this.calculateTotal();
    let addOnsContent = null;
    if (addOns) {
      addOnsContent = addOns.map((product, index) => (
        <tr className="add-on" key={index}>
          <td>{product.title}</td>
          <td><Money value={product.price} /></td>
          <td>{product.quantity}</td>
          <td><Money value={product.total} className="price" /></td>
        </tr>
      ));
    }
    let creditCardOptions = [];
    if (cards) {
      creditCardOptions = map(cards.data, cardIterator => ({
        label: `xxxx xxxx xxxx ${cardIterator.last4}`,
        value: cardIterator.id,
      }));
    }

    return (
      <form className="form-shopping-cart" onSubmit={handleSubmit}>
        <div className="shopping-cart">
          <div className="head">
            <h3>Order Summary</h3>
          </div>

          <div className="scroll jcf--scrollabel">
            <div className="scroll-holder">
              <div className="table-holder">
                <table className="table-summary">
                  <colgroup>
                    <col style={{ width: '44.2%' }} />
                    <col style={{ width: '17.6%' }} />
                    <col style={{ width: '23.6%' }} />
                    <col style={{ width: 'auto' }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>PRODUCT <i className="caret-arrow" /></th>
                      <th>PRICE <i className="caret-arrow" /></th>
                      <th>QUANTITY <i className="caret-arrow" /></th>
                      <th>TOTAL <i className="caret-arrow" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {addOnsContent}
                  </tbody>
                </table>
              </div>

              <div className="coupon-area">
                <Field
                  name="couponId"
                  component={Input}
                  type="text"
                  placeholder="Coupon"
                  className="field"
                />
                <button
                  className="btn btn-primary coupon-btn"
                  onClick={this.onFetchCoupon}
                  disabled={coupon.fetching}
                />
              </div>

              <div className="total clearfix">
                <span className="heading">Subtotal</span>
                <Money value={subTotal} className="price subtotal-price" />
              </div>

              <div className="total discount clearfix">
                <span className="heading">discount</span>
                {coupon.fetching
                  ? <span className="price">
                    <LoadingSpinner showOnlyIcon size={20} className="price" />
                  </span>
                  : <Money value={discount} className="price discount-amount" />
                }
              </div>

              <div className="total grand-total clearfix">
                <strong className="heading">Total</strong>
                <Money value={total} className="price total-price" />
              </div>

              <div className="card-selection">
                <Field
                  name="creditCard"
                  component={ReactSelect}
                  placeholder="Select Credit Card"
                  options={creditCardOptions}
                  className="field"
                />
              </div>

              <button type="submit" className="btn btn-default" disabled={hasError}>Submit</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ShoppingCartForm;
