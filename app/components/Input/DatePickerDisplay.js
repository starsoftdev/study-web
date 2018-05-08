/**
*
* Input for react-select
*
*/

import moment from 'moment-timezone';
import React, { Component, PropTypes } from 'react';
import { translate } from '../../../common/utilities/localization';

export default class DatePickerDisplay extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    dateStyle: PropTypes.string,
  }

  static defaultProps = {
    dateStyle: translate('common.component.input.datePickerDisplay.dateMask'),
  }

  render() {
    const { name, className, dateStyle, input, ...rest } = this.props;

    delete rest.meta;
    delete rest.initialDate;
    const inputValue = (input.value === '') ? translate('common.constants.tbd') : moment(input.value).format(dateStyle);
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
