/**
*
* AddNewCardButton
*
*/

import React from 'react';
import AddCreditCardForm from 'components/AddCreditCardForm';


class AddNewCardButton extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.showCreditCardModal = this.showCreditCardModal.bind(this);

    this.state = {
      showAddCreditCardModalModal: false,
    };
  }

  showCreditCardModal() {
    this.setState({ showAddCreditCardModalModal: !this.state.showAddCreditCardModalModal });
  }

  render() {
    return (
      <div>
        <div className="btn-block text-right">
          <a href="#add-new-card-info" onClick={this.showCreditCardModal} className="btn btn-primary lightbox-opener">+   ADD  NEW CARD</a>
        </div>
        <AddCreditCardForm showModal={this.state.showAddCreditCardModalModal} />
      </div>
    );
  }
}

export default AddNewCardButton;
