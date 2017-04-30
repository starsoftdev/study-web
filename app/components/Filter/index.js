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
        <a className="btn-close" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close" />
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
        <input
          type="text" name={name} className="form-control" placeholder="Search" ref={(searchVal) => (
          this.searchVal = searchVal
        )}
        />
        <button className="btn btn-default" onClick={() => { this.props.onSubmit(this.searchVal.value); }}>Apply</button>
        <a className="btn-close" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close"></i>
        </a>
      </div>
    );
  }

  createComparisonBox(options, comparisonOptions) {
    const { name, style } = options;
    
    const label = name === 'nearbyStudies' ? 'nearby Studies' : name;
    console.log('aaa', name, label);
    return (
      <div
        style={style}
        data-percentage="percentage-filter"
        className={classNames('filter-box')}
      >
        <strong className="title">{label}:</strong>
        <Select
          value={options.value}
          options={comparisonOptions}
          className="form-control percent-select"
          simpleValue
          clearable={false}
          onChange={(event) => {
            const fullOption = _.find(comparisonOptions, (item) => (item.value === event));
            this.props.onChange(fullOption);
          }}
        />
        <input
          type="text" name={name} className="form-control" placeholder="Search" ref={(searchVal) => (
          this.searchVal = searchVal
        )}
        />
        <button className="btn btn-default" onClick={() => { this.props.onSubmit(this.searchVal.value); }}>Apply</button>
        <a className="btn-close" data-remove=".filter-search-area" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close" />
        </a>
      </div>
    );
  }

  render() {
    const { options } = this.props;
    const percentageComparisonOptions = [
      { id: 1, label: '<', value: 'lt', clearableValue: false },
      { id: 2, label: '>', value: 'gt', clearableValue: false },
      { id: 3, label: '=', value: 'eq', clearableValue: false },
    ];

    const nearbyComparisonOptions = [
      { id: 1, label: '< 10 Miles', value: 10, clearableValue: false },
      { id: 2, label: '< 25 Miles', value: 25, clearableValue: false },
      { id: 3, label: '< 50 Miles', value: 50, clearableValue: false },
    ];

    switch (options.type) {
      case 'search':
        return this.createSearchBox(options);
      case 'value':
        return this.createValueBox(options);
      case 'compare':
        return this.createComparisonBox(options, percentageComparisonOptions);
      case 'nearby':
        return this.createComparisonBox(options, nearbyComparisonOptions);
      default:
        return this.createSearchBox(options);
    }
  }
}

export default Filter;
