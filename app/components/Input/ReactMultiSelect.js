/**
 *
 * Input for react-select
 *
 */

import React, { PropTypes } from 'react';
import ReactSuperSelect from 'react-super-select';
import classNames from 'classnames';
import _ from 'lodash';

function ReactMultiSelect({
  input,
  placeholder,
  className,
  onChange,
  dataSource,
  includeAllOption,
  meta: { touched, error, active },
  ...rest
}) {
  const hasError = touched && error && !active;
  const errorClass = hasError ? 'has-error' : '';

  let finalDataSource = dataSource;
  if (includeAllOption) {
    finalDataSource = [{ id: 0, label: 'All', value: 0 }].concat(finalDataSource);
  }

  const inputComponent = (
    <ReactSuperSelect
      onChange={(event) => {
        input.onChange(event);
        if (onChange) {
          if (includeAllOption && event && _.find(event, item => item.label === 'All')) {
            onChange(finalDataSource);
            input.onChange(finalDataSource);
          } else {
            onChange(event);
          }
        }
      }}
      dataSource={finalDataSource}
      placeholder={placeholder}
      {...rest}
    />
  );

  return (
    <div className={classNames([className, errorClass].join(' '))}>
      {inputComponent}
    </div>
  );
}

ReactMultiSelect.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  includeAllOption: PropTypes.bool,
  dataSource: PropTypes.array,
  meta: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default ReactMultiSelect;
