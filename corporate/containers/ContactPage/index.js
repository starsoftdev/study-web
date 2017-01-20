import React from 'react';

import img17 from '../../assets/images/img17.svg';
import img18 from '../../assets/images/img18.svg';
import imgWifi from '../../assets/images/wifi.svg';

import './styles.less';

export default class ContactPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {};

  constructor(props) {
    super(props);

    console.log('Contact');
  }

  componentWillMount() {
  }

  componentDidMount() {
    // TODO: find or implement analog of JQuery in-viewport in react
    this.animatedForm.classList.add('in-viewport', 'fadeInUp');
  }

  componentWillReceiveProps() {
  }

  render() {
    return (
      <div id="main">
        <div className="container">
          <h2 className="main-heading alt text-center small-font">
            STUDYKIK IS DEDICATED TO HELPING PEOPLE FIND CLINICAL TRIALS IN THEIR AREA. IF YOU WISH TO HAVE VOLUNTEERS
            FIND YOUR CLINICAL TRIALS, <a href="#">CLICK HERE</a>
          </h2>
          <form
            ref={(animatedForm) => { this.animatedForm = animatedForm; }}
            action="#"
            className="form-contact"
            data-formvalidation="true"
            data-view="fadeInUp"
          >
            <div className="form-holder">
              <p className="text-center txt-green">To speak with one of our friendly staff members, please contact us.</p>
              <div className="row contact-info">
                <div className="col-xs-4">
                  <h3 className="txt-orange"><i className="icon-phone txt-orange"></i> PHONE</h3>
                  <a href="tel:8776272509">877.627.2509</a>
                </div>
                <div className="col-xs-4">
                  <h3 className="txt-orange"><i className="icon-map-marker txt-orange"></i> LOCATION</h3>
                  <address>1675 Scenic Ave <br /> Suite 150 <br /> Costa Mesa, Ca 92626</address>
                </div>
                <div className="col-xs-4 pull-right col">

                  <h3 className="txt-orange"><i className="icon-envelope txt-orange"></i> EMAIL</h3>
                  <a href="mailto:info@studykik.com" className="email">info@studykik.com</a>
                </div>
              </div>
              <input type="text" className="form-control input-lg" placeholder="* Full Name" data-required="true" />
              <input type="email" className="form-control input-lg" placeholder="* Email" data-required="true" />
              <input type="text" data-type="number" className="form-control input-lg" placeholder="* Mobile Phone" data-required="true" />
              <textarea className="form-control input-lg" placeholder="* Message" data-required="true"></textarea>
              <input type="submit" className="btn btn-default btn-block input-lg" value="Submit" />
              <div className="image left">
                <img src={img17} alt="&nbsp;" width="351" height="437" className="svg" />
                <span className="wifi">
                  <img src={imgWifi} alt="&nbsp;" width="40" className="svg" />
                </span>
              </div>
              <div className="image right">
                <img src={img18} alt="&nbsp;" width="380" height="480" className="svg" />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
