import React from 'react';

import img9 from '../../assets/images/buildings/img9.jpg';

import './styles.less';

export default class LandingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  constructor(props) {
    super(props);

    this.checkVisible = this.checkVisible.bind(this)
  }

  componentWillMount() {
  }

  componentDidMount() {
    // TODO: find or implement analog of JQuery in-viewport in react
    this.animatedFormContent.classList.add('in-viewport', 'fadeInUp');
    this.slideInLeft.classList.add('in-viewport', 'slideInLeft');
    this.slideInRight.classList.add('in-viewport', 'slideInRight');
  }

  componentWillReceiveProps() {
  }

  checkVisible() {
    console.log('checkVisible');
  }

  render() {
    return (
      <div id="main">
        <div className="container">
          <form action="#" className="form-study text-center">
            <h1 className="main-heading">Migraine Study</h1>
            <h2 className="txt-orange">
              <i className="icon-map-marker"></i> Seattle, WA
            </h2>
            <div
              ref={(animatedFormContent) => { this.animatedFormContent = animatedFormContent; }}
              data-view="fadeInUp"
            >
              <h3>Enter your information to join!</h3>
              <div className="field-row">
                <input type="text" className="form-control input-lg" data-required="true" placeholder="* Full Name" />
              </div>
              <div className="field-row">
                <input type="email" className="form-control input-lg" data-required="true" placeholder="* Email" />
              </div>
              <div className="field-row">
                <input type="tel" className="form-control input-lg" data-required="true" placeholder="* Mobile phone" />
              </div>
              <div className="field-row">
                <input className="btn btn-default hidden input-lg" value="Reset" type="reset" />
                <input className="btn btn-default btn-block input-lg" value="Sign up now!" type="submit" />
              </div>
              <div className="field-row">
                <a href="tel:3607185766" className="btn btn-deep btn-block small">
                  <i className="icon-phone-square"></i>
                  <div className="inline">
                    <span>Click to Call!</span>
                    <span>360-718-5766</span>
                  </div>
                </a>
              </div>
            </div>
          </form>
          <article className="post">
            <div className="row">
              <div
                ref={(slideInRight) => { this.slideInRight = slideInRight; }}
                className="col-xs-12 col-sm-6 pull-right"
                data-view="slideInRight"
              >
                <h2>DO YOU GET MIGRAINES?</h2>
                <ul className="list-unstyled list-arrow">
                  <li>Ages 18-75?</li>
                  <li>Have at least a one year history of migraines?</li>
                  <li>Have had 2-8 migraines per month?</li>
                </ul>
                <p>If so, you may qualify for an investigational medication research study for migraines.  If you do, all research care, study medication, and office visits and evaluations are provided at no cost. You do not need insurance to participate. Compensation up to $500.00 may be available for participants completing the trial. For more information, please contact:</p>
                <strong className="title text-uppercase">SUMMIT RESEARCH NETWORK</strong>
                <address>901 Boren Ave., suite 1800, Seattle, WA 98104, United States</address>
                <p className="text-underline">If interested, enter information above to sign up!</p>
                <p className="note">By signing up you agree to receive text messages and emails about this and similar studies near you. You can unsubscribe at any time.</p>
              </div>
              <div
                ref={(slideInLeft) => { this.slideInLeft = slideInLeft; }}
                className="col-xs-12 col-sm-6"
                data-view="slideInLeft"
              >
                <div className="img-holder">
                  <img src={img9} width="854" height="444" alt="image description" className="img-responsive" />
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
        </div>
      </div>
    );
  }
}
