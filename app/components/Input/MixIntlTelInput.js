/**
 * Input element for redux-form
 *
 * Not only supports <input> (text, email, password)
 * But also <select> and <textarea>
 */
import React, { PropTypes } from 'react';
import IntlTelInput from 'react-intl-tel-input';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { InputSmart } from 'react-phone-number-input';

import classNames from 'classnames';
import { formatNumber } from 'libphonenumber-js';
import metadata from 'libphonenumber-js/metadata.min.json';

export default class MixIntlTelInput extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    preferredCountries: PropTypes.array,
    meta: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    tooltipEnabled: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);

    // We have to detach the visual display (UX) from the actual (correctly-formatted for data use).
    let country = 'US';  // automatic default
    let value = null;
    try {
      country = props.preferredCountries && props.preferredCountries.length && props.preferredCountries[0].toUpperCase();
      value =  props.input.value;
    } catch (e) {
      // no-op
    }
    this.state = {
      country,
      value,
    };
  }

  render() {
    const { touched, error, active } = this.props.meta;
    const hasError = touched && error && !active;

    return (
      <div className={classNames(this.props.className, 'intl-phone-input', { 'has-error': hasError, focus: active })}>
        {this.renderCountrySelect()}
        {this.renderPhoneInput()}
      </div>
    );
  }

  renderCountrySelect() {
    return (
      <IntlTelInput
        css={['intl-tel-input', 'form-control', 'input-lg']}
        separateDialCode
        preferredCountries={this.props.preferredCountries}
        onSelectFlag={this.onSelectFlag}
      />
    );
  }

  renderPhoneInput() {
    const { touched, error, active } = this.props.meta;
    const hasError = touched && error && !active;

    const props = Object.assign({}, this.props.input);
    delete props.onChange;
    delete props.value;

    const inputComponent = (
      <InputSmart
        onChange={this.onPhoneNumberChange}
        value={this.state.value}
        country={this.state.country}
        metadata={metadata}
        className="intl-tel-input form-control input-lg phone-input"
        {...props}
      />
    );

    if (hasError && this.props.tooltipEnabled) {
      const tooltip = (
        <Tooltip
          id={`${name}-tooltip`}
          className="tooltip-error"
        >
          {error}
        </Tooltip>
      );
      return (
        <OverlayTrigger
          placement="right"
          overlay={tooltip}
        >
          {inputComponent}
        </OverlayTrigger>
      );
    } else {
      return inputComponent;
    }
  }

  onSelectFlag = (code, selectedCountryData) => {
    this.setState({
      country: selectedCountryData.iso2.toUpperCase(),
    });
  }

  /**
   * We're bypassing the loop where redux-form attempts to set the value.
   * This UI needs to display the human-readable version, not the E.164 format.
   */
  onPhoneNumberChange = (value) => {
    this.setState({ value }, () =>
      this.props.input.onChange(formatNumber({ country: this.state.country, phone: value }, 'E.164'))
    );
  }
}
