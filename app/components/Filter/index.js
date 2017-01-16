/**
 * Created by Dennis on 1/3/17.
 */

import React from 'react';
import classNames from 'classnames';
import ReactSelect from '../Input/ReactSelect';
import Input from 'components/Input';

class Filter extends React.Component {
  static propTypes = {
    options: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    onClose: React.PropTypes.func,
  };

  componentDidMount() {
  }

  createValueBox(options) {
    const { name, value, className, style } = options;
    // const attrName = 'data' + name;
    return (
      <div
        style={style}
        className={classNames('filter-area', 'pull-left', className, 'value-box')}
      >
        <strong className="title">{name}:</strong>
        <div className="value-control">{value}</div>
        <a href="#" className="btn-close" data-remove=".filter-search-area" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close"></i>
        </a>
      </div>
      );
  }

  createSearchBox(options) {
    const { name, className, style } = options;

    return (
      <div
        style={style}
        className={classNames('filter-area', 'pull-left', className, 'search-box')}
      >
        <strong className="title">Search</strong>
        <input type="text" name={name} className="form-control" placeholder="Search" />
        <button className="btn btn-default">Apply</button>
        <a href="#" className="btn-close" data-remove=".filter-search-area" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close"></i>
        </a>
      </div>
      );
  }

  createComparisonBox(options) {
    const { name, className, style } = options;
    const comparisonOptions = [
      { id: 0, label: '<', value: 'lt' },
      { id: 1, label: '>', value: 'gt' },
      { id: 2, label: '=', value: 'eq' },
    ];
    return (
      <div
        style={style}
        className={classNames('filter-area', 'pull-left', className, 'compare-box')}
      >
        <strong className="title">{name}:</strong>
        <ReactSelect
          className="select"
          input={Input}
          name={name}
          placeholder=""
          options={comparisonOptions}
          meta={{ active: true }}
          onChange={(e) => console.log(123)}
        />
        <input type="text" name={name} className="form-control" placeholder="Search" />
        <button className="btn btn-default">Apply</button>
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
