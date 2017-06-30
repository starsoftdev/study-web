/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/img-has-alt */

import React from 'react';
import Helmet from 'react-helmet';
import img19 from '../../assets/images/img19.svg';

export class ThankYouPage2 extends React.Component {

  render() {
    const thankyouFacebookPixel = 'https://s3.amazonaws.com/studykik-prod/facebookPixel/thankyouFacebookPixel.js';

    return (<div id="main">
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
            Thank you for signing up for our research study!
          </h1>
          <p>
            You will be receiving a phone call or text message from the research site soon.
          </p>
          <div>
            <p>Looking forward to having you join.</p>
          </div>
          <div className="thanks-img">
            <img src={img19} alt="THANK YOU!" width="369" className="img-responsive center-block" />
            <h2 className="title-caption">THANK YOU!</h2>
          </div>
        </section>
      </div>
    </div>);
  }
}

export default ThankYouPage2;
