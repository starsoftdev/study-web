import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import billingFormValidator from './validator';
import Input from 'components/Input';

@reduxForm({
  form: 'billing',
  validate: billingFormValidator,
})

export class BillingForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        action="#"
        className="form-billing"
        data-formvalidation="true"
        onSubmit={handleSubmit}
      >
        <div className="form-holder">
          <div className="field-row">
            <input type="text" placeholder="* Company" data-required="true" className="form-control input-lg" />
          </div>
          <div className="field-row">
            <div className="row">
              <div className="col-sm-6 col-xs-12">
                <input type="text" placeholder="* First Name" data-required="true" className="form-control input-lg" />
              </div>
              <div className="col-sm-6 col-xs-12">
                <input type="text" placeholder="* Last Name" data-required="true" className="form-control input-lg" />
              </div>
            </div>
          </div>
          <div className="field-row">
            <div className="row">
              <div className="col-sm-6 col-md-8 col-xs-12">
                <input type="text" data-type="number" placeholder="* Card Number" data-required="true" className="form-control input-lg" />
              </div>
              <div className="col-sm-6 col-md-4 col-xs-12">
                <input type="text" data-type="number" placeholder="CVV" className="form-control input-lg" />
              </div>
            </div>
          </div>
          <div className="field-row">
            <div className="row">
              <div className="col-sm-6 col-xs-12">
                <select data-required="true" className="select-large hidden">
                  <option>* Expiration Month</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                <span className="jcf-select jcf-unselectable jcf-select-select-large">
                  <span className="jcf-select-text">
                    <span className="">* Expiration Month</span>
                  </span>
                  <span className="jcf-select-opener"></span>
                </span>
              </div>
              <div className="col-sm-6 col-xs-12">
                <select data-required="true" className="select-large hidden">
                  <option>* Expiration Year</option>
                  <option>2016</option>
                  <option>2017</option>
                  <option>2018</option>
                  <option>2019</option>
                  <option>2020</option>
                </select>
                <span className="jcf-select jcf-unselectable jcf-select-select-large">
                  <span className="jcf-select-text">
                    <span className="">* Expiration Year</span>
                  </span>
                  <span className="jcf-select-opener"></span>
                </span>
              </div>
            </div>
          </div>
          <div className="field-row">
            <input type="text" data-type="number" placeholder="* Billing Postal Code" data-required="true" className="form-control input-lg" />
          </div>
          <div className="field-row">
            <input type="email" placeholder="* Email" data-required="true" className="form-control input-lg" />
          </div>
          <div className="field-row text-center">
            <strong className="price">Total Amount: $7,031.00</strong>
          </div>
          <div className="field-row">
            <input type="submit" value="Submit order" className="btn btn-default btn-block input-lg" />
          </div>
        </div>
      </form>
    );
  }
}

export default BillingForm;
