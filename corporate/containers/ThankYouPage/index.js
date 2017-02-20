/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prefer-template */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';

import img19 from '../../assets/images/img19.svg';

import {
  selectLanding,
  selectSubscribedFromLanding,
} from '../../../app/containers/App/selectors';
import { clearLanding } from '../../../app/containers/App/actions';

export class ThankYouPage extends React.Component {

  static propTypes = {
    landing: PropTypes.object,
    currentUser: PropTypes.any,
    clearLanding:  PropTypes.func.isRequired,
    subscribedFromLanding:  PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      landing: null,
      subscribedFromLanding: null,
    };
  }

  componentWillMount() {
    if (!this.props.subscribedFromLanding && !this.state.subscribedFromLanding) {
      browserHistory.push('/');
    }

    if (this.props.landing) {
      this.setState({
        landing: this.props.landing,
        subscribedFromLanding: this.props.subscribedFromLanding,
      }, () => {
        this.props.clearLanding();
      });
    }
  }

  componentWillUnmount() {
  }

  render() {
    const landing = (this.state.landing) ? this.state.landing : this.props.landing;
    const site = landing.sites[0];

    let address = `${site.address}<br />`;
    const city = site.city;
    const state = site.state;
    const zip = site.zip;

    if (city) {
      address += city;
    }

    if (state) {
      address += `, ${state}`;
    }

    if (zip) {
      address += ` ${zip}`;
    }

    return (
      <div id="main">
        <div className="container">
          <section className="thanks-section text-center">
            <h1 className="main-heading small-font">
              Thank you for signing up for our research study!
            </h1>
            <p>
              You will be receiving a phone call or text message from the research site soon.
              If you'd like to call and schedule an appointment, you can do so at.
            </p>
            <strong className="name txt-green">
              {site.name}
            </strong>
            <span className="tel">
              <a href={`tel:${site.phone.phoneNumber}`} className="txt-orange">{site.phone.phoneNumber}</a>
            </span>
            <p>Here is the study location:</p>
            <address className="txt-green" dangerouslySetInnerHTML={{ __html: address }} />
            <p>
              Looking forward to having you join.
            </p>
            <div className="thanks-img">
              <img src={img19} alt="THANK YOU!" width="369" className="img-responsive center-block" />
              <h2 className="title-caption">THANK YOU!</h2>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  subscribedFromLanding: selectSubscribedFromLanding(),
  landing: selectLanding(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearLanding: () => dispatch(clearLanding()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouPage);
