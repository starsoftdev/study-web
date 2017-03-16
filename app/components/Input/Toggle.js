/**
*
* Input for react-select
*
*/

import React, { PropTypes } from 'react';
import ToggleButton from 'react-toggle-button';
import classNames from 'classnames';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const backgroundColors = {
  active: {
    base: '#a0cf67',
    hover: '#c0e890',
  },
  inactive: {
    base: '#f78e1e',
    hover: '#ffc689',
  },
  activeThumb: {
    base: '#cdcdcd',
  },
  inactiveThumb: {
    base: '#cdcdcd',
  },
};

const labelStyle = {
  fontSize: '18px',
  fontWeight: 600,
  width: '80px',
  left: 0,
  paddingRight: 0,
};

function Toggle({ input, name, initValue, className, onChange, disabled, meta: { touched, error, active } }) {
  const hasError = touched && error && !active;
  const trackColor = hasError ? 'red' : '#cdcdcd';
  const toggleDisabled = disabled ? 'toggleDisabled' : null;
  const tooltip = (
    <Tooltip
      id={`${name}-tooltip`}
      className="tooltip-error"
    >
      {error}
    </Tooltip>
  );

  let inputComponent = (<ToggleButton
    value={initValue || input.value || false}
    name={name}
    colors={backgroundColors}
    thumbAnimateRange={[0, 80]}
    activeLabelStyle={labelStyle}
    inactiveLabelStyle={labelStyle}
    thumbStyle={{ borderRadius: 0, width: '78px', height: '36px', boxShadow: 'none' }}
    trackStyle={{ borderRadius: 0, width: '162px', height: '40px', border: `2px solid ${trackColor}` }}
    onToggle={(value) => {
      input.onChange(!value);
      if (onChange) {
        onChange(!value);
      }
    }}
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
    <div className={classNames([className, 'toggle', toggleDisabled])}>
      {inputComponent}
    </div>
  );
}

Toggle.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  initValue: PropTypes.any,
  className: PropTypes.string,
  meta: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Toggle;
