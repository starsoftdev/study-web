const styles = require('./styles/NavLayout');

import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import DocumentTitle from 'react-document-title';
import classnames from 'classnames';
import TopBar from './TopBar';

@CSSModules(styles)
export default class NavLayout extends Component {
  static propTypes = {
    children: PropTypes.node,
    replace: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.replace('/logout');
  }

  render() {
    return (
      <DocumentTitle title="Study KIK">
        <div>
          <TopBar />

          <div className={classnames(styles.content)}>
            {this.props.children}
          </div>
        </div>
      </DocumentTitle>
    );
  }
}
