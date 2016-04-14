import React, { PropTypes } from 'react';

const FieldError = (props) => {
  return (
    <p className="error-msg text-danger"><small>{props.message}</small></p>
  );
};

FieldError.propTypes = {
  message: PropTypes.string
};

export default FieldError;
