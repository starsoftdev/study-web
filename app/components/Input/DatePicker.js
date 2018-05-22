/**
*
* Input for react-select
*
*/

import moment from 'moment-timezone';
import React, { Component, PropTypes } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../CenteredModal/index';
import { translate } from '../../../common/utilities/localization';
import { getMomentFromDate } from '../../utils/time';

export default class DatePicker extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    initialDate: PropTypes.object,
    dateStyle: PropTypes.string,
    minDate: PropTypes.any,
    maxDate: PropTypes.any,
    isDisabled: PropTypes.bool,
    useUTC: PropTypes.bool,
    title: PropTypes.string,
    canNotSetTBD: PropTypes.bool,
  }

  static defaultProps = {
    dateStyle: translate('common.component.input.datePicker.dateMask'),
  }

  constructor(props) {
    super(props);

    const { initialDate } = props;
    this.handleInit = this.handleInit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.navigateToday = this.navigateToday.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      date: initialDate,
      modalVisible: false,
    };
  }

  componentWillMount() {
    this.handleInit(this.props.initialDate);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.input.value !== newProps.input.value) {
      const date = moment(newProps.input.value);
      if (date.isValid()) {
        this.setState({
          date,
        });
      } else {
        this.setState({
          date: null,
        });
      }
    }
  }

  setToBeDetermined = () => {
    this.setState({
      date: null,
    });
    this.props.input.onBlur(null);
  }

  handleInit(date) {
    this.setState({
      date,
    });
    this.props.input.onBlur(date);
  }

  handleSelect(date) {
    const chosenDate = getMomentFromDate(date);
    this.toggleModal(false);
    this.setState({
      date: chosenDate,
    });
    this.props.input.onBlur(chosenDate);
  }

  navigateToday() {
    const today = new Date();

    this.calendar.focusToDate(today);

    if (moment(this.props.minDate).isSameOrBefore(today, 'day')) {
      this.setState({
        initDate: today,
      });
      this.props.input.onBlur(today);
      this.toggleModal(false);
    }
  }

  toggleModal(visible) {
    if (!this.props.isDisabled) {
      this.setState({ modalVisible: visible });
    }
  }

  render() {
    const { name, className, dateStyle, minDate, maxDate, isDisabled, useUTC, title, canNotSetTBD, ...rest } = this.props;
    const { date, modalVisible } = this.state;

    const currentDate = moment();
    delete rest.input;
    delete rest.meta;
    delete rest.initialDate;
    let calendarDate = date;
    if (useUTC) {
      calendarDate = (!date || !date.isValid()) ? moment() : moment(date).utc();
    }
    const inputValue = (!date) ? translate('common.component.input.datePicker.tbd') : calendarDate.format(dateStyle);
    if (calendarDate) {
      calendarDate = calendarDate.toDate();
    }

    const inputComponent = (
      <input
        type="text"
        name={name}
        readOnly
        value={inputValue}
        disabled={isDisabled}
        {...rest}
      />
    );
    const modalComponent = (
      <Modal
        className="datepicker-modal"
        dialogComponentClass={CenteredModal}
        show={modalVisible}
        onHide={() => {
          this.toggleModal(false);
        }}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>{title || translate('common.component.input.datePicker.defaultModalTitle')}</Modal.Title>
          <a className="lightbox-close close" onClick={() => { this.toggleModal(false); }}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <Calendar
            date={calendarDate}
            shownDate={calendarDate}
            onChange={this.handleSelect}
            className="calendar custom-calendar"
            ref={(calendar) => { this.calendar = calendar; }}
            minDate={minDate ? minDate.toDate() : undefined}
            maxDate={maxDate ? maxDate.toDate() : undefined}
          />
          <div className="current-date" onClick={this.navigateToday}>
            {translate('common.component.input.datePicker.today')} {currentDate.format(translate('common.component.input.datePicker.todayDateMask'))}
          </div>
          <div className="link-holder text-center">
            <a
              className={canNotSetTBD ? 'disabled' : ''}
              onClick={() => { if (!canNotSetTBD) { this.setToBeDetermined(); this.toggleModal(false); } }}
            >{translate('common.component.input.datePicker.tbd')}</a>
          </div>
        </Modal.Body>
      </Modal>
    );

    return (
      <div className={className} onClick={() => { this.toggleModal(true); }}>
        { inputComponent }
        { modalComponent }
      </div>
    );
  }
}
