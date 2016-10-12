/**
 *
 * Input for react-select
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './checkbox.less';

function Checkbox({ input, className, children, onChange }) {
  return (
    <div className={classNames(className)}>
      <div className="ck-checkbox">
        <span className={`jcf-checkbox jcf-focus parent-active jcf-pressed ${input.checked ? 'jcf-checked' : 'jcf-unchecked'}`}>
          <span></span>
          <input
            {...input}
            type="checkbox"
            onChange={(e) => {
              input.onChange(e);
              if (onChange) {
                onChange(e);
              }
            }}
          >
          </input>
          {children}
        </span>
      </div>
    </div>
  );
}

Checkbox.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.array,
  onChange: PropTypes.func,
};

export default Checkbox;
