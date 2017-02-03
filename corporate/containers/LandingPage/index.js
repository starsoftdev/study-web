import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import inViewport from 'in-viewport';

import img9 from '../../assets/images/buildings/img9.jpg';

import { selectCurrentUser, selectLanding } from '../../../app/containers/App/selectors';
import { fetchLanding } from '../../../app/containers/App/actions';

import './styles.less';

export class LandingPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    studyId: PropTypes.any,
    siteLocation: PropTypes.any,
    fetchLanding:  PropTypes.func.isRequired,
    currentUser: PropTypes.any,
    landing: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.watcherA = null;
    this.watcherB = null;
    this.watcherC = null;

    this.setVisible = this.setVisible.bind(this);

    this.props = {
      study: null,
    }
  }

  componentWillMount() {
    this.props.fetchLanding(this.props.params.studyId);
  }

  componentDidMount() {
    this.watcherA = inViewport(this.animatedFormContent, this.setVisible);
    this.watcherB = inViewport(this.slideInLeft, this.setVisible);
    this.watcherC = inViewport(this.slideInRight, this.setVisible);
    
    console.log(this.props.params.studyId, this.props.params.siteLocation);
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps', newProps);

    if (newProps.landing && newProps.landing.study) {
      console.log(1);
      this.setState({study: newProps.landing.study})
    }
  }

  componentWillUnmount() {
    this.watcherA.dispose();
    this.watcherB.dispose();
    this.watcherC.dispose();
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  render() {
    let name = '';
    /*if (this.state.study) {
      name  = this.state.study.name
    }*/
    return (
      <div id="main">
        <div className="container">
          <form action="#" className="form-study text-center">
            <h1 className="main-heading">{name}</h1>
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
                  <img src={img9} width="854" height="444" alt="preview" className="img-responsive" />
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  landing: selectLanding(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchLanding: (studyId) => dispatch(fetchLanding(studyId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
