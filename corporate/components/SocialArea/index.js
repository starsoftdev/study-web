import React, { PropTypes } from 'react';
import { FacebookButton, TwitterButton, EmailButton, PinterestButton } from "react-social";

export class SocialArea extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    alignCenter: PropTypes.bool,
    study: PropTypes.object,
    location: PropTypes.any,
  };

  render() {
    const { study } = this.props;
    console.log(study);

    return (
      <div className="social-area clearfix">
        <h3 className="pull-left">Share this study:</h3>
        <ul className="social-networks pull-left list-inline">
          <li className="facebook">
            <a href="#" onClick={(ev) => {
              ev.preventDefault();
              window.open(`https://www.facebook.com/dialog/share?app_id=966242223397117&display=popup&href=${location.href}&redirect_uri=https://www.facebook.com/sharer.php?`, study.name, 'width=600,height=530');

            }}>
              <i className="icon-facebook-square"></i>
            </a>
          </li>
          <li className="twitter">
            <a href="#" onClick={(ev) => {
              ev.preventDefault();
              window.open(`https://twitter.com/intent/tweet?text=${study.name} ${location.href}`, study.name, 'width=600,height=530');
            }}>
              <i className="icon-twitter-square"></i>
            </a>
          </li>
          <li className="pinterest">
            <PinterestButton element="a">
              <i className="icon-pinterest-square"></i>
            </PinterestButton>
          </li>
          <li className="gmail">
            <EmailButton message={study.description} element="a">
              <i className="icon-envelope-square"></i>
            </EmailButton>
          </li>
        </ul>
      </div>
    );
  }
}

export default SocialArea;
