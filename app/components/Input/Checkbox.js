/**
 *
 * Input for react-select
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

function Checkbox({ input, className, children, onChange, disabled, ...rest }) {
  const restProps = Object.assign({}, rest);
  delete restProps.meta;

  return (
    <div className={classNames(className)}>
      <span className={`jcf-checkbox ${input.checked ? 'jcf-checked' : 'jcf-unchecked'}`} disabled={disabled}>
        {(!disabled)
          ?
          <span
            onClick={() => {
              input.onChange(!input.checked);
              if (onChange) {
                onChange(!input.checked);
              }
            }}
          />
          :
          <span disabled="disabled" />
        }
        <input
          {...input}
          {...restProps}
          checked={input.checked}
          type="checkbox"
        />
        {children}
      </span>
    </div>
  );
}

Checkbox.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  rest: PropTypes.object,
  disabled: PropTypes.bool,
};

export default Checkbox;
