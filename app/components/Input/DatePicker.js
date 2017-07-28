/**
*
* Input for react-select
*
*/

import _ from 'lodash';
import moment from 'moment-timezone';
import React, { Component, PropTypes } from 'react';
import { Calendar } from 'react-date-range';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../CenteredModal/index';

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
  }

  static defaultProps = {
    dateStyle: 'MM/DD/YY',
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
    this.toggleModal(false);
    this.setState({
      date,
    });
    this.props.input.onBlur(date);
  }

  navigateToday() {
    const today = moment();
    const todayYear = today.year();
    const todayMonth = today.month();
    const calendarYear = this.calendar.getShownDate().year();
    const calendarMonth = this.calendar.getShownDate().month();
    const monthDiff = ((todayYear - calendarYear) * 12) + (todayMonth - calendarMonth);

    this.calendar.changeMonth(monthDiff, { preventDefault: _.noop });

    this.calendar.changeDay(today, { preventDefault: _.noop });
    this.setState({
      today,
    });
    this.props.input.onBlur(today);
  }

  toggleModal(visible) {
    if (!this.props.isDisabled) {
      this.setState({ modalVisible: visible });
    }
  }

  render() {
    const { name, className, dateStyle, minDate, maxDate, isDisabled, useUTC, ...rest } = this.props;
    const { date, modalVisible } = this.state;

    const currentDate = moment();
    delete rest.input;
    delete rest.meta;
    delete rest.initialDate;
    let calendarDate = date;
    if (useUTC) {
      calendarDate = (!date || !date.isValid()) ? moment() : moment(date).utc();
    }
    const inputValue = (!date) ? 'To Be Determined' : calendarDate.format(dateStyle);

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
          <Modal.Title>Choose Start Date</Modal.Title>
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
            minDate={minDate || 'none'}
            maxDate={maxDate || 'none'}
          />
          <div className="current-date" onClick={this.navigateToday}>
            Today: {currentDate.format('dddd, MMMM Do, YYYY')}
          </div>
          <div className="link-holder text-center">
            <a onClick={() => { this.setToBeDetermined(); this.toggleModal(false); }}>To Be Determined</a>
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
