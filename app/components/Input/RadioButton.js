/**
 *
 * Radio for react-select
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

function RadioButton({ input, className, children, onChange }) {
  return (
    <div className={classNames(className)}>
      <span className={`jcf-radio ${input.checked ? 'jcf-checked input-checked-parent' : 'jcf-unchecked'}`}>
        <input
          {...input}
          checked={input.checked}
          type="radio"
        />
        <span
          onClick={() => {
            input.onChange(!input.checked);
            if (onChange) {
              onChange(!input.checked);
            }
          }}
        />
        {children}
      </span>
    </div>
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
