import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { fetchCoupon, clearCoupon, fetchCards } from 'actions'
import Select from 'react-select'
import 'react-select/less/default.less'
import ActivityIcon from 'components/ActivityIcon'
import _ from 'lodash'
import './styles.less'
export const fields = [ 'couponId', 'creditCard' ]

class ShoppingCartForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    addOns: PropTypes.array.isRequired,
    fetchingCoupon: PropTypes.bool,
    coupon: PropTypes.object,
    fetchCoupon: PropTypes.func,
    clearCoupon: PropTypes.func,
    fetchingCards: PropTypes.bool,
    cards: PropTypes.object,
    fetchCards: PropTypes.func,
    checkingOut: PropTypes.bool,
  }

  constructor (props) {
    super(props)
    this.props.fetchCards(this.props.currentUser.userInfo.roleForClient.client.stripeCustomerId)
  }

  componentWillUnmount () {
    this.props.clearCoupon()
  }

  render () {
    const {
      fields: { couponId, creditCard },
      handleSubmit,
      addOns,
      fetchingCoupon,
      coupon,
      fetchCoupon,
      fetchingCards,
      cards,
      checkingOut,
      } = this.props

    const addOnsContent = addOns.map((item, index) => (
      <tr className="add-on" key={index}>
        <td>{item.product}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        <td>${item.total}</td>
      </tr>
    ))
    const addOnsTotalAmount = _.sumBy(addOns, addOnIterator => addOnIterator.total)
    let discounts = 0
    if (coupon) {
      if (coupon.amount_off) {
        discounts = coupon.amount_off
      } else if (coupon.percent_off) {
        discounts = addOnsTotalAmount * (coupon.percent_off / 100)
      }
    }
    const totalAmount = parseFloat((addOnsTotalAmount - discounts).toFixed(2))
    let creditCardOptions = [ {
      label: 'Add New Card',
      value: 0,
    } ]
    if (cards) {
      let options = _.map(cards.data, cardIterator => {
        return {
          label: 'xxxx xxxx xxxx ' + cardIterator.last4,
          value: cardIterator.id,
        }
      })
      creditCardOptions = _.concat(options, creditCardOptions)
    }

    return (
      <form className="form-shopping-cart" onSubmit={handleSubmit}>
        <div className="shopping-cart">
          <h5>ORDER SUMMARY</h5>
          <div className="table-responsive form-group">
            <table className="table">
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {addOnsContent}
              </tbody>
            </table>
          </div>
          <div className="row form-group">
            <div className="col-sm-9">
              <input type="text" className="form-control" disabled={fetchingCoupon || checkingOut} {...couponId} />
            </div>
            <div className="col-sm-3">
              <button type="button" className="btn btn-default" disabled={fetchingCoupon || checkingOut} onClick={() => { fetchCoupon(couponId.value) }}>
                {fetchingCoupon
                  ? <span><ActivityIcon /></span>
                  : <span>APPLY</span>
                }
              </button>
            </div>
          </div>
          <div className="form-group">
            <div className="pull-left">
              <strong>Total</strong>
            </div>
            <div className="pull-right">
              <strong>${totalAmount}</strong>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="form-group">
            <Select
              {...creditCard}
              disabled={fetchingCards || checkingOut}
              options={creditCardOptions}
              placeholder="Select Credit Card"
              onBlur={() => { creditCard.onBlur(creditCard) }}
              />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success" disabled={checkingOut}>
              {checkingOut
                ? <span><ActivityIcon /></span>
                : <span>SUBMIT</span>
              }
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'shoppingCart',
  fields
}, state => ({ // mapStateToProps
  currentUser: state.authorization.authData,
  fetchingCoupon: state.fetchingCoupon,
  coupon: state.coupon,
  fetchingCards: state.fetchingCards,
  cards: state.cards,
  checkingOut: state.checkingOut,
}), {         // mapDispatchToProps
  fetchCoupon,
  clearCoupon,
  fetchCards,
})(ShoppingCartForm)
