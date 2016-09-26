/*
 *
 * PaymentInformationPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from 'containers/App/selectors';
import { selectCreditCards } from 'containers/PaymentInformationPage/selectors';
import PaymentMethodsForm from 'components/PaymentMethodsForm';
import AddNewCardButton from 'components/AddNewCardButton';
import { fetchCreditCards, deleteCreditCard } from 'containers/PaymentInformationPage/actions';

export class PaymentInformationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchCreditCards: PropTypes.func,
    creditCards: PropTypes.array,
    deleteCreditCard: PropTypes.func,
    currentUser: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.deleteCreditCard = this.props.deleteCreditCard.bind(this);
  }

  componentWillReceiveProps(props) {
    if (!this.props.currentUser && props.currentUser && props.currentUser.roleForClient) {
      this.props.fetchCreditCards(props.currentUser.roleForClient.client_id);
    }
  }
  render() {
    let customerId = false;
    if (this.props.currentUser && this.props.currentUser.roleForClient) {
      customerId = this.props.currentUser.roleForClient.client_id;
    }
    return (
      <div className="container-fluid">
        <section className="payment-information">
          <h2 className="main-heading">PAYMENT INFORMATION</h2>
          <AddNewCardButton />
          <PaymentMethodsForm
            creditCards={this.props.creditCards || []}
            deleteCreditCard={this.deleteCreditCard}
            customerId={customerId}
          />
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  creditCards: selectCreditCards(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCreditCards: (payload) => dispatch(fetchCreditCards(payload)),
    deleteCreditCard: (payload) => dispatch(deleteCreditCard(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInformationPage);

