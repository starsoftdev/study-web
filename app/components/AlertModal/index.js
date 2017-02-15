/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../components/CenteredModal';

class AlertModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
  };

  render() {
    const { show, name, onHide } = this.props;
    return (
      <Modal
        show={show}
        id="patient-database-alert"
        dialogComponentClass={CenteredModal}
        onHide={onHide}
        backdrop
        keyboard
      >

        <Modal.Body>
          <div className="text-center">
            <p>
              Please select {name}(s).
            </p>
            <div className="btn-block">
              <a className="btn btn-default lightbox-close" onClick={onHide}>OK</a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AlertModal;
