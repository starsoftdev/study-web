import React from 'react';

import img1 from '../../assets/images/503.png';
import img2 from '../../assets/images/img20.png';


export default class ServiceUnavailable extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  componentWillMount() {}

  componentWillReceiveProps() {}

  render() {
    return (
      <div id="main" className="not-found-page">
        <div className="container">
          <div className="img-holder">
            <img src={img1} alt="img4" className="img-responsive" />
          </div>
          <h3 className="text-center">Service Unavailable</h3>
          <h2 className="text-center">HELP DECIDE THE TECH TEAMS' FATE.</h2>
        </div>
        <div className="container">
          <div className="buttons text-center">
            <a href="/" >
              <span
                className="btn-default btn-fire btn"
                onClick={this.toggleListNow}
              >
                FIRE THEM
              </span>
            </a>
            <a href="/" >
              <span
                className="btn-default btn-live btn"
                onClick={this.toggleListNow}
              >
                LET THEM LIVE
              </span>
            </a>
          </div>
          <div className="img-holder complaint_image">
            <img src={img2} alt="img4" className="img-responsive" />
          </div>
        </div>
      </div>
    );
  }
}
