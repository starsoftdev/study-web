/* eslint-disable react/prefer-stateless-function */

import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment-timezone';

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
      study: null,
    };
  }

  componentWillMount() {
    const { splat } = this.props.params;
    this.props.fetchLanding(splat);
  }

  componentWillReceiveProps(newProps) {
    const { landingError, subscribedFromLanding } = newProps;
    const { siteLocation } = newProps.params;
    let invalidSite = false;

    if (newProps.landing) {
      const { landing } = newProps;
      if (!landing.landingPages.length){
        browserHistory.push('/');
      } else {
        for (const site of landing.sites) {
          if (site.location.toLowerCase().replace(/ /ig, '-') !== siteLocation) {
            invalidSite = true;
          }
        }
      }
    }

    if (invalidSite || subscribedFromLanding){
      browserHistory.push('/');
    }
  }

  onSubmitForm(params) {
    const now = moment();
    const landing = this.props.landing;
    // TODO: figure out about source key
    console.log(params, landing.landingPages[0].study_patient_category_id, landing.sources);
    const data = {
      firstName: params.name,
      email: params.email,
      phone: params.phone,
      createdAt: now,
      updatedAt: now,
      unsubscribed: false,
      study_patient_category_id: landing.landingPages[0].study_patient_category_id,
      source_id: (landing.sources.length) ? landing.sources[0].id : null,
    };

    console.log(data);
    this.props.subscribeFromLanding(data);
  }

  render() {
    const { subscriptionError, landingIsFetching } = this.props;
    let landing = null;
    let study = null;
    if (this.props.landing) {
      study = this.props.landing;
      landing = study.landingPages[0];
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
