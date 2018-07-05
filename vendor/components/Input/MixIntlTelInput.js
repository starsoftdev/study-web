/**
*
* Input
*
*/

/**
 * Input element for redux-form
 *
 * Not only supports <input> (text, email, password)
 * But also <select> and <textarea>
 */
import React, { PropTypes } from 'react';
import IntlTelInput from 'react-intl-tel-input';
import { FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';

function mixIntlTelInput({
  input,
  name,
  ccName,
  type,
  id,
  inputRef,
  placeholder,
  componentClass,
  bsClass,
  className,
  tooltipEnabled,
  onBlur,
  onFocus,
  onChange,
  onCodeChange,
  required,
  meta: { touched, error, active },
  maxLength,
  children,
  isDisabled,
  min,
  max,
  step,
  defaultValue,
  onSelectFlag,
  preferredCountries,
}) {
  const hasError = touched && error && !active;
  const tooltip = (
    <Tooltip
      id={`${name}-tooltip`}
      className="tooltip-error"
    >
      {error}
    </Tooltip>
  );
  let inputComponent = (
    <FormControl
      {...input}
      type={type}
      disabled={isDisabled}
      id={id}
      inputRef={inputRef}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      min={min}
      max={max}
      step={step}
      defaultValue={defaultValue}
      componentClass={componentClass} // Default value is `input`
      bsClass={bsClass || 'form-control'}
      onChange={(event) => {
        input.onChange(event);
        if (onChange) {
          onChange(event);
        }
      }}
      onBlur={(event) => {
        input.onBlur(event);
        if (onBlur) {
          onBlur(event);
        }
      }}
      onFocus={(event) => {
        input.onFocus(event);
        if (onFocus) {
          onFocus(event);
        }
      }}
    >
      {children}
    </FormControl>
  );
  const ccInputComponent = (
    <IntlTelInput
      css={['intl-tel-input', 'form-control', 'input-lg']}
      fieldName={ccName}
      separateDialCode
      preferredCountries={preferredCountries}
      onSelectFlag={(code, selectedCountryData) => {
        if (onSelectFlag) {
          onSelectFlag(code, selectedCountryData);
        }
      }}
      onPhoneNumberChange={(status, value, countryData, number) => {
        if (onCodeChange) {
          onCodeChange(status, value, countryData, number);
        }
      }}
    />
  );

  if (hasError && tooltipEnabled) {
    inputComponent = (
      <OverlayTrigger
        placement="right"
        overlay={tooltip}
      >
        {inputComponent}
      </OverlayTrigger>
    );
  }

  return (
    <div className={classNames(className, { 'has-error': hasError, focus: active })}>
      {ccInputComponent}
      {inputComponent}
    </div>
  );
}

mixIntlTelInput.propTypes = {
  componentClass: PropTypes.string,
  bsClass: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.array,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.object.isRequired,
  inputRef: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onCodeChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  ccName: PropTypes.string,
  maxLength: PropTypes.string,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  tooltipEnabled: PropTypes.bool,
  type: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  step: PropTypes.string,
  defaultValue: PropTypes.string,
  onSelectFlag: PropTypes.func,
  preferredCountries: PropTypes.array,
};

export default mixIntlTelInput;
