/**
*
* AddCreditsModal
*
*/

import React, { PropTypes, Component } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, touch, reset, change } from 'redux-form';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';

import ReactSelect from '../../components/Input/ReactSelect';
import CenteredModal from '../../components/CenteredModal/index';
import ShoppingCartForm from '../../components/ShoppingCartForm';
import AddCreditCardModal from '../../components/AddCreditCardModal';
import EditSiteForm from '../../components/EditSiteForm/index';
import {
  addCredits,
  fetchClientSites,
  getCreditsPrice,
  saveCard,
  saveSite,
} from '../../containers/App/actions';
import {
  selectSiteLocations,
  selectCurrentUser,
  selectAddCredits,
  selectCreditsPrice,
  selectCurrentUserStripeCustomerId,
  selectSavedCard,
  selectCurrentUserClientId,
  selectSavedSite,
} from '../../containers/App/selectors';
import { selectShoppingCartFormError, selectShoppingCartFormValues } from '../../components/ShoppingCartForm/selectors';
import { shoppingCartFields } from '../../components/ShoppingCartForm/validator';
import { selectAddCreditsFormValues, selectAddCreditsFormError } from './selectors';
import validator, { addCreditsFields } from './validator';
import { translate } from '../../../common/utilities/localization';

@reduxForm({
  form: 'addCredits',
  validate: validator,
})
@connect(mapStateToProps)

class AddCreditsModal extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    showModal: PropTypes.bool,
    change: PropTypes.func.isRequired,
    siteLocations: PropTypes.array,
    fetchClientSites: PropTypes.func,
    closeModal: PropTypes.func,
    openModal: PropTypes.func,
    addCredits: PropTypes.func,
    savedCard: PropTypes.object,
    currentUser: PropTypes.object,
    addCreditsOperation: PropTypes.object,
    getCreditsPrice: PropTypes.func.isRequired,
    creditsPrice: PropTypes.object,
    shoppingCartFormError: PropTypes.bool,
    shoppingCartFormValues: PropTypes.object,
    addCreditsFormValues: PropTypes.object,
    addCreditsFormError: PropTypes.bool,
    touchShoppingCart: PropTypes.func,
    resetForm: PropTypes.func,
    touchAddCredits: PropTypes.func,
    saveCard: PropTypes.func,
    currentUserStripeCustomerId: PropTypes.string,
    saveSite: PropTypes.func,
    currentUserClientId: PropTypes.number,
    savedSite: PropTypes.object,
    validateChange: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.incQuantity = this.incQuantity.bind(this);
    this.decQuantity = this.decQuantity.bind(this);
    this.incEmailQuantity = this.incEmailQuantity.bind(this);
    this.decEmailQuantity = this.decEmailQuantity.bind(this);
    this.addCreditsSubmit = this.addCreditsSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleNewModalOpen = this.handleNewModalOpen.bind(this);
    this.closeAddCardModal = this.closeAddCardModal.bind(this);
    this.onSaveCard = this.onSaveCard.bind(this);
    this.handleSiteLocationChoose = this.handleSiteLocationChoose.bind(this);
    this.closeAddSiteModal = this.closeAddSiteModal.bind(this);
    this.addSite = this.addSite.bind(this);

    this.state = {
      quantity: 1,
      emailQuantity: 1,
      credits: 0,
      emailCredits: 0,
      total: 0,
      emailTotal: 0,
      price: 0,
      addCardModalOpenC: false,
      showSiteLocationModal: false,
    };
  }

  componentDidMount() {
    const { currentUser, fetchClientSites, getCreditsPrice } = this.props;
    if (currentUser && currentUser.roleForClient.isAdmin) {
      fetchClientSites(currentUser.roleForClient.client_id);
    }
    getCreditsPrice();
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.addCreditsOperation.adding && this.props.addCreditsOperation.adding) {
      this.closeModal();
    }
    if (newProps.creditsPrice.price && !this.props.creditsPrice.price) {
      this.setState({
        quantity: 1,
        emailQuantity: 1,
        credits: newProps.creditsPrice.attributes.amount,
        emailCredits: newProps.creditsPrice.attributes.amount,
        price: newProps.creditsPrice.price,
      });
    }

    if (!newProps.savedCard.saving && this.props.savedCard.saving && this.state.addCardModalOpenC) {
      this.closeAddCardModal();
    }

    if (!newProps.savedSite.saving && this.props.savedSite.saving && this.state.showSiteLocationModal) {
      this.closeAddSiteModal();
      change('siteLocation', null);
    }
  }

  onSaveCard(params) {
    const { currentUser } = this.props;
    this.props.saveCard(currentUser.roleForClient.client_id, this.props.currentUserStripeCustomerId, params);
  }

  closeAddCardModal() {
    this.setState({
      addCardModalOpenC: false,
    });
    this.props.openModal();
  }

  handleNewModalOpen() {
    this.setState({
      addCardModalOpenC: true,
    });
    this.props.closeModal();
  }

  resetState() {
    this.props.validateChange();
    const resetState = {
      quantity: 1,
      credits: 100,
      emailCredits: 100,
      total: 0,
      emailTotal: 0,
      price: 7700,
    };

    this.setState(resetState, () => {
      this.props.resetForm();
    });
  }

  closeModal() {
    this.props.closeModal();
    if (!this.state.addCardModalOpenC) {
      this.resetState();
    }
  }

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
    if (this.state.quantity > 0) {
      this.setState({
        quantity: this.state.quantity - 1,
        credits: (this.state.quantity - 1) * this.props.creditsPrice.attributes.amount,
        total: (this.state.quantity - 1) * this.props.creditsPrice.price,
      });
    }
  }

  incEmailQuantity() {
    if (this.state.emailQuantity < 999) {
      this.setState({
        emailQuantity: this.state.emailQuantity + 1,
        emailCredits: (this.state.emailQuantity + 1) * this.props.creditsPrice.attributes.amount,
        emailTotal: (this.state.emailQuantity + 1) * this.props.creditsPrice.price,
      });
    }
  }

  decEmailQuantity() {
    if (this.state.emailQuantity > 0) {
      this.setState({
        emailQuantity: this.state.emailQuantity - 1,
        emailCredits: (this.state.emailQuantity - 1) * this.props.creditsPrice.attributes.amount,
        emailTotal: (this.state.emailQuantity - 1) * this.props.creditsPrice.price,
      });
    }
  }

  handleSiteLocationChoose(e) {
    const { change } = this.props;
    if (e === 'add-new-location') {
      this.setState({ showSiteLocationModal: true });
      this.props.closeModal();
    } else {
      change('siteLocation', e);
    }
  }

  closeAddSiteModal() {
    this.setState({ showSiteLocationModal: false });
    this.props.openModal();
  }

  addSite(siteData) {
    const { currentUserClientId, saveSite } = this.props;
    saveSite(currentUserClientId, null, {
      ...siteData,
      timezone: siteData.timezoneUnparsed,
    });
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
      emailQuantity: this.state.emailQuantity,
      totalAmount: parseInt(shoppingCartFormValues.total),
      cardId: shoppingCartFormValues.creditCard,
      couponId: shoppingCartFormValues.couponId,
      userId: this.props.currentUser.id,
      site: addCreditsFormValues.siteLocation,
      siteLocationName: siteLocationName.name,
    };

    if (this.state.quantity > 0 || this.state.emailQuantity > 0) {
      addCredits(currentUser.roleForClient.client_id, currentUser.roleForClient.client.stripeCustomerId, data);
    } else {
      toastr.error(translate('portals.component.addCreditsModal.toastrErrorTitle'), translate('portals.component.addCreditsModal.noProductsSelectedToastrError'));
    }
  }


  render() {
    const { siteLocations } = this.props;
    if (!_.find(siteLocations, (o) => o.id === 'add-new-location')) {
      siteLocations.push({ id: 'add-new-location', name: translate('portals.component.addCreditsModal.addSiteLocation') });
    }
    const products = [];

    if (this.state.quantity > 0) {
      products.push({
        title: `100 ${translate('portals.component.addCreditsModal.textCredits')}`,
        quantity: this.state.quantity,
        price: this.state.price,
        total: this.state.quantity * (this.props.creditsPrice.price || 0),
      });
    }

    if (this.state.emailQuantity > 0) {
      products.push({
        title: `500 ${translate('portals.component.addCreditsModal.emailCredits')}`,
        quantity: this.state.emailQuantity,
        price: this.state.price,
        total: this.state.emailQuantity * (this.props.creditsPrice.price || 0),
      });
    }

    const textCreditsPrice = this.props.creditsPrice.price ? ((this.state.quantity * (this.props.creditsPrice.price || 0)) / 100) : null;

    const emailCreditsPrice = this.props.creditsPrice.price ? ((this.state.emailQuantity * (this.props.creditsPrice.price || 0)) / 100) : null;

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
            <Modal.Title>{translate('portals.component.addCreditsModal.title')}</Modal.Title>
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
                          <strong className="label required"><label>{translate('portals.component.addCreditsModal.siteLocationLabel')}</label></strong>
                          <Field
                            name="siteLocation"
                            component={ReactSelect}
                            placeholder={translate('portals.component.addCreditsModal.siteLocationPlaceholder')}
                            options={siteLocations}
                            className="field"
                            onChange={this.handleSiteLocationChoose}
                          />
                        </div>

                        <div className="field-row overflow">
                          <span className="message">
                            {translate('portals.component.addCreditsModal.siteLocationDisclaimer')}
                          </span>
                        </div>

                        <div className="field-row">
                          <strong className="label required"><label htmlFor="quantity">{translate('portals.component.addCreditsModal.textCreditsLabel')}</label></strong>
                          <div className="field">
                            <span className="jcf-number parent-active">
                              <input
                                type="text"
                                value={`${this.state.quantity * 100} ${translate('portals.component.addCreditsModal.textCreditsValue')} ${textCreditsPrice ? `$(${textCreditsPrice})` : ''}`}
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
                          <strong className="label required"><label htmlFor="emailQuantity">{translate('portals.component.addCreditsModal.emailCreditsLabel')}</label></strong>
                          <div className="field">
                            <span className="jcf-number parent-active">
                              <input
                                type="text"
                                value={`${this.state.emailQuantity * 500} ${translate('portals.component.addCreditsModal.emailCreditsValue')} ${emailCreditsPrice ? `$(${emailCreditsPrice})` : ''}`}
                                id="emailQuantity"
                                className="form-control jcf-real-element field-active"
                                name="emailQuantity"
                                readOnly
                              />
                              <span className="jcf-btn-inc" onClick={this.incEmailQuantity} />
                              <span className="jcf-btn-dec" onClick={this.decEmailQuantity} />
                            </span>
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>

                <div className="pull-left col">
                  <ShoppingCartForm
                    showCards
                    noBorder
                    validateAndSubmit={this.addCreditsSubmit}
                    addOns={products}
                    showAddNewCard={this.handleNewModalOpen}
                    manualDisableSubmit={this.props.addCreditsOperation.adding || !this.props.creditsPrice.price}
                  />
                </div>
              </div>

            </div>
          </Modal.Body>
        </Modal>
        <AddCreditCardModal addCreditCard={this.onSaveCard} showModal={this.state.addCardModalOpenC} closeModal={this.closeAddCardModal} />

        <Modal dialogComponentClass={CenteredModal} show={this.state.showSiteLocationModal} onHide={this.closeAddSiteModal}>
          <Modal.Header>
            <Modal.Title>{translate('portals.component.addCreditsModal.addSiteLocationTitle')}</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddSiteModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <EditSiteForm onSubmit={this.addSite} />
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
  currentUserClientId: selectCurrentUserClientId(),
  savedSite: selectSavedSite(),
  savedCard: selectSavedCard(),
});

function mapDispatchToProps(dispatch) {
  return {
    addCredits: (clientId, customerId, data) => dispatch(addCredits(clientId, customerId, data)),
    fetchClientSites: (id) => dispatch(fetchClientSites(id)),
    getCreditsPrice: () => dispatch(getCreditsPrice()),
    touchAddCredits: () => dispatch(touch('addCredits', ...addCreditsFields)),
    touchShoppingCart: () => dispatch(touch('shoppingCart', ...shoppingCartFields)),
    resetForm: () => dispatch(reset('addCredits')),
    saveCard: (clientId, customerId, cardData) => dispatch(saveCard(clientId, customerId, cardData)),
    saveSite: (clientId, id, data) => dispatch(saveSite(clientId, id, data)),
    validateChange: () => dispatch(change('addCredits', 'siteLocation', '200')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCreditsModal);
