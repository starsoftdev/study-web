/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/img-has-alt */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import LoadingSpinner from '../../../app/components/LoadingSpinner';
import AppointmentForm from '../../components/AppointmentForm';
import img19 from '../../assets/images/img19.svg';

import {
  selectLanding,
  selectSubscribedFromLanding,
  selectCnsInfo,
  selectCnsSubmitProcess,
} from '../../../app/containers/App/selectors';
import {
  clearLanding,
  getCnsInfo,
  submitCns,
} from '../../../app/containers/App/actions';
import { normalizePhoneDisplay } from '../../../app/common/helper/functions';

export class ThankYouPage extends React.Component {

  static propTypes = {
    landing: PropTypes.object,
    currentUser: PropTypes.any,
    clearLanding:  PropTypes.func.isRequired,
    subscribedFromLanding:  PropTypes.object,
    getCnsInfo: PropTypes.func,
    submitCns: PropTypes.func,
    cnsInfo: PropTypes.object,
    cnsSubmitProcess: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.submitAppointment = this.submitAppointment.bind(this);

    this.state = {
      landing: null,
      subscribedFromLanding: null,
      isCnsSubmitted: false,
    };
  }

  componentWillMount() {
    ga('send', 'event', 'formSubmission');
    if (!this.props.subscribedFromLanding && !this.state.subscribedFromLanding) {
      browserHistory.push('/');
    } else {
      this.setState({ subscribedFromLanding: this.props.subscribedFromLanding });
    }

    if (this.props.landing) {
      this.setState({
        landing: this.props.landing,
      }, () => {
        this.props.clearLanding();
      });

      if (this.props.landing.thankYouPage.cns) {
        this.props.getCnsInfo(this.props.landing.thankYouPage.cns);
      }
    }
  }

  componentWillReceiveProps(newProp) {
    if (newProp.cnsSubmitProcess.submitting) {
      this.setState({ isCnsSubmitted : false });
    }
    if (this.props.cnsSubmitProcess.submitting && !newProp.cnsSubmitProcess.submitting) {
      this.setState({ isCnsSubmitted : true });
    }
  }

  componentWillUnmount() {
  }

  submitAppointment(values) {
    const submitValues = {
      src_id: this.props.cnsInfo.details.src_id,
      ref_domain: this.props.cnsInfo.details.ref_domain,
      interest: this.props.cnsInfo.details.interest,
      version: this.props.cnsInfo.details.version,
      application_auth: this.props.cnsInfo.details.application_auth,
      site: this.props.cnsInfo.details.site,
      first_name: this.state.subscribedFromLanding.firstName,
      last_name: this.state.subscribedFromLanding.lastName,
      email: this.state.subscribedFromLanding.email,
      phone: this.state.subscribedFromLanding.phone,
      appt_date: moment(values.date).format('dddd') + '|' + moment(values.date).format('YYYY-MM-DD'),
      appt_time: values.time,
      patientId: this.state.subscribedFromLanding.id,
    };
    this.props.submitCns(submitValues);
  }

  render() {
    const landing = (this.state.landing) ? this.state.landing : this.props.landing;

    let addressStr = null;
    const address = landing.address;
    const city = landing.city;
    const state = landing.state;
    const zip = landing.zip;

    const thankYouData = landing.thankYouPage;

    const thankyouForText =
      (thankYouData.thankyouFor && thankYouData.thankyouFor !== '') ? thankYouData.thankyouFor : 'Thank you for signing up for our research study!';
    const youWillBeText =
      (thankYouData.youWillBe && thankYouData.youWillBe !== '') ? thankYouData.youWillBe : 'You will be receiving a phone call or text message from the research site soon. If you\'d like to call and schedule an appointment, you can do so at:';
    const lookingForwardText =
      (thankYouData.lookingForwardText && thankYouData.lookingForwardText !== '') ? thankYouData.lookingForwardText : 'Looking forward to having you join.';
    const herIsTheText =
      (thankYouData.herIsThe && thankYouData.herIsThe !== '') ? thankYouData.herIsThe : 'Here is the study location:';
    const visitOurWebsiteText =
      (thankYouData.visitOurWebsiteText && thankYouData.visitOurWebsiteText !== '') ? thankYouData.visitOurWebsiteText : 'Visit our website:';

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

    const thankyouFacebookPixel = 'https://s3.amazonaws.com/studykik-prod/facebookPixel/thankyouFacebookPixel.js';

    let renderOutput = '';
    if (landing && landing.thankYouPage.cns) {
      let dates = [];
      if (this.props.cnsInfo.details && this.props.cnsInfo.details.nextDays) {
        dates = this.props.cnsInfo.details.nextDays;
      }
      renderOutput = (<div id="main">
        <Helmet
          script={[
            {
              type: 'text/javascript',
              src: thankyouFacebookPixel,
            },
          ]}
        />
        {(!this.state.isCnsSubmitted || this.props.cnsSubmitProcess.error) &&
          <AppointmentForm
            onSubmit={this.submitAppointment}
            dates={dates}
            footer={
              <div className="text-center">
                <p className="appointment-footer-first">We are located at:</p>
                <address className="txt-green">
                  {(this.props.cnsInfo.details.site_address || '') + ' ' + (this.props.cnsInfo.details.site_address2 || '')}
                  <br />
                  {(this.props.cnsInfo.details.city || '') + ' ' + (this.props.cnsInfo.details.state || '') + ' ' + (this.props.cnsInfo.details.zip || '')}
                </address>
                { (this.props.cnsInfo.fetching) && <div><LoadingSpinner showOnlyIcon /></div>}
              </div>
            }
            header={<div className="text-center"><div className="appointment-header-first">Just one more step, {this.state.subscribedFromLanding.firstName}!</div><div className="appointment-header-second">Pick a date and time for your free consultation at CNS Healthcare:</div></div>}
            submitDisabled={this.props.cnsSubmitProcess.submitting}
          />
        }

        {this.state.isCnsSubmitted && !this.props.cnsSubmitProcess.error &&
          <div className="container">
            <section className="thanks-section text-center">
              <h1 className="main-heading small-font">
                All set, {this.state.subscribedFromLanding.firstName}! Looking forward to seeing you.
              </h1>
              <p>
                Your appointment is set at:
              </p>
              <div className="txt-green">
                CNS Healthcare
              </div>
              <div className="txt-green">
                {this.props.cnsInfo.details.site_address + ' ' + this.props.cnsInfo.details.site_address2}
              </div>
              <div className="txt-green">
                {this.props.cnsInfo.details.city + ' ' + this.props.cnsInfo.details.state + ' ' + this.props.cnsInfo.details.zip}
              </div>
              <p></p>
              <p className="txt-orange">
                {this.props.cnsInfo.details.phone}
              </p>
            </section>
          </div>
        }

      </div>);
    } else {
      renderOutput = (<div id="main">
        <Helmet
          script={[
            {
              type: 'text/javascript',
              src: thankyouFacebookPixel,
            },
          ]}
        />
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
            {thankYouData.websiteLink &&
            <div>
              <p>{visitOurWebsiteText} <a href={thankYouData.websiteLink} target="_blank">Click Here!</a></p>
            </div>
            }
            <div className="thanks-img">
              <img src={img19} alt="THANK YOU!" width="369" className="img-responsive center-block" />
              <h2 className="title-caption">THANK YOU!</h2>
            </div>
          </section>
        </div>
      </div>);
    }

    return renderOutput;
  }
}

const mapStateToProps = createStructuredSelector({
  subscribedFromLanding: selectSubscribedFromLanding(),
  landing: selectLanding(),
  cnsInfo: selectCnsInfo(),
  cnsSubmitProcess: selectCnsSubmitProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearLanding: () => dispatch(clearLanding()),
    getCnsInfo: (payload) => dispatch(getCnsInfo(payload)),
    submitCns: (payload) => dispatch(submitCns(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYouPage);
