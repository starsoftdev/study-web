/**
*
* AddCreditCardForm
*
*/

import React from 'react';
import addCreditCardFormValidator from './validator';
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';

@reduxForm({ form: 'addCreditCard', validate: addCreditCardFormValidator })
class AddCreditCardForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    pristine: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props; // eslint-disable-line
    console.log(pristine);
    console.log(handleSubmit);

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
    ];

    return (
      <form onSubmit={handleSubmit} className="form-lightbox form-card">
        <div className="field-row">
          <strong className="label required"><label htmlFor="company">Company</label></strong>
          <div className="field">
            <Field
              name="company"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label required"><label htmlFor="card-first-name">Name on Card</label></strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  name="firstName"
                  component={Input}
                  placeholder="First Name"
                  type="text"
                />
              </div>
              <div className="col pull-right">
                <Field
                  name="lastName"
                  component={Input}
                  placeholder="Last Name"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="field-row">
          <strong className="label required"><label htmlFor="number">CARD NUMBER</label></strong>
          <div className="field">
            <Field
              name="number"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label required"><label htmlFor="card-first-name">EXPIRATION DATE</label></strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  name="expirationMonth"
                  component={ReactSelect}
                  placeholder="Select Month"
                  options={monthOptions}
                />
              </div>
              <div className="col pull-right">
                <Field
                  name="expirationYear"
                  component={ReactSelect}
                  placeholder="Select Year"
                  options={yearOptions}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="field-row">
          <strong className="label"><label htmlFor="cvv">CVV</label></strong>
          <div className="field">
            <Field
              name="cvv"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label required"><label htmlFor="billingPostalCode">BILLING POSTAL CODE</label></strong>
          <div className="field">
            <Field
              name="billingPostalCode"
              component={Input}
              type="text"
            />
          </div>
        </div>

        <div className="btn-block text-right">
          <input
            type="submit"
            value="ADD"
            className="btn btn-default btn-add-row"
          />
        </div>

      </form>
    );
  }
}

export default AddCreditCardForm;
