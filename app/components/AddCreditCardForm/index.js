/**
*
* AddCreditCardForm
*
*/

import React from 'react';
import { Modal } from 'react-bootstrap';


class AddCreditCardForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    showModal: React.PropTypes.bool,
  };

  render() {
    return (
      <div>
        <Modal className="profile-page-modal" show={this.props.showModal} onHide={this.closeResetPasswordModal}>
          <Modal.Header>
            <Modal.Title>CHANGE PASSWORD</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeResetPasswordModal}>
              <i className="icon-icon_close"></i>
            </a>
          </Modal.Header>
          <Modal.Body>
            123
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AddCreditCardForm;
