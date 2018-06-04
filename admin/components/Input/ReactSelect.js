/**
*
* Input for react-select
*
*/

import React, { PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Select from 'react-select';
import classNames from 'classnames';
import MediaQuery from 'react-responsive';
import { translate } from '../../../common/utilities/localization';
import './styles.less';

function ReactSelect({
  input,
  name,
  placeholder,
  options,
  className,
  selectedValue,
  objectValue,
  onChange,
  multi,
  tooltipEnabled,
  meta: { touched, error, active },
  clearValueText,
  clearable,
  mobileEnabled,
  ...rest
}) {
  const hasError = touched && error && !active;
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
      value={selectedValue === undefined ? input.value : selectedValue}
      onChange={(event) => {
        input.onChange(event);
        if (onChange) {
          onChange(event);
        }
      }}
      onBlur={() => input.onBlur(selectedValue === undefined ? input.value : selectedValue)}
      options={optionsToRender}
      placeholder={placeholder}
      className="form-control"
      multi={multi}
      simpleValue={!objectValue}
      autosize={false}
      clearValueText={clearValueText || translate('common.component.reactSelect.clear')}
      openOnClick
      openOnFocus
      clearable={clearable}
      {...rest}
    />
  );
  let mobileComponent = (
    <select
      className="form-control"
      value={selectedValue === undefined ? input.value : selectedValue}
      onBlur={() => input.onBlur(selectedValue === undefined ? input.value : selectedValue)}
      placeholder={placeholder}
      multiple={multi}
      onChange={(event) => {
        input.onChange(event);
        if (onChange) {
          onChange(event);
        }
      }}
    >
      <option value="" disabled>{placeholder}</option>
      {
        optionsToRender.map((item) => {
          return (<option key={item.value} value={item.value}>{item.label}</option>);
        })
      }
    </select>
  );

  if (hasError && tooltipEnabled) {
    inputComponent = (
      <OverlayTrigger
        placement="right"
        overlay={tooltip}
      >
        {inputComponent}
      </OverlayTrigger>
    );
    mobileComponent = (
      <OverlayTrigger
        placement="right"
        overlay={tooltip}
      >
        {mobileComponent}
      </OverlayTrigger>
    );
  }
  if (mobileEnabled) {
    return (
      <div className={classNames(className, { 'has-error': hasError })}>
        <MediaQuery minDeviceWidth={768}>
          {inputComponent}
        </MediaQuery>
        <MediaQuery maxDeviceWidth={768}>
          {mobileComponent}
        </MediaQuery>
      </div>
    );
  }
  return (
    <div className={classNames(className, { 'has-error': hasError })}>
      {inputComponent}
    </div>
  );
}

ReactSelect.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  meta: PropTypes.object.isRequired,
  multi: PropTypes.bool,
  className: PropTypes.string,
  selectedValue: PropTypes.any,
  objectValue: PropTypes.bool,
  tooltipEnabled: PropTypes.bool,
  clearValueText: PropTypes.string,
  clearable: PropTypes.bool,
  mobileEnabled: PropTypes.bool,
};

export default ReactSelect;

export const addAllOption = (options, allOption) => {
  if (Array.isArray(options)) {
    return [allOption || { label: translate('common.component.reactSelect.all'), value: 'All' }, ...options];
  }
  return options;
};
