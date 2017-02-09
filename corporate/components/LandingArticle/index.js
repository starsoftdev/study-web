/* eslint-disable prefer-template */

import React, { PropTypes } from 'react';
import inViewport from 'in-viewport';

import img9 from '../../assets/images/buildings/img9.jpg';

export class LandingArticle extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    study: PropTypes.object,
    landing: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.watcherA = null;
    this.watcherB = null;

    this.setVisible = this.setVisible.bind(this);
  }

  componentDidMount() {
    this.watcherA = inViewport(this.slideInLeft, this.setVisible);
    this.watcherB = inViewport(this.slideInRight, this.setVisible);
  }

  componentWillUnmount() {
    this.watcherA.dispose();
    this.watcherB.dispose();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  render() {
    const { study, landing } = this.props;

    const description = (study) ? study.description : '';
    const landingDescription = (landing && landing.description) ? landing.description : '';
    // TODO: remove img9 when seed data will be updated
    const imgSrc = (landing && landing.imgSrc) ? landing.imgSrc : img9;
    const city = (study && study.sites[0].city) ? study.sites[0].city : '';
    const state = (study && study.sites[0].state) ? study.sites[0].state : '';
    const address = (study && study.sites[0].address) ? study.sites[0].address : '';
    const siteName = (study && study.sites[0].name) ? study.sites[0].name : '';
    const zip = (study && study.sites[0].zip) ? study.sites[0].zip : '';

    let fullAddress = (study && study.sites[0].address) ? study.sites[0].address : '';

    if (city.length) {
      fullAddress += ', ' + city;
    }

    if (state.length) {
      fullAddress += ', ' + state;
    }

    if (state.zip) {
      fullAddress += ', ' + zip;
    }

    return (
      <article className="post">
        <div className="row">
          <div
            ref={(slideInRight) => { this.slideInRight = slideInRight; }}
            className="col-xs-12 col-sm-6 pull-right"
            data-view="slideInRight"
          >
            <h2>{description}</h2>
            <p>
              {landingDescription}
            </p>
            <strong className="title text-uppercase">{siteName}</strong>
            <address>{fullAddress}</address>
            <p className="text-underline">
              If interested, enter information above to sign up!
            </p>
            <p className="note">
              By signing up you agree to receive text messages and emails about this and similar studies near you.
              You can unsubscribe at any time.
            </p>
          </div>
          <div
            ref={(slideInLeft) => { this.slideInLeft = slideInLeft; }}
            className="col-xs-12 col-sm-6"
            data-view="slideInLeft"
          >
            <div className="img-holder">
              <img src={imgSrc} width="854" height="444" alt="preview" className="img-responsive" />
            </div>
            <div className="social-area clearfix">
              <h3 className="pull-left">Share this study:</h3>
              <ul className="social-networks pull-left list-inline">
                <li className="facebook">
                  <a href="#">
                    <i className="icon-facebook-square"></i>
                  </a></li>
                <li className="instagram">
                  <a href="#">
                    <i className="icon-instagram2"></i>
                  </a>
                </li>
                <li className="twitter">
                  <a href="#">
                    <i className="icon-twitter-square"></i>
                  </a>
                </li>
                <li className="pinterest">
                  <a href="#">
                    <i className="icon-pinterest-square"></i>
                  </a>
                </li>
                <li className="gmail">
                  <a href="#">
                    <i className="icon-envelope-square"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default LandingArticle;
