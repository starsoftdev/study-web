import React, { PropTypes } from 'react';

export class SocialArea extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    alignCenter: PropTypes.bool,
  };

  render() {
    return (
      <div className="social-area clearfix">
        <h3 className="pull-left">Share this study:</h3>
        <ul className="social-networks pull-left list-inline">
          <li className="facebook">
            <a href="#">
              <i className="icon-facebook-square"></i>
            </a></li>
          <li className="instagram">
            <a href="#">
              <i className="icon-instagram2"></i>
            </a>
          </li>
          <li className="twitter">
            <a href="#">
              <i className="icon-twitter-square"></i>
            </a>
          </li>
          <li className="pinterest">
            <a href="#">
              <i className="icon-pinterest-square"></i>
            </a>
          </li>
          <li className="gmail">
            <a href="#">
              <i className="icon-envelope-square"></i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default SocialArea;
