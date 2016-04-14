import React, { Component, PropTypes } from 'react';

export default class Logout extends Component {
  static propTypes = {
    destroySession: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  componentWillMount() {
    this.props.destroySession();
  }

  render() {
    return null;
  }
}
