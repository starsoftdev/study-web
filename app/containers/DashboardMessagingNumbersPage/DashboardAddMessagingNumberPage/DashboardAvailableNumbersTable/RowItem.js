import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Modal from 'react-bootstrap/lib/Modal';
import { addMessagingNumber } from '../../actions';
import { selectDashboardEditMessagingNumberProcess } from '../../selectors';
import CenteredModal from '../../../../components/CenteredModal/index';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import Checkbox from '../../../../components/Input/Checkbox';

class RowItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    addMessagingNumber: PropTypes.func,
    editMessagingNumberProcess: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      buyModalOpen: false,
    };

    this.closeBuyModal = this.closeBuyModal.bind(this);
    this.openBuyModal = this.openBuyModal.bind(this);
    this.handleAddMessagingNumber = this.handleAddMessagingNumber.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.editMessagingNumberProcess.saving && !newProps.editMessagingNumberProcess.saving) {
      this.closeBuyModal();
    }
  }

  closeBuyModal() {
    this.setState({ buyModalOpen: false });
  }

  openBuyModal() {
    this.setState({ buyModalOpen: true });
  }

  handleAddMessagingNumber() {
    this.props.addMessagingNumber(this.props.item.phoneNumber);
  }

  renderCapabilities(capabilities) {
    return (
      <div style={{ display: 'flex', pointerEvents: 'none' }}>
        <span style={{ flex: 1 }}>
          <Checkbox name="voice" input={{ checked: capabilities.voice }} readOnly disabled />
        </span>
        <span style={{ flex: 1 }}>
          <Checkbox name="SMS" input={{ checked: capabilities.SMS }} readOnly disabled />
        </span>
        <span style={{ flex: 1 }}>
          <Checkbox name="MMS" input={{ checked: capabilities.MMS }} readOnly disabled />
        </span>
      </div>
    );
  }

  render() {
    const { item } = this.props;
    const initialValues = {
      id: item.id,
      phoneNumber: item.phoneNumber,
      type: item.addressRequirements || 'Local',
      capabilities: item.capabilities,
      price: item.price || 1.00,
    };
    return (
      <tr>
        <td>
          {initialValues.phoneNumber}
        </td>
        <td>
          {this.renderCapabilities(initialValues.capabilities)}
        </td>
        <td>
          <a className="btn btn-primary btn-edit-site pull-right" onClick={this.openBuyModal}>
            <span>Buy</span>
          </a>
        </td>
        <Modal
          dialogComponentClass={CenteredModal}
          className="new-user"
          id="new-user"
          show={this.state.buyModalOpen}
          onHide={this.closeBuyModal}
        >
          <Modal.Header>
            <Modal.Title>Number Info</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeBuyModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <div className="form-lightbox dashboard-lightbox dashboard-add-messaging-number">
                <div className="field-row">
                  <strong className="label">
                    <label className="add-exposure-level">Number</label>
                  </strong>
                  <div className="field disabled">
                    {initialValues.phoneNumber}
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label className="add-exposure-level">Capabilities</label>
                  </strong>
                  <div className="field">
                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                      <span style={{ flex: 1 }}>Voice</span>
                      <span style={{ flex: 1 }}>SMS</span>
                      <span style={{ flex: 1 }}>MMS</span>
                    </div>
                    {this.renderCapabilities(initialValues.capabilities)}
                  </div>
                </div>
                <div className="field-row text-right no-margins">
                  <button className="btn btn-primary" onClick={this.handleAddMessagingNumber}>
                    {this.props.editMessagingNumberProcess.saving
                      ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                      : <span>Buy</span>
                    }
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  editMessagingNumberProcess: selectDashboardEditMessagingNumberProcess(),
});

function mapDispatchToProps(dispatch) {
  return {
    addMessagingNumber: (payload) => dispatch(addMessagingNumber(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RowItem);
