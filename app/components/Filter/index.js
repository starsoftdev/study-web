/**
 * Created by Dennis on 1/3/17.
 */

import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import { toastr } from 'react-redux-toastr';
import _ from 'lodash';

export default class Filter extends React.Component {
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

  submitSearch(value) {
    if (!value || !/^\d+$/.test(value)) {
      toastr.error('', 'Error! Invalid study number.');
      return;
    }
    this.props.onSubmit(value);
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
          type="text" name={name} className="form-control" placeholder="Study #" ref={(searchVal) => (
          this.searchVal = searchVal
        )}
        />
        <button className="btn btn-default" onClick={() => this.submitSearch(this.searchVal.value)}>Apply</button>
        <a className="btn-close" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close" />
        </a>
      </div>
    );
  }

  createAddressBox(options) {
    const { name, style } = options;

    return (
      <div
        style={style}
        className={classNames('filter-search-area')}
      >
        <strong className="title">Address</strong>
        <input
          type="text" name={name} className="form-control" placeholder="Search" ref={(searchVal) => (
          this.searchVal = searchVal
        )}
        />
        <button className="btn btn-default" onClick={() => { this.props.onSubmit(this.searchVal.value); }}>Apply</button>
        <a className="btn-close" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close" />
        </a>
      </div>
    );
  }

  createNearbyBox(options) {
    const { name, style } = options;

    return (
      <div
        style={style}
        className={classNames('filter-nearby-area')}
      >
        <strong className="title">Nearby Studies:</strong>
        <input
          type="text" name={`${name}-miles`} className="form-control" placeholder="Miles" ref={(miles) => (
          this.miles = miles
        )}
        />
        <input
          type="text" name={`${name}-zipcode`} className="form-control" placeholder="Postal Code" ref={(zip) => (
          this.zip = zip
        )}
        />
        <button className="btn btn-default" onClick={() => { this.props.onSubmit({ miles: this.miles.value, zip: this.zip.value }); }}>Apply</button>
        <a className="btn-close" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close" />
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
            const fullOption = _.find(comparisonOptions, (item) => (item.value === event));
            this.props.onChange(fullOption);
          }}
        />
        <input
          type="text" name={name} className="form-control" placeholder="%" ref={(searchVal) => (
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

    switch (options.type) {
      case 'search':
        return this.createSearchBox(options);
      case 'value':
        return this.createValueBox(options);
      case 'compare':
        return this.createComparisonBox(options);
      case 'nearby':
        return this.createNearbyBox(options);
      case 'address':
        return this.createAddressBox(options);
      default:
        return this.createSearchBox(options);
    }
  }
}
