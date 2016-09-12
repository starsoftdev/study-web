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

import React from 'react';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className="text-center">
        <Helmet title="Home Page - StudyKIK" />
        <h1>
          StudyKIK homepage
        </h1>
        <span>
          Please log in <Link to="/login">here</Link>
        </span>
      </div>
    );
  }
}
