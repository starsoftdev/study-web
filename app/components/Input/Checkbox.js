/**
 *
 * Input for react-select
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';

function Checkbox({ input, className, children, onChange }) {
  return (
    <div className={classNames(className)}>
      <span className={`jcf-checkbox jcf-focus parent-active jcf-pressed ${input.checked ? 'jcf-checked' : 'jcf-unchecked'}`}>
        <span onClick={onChange}></span>
        <input {...input} type="checkbox" />
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
  onChange: PropTypes.func,
};

export default Checkbox;
