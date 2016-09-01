import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import 'react-select/less/default.less'
import ActivityIcon from 'components/ActivityIcon'
import _ from 'lodash'
import './styles.less'
export const fields = [ 'coupon', 'creditCard' ]

class ShoppingCartForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    calculateCoupon: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    addOns: PropTypes.array.isRequired,
    creditCardOptions: PropTypes.array.isRequired,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      fields: { coupon, creditCard },
      calculateCoupon,
      handleSubmit,
      addOns,
      creditCardOptions,
      discounts,
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
              <input type="text" className="form-control" {...coupon} />
            </div>
            <div className="col-sm-3">
              <button type="button" className="btn btn-default" onClick={() => { calculateCoupon(coupon.value) }}>APPLY</button>
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
  discounts: state.discounts // will pull state
}))(ShoppingCartForm)
