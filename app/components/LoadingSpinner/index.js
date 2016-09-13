import React, { PropTypes } from 'react';

import FaSpinner from 'react-icons/lib/fa/spinner';
import './styles.less';

function LoadingSpinner({ showOnlyIcon }) {
  if (showOnlyIcon) {
    return (
      <FaSpinner size={30} className="spinner-icon text-info" />
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-12 text-center">
          <p>
            <FaSpinner size={30} className="spinner-icon text-info" />
          </p>
          <p className="text-info spinner-text">
            Loading
          </p>
        </div>
      </div>
    </div>
  );
}

LoadingSpinner.propTypes = {
  showOnlyIcon: PropTypes.bool,
};

export default LoadingSpinner;
