/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

export default class NotFound extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <h1>
          The page you are looking for can't be found.
        </h1>
        <h3>Here are some helpful links instead:</h3>
        <li>
          <a href="/app">Home</a>
        </li>
        <li>
          <a href="/logout">Log Out</a>
        </li>
      </div>
    );
  }
}
