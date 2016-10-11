/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import Dashboard from './Dashboard';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    location: PropTypes.any,
  }

  render() {
    return (
      <div className="text-center">
        <Helmet title="Home Page - StudyKIK" />
        <div className="dashboard">
          <div className="container-fluid">
            <Dashboard location={this.props.location} />
          </div>
        </div>
      </div>
    );
  }
}
