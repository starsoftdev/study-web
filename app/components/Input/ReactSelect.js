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
  selectedValue,
  objectValue,
  meta: { touched, error, active },
  ...rest,
}) {
  const hasError = touched && error && !active;
  const errorClass = hasError ? 'has-error' : '';
  const optionsToRender = options.map(o => (
    { ...o, value: (o.value || o.id), label: (o.label || o.name) }
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
      value={selectedValue || input.value}
      onChange={input.onChange}
      onBlur={() => input.onBlur(selectedValue || input.value)}
      options={optionsToRender}
      placeholder={placeholder}
      className="form-control"
      simpleValue={!objectValue}
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
  selectedValue: PropTypes.any,
  objectValue: PropTypes.bool,
};

export default ReactSelect;
