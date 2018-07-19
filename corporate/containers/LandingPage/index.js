/* eslint-disable react/prefer-stateless-function */

import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';

import LandingForm from '../../components/LandingForm';
import LandingArticle from '../../components/LandingArticle';
import LandingSurvey from '../../components/LandingSurvey';
import { normalizePhoneForServer } from '../../../app/common/helper/functions';

import {
  selectCurrentUser,
  selectLanding,
  selectLandingIsFetching,
  selectLandingError,
  selectSubscribedFromLanding,
  selectSubscriptionError,
} from '../../../app/containers/App/selectors';
import {
  fetchLanding,
  subscribeFromLanding,
  patientSubscriptionError,
  clearLanding,
  sendThankYouEmail,
} from '../../../app/containers/App/actions';

import {
  trackLandingPage,
} from './actions';
import { ga } from '../../../node_modules/react-ga';

export class LandingPage extends React.Component {

  static propTypes = {
    params: PropTypes.object,
    param: PropTypes.any,
    siteLocation: PropTypes.any,
    fetchLanding:  PropTypes.func.isRequired,
    subscribeFromLanding:  PropTypes.func.isRequired,
    patientSubscriptionError:  PropTypes.func.isRequired,
    subscribedFromLanding:  PropTypes.object,
    sendThankYouEmail:  PropTypes.func.isRequired,
    subscriptionError:  PropTypes.object,
    landingError:  PropTypes.object,
    landingIsFetching:  PropTypes.bool,
    clearLanding:  PropTypes.func.isRequired,
    currentUser: PropTypes.any,
    location: PropTypes.any,
    landing: PropTypes.object,
    trackLandingPage:PropTypes.func.isRequired,
    surveyRequired: PropTypes.bool,
    surveyComplete: PropTypes.bool,
    surveyUrl: PropTypes.string,
    dispatchSurveyComplete: PropTypes.func,
    dispatchSurveyRequired: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.state = {
      invalidStudy: null,
      study: null,
      pageTracked: false,
    };
  }

  componentWillMount() {
    const { splat } = this.props.params;
    if (!isNaN(parseInt(splat))) {
      this.props.fetchLanding(splat, this.props.location.query.utm);
    } else {
      this.props.clearLanding();
      browserHistory.push('/');
    }
  }

  componentDidMount() {
    if (window.surveyUrl) {
      if (window.surveyUrl.value.length) {
        this.onShowSurvey();
      } else {
        window.surveyUrl.ee.on('SHOW_SURVEY', this.onShowSurvey);
      }
    }
  }

  componentWillUnmount() {
    window.surveyUrl.ee.off('SHOW_SURVEY', this.onShowSurvey);
  }

  onShowSurvey = () => {
    // fire onload
    ga('send', 'event', 'Pre-qualification Questionnaire', 'Questionaire Loaded - client:allergan|sampled:true', this.props.location.pathname);
    this.props.dispatchSurveyRequired();
  }

  onCompleteSurvey = () => {
    ga('send', 'event', 'Pre-qualification Questionnaire', 'Questionaire Completed - client:allergan|sampled:true', this.props.location.pathname);
    this.props.dispatchSurveyComplete();
  }

  componentWillReceiveProps(newProps) {
    const { subscribedFromLanding, landing, landingError } = newProps;
    const { siteLocation } = newProps.params;
    let invalidSite = false;

    if (landing) {
      const urlPart = landing.url;

      if (urlPart.toLowerCase().replace(/ /ig, '-') !== siteLocation.toLowerCase()) {
        invalidSite = true;
      }

      if (!landing.isPublic) {
        this.props.clearLanding();
        browserHistory.push('/');
      }
    }

    if (invalidSite || landingError) {
      this.props.clearLanding();
      browserHistory.push('/404');
    }

    if (subscribedFromLanding) {
      browserHistory.push('/thankyou');
    }

    if (!this.state.pageTracked && !invalidSite && !landingError && landing) {
      const { studyId, protocolId, siteId, sourceId } = landing;
      const trackingPayload = {
        siteId,
        protocolId,
        studyId,
        sourceId,
      };
      this.props.trackLandingPage(trackingPayload);
      this.setState({
        pageTracked: true,
      });
    }
  }

  onSubmitForm(params) {
    const { landing } = this.props;
    const separateNames = params.name.trim();
    const code = params.code || null;
    let firstName = '';
    let lastName = '';
    if (separateNames.indexOf(' ') !== -1) {
      firstName = separateNames.substr(0, separateNames.indexOf(' '));
      lastName = separateNames.substr(separateNames.indexOf(' ') + 1).trim();
    } else {
      firstName = separateNames;
    }

    const data = {
      firstName,
      lastName: lastName || null,
      email: params.email,
      phone: normalizePhoneForServer(params.phone, code),
      landing_page_id: landing.id,
    };

    if (this.props.location.query && this.props.location.query.utm && landing.isUtmValid) {
      data.utm = this.props.location.query.utm;
    }

    if (this.props.surveyComplete) {
      ga('send', 'event', 'Pre-qualification Questionnaire', 'Study Signup - client:allergan|sampled:true', this.props.location.pathname);
    }

    this.props.subscribeFromLanding(data);
  }

  render() {
    const { subscriptionError, landingIsFetching, location, landing } = this.props;

    if (this.props.surveyRequired && !this.props.surveyComplete) {
      return (
        <div id="main">
          <div className="container">
            <LandingSurvey
              uri={this.props.surveyUrl} onComplete={this.onCompleteSurvey}
            />
          </div>
        </div>
      );
    }
    if (landingIsFetching || landing === null) {
      return (
        <div id="main">
          <div className="container">
            <p className="invisible"></p>
          </div>
        </div>
      );
    }

    return (
      <div id="main">
        <Helmet
          meta={[
            {
              name: 'og:description',
              content: landing.studyName,
            },
            {
              name: 'og:image',
              content: landing.imgSrc ? landing.imgSrc : '',
            },
            {
              name: 'og:url',
              content: window.location.href,
            },
            {
              name: 'twitter:description',
              content: 'StudyKIK',
            },
          ]}
        />
        <div className="container">
          <LandingForm landing={landing} onSubmit={this.onSubmitForm} subscriptionError={subscriptionError} />
          <LandingArticle landing={landing} location={location} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  subscribedFromLanding: selectSubscribedFromLanding(),
  landingIsFetching: selectLandingIsFetching(),
  landingError: selectLandingError(),
  subscriptionError: selectSubscriptionError(),
  landing: selectLanding(),
  surveyRequired: (state) => state.form.LandingPage.surveyRequired,
  surveyComplete: (state) => state.form.LandingPage.surveyComplete,
  surveyUrl: (state) => state.form.LandingPage.surveyUrl,
});

function mapDispatchToProps(dispatch) {
  return {
    fetchLanding: (studyId, utm) => dispatch(fetchLanding(studyId, utm)),
    subscribeFromLanding: (params) => dispatch(subscribeFromLanding(params)),
    patientSubscriptionError: (params) => dispatch(patientSubscriptionError(params)),
    sendThankYouEmail: (params) => dispatch(sendThankYouEmail(params)),
    clearLanding: () => dispatch(clearLanding()),
    trackLandingPage: (trackingPayload) => dispatch(trackLandingPage(trackingPayload)),
    dispatchSurveyRequired: () => dispatch({ type: 'SURVEY_REQUIRED', payload: window.surveyUrl.value }),
    dispatchSurveyComplete: () => dispatch({ type: 'SURVEY_COMPLETE' }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
