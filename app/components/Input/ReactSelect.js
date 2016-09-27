/**
*
* Input for react-select
*
*/

import React, { PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Select from 'react-select';
import classNames from 'classnames';

import 'react-select/dist/react-select.min.css';
import './styles.less';

function ReactSelect({
  input,
  name,
  placeholder,
  options,
  className,
  onChange,
  meta: { touched, error, active },
  ...rest,
}) {
  const hasError = touched && error && !active;
  const errorClass = hasError ? 'has-error' : '';
  const optionsToRender = options.map(o => (
    { value: (o.value || o.id), label: (o.label || o.name) }
  ));

  const tooltip = (
    <Tooltip
      id={`${name}-tooltip`}
      className="tooltip-error"
    >
      {error}
    </Tooltip>
  );
  let inputComponent = (
    <Select
      value={input.value}
      onChange={onChange || input.onChange}
      onBlur={() => input.onBlur(input.value)}
      options={optionsToRender}
      placeholder={placeholder}
      className="form-control"
      simpleValue
      {...rest}
    />
  );

  if (hasError) {
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
    <div className={classNames([className, errorClass].join(' '))}>
      {inputComponent}
    </div>
  );
}

ReactSelect.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array,
  meta: PropTypes.object.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default ReactSelect;
