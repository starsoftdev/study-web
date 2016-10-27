import React, { Component, PropTypes } from 'react';

class StudyItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    index: PropTypes.number,
    studyId: PropTypes.number,
    indication: PropTypes.string,
    location: PropTypes.string,
    sponsor: PropTypes.string,
    protocol: PropTypes.string,
    patientMessagingSuite: PropTypes.string,
    status: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    onRenew: PropTypes.func,
    onUpgrade: PropTypes.func,
    onEdit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      buttonsShown: false,
    };

    this.showButtons = this.showButtons.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
    this.onRenewClick = this.onRenewClick.bind(this);
    this.onUpgradeClick = this.onUpgradeClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
  }

  showButtons() {
    this.setState({ buttonsShown: true });
  }

  hideButtons() {
    this.setState({ buttonsShown: false });
  }

  onRenewClick() {
    this.props.onRenew(this.props.studyId);
  }

  onUpgradeClick() {
    this.props.onUpgrade(this.props.studyId);
  }

  onEditClick() {
    this.props.onEdit(this.props.studyId);
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
            <button className="btn btn-primary btn-renew" onClick={this.onRenewClick}>Renew</button>
            <button className="btn btn-primary btn-upgrade" onClick={this.onUpgradeClick}>Upgrade</button>
            <button className="btn btn-primary btn-edit" onClick={this.onEditClick}>Edit</button>
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
