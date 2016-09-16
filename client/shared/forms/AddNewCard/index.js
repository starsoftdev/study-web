import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import Select from 'react-select'
import 'react-select/less/default.less'
import ActivityIcon from 'components/ActivityIcon'
export const fields = [ 'company', 'firstName', 'lastName', 'number', 'expirationMonth', 'expirationYear', 'cvc', 'billingPostalCode' ]

class AddNewCardForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
  }

  constructor (props) {
    super(props)
  }

  render () {
    const {
      fields: { company, firstName, lastName, number, expirationMonth, expirationYear, cvc, billingPostalCode },
      handleSubmit,
      submitting,
      } = this.props

    const monthOptions = [
      { label: 'Jan', value: 1 },
      { label: 'Feb', value: 2 },
      { label: 'Mar', value: 3 },
      { label: 'Apr', value: 4 },
      { label: 'May', value: 5 },
      { label: 'Jun', value: 6 },
      { label: 'Jul', value: 7 },
      { label: 'Aug', value: 8 },
      { label: 'Sep', value: 9 },
      { label: 'Oct', value: 10 },
      { label: 'Nov', value: 11 },
      { label: 'Dec', value: 12 },
    ]

    const todayYear = new Date().getFullYear()
    const yearOptions = [
      { label: todayYear.toString(), value: todayYear },
      { label: (todayYear + 1).toString(), value: todayYear + 1 },
      { label: (todayYear + 2).toString(), value: todayYear + 2 },
    ]

    return (
      <form className="form-add-new-card" onSubmit={handleSubmit}>
        <div className="add-new-card">
          <div className="row form-group">
            <label className="col-sm-3 control-label">
              <span>COMPANY</span>
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" {...company} />
            </div>
          </div>
          <div className="row form-group">
            <label className="col-sm-3 control-label">
              <span>NAME ON CARD</span>
            </label>
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-6">
                  <input type="text" className="form-control" {...firstName} />
                </div>
                <div className="col-sm-6">
                  <input type="text" className="form-control" {...lastName} />
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <label className="col-sm-3 control-label">
              <span>CARD NUMBER</span>
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" {...number} />
            </div>
          </div>
          <div className="row form-group">
            <label className="col-sm-3 control-label">
              <span>EXPIRATION DATE</span>
            </label>
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-6">
                  <Select
                    {...expirationMonth}
                    options={monthOptions}
                    placeholder="Select Month"
                    onBlur={() => { expirationMonth.onBlur(expirationMonth) }}
                    />
                </div>
                <div className="col-sm-6">
                  <Select
                    {...expirationYear}
                    options={yearOptions}
                    placeholder="Select Year"
                    onBlur={() => { expirationYear.onBlur(expirationYear) }}
                    />
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <label className="col-sm-3 control-label">
              <span>CVC</span>
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" {...cvc} />
            </div>
          </div>
          <div className="row form-group">
            <label className="col-sm-3 control-label">
              <span>BILLING POSTAL CODE</span>
            </label>
            <div className="col-sm-9">
              <input type="text" className="form-control" {...billingPostalCode} />
            </div>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success" disabled={submitting}>
              {submitting
                ? <span><ActivityIcon /></span>
                : <span>ADD</span>
              }
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'addNewCard',
  fields
})(AddNewCardForm)
