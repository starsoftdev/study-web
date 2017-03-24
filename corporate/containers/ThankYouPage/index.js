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
import {
  clearLanding,
  sendThankYouEmail,
} from '../../../app/containers/App/actions';

export class ThankYouPage extends React.Component {

  static propTypes = {
    landing: PropTypes.object,
    currentUser: PropTypes.any,
    clearLanding:  PropTypes.func.isRequired,
    sendThankYouEmail:  PropTypes.func.isRequired,
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
    console.log('componentWillReceiveProps', this.props);
    if (!this.props.subscribedFromLanding && !this.state.subscribedFromLanding) {
      browserHistory.push('/');
    }

    if (this.props.landing) {
      this.setState({
        landing: this.props.landing,
        subscribedFromLanding: this.props.subscribedFromLanding,
      }, () => {
        this.props.sendThankYouEmail(this.props.subscribedFromLanding);
        this.props.clearLanding();
      });
    }
  }

  componentWillUnmount() {
  }

  render() {
    const landing = (this.state.landing) ? this.state.landing : this.props.landing;
    const site = landing.site;

    let address = `${site.address}<br />`;
    const city = site.city;
    const state = site.state;
    const zip = site.zip;

    let thankYouData;

    for (const data of landing.studySources) {
      if (data.landing_page_id) {
        console.log('data', data.landingPage.thankYouPage);
        thankYouData = data.landingPage.thankYouPage;
      }
    }

    const thankyouForText =
      (thankYouData.thankyouFor && thankYouData.thankyouFor !== '') ? thankYouData.thankyouFor : 'Thank you for signing up for our research study!';
    const youWillBeText =
      (thankYouData.youWillBe && thankYouData.youWillBe !== '') ? thankYouData.youWillBe : 'You will be receiving a phone call or text message from the research site soon. If you\'d like to call and schedule an appointment, you can do so at.';
    const lookingForwardText =
      (thankYouData.lookingForwardText && thankYouData.lookingForwardText !== '') ? thankYouData.lookingForwardText : 'Looking forward to having you join.';
    const herIsTheText =
      (thankYouData.herIsThe && thankYouData.herIsThe !== '') ? thankYouData.herIsThe : 'Here is the study location:';

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
              {thankyouForText}
            </h1>
            <p>
              {youWillBeText}
            </p>
            {thankYouData.isShareLocation &&
              <strong className="name txt-green">
                {site.name}
              </strong>
            }
            {thankYouData.isSharePhone &&
              <span className="tel">
                <a href={`tel:${landing.recruitmentPhone}`} className="txt-orange">{landing.recruitmentPhone}</a>
              </span>
            }
            {!thankYouData.isHideLocationData &&
              <div>
                <p>
                  {herIsTheText}
                </p>
                <address className="txt-green" dangerouslySetInnerHTML={{ __html: address }} />
                <p>
                  {lookingForwardText}
                </p>
              </div>
            }
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
    sendThankYouEmail: (params) => dispatch(sendThankYouEmail(params)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouPage);
