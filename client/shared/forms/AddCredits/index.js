import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import 'react-select/less/default.less'
import ActivityIcon from 'components/ActivityIcon'
import './styles.less'
export const fields = [ 'quantity', 'coupon', 'creditCard' ]

class AddCreditsForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    credits: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    creditCardOptions: PropTypes.array.isRequired,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      fields: { quantity, coupon, creditCard },
      handleSubmit,
      credits,
      price,
      creditCardOptions,
      } = this.props

    return (
      <form className="form-add-credits" onSubmit={handleSubmit}>
        <div className="add-credits">
          <div className="row">
            <div className="col-sm-6 left-panel">
              <div className="row form-group">
                <label className="col-sm-3 control-label">
                  <span>QUANTITY</span>
                </label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" {...quantity} />
                </div>
              </div>
              <div className="row form-group">
                <label className="col-sm-3 control-label">
                  <span>CREDITS</span>
                </label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" value={credits} readonly="readonly" />
                </div>
              </div>
              <div className="row form-group">
                <label className="col-sm-3 control-label">
                  <span>PRICE</span>
                </label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" value={price} readonly="readonly" />
                </div>
              </div>
            </div>
            <div className="col-sm-6 right-panel">
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
                    <tr>
                      <td>{credits} Credits</td>
                      <td>${price}</td>
                      <td>{quantity.value}</td>
                      <td>${price * quantity.value}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row form-group">
                <div className="col-sm-9">
                  <input type="text" className="form-control" {...coupon} />
                </div>
                <div className="col-sm-3">
                  <button type="button" className="btn btn-default">APPLY</button>
                </div>
              </div>
              <div className="form-group">
                <div className="pull-left">
                  <strong>Total</strong>
                </div>
                <div className="pull-right">
                  <strong></strong>
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
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'addCredits',
  fields
})(AddCreditsForm)
