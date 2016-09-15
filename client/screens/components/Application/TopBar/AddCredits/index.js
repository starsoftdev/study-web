import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchCredits, checkoutCredits } from 'actions'
import ShoppingCartForm from 'forms/ShoppingCart'
import './styles.less'

class AddCreditsPanel extends Component {

  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    fetchingCredits: PropTypes.bool,
    fetchCredits: PropTypes.func,
    credits: PropTypes.object,
    coupon: PropTypes.object,
  }

  constructor (props) {
    super(props)
    this.props.fetchCredits()
  }

  state = {
    quantity: 1,
  }

  handleQuantityChange (event) {
    this.setState({
      quantity: event.target.value,
    })
  }

  checkoutCredits (params) {
    const customerId = this.props.currentUser.userInfo.roleForClient.client.stripeCustomerId
    const { coupon } = this.props
    const price = 77
    const addOnsTotalAmount = price * this.state.quantity
    let discounts = 0
    if (coupon) {
      if (coupon.amount_off) {
        discounts = coupon.amount_off
      } else if (coupon.percent_off) {
        discounts = addOnsTotalAmount * (coupon.percent_off / 100)
      }
    }
    const totalAmount = parseFloat((addOnsTotalAmount - discounts).toFixed(2))
    const cardId = params.creditCard
    this.props.checkoutCredits(customerId, cardId, totalAmount)
  }

  render () {
    const credits = (this.props.credits)? this.props.credits.credits: 0
    const price = 77
    const priceText = '$' + price
    const addOns = [ {
      product: credits + ' Credits',
      price,
      quantity: this.state.quantity,
      total: price * this.state.quantity,
    } ]

    return (
      <div className="add-credits-panel">
        <div className="row">
          <div className="col-sm-6 left-panel">
            <div className="row form-group">
              <label className="col-sm-3 control-label">
                <span>QUANTITY</span>
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={this.state.quantity} onChange={this.handleQuantityChange.bind(this)} />
              </div>
            </div>
            <div className="row form-group">
              <label className="col-sm-3 control-label">
                <span>CREDITS</span>
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={credits} readOnly="readonly" />
              </div>
            </div>
            <div className="row form-group">
              <label className="col-sm-3 control-label">
                <span>PRICE</span>
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" value={priceText} readOnly="readonly" />
              </div>
            </div>
          </div>
          <div className="col-sm-6 right-panel">
            <ShoppingCartForm addOns={addOns} onSubmit={this.checkoutCredits.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.authorization.authData,
  fetchingCredits: state.fetchingCredits,
  credits: state.credits,
  coupon: state.coupon,
})

const mapDispatchToProps = {
  fetchCredits,
  checkoutCredits,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCreditsPanel)

