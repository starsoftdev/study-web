/**
 * Created by Dennis on 1/3/17.
 */

import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import _ from 'lodash';

class Filter extends React.Component {
  static propTypes = {
    options: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    onClose: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
  };

  componentDidMount() {
  }

  createValueBox(options) {
    const { name, value, style } = options;
    // const attrName = 'data' + name;
    return (
      <div
        style={style}
        className={classNames('filter-box')}
      >
        <strong className="text-uppercase">{name}:</strong> {value}
        <a href="#" className="btn-close" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close"></i>
        </a>
      </div>
    );
  }

  createSearchBox(options) {
    const { name, style } = options;

    return (
      <div
        style={style}
        className={classNames('filter-search-area')}
      >
        <strong className="title">Search</strong>
        <input type="text" name={name} className="form-control" placeholder="Search" />
        <button className="btn btn-default">Apply</button>
        <a href="#" className="btn-close" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close"></i>
        </a>
      </div>
    );
  }

  createComparisonBox(options) {
    const { name, style } = options;
    const comparisonOptions = [
      { id: 1, label: '<', value: 'lt', clearableValue: false },
      { id: 2, label: '>', value: 'gt', clearableValue: false },
      { id: 3, label: '=', value: 'eq', clearableValue: false },
    ];
    return (
      <div
        style={style}
        data-percentage="percentage-filter"
        className={classNames('filter-box')}
      >
        <strong className="title">{name}:</strong>
        <Select
          value={options.value}
          options={comparisonOptions}
          className="form-control percent-select"
          simpleValue
          clearable={false}
          onChange={(event) => {
            console.log(123);
            const fullOption = _.find(comparisonOptions, (item) => (item.value === event));
            console.log(fullOption);
            this.props.onChange(fullOption);
          }}
        />
        <input
          type="text" name={name} className="form-control" placeholder="Search" ref={(searchVal) => (
          this.searchVal = searchVal
        )}
        />
        <button className="btn btn-default" onClick={() => { this.props.onSubmit(this.searchVal.value); }}>Apply</button>
        <a href="#" className="btn-close" data-remove=".filter-search-area" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close"></i>
        </a>
      </div>
    );
  }

  render() {
    const { options } = this.props;

    switch (options.type) {
      case 'search':
        return this.createSearchBox(options);
      case 'value':
        return this.createValueBox(options);
      case 'compare':
        return this.createComparisonBox(options);
      default:
        return this.createSearchBox(options);
    }
  }
}

export default Filter;
