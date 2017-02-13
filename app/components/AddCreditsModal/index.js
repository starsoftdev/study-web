/**
*
* AddCreditsModal
*
*/

import React, { PropTypes, Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ReactSelect from '../../components/Input/ReactSelect';
import { Field, reduxForm, touch, reset, change } from 'redux-form';

import CenteredModal from '../../components/CenteredModal/index';
import ShoppingCartForm from 'components/ShoppingCartForm';
import AddNewCardForm from '../../components/AddNewCardForm';
import { addCredits, fetchSites, getCreditsPrice, saveCard } from 'containers/App/actions';
import { selectSiteLocations, selectCurrentUser, selectAddCredits, selectCreditsPrice, selectCurrentUserStripeCustomerId } from 'containers/App/selectors';
import { selectShoppingCartFormError, selectShoppingCartFormValues } from 'components/ShoppingCartForm/selectors';
import { selectAddCreditsFormValues, selectAddCreditsFormError } from './selectors';
import { shoppingCartFields } from 'components/ShoppingCartForm/validator';
import validator, { addCreditsFields } from './validator';

import _ from 'lodash';

@reduxForm({
  form: 'addCredits',
  validate: validator,
})
@connect(mapStateToProps)

class AddCreditsModal extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    showModal: PropTypes.bool,
    siteLocations: PropTypes.array,
    fetchSites: PropTypes.func,
    closeModal: PropTypes.func,
    openModal: PropTypes.func,
    addCredits: PropTypes.func,
    currentUser: PropTypes.object,
    addCreditsOperation: PropTypes.object,
    getCreditsPrice: PropTypes.func,
    creditsPrice: PropTypes.object,
    shoppingCartFormError: PropTypes.object,
    shoppingCartFormValues: PropTypes.object,
    addCreditsFormValues: PropTypes.object,
    addCreditsFormError: PropTypes.bool,
    touchShoppingCart: PropTypes.func,
    resetForm: PropTypes.func,
    touchAddCredits: PropTypes.func,
    saveCard: PropTypes.func,
    currentUserStripeCustomerId: PropTypes.string,
    validateChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.incQuantity = this.incQuantity.bind(this);
    this.decQuantity = this.decQuantity.bind(this);
    this.addCreditsSubmit = this.addCreditsSubmit.bind(this);
    this.handleSiteLocationChoose = this.handleSiteLocationChoose.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleNewModalOpen = this.handleNewModalOpen.bind(this);
    this.openAddCardModal = this.openAddCardModal.bind(this);
    this.closeAddCardModal = this.closeAddCardModal.bind(this);
    this.onSaveCard = this.onSaveCard.bind(this);

    this.state = {
      quantity: 1,
      credits: 0,
      total: 0,
      price: 0,
      addCardModalOpen: false,
    };
  }

  componentDidMount() {
    this.props.fetchSites();
    this.props.getCreditsPrice();
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.addCreditsOperation.adding && this.props.addCreditsOperation.adding) {
      this.closeModal();
    }
    if (newProps.creditsPrice.price && !this.props.creditsPrice.price) {
      this.setState({
        quantity: 1,
        credits: newProps.creditsPrice.attributes.amount,
        price: newProps.creditsPrice.price,
      });
    }
  }

  onSaveCard(params) {
    this.props.saveCard(this.props.currentUserStripeCustomerId, params);
  }

  openAddCardModal() {
    this.setState({
      addCardModalOpen: true,
    });
  }

  closeAddCardModal() {
    this.setState({
      addCardModalOpen: false,
    });
    this.props.openModal();
  }

  handleNewModalOpen() {
    this.setState({
      addCardModalOpen: true,
    });
    this.props.closeModal();
  }

  resetState() {
    this.props.validateChange();
    const resetState = {
      quantity: 1,
      credits: 100,
      total: 0,
      price: 7700,
    };

    this.setState(resetState, () => {
      this.props.resetForm();
    });
  }

  closeModal() {
    this.props.closeModal();
    if (!this.state.addCardModalOpen) {
      this.resetState();
    }
  }

  handleSiteLocationChoose() {}

  incQuantity() {
    if (this.state.quantity < 999) {
      this.setState({
        quantity: this.state.quantity + 1,
        credits: (this.state.quantity + 1) * this.props.creditsPrice.attributes.amount,
        total: (this.state.quantity + 1) * this.props.creditsPrice.price,
      });
    }
  }

  decQuantity() {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1,
        credits: (this.state.quantity - 1) * this.props.creditsPrice.attributes.amount,
        total: (this.state.quantity - 1) * this.props.creditsPrice.price,
      });
    }
  }

  addCreditsSubmit(ev) {
    ev.preventDefault();
    const {
      addCreditsFormValues,
      addCreditsFormError,
      shoppingCartFormValues,
      shoppingCartFormError,
      addCredits,
      currentUser,
      touchShoppingCart,
      touchAddCredits,
    } = this.props;

    if (addCreditsFormError || shoppingCartFormError) {
      touchAddCredits();
      touchShoppingCart();
      return;
    }

    const siteLocationName = _.find(this.props.siteLocations, { id: addCreditsFormValues.siteLocation });
    const data = {
      quantity: this.state.quantity,
      totalAmount: this.state.quantity * this.props.creditsPrice.price,
      cardId: shoppingCartFormValues.creditCard,
      userId: this.props.currentUser.id,
      site: addCreditsFormValues.siteLocation,
      siteLocationName: siteLocationName.name,
    };

    addCredits(currentUser.roleForClient.client.stripeCustomerId, data);
  }


  render() {
    const { siteLocations } = this.props;
    const products = [
      {
        title: '100 Credits',
        quantity: this.state.quantity,
        price: this.state.price,
        total: this.state.quantity * this.props.creditsPrice.price,
      },
    ];
    return (
      <div>
        <Modal
          className="add-credits"
          id="add-credits"
          dialogComponentClass={CenteredModal}
          show={this.props.showModal}
          onHide={this.closeModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>Add Credits</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="holder clearfix">
              <div className="form-study">
                <div className="pull-left col">
                  <div className="scroll jcf--scrollable">
                    <div className="holder-inner">
                      <div className="form-fields">

                        <div className="field-row extra-style">
                          <strong className="label required"><label>Site Location</label></strong>
                          <Field
                            name="siteLocation"
                            component={ReactSelect}
                            placeholder="Select Site Location"
                            options={siteLocations}
                            className="field"
                            onChange={this.handleSiteLocationChoose}
                          />
                        </div>

                        <div className="field-row overflow">
                          <span className="message">
                            Location selection will appear on invoice for accounting purposes.
                            Credits are added to all accounts.
                          </span>
                        </div>

                        <div className="field-row">
                          <strong className="label required"><label htmlFor="quantity">QUANTITY</label></strong>
                          <div className="field">
                            <span className="jcf-number parent-active">
                              <input
                                type="number"
                                value={this.state.quantity}
                                id="quantity"
                                className="form-control jcf-real-element field-active"
                                name="quantity"
                                readOnly
                              />
                              <span className="jcf-btn-inc" onClick={this.incQuantity} />
                              <span className="jcf-btn-dec" onClick={this.decQuantity} />
                            </span>
                          </div>
                        </div>

                        <div className="field-row">
                          <strong className="label"><label htmlFor="credits">CREDITS</label></strong>
                          <div className="field">
                            <input
                              className="form-control"
                              value={this.state.credits}
                              type="text"
                              id="credits"
                              name="credits"
                              disabled
                            />
                          </div>
                        </div>

                        <div className="field-row">
                          <strong className="label"><label htmlFor="price">PRICE</label></strong>
                          <div className="field">
                            <input
                              className="form-control"
                              value={`$${(this.state.quantity * this.props.creditsPrice.price) / 100}`}
                              type="text"
                              id="price"
                              name="price"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pull-left col">
                  <ShoppingCartForm showCards noBorder validateAndSubmit={this.addCreditsSubmit} addOns={products} showAddNewCard={this.handleNewModalOpen} />
                </div>
              </div>

            </div>
          </Modal.Body>
        </Modal>
        <Modal
          className="modal-add-new-card"
          show={this.state.addCardModalOpen}
          onHide={this.closeAddCardModal}
          dialogComponentClass={CenteredModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>Add New Card</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddCardModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <AddNewCardForm onSubmit={this.onSaveCard} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  shoppingCartFormError: selectShoppingCartFormError(),
  shoppingCartFormValues: selectShoppingCartFormValues(),
  addCreditsFormValues: selectAddCreditsFormValues(),
  addCreditsFormError: selectAddCreditsFormError(),
  siteLocations : selectSiteLocations(),
  currentUser: selectCurrentUser(),
  addCreditsOperation: selectAddCredits(),
  creditsPrice: selectCreditsPrice(),
  currentUserStripeCustomerId: selectCurrentUserStripeCustomerId(),
});

function mapDispatchToProps(dispatch) {
  return {
    addCredits: (customerId, data) => dispatch(addCredits(customerId, data)),
    fetchSites:       () => dispatch(fetchSites()),
    getCreditsPrice: () => dispatch(getCreditsPrice()),
    touchAddCredits: () => dispatch(touch('addCredits', ...addCreditsFields)),
    touchShoppingCart: () => dispatch(touch('shoppingCart', ...shoppingCartFields)),
    resetForm: () => dispatch(reset('addCredits')),
    saveCard: (customerId, cardData) => dispatch(saveCard(customerId, cardData)),
    validateChange: () => dispatch(change('addCredits', 'siteLocation', '200')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCreditsModal);
