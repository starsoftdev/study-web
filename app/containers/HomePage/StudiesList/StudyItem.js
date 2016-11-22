import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class StudyItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    index: PropTypes.number,
    studyId: PropTypes.number,
    indication: PropTypes.object,
    campaign: PropTypes.object,
    location: PropTypes.string,
    sponsor: PropTypes.string,
    protocol: PropTypes.string,
    patientMessagingSuite: PropTypes.string,
    unreadMessageCount: PropTypes.number,
    status: PropTypes.string,
    siteUsers: PropTypes.array,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    onRenew: PropTypes.func,
    onUpgrade: PropTypes.func,
    onEdit: PropTypes.func,
    push: PropTypes.func,
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
    const { studyId, indication, onRenew, campaign } = this.props;

    onRenew(studyId, indication.id, campaign);
  }

  onUpgradeClick() {
    const { studyId, indication, onUpgrade, campaign } = this.props;

    onUpgrade(studyId, indication.id, campaign);
  }

  onEditClick() {
    this.props.onEdit(this.props.studyId, this.props.siteUsers);
  }

  showButtons() {
    this.setState({ buttonsShown: true });
  }

  hideButtons() {
    this.setState({ buttonsShown: false });
  }

  render() {
    const { index, indication, location, sponsor, protocol, patientMessagingSuite, status,
      startDate, endDate, unreadMessageCount } = this.props;
    const buttonsShown = this.state.buttonsShown;
    let content = null;
    if (buttonsShown) {
      content = (
        <tr className={classNames('study-container', { 'tr-active': buttonsShown })} onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons}>
          <td className="index">
            <span>{index + 1}</span>
          </td>
          <td className="indication">
            <span>{indication.name}</span>
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
          <td className={classNames('patient-messaging-suite', { off: (patientMessagingSuite === 'Off') })}>
            <span>{patientMessagingSuite}</span>
            {(() => {
              if (unreadMessageCount > 0) {
                return (
                  <span className="counter-circle">{unreadMessageCount}</span>
                );
              }
              return false;
            })()}
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
            <span>{indication.name}</span>
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
          <td className={classNames('patient-messaging-suite', { off: (patientMessagingSuite === 'Off') })}>
            <span>{patientMessagingSuite}</span>
            {(() => {
              if (unreadMessageCount > 0) {
                return (
                  <span className="counter-circle">{unreadMessageCount}</span>
                );
              }
              return false;
            })()}
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

const mapDispatchToProps = (dispatch) => ({
  push: (path) => dispatch(push(path)),
});

export default connect(null, mapDispatchToProps)(StudyItem);
