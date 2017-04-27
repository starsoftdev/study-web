import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import RadioButton from '../../../components/Input/RadioButton';
import DatePicker from '../../../components/Input/DatePicker';
import Input from '../../../components/Input';
import formValidator from './validator';
import LoadingSpinner from '../../../components/LoadingSpinner';

@reduxForm({ form: 'dashboardAddCouponForm', validate: formValidator })

export class AddCouponForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isEdit: PropTypes.bool,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    saving: PropTypes.bool,
    deleting: PropTypes.bool,
    onDelete: PropTypes.func,
  }

  render() {
    const validFrom = this.props.initialValues ? this.props.initialValues.validFrom : new Date();
    const validEnd = this.props.initialValues ? this.props.initialValues.validEnd : new Date();

    const couponType = this.props.initialValues ? this.props.initialValues.couponType : 'fixed';

    return (
      <form action="#" className="form-lightbox dashboard-lightbox coupon-form" onSubmit={this.props.handleSubmit}>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Coupon</label>
          </strong>
          <div className="field">
            <Field
              name="number"
              component={Input}
              type="text"
              placeholder="Coupon"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Type</label>
          </strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  name="type"
                  type="radio"
                  component={RadioButton}
                  className=""
                  value="fixed"
                />
                <span className="text">Fixed</span>
              </div>
              <div className="col pull-left">
                <Field
                  name="type"
                  type="radio"
                  component={RadioButton}
                  className=""
                  value="percentage"
                />
                <span className="text">Percentage</span>
              </div>
            </div>
          </div>
        </div>

        <div className="field-row">
          <strong className="label required">
            <label className="add-exposure-level">Amount</label>
          </strong>
          <div className="field">
            <Field
              name="amount"
              component={Input}
              type="text"
              placeholder="Amount"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label htmlFor="from-date">Valid From</label>
          </strong>
          <div className="field">
            <Field
              id="from-date"
              name="validFrom"
              component={DatePicker}
              className="form-control datepicker-input"
              initialDate={moment(validFrom)}
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label htmlFor="to-date">Valid To</label>
          </strong>
          <div className="field">
            <Field
              id="to-date"
              name="validTo"
              component={DatePicker}
              className="form-control datepicker-input"
              initialDate={moment(validEnd)}
            />
          </div>
        </div>

        <div className="field-row text-right no-margins">
          {this.props.isEdit &&
            <a className="btn btn-gray-outline" onClick={() => { this.props.onDelete(this.props.initialValues.id); }}>
              {this.props.deleting
                ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                : <span>{'Delete'}</span>
              }
            </a>
          }
          <button type="submit" className="btn btn-primary">
            {this.props.saving
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>{this.props.isEdit ? 'Update' : 'Submit'}</span>
            }
          </button>
        </div>

      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCouponForm);
