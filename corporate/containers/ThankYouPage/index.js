/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/img-has-alt */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import { componentWillAppendToBody } from 'react-append-to-body';

import img19 from '../../assets/images/img19.svg';

import {
  selectLanding,
  selectSubscribedFromLanding,
} from '../../../app/containers/App/selectors';
import {
  clearLanding,
} from '../../../app/containers/App/actions';
import { normalizePhoneDisplay } from '../../../app/common/helper/functions';

function MyComponent({ children }) {
  return (
    children
  );
}

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
      }, () => {
        this.props.clearLanding();
      });
    }
  }

  componentWillUnmount() {
  }

  render() {
    const landing = (this.state.landing) ? this.state.landing : this.props.landing;
    const AppendedMyComponent = componentWillAppendToBody(MyComponent);
    let addressStr = null;
    const address = landing.address;
    const city = landing.city;
    const state = landing.state;
    const zip = landing.zip;

    const thankYouData = landing.thankYouPage;

    const thankyouForText =
      (thankYouData.thankyouFor && thankYouData.thankyouFor !== '') ? thankYouData.thankyouFor : 'Thank you for signing up for our research study!';
    const youWillBeText =
      (thankYouData.youWillBe && thankYouData.youWillBe !== '') ? thankYouData.youWillBe : 'You will be receiving a phone call or text message from the research site soon. If you\'d like to call and schedule an appointment, you can do so at.';
    const lookingForwardText =
      (thankYouData.lookingForwardText && thankYouData.lookingForwardText !== '') ? thankYouData.lookingForwardText : 'Looking forward to having you join.';
    const herIsTheText =
      (thankYouData.herIsThe && thankYouData.herIsThe !== '') ? thankYouData.herIsThe : 'Here is the study location:';

    if (address) {
      addressStr = `${landing.address}<br />`;
    }

    if (city) {
      addressStr += city;
    }

    if (state) {
      addressStr += `, ${state}`;
    }

    if (zip) {
      addressStr += ` ${zip}`;
    }

    const markup = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '914628025278184'); // Insert your pixel ID here.
      fbq('track', 'PageView');`;

    const inner = { __html: markup };

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
                {landing.siteName}
              </strong>
            }
            {(thankYouData.isSharePhone && landing.recruitmentPhone) &&
            <span className="tel">
              <a href={`tel:${landing.recruitmentPhone}`} className="txt-orange">{normalizePhoneDisplay(landing.recruitmentPhone)}</a>
            </span>
            }
            {!thankYouData.isHideLocationData &&
            <div>
              {addressStr && <p>{herIsTheText}</p>}
              <address className="txt-green" dangerouslySetInnerHTML={{ __html: addressStr }} />
              <p>{lookingForwardText}</p>
            </div>
            }
            <div className="thanks-img">
              <img src={img19} alt="THANK YOU!" width="369" className="img-responsive center-block" />
              <h2 className="title-caption">THANK YOU!</h2>
            </div>
          </section>
        </div>
        <AppendedMyComponent>
          <div>
            <script dangerouslySetInnerHTML={inner} />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display:'none' }}
                src="https://www.facebook.com/tr?id=914628025278184&ev=PageView&noscript=1"
              />
            </noscript>
          </div>
        </AppendedMyComponent>
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
