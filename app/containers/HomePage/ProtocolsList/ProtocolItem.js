import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import Toggle from '../../../components/Input/Toggle';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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

    const tooltip = (
      <Tooltip
        id={'ms-tooltip'}
        className="tooltop-inner"
      >
        {'MESSAGING SUITE'}
      </Tooltip>
    );

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
          <span className="patient-messaging-suite-status">{patientMessagingSuite}</span>
          <span>{messageCountContent}</span>
        </td>
        <td>
          <span>{activeCount}</span>
        </td>
        <td className="patient-messaging-suite off">
          <span>{inactiveCount}</span>
        </td>
        <td>
          <div className="btns-slide">
            <div className="btns">
              <div className="area">

                <div className="pull-right">
                  <OverlayTrigger
                    placement="top"
                    overlay={tooltip}
                  >
                    <div className="disabled-toggle-container">
                      <Toggle
                        name="purchase"
                        meta={{ touched:false, error:false, active:false }}
                        input={{}}
                        className="disabled-toggle"
                      />
                    </div>
                  </OverlayTrigger>
                </div>

                <div className="pull-right">
                  <Button bsStyle="default" className="btn-view-patients" onClick={this.onViewClick}>View Report</Button>
                  <Button disabled className="btn btn-primary lightbox-opener">Renew</Button>
                  <Button disabled className="btn btn-danger lightbox-opener">Add Site</Button>
                </div>
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
