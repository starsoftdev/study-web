import React, { Component, PropTypes } from 'react';

export default class FieldError extends Component {

  static propTypes = {
    message: PropTypes.string
  }

  render() {
    return (
      <p className="error-msg text-danger"><small>{this.props.message}</small></p>
    );
  }

}
