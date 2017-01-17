/**
 *
 * Input for react-select
 *
 */

import React, { PropTypes } from 'react';
import ReactSuperSelect from 'react-super-select';
import classNames from 'classnames';
import _ from 'lodash';

function ReactMultiCheckBox({
  input,
  placeholder,
  className,
  onChange,
  dataSource,
  includeAllOption,
  meta: { touched, error, active },
  ...rest,
}) {
  const hasError = touched && error && !active;
  const errorClass = hasError ? 'has-error' : '';

  let finalDataSource = dataSource;
  if (includeAllOption) {
    finalDataSource = [{ id: 0, label: 'All', value: 0 }].concat(finalDataSource);
  }

  const itemTemplate = (controlSelectedValue) => (
    <div>
      <a href="#" data-status="all" className="link-all jcf-checkbox"><span></span></a>
      <span> {controlSelectedValue.label}</span>
    </div>
  );

  const selectedItemsTemplate = () => (
    <div>
      {placeholder}
    </div>
  );

  let inputComponent = (
    <ReactSuperSelect
      onChange={(event) => {
        input.onChange(event);
        if (onChange) {
          if (includeAllOption && event && _.find(event, item => item.label === 'All')) {
            onChange(finalDataSource);
            input.onChange(dataSource);
          } else {
            onChange(event);
            input.onChange(event);
          }
        }
      }}
      dataSource={finalDataSource}
      placeholder={placeholder}
      customOptionTemplateFunction={itemTemplate}
      customSelectedValueTemplateFunction={selectedItemsTemplate}
      {...rest}
    />
  );

  return (
    <div className={classNames([className, errorClass].join(' '))}>
      {inputComponent}
    </div>
  );
}

ReactMultiCheckBox.propTypes = {
  input: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  includeAllOption: PropTypes.bool,
  dataSource: PropTypes.array,
  meta: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default ReactMultiCheckBox;
