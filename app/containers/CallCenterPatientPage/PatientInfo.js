import classNames from 'classnames';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';

import { translate } from '../../../common/utilities/localization';

function formatDate(date, format = 'MM/DD/YY [at] hh:mm a') {
  return moment(date).format(format);
}

class PatientInfo extends Component {
  static propTypes = {
    patient: PropTypes.object,
  };

  state = {
    carouselIndex: 0,
  };

  handleSelectCarousel = (index) => {
    this.setState({ carouselIndex: index });
  }

  render() {
    const { carouselIndex } = this.state;
    const { patient } = this.props;

    let name;
    let email;
    let phone;
    let signUpDate;
    let updatedDate;
    let dob;
    let gender;
    let bmi;

    if (patient && patient.details) {
      const patientData = patient.details;
      name = `${patientData.firstName} ${patientData.lastName}`;
      email = patientData.email;
      phone = patientData.phone;
      signUpDate = formatDate(patientData.createdAt);
      updatedDate = formatDate(patientData.updatedAt);
      dob = formatDate(patientData.dob, 'MM/DD/YYYY');
      gender = patientData.gender;
      bmi = patientData.bmi;
    }

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
                <span>{name}</span>
                <span>{email}</span>
                <span>{phone}</span>
                <span>{signUpDate}</span>
                <span>{updatedDate}</span>
              </div>
            ) : (
              <div className="info-container">
                <span>{dob}</span>
                <span>{gender}</span>
                <span>{bmi}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PatientInfo;
