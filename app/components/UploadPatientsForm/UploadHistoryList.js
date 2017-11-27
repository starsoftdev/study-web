/**
 *
 * UploadPatientsPreviewForm
 *
 */

import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import _ from 'lodash';

import Modal from 'react-bootstrap/lib/Modal';
import { ProgressBar } from 'react-bootstrap';
import CenteredModal from '../../components/CenteredModal/index';

class UploadHistoryList extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    uploadHistory: PropTypes.object,
    revertProgress: PropTypes.any,
    revert: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showConfirmRevertModal: false,
      selectedHistoryItem: null,
      revertProgress: 0,
    };

    this.renderHistoryTable = this.renderHistoryTable.bind(this);
    this.switchShowConfirmRevertModal = this.switchShowConfirmRevertModal.bind(this);
    this.confirmRevert = this.confirmRevert.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.revertProgress) {
      this.setState({ revertProgress: newProps.revertProgress });

      if (newProps.revertProgress === 100) {
        setTimeout(() => {
          this.setState({ showConfirmRevertModal: !this.state.showConfirmRevertModal, selectedHistoryItem: null, revertProgress: 0 });
        }, 2000);
      }
    }
  }

  switchShowConfirmRevertModal(item) {
    this.setState({ showConfirmRevertModal: !this.state.showConfirmRevertModal, selectedHistoryItem: item });
  }

  confirmRevert() {
    const { revert } = this.props;
    const { selectedHistoryItem } = this.state;

    if (selectedHistoryItem) {
      revert(selectedHistoryItem.bulk_upload_id);
      this.setState({ revertStarted: true });
    }
  }

  renderHistoryTable() {
    const { uploadHistory } = this.props;

    if (uploadHistory.details.length > 0) {
      return (
        <table className="table">
          <colgroup>
            <col style={{ width: '36%' }} />
            <col style={{ width: '19.2%' }} />
            <col style={{ width: '12.5%' }} />
            <col style={{ width: '12.2%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr key={_.uniqueId()}>
              <th>File Name</th>
              <th>User</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
            uploadHistory.details.map((item) => {
              const date = moment(item.date);
              return (
                <tr key={_.uniqueId()}>
                  <td>{item.name}</td>
                  <td>{`${item.first_name} ${item.last_name}`}</td>
                  <td>{date.format('MM/DD/YY')}</td>
                  <td>{date.format('hh:mm A')}</td>
                  <td className="status">{item.status}</td>
                  <td>
                    <input
                      type="button"
                      disabled={item.status === 'reverted'}
                      value="Revert"
                      className="btn btn-gray-outline margin-right"
                      onClick={() => { this.switchShowConfirmRevertModal(item); }}
                    />
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="upload-history">
        <header>
          <h2>Upload history</h2>
          <span className="tip">Upload sessions are kept for 90 days, but can only be reverted in the first 48 hours after upload. </span>
        </header>
        {this.renderHistoryTable()}

        <Modal dialogComponentClass={CenteredModal} show={this.state.showConfirmRevertModal} onHide={() => { this.switchShowConfirmRevertModal(null); }}>
          <Modal.Header>
            <Modal.Title>Revert Import</Modal.Title>
            <a className="lightbox-close close" onClick={() => { this.switchShowConfirmRevertModal(null); }}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="confirm-modal-container">
              {!this.state.revertStarted &&
                <span className="confirm-text">
                  {'Are you sure you want to revert the data imported from'}
                  <br />
                  {`${(this.state.selectedHistoryItem) ? this.state.selectedHistoryItem.name : ''}?`}
                </span>
              }
              {this.state.revertStarted && <ProgressBar bsStyle="warning" now={this.state.revertProgress} />}
              <div className="btn-block text-center">
                <input type="button" value="cancel" className="btn btn-gray-outline margin-right" onClick={() => { this.switchShowConfirmRevertModal(null); }} />
                <input type="button" value="submit" className="btn btn-default" disabled={this.state.revertStarted} onClick={this.confirmRevert} />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default UploadHistoryList;
