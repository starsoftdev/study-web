/**
*
* AddCreditCardModal
*
*/

import React from 'react';
import { Modal } from 'react-bootstrap';
import AddNewCardForm from '../../components/AddNewCardForm';
import CenteredModal from '../../components/CenteredModal/index';

class AddCreditCardModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    showModal: React.PropTypes.bool,
    closeModal: React.PropTypes.func,
    addCreditCard: React.PropTypes.func,
  };

  render() {
    return (
      <div>
        <Modal dialogComponentClass={CenteredModal} show={this.props.showModal} onHide={this.props.closeModal}>
          <Modal.Header>
            <Modal.Title>ADD NEW CARD</Modal.Title>
            <a className="lightbox-close close" onClick={this.props.closeModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <AddNewCardForm onSubmit={this.props.addCreditCard} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AddCreditCardModal;
