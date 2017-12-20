/**
*
* Bulk Upload Tutorial Modal
*
*/

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';

import CenteredModal from '../../components/CenteredModal/index';
import BulkUploadTutorialSlider from '../../components/BulkUploadTutorialSlider/index';

class BulkUploadTutorialModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    showModal: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
  };

  render() {
    return (
      <Modal
        className="email-tutorial-modal"
        id="email-tutorial-modal"
        dialogComponentClass={CenteredModal}
        show={this.props.showModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>Bulk Upload Tutorial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BulkUploadTutorialSlider closeModal={this.props.closeModal} />
        </Modal.Body>
      </Modal>
    );
  }
}

export default BulkUploadTutorialModal;
