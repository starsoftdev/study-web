/*
 *
 * PaymentInformationPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { toastr } from 'react-redux-toastr';

import { selectCurrentUser, selectCards, selectSavedCard } from '../../containers/App/selectors';
import PaymentMethodsForm from '../../components/PaymentMethodsForm';
import AddCreditCardModal from '../../components/AddCreditCardModal';
import { fetchCards, deleteCard, saveCard } from '../../containers/App/actions';
import { selectPaginationOptions } from '../../containers/PaymentInformationPage/selectors';
import { setActiveSort } from '../../containers/PaymentInformationPage/actions';
import { translate } from '../../../common/utilities/localization';

export class PaymentInformationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    clientId: PropTypes.number,
    creditCards: PropTypes.object,
    deleteCard: PropTypes.func,
    currentUser: PropTypes.any,
    saveCard: PropTypes.func,
    fetchCards: PropTypes.func,
    savedCard: PropTypes.object,
    paginationOptions: PropTypes.object,
    setActiveSort: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.deleteCard = this.props.deleteCard.bind(this);
    this.saveCard = this.props.saveCard.bind(this);
    this.onSaveCard = this.onSaveCard.bind(this);

    this.showCreditCardModal = this.showCreditCardModal.bind(this);
    this.closeAddCredtCardModal = this.closeAddCredtCardModal.bind(this);

    this.state = {
      showAddCreditCardModal: false,
    };
  }

  componentWillMount() {
    const { currentUser } = this.props;
    const purchasable = currentUser.roleForClient.name === 'Super Admin' ? true : currentUser.roleForClient.canPurchase;
    if (!purchasable) {
      browserHistory.push('/app');
    }
  }

  componentDidMount() {
    if (this.props.currentUser && this.props.currentUser.roleForClient) {
      this.props.fetchCards(this.props.currentUser.roleForClient.client_id, this.props.currentUser.roleForClient.client.stripeCustomerId);
    }
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.savedCard.saving && this.props.savedCard.saving) {
      this.closeAddCredtCardModal();
    }
  }

  onSaveCard(params) {
    this.props.saveCard(this.props.currentUser.roleForClient.client_id, this.props.currentUser.roleForClient.client.stripeCustomerId, params);
  }

  closeAddCredtCardModal() {
    this.setState({ showAddCreditCardModal: false });
  }

  showCreditCardModal() {
    if (this.props.creditCards.details && this.props.creditCards.details.data && this.props.creditCards.details.data.length >= 10) {
      toastr.error('', translate('client.page.paymentInformation.manyCardsError'));
      return;
    }
    this.setState({ showAddCreditCardModal: true });
  }

  render() {
    const { currentUser } = this.props;
    let customerId = false;
    let clientId = false;
    let purchasable = false;
    if (currentUser && currentUser.roleForClient) {
      purchasable = currentUser.roleForClient.name === 'Super Admin' ? true : currentUser.roleForClient.canPurchase;
      customerId = currentUser.roleForClient.client.stripeCustomerId;
      clientId = currentUser.roleForClient.client.id;
    }
    let creditCards = [];
    if (this.props.creditCards.details && this.props.creditCards.details.data) {
      creditCards = this.props.creditCards.details.data;
    }
    if (purchasable) {
      return (
        <div className="container-fluid">
          <Helmet title="Payment Information - StudyKIK" />
          <section className="payment-information">
            <h2 className="main-heading">{translate('client.page.paymentInformation.header')}</h2>

            <div>
              <div className="btn-block text-right">
                <a className="btn btn-primary lightbox-opener" onClick={this.showCreditCardModal}>{translate('client.page.paymentInformation.newCard')}</a>
              </div>
              <AddCreditCardModal addCreditCard={this.onSaveCard} showModal={this.state.showAddCreditCardModal} closeModal={this.closeAddCredtCardModal} />
            </div>

            <PaymentMethodsForm
              creditCards={creditCards}
              deleteCreditCard={this.deleteCard}
              clientId={clientId}
              customerId={customerId}
              paginationOptions={this.props.paginationOptions}
              setActiveSort={this.props.setActiveSort}
            />
          </section>
        </div>
      );
    }
    return <div></div>;
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  creditCards: selectCards(),
  savedCard: selectSavedCard(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCards: (clientId, customerId) => dispatch(fetchCards(clientId, customerId)),
    deleteCard: (clientId, customerId, cardId) => dispatch(deleteCard(clientId, customerId, cardId)),
    saveCard: (clientId, customerId, cardData) => dispatch(saveCard(clientId, customerId, cardData)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInformationPage);

