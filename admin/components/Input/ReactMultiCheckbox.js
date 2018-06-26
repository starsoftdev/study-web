/**
 *
 * Input for react-select
 *
 */

import React, { Component } from 'react';
import ReactSuperSelect from 'react-super-select';
import classNames from 'classnames';
import _ from 'lodash';

class ReactMultiCheckBox extends Component {
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
      initialValue,
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
        initialValue={initialValue}
        onChange={(event) => {
          if (onChange) {
            const wasAllCheckedBefore = _.find(input.value, item => item.label === 'All');
            const isAllCheckedNow = _.find(event, item => item.label === 'All');

            if (!event) {
              onChange([]);
              input.onChange([]);
            } else if (!wasAllCheckedBefore && isAllCheckedNow) {
              onChange(finalDataSource);
              input.onChange(finalDataSource);
            } else if (wasAllCheckedBefore && !isAllCheckedNow) {
              onChange([]);
              input.onChange([]);
            } else if (wasAllCheckedBefore && isAllCheckedNow) {
              const withoutAll = _.remove(event, (item) => (item.label !== 'All'));
              onChange(withoutAll);
              input.onChange(withoutAll);
            } else if (!wasAllCheckedBefore && event && dataSource.length === event.length) {
              onChange(finalDataSource);
              input.onChange(finalDataSource);
            } else {
              onChange(event);
              input.onChange(event);
            }
          } else {
            input.onChange(event);
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
  className: React.PropTypes.string,
  dataSource: React.PropTypes.array,
  includeAllOption: React.PropTypes.bool,
  initialValue: React.PropTypes.any,
  input: React.PropTypes.object.isRequired,
  meta: React.PropTypes.object.isRequired,
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func,
  placeholder: React.PropTypes.string,
};

export default ReactMultiCheckBox;
