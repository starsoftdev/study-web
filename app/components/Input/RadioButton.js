/**
 *
 * Radio for react-select
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

function RadioButton({ input, className, children, onChange }) {
  return (
    <span
      className={
        classNames(className,
          'jcf-radio parent-active',
          { 'input-checked-parent jcf-checked': input.checked, 'jcf-unchecked': !input.checked },
        )
      }
      style={{ overflow: 'visible' }}
    >
      <span
        onClick={() => {
          input.onChange(!input.checked);
          if (onChange) {
            onChange(!input.checked);
          }
        }}
      />
      <input
        {...input}
        checked={input.checked}
        type="radio"
        value={input.value}
      />
      {children}
    </span>
  );
}

RadioButton.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default RadioButton;
