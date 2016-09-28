/*
 *
 * PaymentInformationPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectCards } from 'containers/App/selectors';
import PaymentMethodsForm from 'components/PaymentMethodsForm';
import AddNewCardButton from 'components/AddNewCardButton';
import { addCreditCard } from 'containers/PaymentInformationPage/actions';
import { fetchCards, deleteCard } from 'containers/App/actions';

export class PaymentInformationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    creditCards: PropTypes.object,
    deleteCard: PropTypes.func,
    currentUser: PropTypes.any,
    addCreditCard: PropTypes.func,
    fetchCards: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.deleteCard = this.props.deleteCard.bind(this);
    this.addCreditCard = this.props.addCreditCard.bind(this);
  }

  componentDidMount() {
    this.props.fetchCards(this.props.currentUser.roleForClient.client_id);
  }

  render() {
    let customerId = false;
    if (this.props.currentUser && this.props.currentUser.roleForClient) {
      customerId = this.props.currentUser.roleForClient.client_id;
    }
    let creditCards = [];
    if (this.props.creditCards.details && this.props.creditCards.details.data) {
      creditCards = this.props.creditCards.details.data;
    }
    return (
      <div className="container-fluid">
        <section className="payment-information">
          <h2 className="main-heading">PAYMENT INFORMATION</h2>
          <AddNewCardButton addCreditCard={this.addCreditCard} customerId={customerId} />
          <PaymentMethodsForm
            creditCards={creditCards}
            deleteCreditCard={this.deleteCard}
            customerId={customerId}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  creditCards: selectCards(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCards: (customerId) => dispatch(fetchCards(customerId)),
    deleteCard: (customerId, cardId) => dispatch(deleteCard(customerId, cardId)),
    addCreditCard: (payload) => dispatch(addCreditCard(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInformationPage);

