/* eslint-disable react/prefer-stateless-function */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment-timezone';
import { Alert } from 'react-bootstrap';

import LandingForm from '../../components/LandingForm';
import LandingArticle from '../../components/LandingArticle';

import {
  selectCurrentUser,
  selectLanding,
  selectLandingIsFetching,
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
    siteLocation: PropTypes.any,
    fetchLanding:  PropTypes.func.isRequired,
    subscribeFromLanding:  PropTypes.func.isRequired,
    subscribedFromLanding:  PropTypes.object,
    subscriptionError:  PropTypes.object,
    landingError:  PropTypes.object,
    landingIsFetching:  PropTypes.bool,
    clearForm:  PropTypes.func.isRequired,
    currentUser: PropTypes.any,
    landing: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onSubmitForm = this.onSubmitForm.bind(this);

    this.state = {
      invalidStudy: null,
      invalidSite: null,
      study: null,
    };
  }

  componentWillMount() {
    const { splat } = this.props.params;
    this.props.fetchLanding(splat);
  }

  componentWillReceiveProps(newProps) {
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

  render() {
    const { subscriptionError, landingError, landingIsFetching } = this.props;
    const { invalidSite } = this.state;
    let errMessage = '';

    let landing = null;
    let study = null;
    if (this.props.landing) {
      landing = this.props.landing;
      study = landing.study;
    }

    if (invalidSite) {
      errMessage = `Unknown "landingPage" id "${study.id}" with "site" location "${this.props.params.siteLocation}".`;
    }

    if (landingError) {
      errMessage = landingError.message;
    }

    if ((landingIsFetching || landing === null) && (!invalidSite && !landingError)) {
      return (
        <div id="main">
          <div className="container">
            <p className="invisible"></p>
          </div>
        </div>
      );
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
          <LandingForm study={study} onSubmit={this.onSubmitForm} subscriptionError={subscriptionError} />
          <LandingArticle study={study} landing={landing} />
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
    fetchLanding: (studyId) => dispatch(fetchLanding(studyId)),
    subscribeFromLanding: (params) => dispatch(subscribeFromLanding(params)),
    clearForm: () => dispatch(clearForm()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
