/**
*
* AddCreditCardModal
*
*/

import React from 'react';
import { Modal } from 'react-bootstrap';
import AddCreditCardForm from 'components/AddCreditCardForm';
import AddNewCardForm from 'components/AddNewCardForm';

class AddCreditCardModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    showModal: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
    addCreditCard: React.PropTypes.func,
    customerId: React.PropTypes.any,
  };

  render() {
    const initialValues = {
      initialValues: {
        customerId: this.props.customerId,
      },
    };

    return (
      <div>
        <Modal className="custom-modal" show={this.props.showModal} onHide={this.props.closeModal}>
          <Modal.Header>
            <Modal.Title>ADD NEW CARD</Modal.Title>
            <a className="lightbox-close close" onClick={this.props.closeModal}>
              <i className="icon-icon_close"></i>
            </a>
          </Modal.Header>
          <Modal.Body>
            <AddNewCardForm {...initialValues} onSubmit={this.props.addCreditCard} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AddCreditCardModal;
