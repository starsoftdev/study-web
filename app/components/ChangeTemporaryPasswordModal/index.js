/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../components/CenteredModal';
import ChangeTemporaryPasswordForm from '../../components/ChangeTemporaryPasswordForm';

class ChangeTemporaryPasswordModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  };

  render() {
    const { show, onSubmit } = this.props;
    return (
      <Modal
        className="change-temp-pwd"
        dialogComponentClass={CenteredModal}
        show={show}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>Change temporary password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangeTemporaryPasswordForm onSubmit={onSubmit} />
        </Modal.Body>
      </Modal>
    );
  }
}

export default ChangeTemporaryPasswordModal;
