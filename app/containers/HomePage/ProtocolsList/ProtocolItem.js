import classNames from 'classnames';
import React, { PropTypes, Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { translate } from '../../../../common/utilities/localization';

class ProtocolItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    index: PropTypes.number,
    protocolNumber: PropTypes.string,
    indication: PropTypes.string,
    croName: PropTypes.string,
    activeCount: PropTypes.string,
    inactiveCount: PropTypes.string,
    patientMessagingSuite: PropTypes.bool,
    pqs: PropTypes.bool,
    unreadMessageCount: PropTypes.number,
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
    push(`/app/report?protocol=${this.props.protocolNumber}&indication=${this.props.indication}&cro=${this.props.croName}&messaging=${this.props.patientMessagingSuite}`);
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
    const { protocolNumber, indication, croName, activeCount, inactiveCount, pqs, unreadMessageCount } = this.props;
    const buttonsShown = this.state.buttonsShown;
    let messageCountContent = null;
    let patientMessagingSuiteText = translate('common.constants.off');
    if (unreadMessageCount && unreadMessageCount > 0) {
      messageCountContent = (
        <span className="counter-circle">{unreadMessageCount}</span>
      );
    }

    if (pqs) {
      patientMessagingSuiteText = translate('common.constants.on');
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
        <td className={classNames('patient-messaging-suite', { off: (patientMessagingSuiteText === 'Off') })}>
          <span className="patient-messaging-suite-status">{patientMessagingSuiteText}</span>
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
                  <Button bsStyle="default" className="btn-view-patients" onClick={this.onViewClick}>{translate('sponsor.component.protocolItem.viewReport')}</Button>
                  <Button disabled className="btn btn-primary lightbox-opener">{translate('sponsor.component.protocolItem.renew')}</Button>
                  <Button disabled className="btn btn-danger lightbox-opener">{translate('sponsor.component.protocolItem.addSite')}</Button>
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
