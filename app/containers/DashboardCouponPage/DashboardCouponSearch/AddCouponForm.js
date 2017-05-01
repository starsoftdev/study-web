import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import moment from 'moment';
import Modal from 'react-bootstrap/lib/Modal';
import { Calendar } from 'react-date-range';
import _ from 'lodash';

import RadioButton from '../../../components/Input/RadioButton';
import DatePickerDisplay from '../../../components/Input/DatePickerDisplay';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Input/Checkbox';
import formValidator from './validator';
import LoadingSpinner from '../../../components/LoadingSpinner';
import CenteredModal from '../../../components/CenteredModal/index';


@reduxForm({ form: 'dashboardAddCouponForm', validate: formValidator })

export class AddCouponForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isEdit: PropTypes.bool,
    change: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    saving: PropTypes.bool,
    deleting: PropTypes.bool,
    onDelete: PropTypes.func,
    show: PropTypes.bool,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleDatePickerClose = this.handleDatePickerClose.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.navigateToday = this.navigateToday.bind(this);
    this.state = {
      showDatePicker: false,
      initDate: moment(),
      minDate: moment(),
      dateStyle: 'MM/DD/YY',
      isReset: false,
      which: 'validFrom',
    };
  }

  handleCloseModal() {
    this.props.onHide(false);
  }

  handleDatePickerClose(flag, which) {
    this.setState({
      isReset: true,
      showDatePicker: flag,
      which,
    });
    if (flag) {
      this.props.onHide(true);
    } else {
      this.props.onShow();
    }
  }

  handleDateSelect(momentDate) {
    console.log('moment', momentDate);
    this.setState({
      initDate: momentDate,
    });
    const { change } = this.props;
    const { which } = this.state;
    change(which, momentDate);
    this.handleDatePickerClose(false);
  }

  navigateToday() {
    const today = moment();
    const todayYear = today.year();
    const todayMonth = today.month();
    const calendarYear = this.calendar.getShownDate().year();
    const calendarMonth = this.calendar.getShownDate().month();
    const monthDiff = ((todayYear - calendarYear) * 12) + (todayMonth - calendarMonth);
    const { which } = this.state;

    this.calendar.changeMonth(monthDiff, { preventDefault: _.noop });

    if (moment(this.state.minDate).isSameOrBefore(today, 'day')) {
      this.setState({
        initDate: today,
      });
      const { change } = this.props;
      change(which, today);
      this.handleDatePickerClose(false);
    }
  }

  render() {
    const couponType = this.props.initialValues ? this.props.initialValues.couponType : 'fixed';
    const currentDate = moment();
    return (
      <div>
        <Modal dialogComponentClass={CenteredModal} className="new-user" id="new-user" show={this.props.show} onHide={this.handleCloseModal}>
          <Modal.Header>
            <Modal.Title>Add Coupon</Modal.Title>
            <a className="lightbox-close close" onClick={this.handleCloseModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
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
                      placeholder=""
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
                          checked={couponType === 'fixed'}
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
                          checked={couponType === 'percentage'}
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
                      placeholder=""
                    />
                  </div>
                </div>

                <div className="field-row">
                  <strong className="label required">
                    <label>Valid From</label>
                  </strong>
                  <div className="field" onClick={() => { this.handleDatePickerClose(true, 'validFrom'); }}>
                    <Field
                      name="validFrom"
                      component={DatePickerDisplay}
                      className="form-control datepicker-input"
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label required">
                    <label>Valid To</label>
                  </strong>
                  <div className="field" onClick={() => { this.handleDatePickerClose(true, 'validTo'); }}>
                    <Field
                      name="validTo"
                      component={DatePickerDisplay}
                      className="form-control datepicker-input"
                    />
                  </div>
                </div>

                <div className="field-row">
                  <strong className="label">
                    <label className="add-exposure-level">Never Expires</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="neverExpires"
                      type="checkbox"
                      component={Checkbox}
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
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          className="datepicker-modal"
          dialogComponentClass={CenteredModal}
          show={this.state.showDatePicker}
          onHide={() => {
            this.handleDatePickerClose(false);
          }}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>{ this.state.which === 'validFrom' ? 'Valid From' : 'Valid To' }</Modal.Title>
            <a className="lightbox-close close" onClick={() => { this.handleDatePickerClose(false); }}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <Calendar
              date={this.state.initDate}
              onChange={this.handleDateSelect}
              className="calendar custom-calendar"
              ref={(calendar) => { this.calendar = calendar; }}
              minDate={this.state.minDate || currentDate}
            />
            <div className="current-date" onClick={this.navigateToday}>
              Today: {currentDate.format('dddd, MMMM Do, YYYY')}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = (dispatch) => ({
  change: (name, value) => dispatch(change('dashboardAddCouponForm', name, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCouponForm);
