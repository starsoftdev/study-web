/**
*
* IntlTelInput
*
*/

/**
 * IntlTelInput element for redux-form
 *
 */
import React, { PropTypes } from 'react';
import IntlTelInput from 'react-intl-tel-input';
import classNames from 'classnames';

function IntlTelInputFunc({
  name,
  id,
  placeholder,
  className,
  onChange,
  onBlur,
  preferredCountries,
  meta: { touched, error, active },
}) {
  const hasError = touched && error && !active;
  const inputComponent = (
    <IntlTelInput
      css={['intl-tel-input', 'form-control', 'input-lg']}
      placeholder={placeholder}
      preferredCountries={preferredCountries}
      autoHideDialCode={false}
      nationalMode={false}
      formatOnInit={false}
      fieldName={name}
      fieldId={id}
      onPhoneNumberChange={(status, value, countryData, number) => {
        if (onChange) {
          onChange(status, value, countryData, number);
        }
      }}
      onPhoneNumberBlur={(status, value, countryData, number) => {
        if (onBlur) {
          onBlur(status, value, countryData, number);
        }
      }}
      onSelectFlag={(status, value, countryData, number) => {
        if (onBlur) {
          onBlur(status, value, countryData, number);
        }
      }}
    />
  );

  return (
    <div className={classNames(className, { 'has-error': hasError, focus: active })}>
      {inputComponent}
    </div>
  );
}

IntlTelInputFunc.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  preferredCountries: PropTypes.array,
};

export default IntlTelInputFunc;
