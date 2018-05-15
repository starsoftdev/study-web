import classNames from 'classnames';
import React, { Component } from 'react';

import { translate } from '../../../common/utilities/localization';

class PatientInfo extends Component {
  state = {
    carouselIndex: 0,
  };

  handleSelectCarousel = (index) => {
    this.setState({ carouselIndex: index });
  }

  render() {
    const { carouselIndex } = this.state;

    return (
      <div className="patient-info">
        <div id="carousel-example-generic" className="carousel slide popup-slider">
          <ol className="carousel-indicators">
            <li className={classNames({ active: carouselIndex === 0 })} onClick={() => this.handleSelectCarousel(0)}>
              {translate('container.page.callCenterPatient.patientInfo.tab.patientContact')}
            </li>
            <li className={classNames({ active: carouselIndex === 1 })} onClick={() => this.handleSelectCarousel(1)}>
              {translate('container.page.callCenterPatient.patientInfo.tab.patientDB')}
            </li>
          </ol>
          <div className="carousel-inner" role="listbox">
            {carouselIndex === 0 ? (
              <div className="info-container">
                <span>Name</span>
                <span>Email</span>
                <span>Phone</span>
                <span>Sign Up</span>
                <span>Updated</span>
              </div>
            ) : (
              <div className="info-container">
                <span>Date of Birth</span>
                <span>Gender</span>
                <span>BMI</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PatientInfo;
