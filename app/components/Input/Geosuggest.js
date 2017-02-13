/**
*
* Input for Geosuggest
*
*/

import React, { PropTypes } from 'react';
import Geosuggest from 'react-geosuggest';
import classNames from 'classnames';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

function FormGeosuggest({ refObj, input, name, className, meta: { touched, error, active }, ...rest }) {
  const hasError = touched && error && !active;
  const errorClass = hasError ? 'has-error' : '';

  const tooltip = (
    <Tooltip
      id={`${name}-tooltip`}
      className="tooltip-error"
    >
      {error}
    </Tooltip>
  );

  let inputComponent = (<Geosuggest
    name={name}
    className={className}
    onBlur={e => input.onBlur(e)}
    onFocus={e => input.onFocus(e)}
    ref={(el) => {
      refObj(el);
    }}
    {...rest}
  />);

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
    <div className={classNames([className, errorClass])}>
      {inputComponent}
    </div>
  );
}

FormGeosuggest.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  meta: PropTypes.object.isRequired,
  refObj: PropTypes.func,
};

export default FormGeosuggest;
