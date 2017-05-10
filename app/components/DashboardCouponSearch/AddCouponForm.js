import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change, touch, reset } from 'redux-form';
import moment from 'moment';
import Modal from 'react-bootstrap/lib/Modal';
import { Calendar } from 'react-date-range';
import _ from 'lodash';

import RadioButton from '../../components/Input/RadioButton';
import CouponDatePickerDisplay from '../../components/Input/CouponDatePickerDisplay';
import Input from '../../components/Input';
import Checkbox from '../../components/Input/Checkbox';
import LoadingSpinner from '../../components/LoadingSpinner';
import CenteredModal from '../../components/CenteredModal/index';
import { selectSyncErrorBool, selectValues } from '../../../app/common/selectors/form.selector';

import formValidator, { fields } from './validator';
const formName = 'dashboardAddCouponForm';

const mapDispatchToProps = (dispatch) => ({
  change: (name, value) => dispatch(change(formName, name, value)),
  resetForm: () => dispatch(reset(formName)),
  touchFields: () => dispatch(touch(formName, ...fields)),
});

@reduxForm({ form: formName, validate: formValidator })
@connect(null, mapDispatchToProps)

// TODO: rename to AddCouponModal
class AddCouponForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    isEdit: PropTypes.bool,
    isAdd: PropTypes.bool,
    change: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    formError: PropTypes.bool.isRequired,
    newList: PropTypes.any,
    touchFields: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      initialValuesAplied: false,
      initialValues: null,
      showDatePicker: false,
      initDate: moment(),
      minDate: moment(),
      dateStyle: 'MM/DD/YY',
      isReset: false,
      which: 'validFrom',
    };
  }

  componentWillReceiveProps(newProps) {
    // console.log('initialValues', newProps.initialValues, this.state.initialValuesAplied);
    const { change } = this.props;
    if (newProps.show && !this.state.initialValuesAplied) {
      this.setState({ initialValues: newProps.initialValues, initialValuesAplied: true }, () => {
        change('code', newProps.initialValues.code);
        change('validFrom', newProps.initialValues.validFrom);
        change('validTo', newProps.initialValues.validTo);
        if (newProps.initialValues.type === 'amount') {
          change('amount', newProps.initialValues.amountOff);
        }
        if (newProps.initialValues.type === 'percent') {
          change('amount', newProps.initialValues.percentOff);
        }
      });
    }

    if ((!newProps.saving && this.props.saving) ||
      (!newProps.deleting && this.props.deleting)
    ) {
      this.handleCloseModal();
    }
  }

  handleCloseModal() {
    const { onHide, resetForm } = this.props;
    this.setState({ initialValues: null, initialValuesAplied: false }, () => {
      onHide();
      resetForm();
    });
  }

  handleDatePickerClose(flag, which) {
    this.setState({
      isReset: true,
      showDatePicker: flag,
      which,
    });
    if (flag) {
      this.props.onHide(true);
    } else if (this.props.isEdit) {
      this.props.onShow({
        id: this.state.initialValues.id,
      });
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

  handleSubmit(ev) {
    ev.preventDefault();
    const { formError, newList, touchFields, handleSubmit } = this.props;
    if (formError) {
      touchFields();
      return;
    }

    const list = Object.assign({}, newList);
    handleSubmit(list);
  }

  render() {
    const { newList, isEdit, show } = this.props;
    const currentDate = moment();
    const action = `${isEdit ? 'Edit' : 'Add'}`;
    let valueLabel = 'Amount';
    let isAmount = true;
    let isPercent = null;

    if (show && newList && newList.type === 'percent') {
      valueLabel = 'Percent';
      isAmount = null;
      isPercent = true;
    }

    return (
      <div>
        <Modal dialogComponentClass={CenteredModal} className="new-user" id="" show={this.props.show} onHide={this.handleCloseModal}>
          <Modal.Header>
            <Modal.Title>{action} Coupon</Modal.Title>
            <a className="lightbox-close close" onClick={this.handleCloseModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>

            <form
              action="#"
              className="form-lightbox dashboard-lightbox coupon-form"
              onSubmit={this.handleSubmit}
            >

              <div className="field-row">
                <strong className="label required">
                  <label>Coupon</label>
                </strong>
                <div className="field">
                  <Field
                    name="code"
                    component={Input}
                    type="text"
                    placeholder=""
                  />
                </div>
              </div>

              <div className="field-row">
                <strong className="label required">
                  <label>Type</label>
                </strong>
                <div className="field">
                  <div className="row">
                    <div className="col pull-left">
                      <Field
                        name="type"
                        type="radio"
                        component={RadioButton}
                        className=""
                        value="amount"
                        checked={isAmount}
                      />
                      <span className="text">Fixed</span>
                    </div>
                    <div className="col pull-left">
                      <Field
                        name="type"
                        type="radio"
                        component={RadioButton}
                        className=""
                        value="percent"
                        checked={isPercent}
                      />
                      <span className="text">Percentage</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field-row">
                <strong className="label required">
                  <label>{valueLabel}</label>
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
                <strong className="label">
                  <label>Valid From</label>
                </strong>
                <div className="field" onClick={() => { this.handleDatePickerClose(true, 'validFrom'); }}>
                  <Field
                    name="validFrom"
                    component={CouponDatePickerDisplay}
                    className="form-control datepicker-input"
                  />
                </div>
              </div>
              <div className="field-row">
                <strong className="label">
                  <label>Valid To</label>
                </strong>
                <div className="field" onClick={() => { this.handleDatePickerClose(true, 'validTo'); }}>
                  <Field
                    name="validTo"
                    component={CouponDatePickerDisplay}
                    className="form-control datepicker-input"
                  />
                </div>
              </div>

              <div className="field-row">
                <strong className="label">
                  <label>Never Expires</label>
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
  formError: selectSyncErrorBool(formName),
  newList: selectValues(formName),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCouponForm);
