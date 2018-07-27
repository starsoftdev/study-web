import classNames from 'classnames';
import moment from 'moment';
import React, { Component, PropTypes } from 'react';

import { translate } from '../../../../common/utilities/localization';
import { normalizePhoneDisplay } from '../../../common/helper/functions';

import PrimaryInfo from './PrimaryInfo';
import SecondaryInfo from './SecondaryInfo';

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

    if (!patient || !patient.details) return null;

    const formattedPatient = { ...patient.details };
    formattedPatient.phone = normalizePhoneDisplay(patient.details.phone);

    if (formattedPatient.dob) {
      const dob = moment(formattedPatient.dob);
      formattedPatient.dobMonth = dob.month() + 1;
      formattedPatient.dobDay = dob.date();
      formattedPatient.dobYear = dob.year();
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
              <PrimaryInfo initialValues={formattedPatient} />
            ) : (
              <SecondaryInfo initialValues={formattedPatient} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default PatientInfo;
