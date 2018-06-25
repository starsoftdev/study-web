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

import React, { Component } from 'react';

import img1 from '../../assets/images/404.png';
import img2 from '../../assets/images/img20.png';
import { translate } from '../../../common/utilities/localization';

export default class NotFound extends Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div id="main" className="not-found-page">
        <div className="container">
          <div className="img-holder">
            <img src={img1} alt="img4" className="img-responsive" />
          </div>
          <h3 className="text-center">{translate('corporate.page.notFound.intro1')}</h3>
          <h2 className="text-center">{translate('corporate.page.notFound.intro2')}</h2>
        </div>
        <div className="container">
          <div className="buttons text-center">
            <a href="/app" >
              <span
                className="btn-default btn-fire btn"
                onClick={this.toggleListNow}
              >
                {translate('corporate.page.notFound.btn1')}
              </span>
            </a>
            <a href="/app" >
              <span
                className="btn-default btn-live btn"
                onClick={this.toggleListNow}
              >
                {translate('corporate.page.notFound.btn2')}
              </span>
            </a>
          </div>
          <div className="img-holder complaint_image">
            <img src={img2} alt="img4" className="img-responsive" />
          </div>
        </div>
      </div>
    );
  }
}
