/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

import SideNavBar from 'components/SideNavBar';
import TopHeaderBar from 'components/TopHeaderBar';

import './styles.less';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div id="wrapper">
        <TopHeaderBar />
        <SideNavBar />

        <main id="main">
          {React.Children.toArray(this.props.children)}
        </main>
      </div>
    );
  }
}
