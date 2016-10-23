import React, { Component, PropTypes } from 'react';

class StudyItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    index: PropTypes.number,
    indication: PropTypes.string,
    location: PropTypes.string,
    sponsor: PropTypes.string,
    protocol: PropTypes.string,
    patientMessagingSuite: PropTypes.string,
    status: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  };

  render() {
    const { index, indication, location, sponsor, protocol, patientMessagingSuite, status,
      startDate, endDate } = this.props;

    return (
      <tr className="study-container">
        <td className="index">
          <span>{index + 1}</span>
        </td>
        <td className="indication">
          <span>{indication}</span>
        </td>
        <td className="location">
          <span>{location}</span>
        </td>
        <td className="sponsor">
          <span>{sponsor}</span>
        </td>
        <td className="protocol">
          <span>{protocol}</span>
        </td>
        <td className="patient-messaging-suite">
          <span>{patientMessagingSuite}</span>
        </td>
        <td className="status">
          <span>{status}</span>
        </td>
        <td className="start-date">
          <span>{startDate}</span>
        </td>
        <td className="end-date">
          <span>{endDate}</span>
        </td>
      </tr>
    );
  }
}

export default StudyItem;
