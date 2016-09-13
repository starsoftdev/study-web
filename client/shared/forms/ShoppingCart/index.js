import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { fetchCoupon, fetchCards } from 'actions'
import Select from 'react-select'
import 'react-select/less/default.less'
import ActivityIcon from 'components/ActivityIcon'
import _ from 'lodash'
import './styles.less'
export const fields = [ 'coupon', 'creditCard' ]

class ShoppingCartForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    addOns: PropTypes.array.isRequired,
    fetchingCoupon: PropTypes.bool,
    fetchedCoupon: PropTypes.object,
    fetchCoupon: PropTypes.func,
    fetchingCards: PropTypes.bool,
    fetchedCards: PropTypes.object,
    fetchCards: PropTypes.func,
  }

  constructor (props) {
    super(props)
    this.props.fetchCards(this.props.currentUser.userInfo.roleForClient.client.stripeCustomerId)
  }

  render () {
    const {
      fields: { coupon, creditCard },
      handleSubmit,
      addOns,
      fetchingCoupon,
      fetchedCoupon,
      fetchCoupon,
      fetchingCards,
      fetchedCards,
      } = this.props

    const addOnsContent = addOns.map((item, index) => (
      <tr className="add-on" key={index}>
        <td>{item.product}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        <td>${item.total}</td>
      </tr>
    ))
    const addOnsTotalAmount = _.sum(addOns, addOnIterator => addOnIterator.total)
    let discounts = 0
    if (fetchedCoupon) {
      if (fetchedCoupon.amount_off) {
        discounts = fetchedCoupon.amount_off
      } else if (fetchedCoupon.percent_off) {
        discounts = addOnsTotalAmount * fetchedCoupon.percent_off
      }
    }
    const creditCardOptions = _.map(fetchedCards.data, cardIterator => {
      return {
        label: 'xxxx xxxx xxxx ' + cardIterator.last4,
        value: cardIterator.id,
      }
    })

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
              <input type="text" className="form-control" disabled={fetchingCoupon} {...coupon} />
            </div>
            <div className="col-sm-3">
              <button type="button" className="btn btn-default" onClick={() => { fetchCoupon(coupon.value) }}>
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
              <strong>${addOnsTotalAmount - discounts}</strong>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="form-group">
            <Select
              {...creditCard}
              disabled={fetchingCards}
              options={creditCardOptions}
              placeholder="Select Credit Card"
              onBlur={() => { creditCard.onBlur(creditCard) }}
              />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success">SUBMIT</button>
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
  fetchedCoupon: state.coupon,
  fetchingCards: state.fetchingCards,
  fetchedCards: state.cards,
}), {         // mapDispatchToProps
  fetchCoupon,
  fetchCards,
})(ShoppingCartForm)
