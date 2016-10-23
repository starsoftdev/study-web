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

  constructor(props) {
    super(props);

    this.state = {
      buttonsShown: false,
    };

    this.showButtons = this.showButtons.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
  }

  showButtons() {
    this.setState({ buttonsShown: true });
  }

  hideButtons() {
    this.setState({ buttonsShown: false });
  }

  render() {
    const { index, indication, location, sponsor, protocol, patientMessagingSuite, status,
      startDate, endDate } = this.props;
    const buttonsShown = this.state.buttonsShown;
    let content = null;

    if (buttonsShown) {
      content = (
        <tr className="study-container" onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons}>
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
          <td colSpan="3" className="actions">
            <a href="/patient-database" className="btn btn-primary btn-view-patients">View Patients</a>
            <button className="btn btn-primary btn-renew">Renew</button>
            <button className="btn btn-primary btn-upgrade">Upgrade</button>
            <button className="btn btn-primary btn-edit">Edit</button>
          </td>
        </tr>
      );
    } else {
      content = (
        <tr className="study-container" onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons}>
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

    return content;
  }
}

export default StudyItem;
