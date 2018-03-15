/* eslint-disable react/prefer-stateless-function */

import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';

import LandingForm from '../../components/LandingForm';
import LandingArticle from '../../components/LandingArticle';
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
  };

  constructor(props) {
    super(props);

    this.onSubmitForm = this.onSubmitForm.bind(this);

    this.state = {
      invalidStudy: null,
      study: null,
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
      browserHistory.push('/');
    }

    if (subscribedFromLanding) {
      if (subscribedFromLanding.email.trim().toLowerCase() !== 'testing@studykik.com') {
        // sendThankYouEmail(subscribedFromLanding);
      }
      browserHistory.push('/thankyou');
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

    if (this.props.location.query && this.props.location.query.utm) {
      data.utm = this.props.location.query.utm;
    }

    this.props.subscribeFromLanding(data);
  }

  render() {
    const { subscriptionError, landingIsFetching, location, landing } = this.props;

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
});

function mapDispatchToProps(dispatch) {
  return {
    fetchLanding: (studyId, utm) => dispatch(fetchLanding(studyId, utm)),
    subscribeFromLanding: (params) => dispatch(subscribeFromLanding(params)),
    patientSubscriptionError: (params) => dispatch(patientSubscriptionError(params)),
    sendThankYouEmail: (params) => dispatch(sendThankYouEmail(params)),
    clearLanding: () => dispatch(clearLanding()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
