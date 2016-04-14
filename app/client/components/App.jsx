import React, { Component, PropTypes } from 'react';
import NavLayout from './NavLayout';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    getConfig: PropTypes.func,
    replace: PropTypes.func
  }

  componentWillMount() {
    this.props.getConfig();
  }

  render() {
    const { children, replace } = this.props;
    return (
      <NavLayout replace={replace}>
        {children}
      </NavLayout>
    );
  }
}
