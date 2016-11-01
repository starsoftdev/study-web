import React from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class StudyItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    index: React.PropTypes.number,
    studyId: React.PropTypes.number,
    indication: React.PropTypes.string,
    location: React.PropTypes.string,
    sponsor: React.PropTypes.string,
    protocol: React.PropTypes.string,
    patientMessagingSuite: React.PropTypes.string,
    status: React.PropTypes.string,
    startDate: React.PropTypes.string,
    endDate: React.PropTypes.string,
    onRenew: React.PropTypes.func,
    onUpgrade: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    push: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      buttonsShown: false,
    };

    this.onViewClick = this.onViewClick.bind(this);
    this.onRenewClick = this.onRenewClick.bind(this);
    this.onUpgradeClick = this.onUpgradeClick.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.showButtons = this.showButtons.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
  }

  onViewClick() {
    const { push, studyId } = this.props;
    push(`/studies/${studyId}/sites/1`);
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
        <tr className={classNames('study-container', { 'tr-active': buttonsShown })} onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons}>
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
          <td className="actions">
            <div className="btns-slide">
              <div className="btns">
                <Button bsStyle="default" className="btn-view-patients" onClick={this.onViewClick}>View Patients</Button>
                <Button bsStyle="primary" className="btn-renew" onClick={this.onRenewClick}>Renew</Button>
                <Button bsStyle="danger" className="btn-upgrade" onClick={this.onUpgradeClick}>Upgrade</Button>
                <Button bsStyle="info" className="btn-edit" onClick={this.onEditClick}>Edit</Button>
              </div>
            </div>
          </td>
        </tr>
      );
    } else {
      content = (
        <tr className={classNames('study-container', { 'tr-active': buttonsShown })} onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons}>
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

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  push: (path) => dispatch(push(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyItem);
