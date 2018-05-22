import React, { PropTypes, Component } from 'react';
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
      <div className="protocol-list-row-item">
        <div className="protocol-list-row-item-columns-container">
          <div className="box-element number">
            <div className="header">#</div>
            <div className="value">{(this.props.index + 1)}</div>
          </div>
          <div className="box-element protocol">
            <div className="header">{translate('sponsor.component.protocolsList.tableHeadProtocol')}</div>
            <div className="value">{protocolNumber}</div>
          </div>
          <div className="box-element indication">
            <div className="header">{translate('sponsor.component.protocolsList.tableHeadIndication')}</div>
            <div className="value">{indication}</div>
          </div>
          <div className="box-element cro">
            <div className="header">{translate('sponsor.component.protocolsList.tableHeadCro')}</div>
            <div className="value">{croName}</div>
          </div>
          <div className="box-element pqs">
            <div className="header"><div>{translate('sponsor.component.protocolsList.tableHeadPqs')}</div></div>
            <div className="value">
              <span className="patient-messaging-suite-status">{patientMessagingSuiteText}</span>
              <span>{messageCountContent}</span>
            </div>
          </div>
          <div className="box-element active">
            <div className="header">{translate('sponsor.component.protocolsList.tableHeadActive')}</div>
            <div className="value">{activeCount}</div>
          </div>
          <div className="box-element inactive">
            <div className="header">{translate('sponsor.component.protocolsList.tableHeadInactive')}</div>
            <div className="value">{inactiveCount}</div>
          </div>
        </div>
        <div className="protocol-list-row-item-view-reports-button" onClick={this.onViewClick}>{translate('sponsor.component.protocolItem.viewReport')}</div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  push: (path) => dispatch(push(path)),
});

export default connect(null, mapDispatchToProps)(ProtocolItem);
