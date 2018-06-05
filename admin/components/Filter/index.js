import React from 'react';
import classNames from 'classnames';

export default class Filter extends React.Component {
  static propTypes = {
    options: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
    onClose: React.PropTypes.func,
    searchType: React.PropTypes.any,
  };

  componentDidMount() {
  }

  createValueBox(options) {
    const { name, value, style } = options;
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

  createStudyNumberBox(name, value) {
    return (
      <div className={classNames('filter-search-area')}>
        <strong className="title">Sturdy Number</strong>
        <input
          type="number" name={name} className="form-control" placeholder="Study #" value={value} ref={(searchVal) => (
            this.searchVal = searchVal
          )}
        />
        <a className="btn-close" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close" />
        </a>
      </div>
    );
  }

  createAddressBox(name, value) {
    return (
      <div className={classNames('filter-search-area')}>
        <strong className="title">Address</strong>
        <input
          type="text" name={name} className="form-control" placeholder="Search" value={value} ref={(searchVal) => (
            this.searchVal = searchVal
          )}
        />
        <a className="btn-close" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close" />
        </a>
      </div>
    );
  }

  createPostalCodeBox(name, value) {
    return (
      <div className={classNames('filter-nearby-area')}>
        <strong className="title">Postal Code:</strong>
        <input
          type="text" name={name} className="form-control" placeholder="Postal Code" value={value} ref={(zip) => (
            this.zip = zip
          )}
        />
        <a className="btn-close" onClick={() => this.props.onClose()}>
          <i className="icomoon-icon_close" />
        </a>
      </div>
    );
  }

  render() {
    const { options, searchType } = this.props;

    if (options.type !== 'search') {
      return this.createValueBox(options);
    }

    switch (searchType) {
      case 'studyNumber':
        return this.createStudyNumberBox(searchType, options.value);
      case 'postalCode':
        return this.createPostalCodeBox(searchType, options.value);
      case 'address':
        return this.createAddressBox(searchType, options.value);
      default:
        return this.createStudyNumberBox(options.type, options.value);
    }
  }
}
