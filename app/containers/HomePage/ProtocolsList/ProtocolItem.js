import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

class ProtocolItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    index: PropTypes.number,
    protocolNumber: PropTypes.string,
    indication: PropTypes.string,
    croName: PropTypes.string,
    activeCount: PropTypes.string,
    inactiveCount: PropTypes.string,
    patientMessagingSuiteCount: PropTypes.string,
    unreadMessageCount: PropTypes.string,
    push: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      buttonsShown: false,
    };

    this.onViewClick = this.onViewClick.bind(this);
    // this.onRenewClick = this.onRenewClick.bind(this);
    // this.onUpgradeClick = this.onUpgradeClick.bind(this);
    // this.onEditClick = this.onEditClick.bind(this);
    this.showButtons = this.showButtons.bind(this);
    this.hideButtons = this.hideButtons.bind(this);
  }

  onViewClick() {
    console.log(this.props);
    const { push } = this.props;
    push(`/app/report?protocol=${this.props.protocolNumber}&indication=${this.props.indication}&cro=${this.props.croName}`);
  }

  // onRenewClick() {
  //   const { studyId, indication, onRenew, campaign } = this.props;

  //   onRenew(studyId, indication.id, campaign);
  // }

  // onUpgradeClick() {
  //   const { studyId, indication, onUpgrade, campaign } = this.props;

  //   onUpgrade(studyId, indication.id, campaign);
  // }

  // onEditClick() {
  //   this.props.onEdit(this.props.studyId, this.props.siteUsers);
  // }

  showButtons() {
    this.setState({ buttonsShown: true });
  }

  hideButtons() {
    this.setState({ buttonsShown: false });
  }

  render() {
    const { protocolNumber, indication, croName, activeCount, inactiveCount, patientMessagingSuiteCount, unreadMessageCount } = this.props;
    const buttonsShown = this.state.buttonsShown;
    let messageCountContent = null;
    let patientMessagingSuite = 'Off';
    if (unreadMessageCount && unreadMessageCount > 0) {
      messageCountContent = (
        <span className="counter-circle">{unreadMessageCount}</span>
      );
    }

    if (patientMessagingSuiteCount && patientMessagingSuiteCount > 0) {
      patientMessagingSuite = 'On';
    }

    return (
      <tr
        className={classNames('study-container', { 'tr-active': buttonsShown, 'tr-inactive': !buttonsShown })}
        onMouseEnter={this.showButtons} onMouseLeave={this.hideButtons}
      >
        <td>
        </td>
        <td>
          <span>{protocolNumber}</span>
        </td>
        <td>
          <span>{indication}</span>
        </td>
        <td>
          <span>{croName}</span>
        </td>
        <td className={classNames('patient-messaging-suite', { off: (patientMessagingSuite === 'Off') })}>
          <span>{patientMessagingSuite}</span>
          <span>{messageCountContent}</span>
        </td>
        <td>
          <span>{activeCount}</span>
        </td>
        <td>
          <span>{inactiveCount}</span>
          <div className="btns-slide pull-right">
            <div className="btns">
              <Button bsStyle="default" className="btn-view-patients" onClick={this.onViewClick}>View Patients</Button>
              <Button bsStyle="primary" className="btn-renew" onClick={this.onRenewClick}>Renew</Button>
              <Button bsStyle="danger" className="btn-upgrade" onClick={this.onUpgradeClick}>Upgrade</Button>
              <Button bsStyle="info" className="btn-edit" onClick={this.onEditClick}>Edit</Button>
            </div>
          </div>
        </td>
        <td>
          <div className="btns-slide">
            <div className="btns">
              <div className="area">
                <Button bsStyle="default" className="btn-view-patients" onClick={this.onViewClick}>View Report</Button>
                <a href="#renew-study" className="btn btn-primary lightbox-opener">Renew</a>
                <a href="#add-site-popup" className="btn btn-danger lightbox-opener">Add Site</a>
                <label className="check-switcher">
                  <input type="checkbox" id="messaging4" />
                  <span data-off="OFF" data-on="ON" className="text"></span>
                  <div className="tooltip custom top">
                    <div className="tooltop-arrow"></div>
                    <div data-deactive="MESSAGING SUITE" data-active="MESSAGING SUITE" className="tooltop-inner"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  push: (path) => dispatch(push(path)),
});

export default connect(null, mapDispatchToProps)(ProtocolItem);
