/**
*
* AddNewCardButton
*
*/

import React, { PropTypes } from 'react';
import AddCreditCardModal from 'components/AddCreditCardModal';


class AddNewCardButton extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    addCreditCard: PropTypes.func,
    customerId: PropTypes.any,
  }
  
  constructor(props) {
    super(props);
    this.showCreditCardModal = this.showCreditCardModal.bind(this);
    this.closeAddCredtCardModal = this.closeAddCredtCardModal.bind(this);

    this.state = {
      showAddCreditCardModalModal: false,
    };
  }

  showCreditCardModal() {
    this.setState({ showAddCreditCardModalModal: true });
  }

  closeAddCredtCardModal() {
    this.setState({ showAddCreditCardModalModal: false });
  }

  render() {
    return (
      <div>
        <div className="btn-block text-right">
          <a href="#add-new-card-info" onClick={this.showCreditCardModal} className="btn btn-primary lightbox-opener">+   ADD  NEW CARD</a>
        </div>
        <AddCreditCardModal addCreditCard={this.props.addCreditCard} customerId={this.props.customerId} showModal={this.state.showAddCreditCardModalModal} closeModal={this.closeAddCredtCardModal} />
      </div>
    );
  }
}

export default AddNewCardButton;
