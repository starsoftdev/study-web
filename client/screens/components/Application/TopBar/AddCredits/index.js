import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchCredits } from 'actions'
import ShoppingCartForm from 'forms/ShoppingCart'
import './styles.less'

class AddCreditsPanel extends Component {

  static propTypes = {
    fetchingCredits: PropTypes.bool,
    fetchCredits: PropTypes.func,
    credits: PropTypes.object,
  }

  constructor (props) {
    super(props)
    this.props.fetchCredits()
  }

  checkoutCredits (coupon, creditCard) {
    console.log(coupon, ' ', creditCard)
  }

  render () {
    const credits = (this.props.credits)? this.props.credits.credits: 0
    const price = 77
    const priceText = '$' + price
    const quantity = 1
    const addOns = [ {
      product: credits + ' Credits',
      price,
      quantity,
      total: price * quantity,
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
                <input type="text" className="form-control" />
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
  fetchingCredits: state.fetchingCredits,
  credits: state.credits,
})

const mapDispatchToProps = {
  fetchCredits,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCreditsPanel)

