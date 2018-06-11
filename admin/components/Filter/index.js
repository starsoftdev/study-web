import React from 'react';
import classNames from 'classnames';

export default class Filter extends React.Component {
  static propTypes = {
    options: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
    onClose: React.PropTypes.func,
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

  render() {
    const { options } = this.props;
    return this.createValueBox(options);
  }
}
