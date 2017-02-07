/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prefer-template */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import inViewport from 'in-viewport';
import moment from 'moment-timezone';
import { Alert } from 'react-bootstrap';

import LandingForm from '../../components/LandingForm';
import img9 from '../../assets/images/buildings/img9.jpg';

import {
  selectCurrentUser,
  selectLanding,
  selectLandingError,
  selectSubscribedFromLanding,
  selectSubscriptionError,
} from '../../../app/containers/App/selectors';
import { fetchLanding, subscribeFromLanding, clearForm } from '../../../app/containers/App/actions';

import './styles.less';

export class LandingPage extends React.Component {

  // TODO: use siteLocation to study request filter
  static propTypes = { params: PropTypes.object,
    param: PropTypes.any,
    studyId: PropTypes.any,
    siteLocation: PropTypes.any,
    fetchLanding:  PropTypes.func.isRequired,
    subscribeFromLanding:  PropTypes.func.isRequired,
    subscribedFromLanding:  PropTypes.object,
    subscriptionError:  PropTypes.object,
    landingError:  PropTypes.object,
    clearForm:  PropTypes.func.isRequired,
    currentUser: PropTypes.any,
    landing: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.watcherA = null;
    this.watcherB = null;

    this.setVisible = this.setVisible.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);

    this.state = {
      invalidStudy: null,
      invalidSite: null,
      study: null,
    };
  }

  componentWillMount() {
    const { studyId } = this.props.params;
    this.props.fetchLanding(studyId);
  }

  componentDidMount() {
    this.watcherA = inViewport(this.slideInLeft, this.setVisible);
    this.watcherB = inViewport(this.slideInRight, this.setVisible);
  }

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps', newProps);
    const { siteLocation } = this.props.params;
    let invalidSite = true;

    if (newProps.landing) {
      const { study } = newProps.landing;
      if (study) {
        for (const site of study.sites) {
          if (site.location.toLowerCase().replace(/ /ig, '-') === siteLocation) {
            invalidSite = null;
          }
        }
        this.setState({ invalidSite });
      }
    }
  }

  componentWillUnmount() {
    this.watcherA.dispose();
    this.watcherB.dispose();
  }

  onSubmitForm(params) {
    const now = moment();
    const landing = this.props.landing;
    // TODO: figure out about source key
    const data = {
      firstName: params.name,
      email: params.email,
      phone: params.phone,
      createdAt: now,
      updatedAt: now,
      unsubscribed: false,
      study_patient_category_id: landing.study_patient_category_id,
      source_id: landing.study.sources[0].id,
    };

    this.props.subscribeFromLanding(data);
  }

  setVisible(el) {
    const viewAtr = el.getAttribute('data-view');
    el.classList.add('in-viewport', viewAtr);
  }

  render() {
    const { subscriptionError, landingError } = this.props;
    const { invalidSite } = this.state;
    let errMessage = '';

    let landing = null;
    let study = null;
    if (this.props.landing) {
      landing = this.props.landing;
      study = landing.study;
    }

    const name = (study) ? study.name : '';
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
    
    if (invalidSite) {
      errMessage = `Unknown "site" location "${this.props.params.siteLocation}".`;
    }

    if (landingError) {
      errMessage = landingError.message;
    }

    if (invalidSite || landingError) {
      return (
        <div id="main">
          <div className="container">
            <Alert bsStyle="danger">
              <p>{errMessage}</p>
            </Alert>
          </div>
        </div>
      );
    }

    return (
      <div id="main">
        <div className="container">
          <LandingForm name={name} city={city} state={state} onSubmit={this.onSubmitForm} subscriptionError={subscriptionError} />
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  subscribedFromLanding: selectSubscribedFromLanding(),
  landingError: selectLandingError(),
  subscriptionError: selectSubscriptionError(),
  landing: selectLanding(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchLanding: (studyId) => dispatch(fetchLanding(studyId)),
    subscribeFromLanding: (params) => dispatch(subscribeFromLanding(params)),
    clearForm: () => dispatch(clearForm()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
