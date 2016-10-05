/**
*
* Input for react-select
*
*/

import React, { Component, PropTypes } from 'react';
import { Calendar } from 'react-date-range';
import { Modal } from 'react-bootstrap';

import moment from 'moment';

import './date-picker.less';

export default class DatePicker extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    initialDate: PropTypes.object.isRequired,
    dateStyle: PropTypes.string,
  }

  static defaultProps = {
    dateStyle: 'MM/DD/YY',
  }

  constructor(props) {
    super(props);

    const { initialDate } = props;

    this.state = {
      date: initialDate,
      modalVisible: false,
    };
  }

  handleSelect = (date) => {
    this.toggleModal(false);
    this.setState({
      date,
    });
    this.props.input.onBlur(date);
  }

  toggleModal = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { name, className, dateStyle, ...rest } = this.props;
    const { date, modalVisible } = this.state;

    const inputComponent = (
      <input
        type="text"
        name={name}
        readOnly
        value={moment(date).format(dateStyle)}
        {...rest}
      />
    );
    const modalComponent = (
      <Modal show={modalVisible} onHide={() => { this.toggleModal(false); }}>
        <div className="datepicker-box datepicker-active" style={{ display: 'block' }}>
          <div className="datepicker-holder">
            <div className="datepicker-frame">
              <div className="datepicker-inner">
                <div className="head">
                  <strong className="title">Choose Date</strong>
                  <a href="#" className="datepicker-close" onClick={() => { this.toggleModal(false); }}>x</a>
                </div>
                <div className="scroll-holder jcf--scrollable">
                  <Calendar
                    date={date}
                    onChange={this.handleSelect}
                    className="calendar custom-calendar"
                  />
                  <div className="link-holder">
                    <a href="#" onClick={() => { this.toggleModal(false); }}>To Be Determined</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="#" className="datepicker-overlay"></a>
        </div>
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
