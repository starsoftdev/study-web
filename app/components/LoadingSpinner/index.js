import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FaSpinner from 'react-icons/lib/fa/spinner';

class LoadingSpinner extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    message: PropTypes.string,
    showOnlyIcon: PropTypes.bool,
    noMessage: PropTypes.bool,
    size: PropTypes.number,
  };

  render() {
    const { message, showOnlyIcon, size, noMessage } = this.props;
    if (showOnlyIcon) {
      return (
        <FaSpinner size={size || 30} className="spinner-icon text-info" />
      );
    }

    const spinnerText = (
      <p className="text-info spinner-text">
        {message || 'Loading'}
      </p>
    );


    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 text-center spinner-container">
            <p>
              <FaSpinner size={size || 30} className="spinner-icon text-info" />
            </p>
            {!noMessage && spinnerText}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, null)(LoadingSpinner);
