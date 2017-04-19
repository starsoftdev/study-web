/**
*
* Input for react-select
*
*/

import moment from 'moment-timezone';
import React, { Component, PropTypes } from 'react';

export default class DatePicker extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    dateStyle: PropTypes.string,
  }

  static defaultProps = {
    dateStyle: 'MM/DD/YY',
  }

  render() {
    const { name, className, dateStyle, input, ...rest } = this.props;

    delete rest.meta;
    delete rest.initialDate;
    const inputValue = (input.value === '') ? 'To Be Determined' : moment(input.value).format(dateStyle);
    const inputComponent = (
      <input
        type="text"
        name={name}
        readOnly
        value={inputValue}
        {...rest}
      />
    );

    return (
      <div className={className}>
        { inputComponent }
      </div>
    );
  }
}
