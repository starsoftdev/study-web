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
import { FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import classNames from 'classnames';

function Input({
  input,
  name,
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
  required,
  meta: { touched, error, active },
  maxLength,
  children,
  isDisabled,
  min,
  max,
  step,
  defaultValue,
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
      onKeyDown={(event, key) => {
        if (event.keyCode === 13) {
          input.onBlur(event);
          if (onBlur) {
            onBlur(event);
          }
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
      {inputComponent}
    </div>
  );
}

Input.propTypes = {
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
  name: PropTypes.string.isRequired,
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
};

export default Input;
