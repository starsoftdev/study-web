/**
 *
 * Input for react-select
 *
 */

import React from 'react';
import ReactSuperSelect from 'react-super-select';
import classNames from 'classnames';
import _ from 'lodash';

class ReactMultiCheckBox extends React.Component {
  componentDidMount() {
  }

  render() {
    const {
      input,
      placeholder,
      className,
      onChange,
      dataSource,
      includeAllOption,
      meta: { touched, error, active },
      ...rest
    } = this.props;
    const hasError = touched && error && !active;
    const errorClass = hasError ? 'has-error' : '';

    let finalDataSource = dataSource;
    if (includeAllOption) {
      finalDataSource = [{ id: 0, label: 'All', value: 0 }].concat(finalDataSource);
    }

    const itemTemplate = (controlSelectedValue) => (
      <div>
        <a data-status="all" className="link-all jcf-checkbox"><span></span></a>
        <span> {controlSelectedValue.label}</span>
      </div>
    );

    const selectedItemsTemplate = () => (
      <div>
        {placeholder}
      </div>
    );

    const inputComponent = (
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
}

ReactMultiCheckBox.propTypes = {
  input: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  placeholder: React.PropTypes.string,
  onChange: React.PropTypes.func,
  includeAllOption: React.PropTypes.bool,
  dataSource: React.PropTypes.array,
  meta: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
};

export default ReactMultiCheckBox;
