/**
 *
 * Shopping Cart Form
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { sumBy, map } from 'lodash';
import { Field, reduxForm, change, reset } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import classNames from 'classnames';

import CenteredModal from '../../components/CenteredModal/index';
import Input from '../../components/Input';
import ReactSelect from '../../components/Input/ReactSelect';
import AddNewCardForm from '../../components/AddNewCardForm';
import { selectCouponId, selectTotal } from './selectors';
import { selectCoupon, selectCards, selectCurrentUserStripeCustomerId, selectSavedCard, selectCurrentUserClientId, selectCurrentUser } from '../../containers/App/selectors';
import formValidator from './validator';
import LoadingSpinner from '../../components/LoadingSpinner';
import Money from '../../components/Money';
import { fetchCoupon, clearCoupon, fetchCards, saveCard } from '../../containers/App/actions';
import { translate } from '../../../common/utilities/localization';

const formName = 'shoppingCart';

const mapStateToProps = createStructuredSelector({
  clientId: selectCurrentUserClientId(),
  couponId: selectCouponId(),
  total: selectTotal(),
  coupon: selectCoupon(),
  cards: selectCards(),
  currentUserStripeCustomerId: selectCurrentUserStripeCustomerId(),
  savedCard: selectSavedCard(),
  currentUser: selectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    change: (field, value) => dispatch(change(formName, field, value)),
    fetchCoupon: (id) => dispatch(fetchCoupon(id)),
    clearCoupon: () => dispatch(clearCoupon()),
    fetchCards: (clientId, customerId) => dispatch(fetchCards(clientId, customerId)),
    saveCard: (clientId, customerId, cardData) => dispatch(saveCard(clientId, customerId, cardData)),
    resetForm: () => dispatch(reset(formName)),
  };
}

@reduxForm({ form: formName, validate: formValidator })
@connect(mapStateToProps, mapDispatchToProps)

class ShoppingCartForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    clientId: PropTypes.number.isRequired,
    currentUserStripeCustomerId: PropTypes.string,
    title: PropTypes.string,
    noBorder: PropTypes.bool,
    addOns: PropTypes.array.isRequired,
    couponId: PropTypes.string,
    total: PropTypes.string,
    coupon: PropTypes.object,
    showCards: PropTypes.bool,
    cards: PropTypes.object,
    savedCard: PropTypes.object,
    submitting: PropTypes.bool,
    fetchCoupon: PropTypes.func,
    clearCoupon: PropTypes.func,
    fetchCards: PropTypes.func,
    saveCard: PropTypes.func,
    validateAndSubmit: PropTypes.func,
    resetForm: PropTypes.func.isRequired,
    manualDisableSubmit: PropTypes.bool,
    showAddNewCard: PropTypes.func,
    currentUser: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onFetchCoupon = this.onFetchCoupon.bind(this);
    this.onSaveCard = this.onSaveCard.bind(this);
    this.openAddNewCardModal = this.openAddNewCardModal.bind(this);
    this.closeAddNewCardModal = this.closeAddNewCardModal.bind(this);
    this.onSelectCard = this.onSelectCard.bind(this);
    this.state = {
      addNewCardModalOpen: false,
      showLoading: props.submitting,
    };
  }

  componentWillMount() {
    if (this.props.showCards) {
      this.props.fetchCards(this.props.clientId, this.props.currentUserStripeCustomerId);
    }
  }

  componentWillReceiveProps(newProps) {
    this.changeHiddenTotal();

    if (!this.props.showCards) {
      return;
    }

    if (!newProps.savedCard.saving && this.props.savedCard.saving) {
      this.closeAddNewCardModal();
    }
    this.setState({ showLoading : newProps.submitting });
  }

  componentWillUnmount() {
    this.props.clearCoupon();
  }

  onSaveCard(params) {
    this.props.saveCard(this.props.clientId, this.props.currentUserStripeCustomerId, params);
  }

  onFetchCoupon() {
    const { fetchCoupon, clearCoupon, coupon, couponId } = this.props;
    if (!coupon.details) {
      if (couponId) {
        fetchCoupon(couponId);
      }
    } else {
      clearCoupon();
      change('couponId', '');
    }
  }

  onSelectCard(value) {
    if (value === -1) {
      if (!this.props.showAddNewCard) {
        this.openAddNewCardModal();
      } else {
        this.props.showAddNewCard();
      }
    }
  }

  changeHiddenTotal() {
    const total = this.calculateTotal().total;
    this.props.change('total', total.toString());
  }

  calculateTotal() {
    const { coupon, addOns } = this.props;
    const subTotal = sumBy(addOns, 'total');
    let discount = 0;
    if (coupon.details) {
      if (coupon.details.amountOff) {
        discount = coupon.details.amountOff;
      } else if (coupon.details.percentOff) {
        discount = subTotal * (coupon.details.percentOff / 100);
      }
    }
    const total = parseFloat((subTotal - discount).toFixed(2));

    return { subTotal, discount, total };
  }

  openAddNewCardModal() {
    this.setState({ addNewCardModalOpen: true });
  }

  closeAddNewCardModal() {
    this.setState({ addNewCardModalOpen: false });
    this.props.change('creditCard', '');
  }

  render() {
    const title = this.props.title || translate('portals.component.shoppingCartForm.defaultTitle');
    const noBorderClassName = (this.props.noBorder) ? 'no-border' : '';
    const formClassName = `form-shopping-cart ${noBorderClassName}`;
    const { addOns, coupon, couponId, change, showCards, cards, submitting, validateAndSubmit, manualDisableSubmit, clearCoupon } = this.props;
    const { subTotal, discount, total } = this.calculateTotal();
    let addOnsContent = null;
    let couponSelected = false;

    if (coupon && coupon.details) {
      couponSelected = true;
    }

    if (addOns) {
      addOnsContent = addOns.map((product, index) => (
        <tr className="add-on" key={index}>
          <td>{product.title}</td>
          <td className="right"><Money value={product.price / 100} /></td>
          <td className="right">{product.quantity}</td>
          <td className="right"><Money value={product.total / 100} className="price" /></td>
        </tr>
      ));
    }
    let creditCardOptions = [];
    if (cards.details) {
      creditCardOptions = map(cards.details.data, cardIterator => ({
        label: `xxxx xxxx xxxx ${cardIterator.last4}`,
        value: cardIterator.id,
      }));
    }
    creditCardOptions = [{
      label: translate('portals.component.shoppingCartForm.addNewCardLabel'),
      value: -1,
    }].concat(creditCardOptions);

    if (this.props.currentUser && this.props.currentUser.roleForClient && this.props.currentUser.roleForClient.client && this.props.currentUser.roleForClient.client.isPayByCheckEnabled === true) {
      creditCardOptions.push({
        label: translate('portals.component.shoppingCartForm.payByCheckLabel'),
        value: 'payByCheck',
      });
    }

    let cardsPanelContent = null;
    if (showCards) {
      cardsPanelContent = (
        <div className="card-selection">
          <div className="row">
            <div className="col-sm-12">
              <Field
                name="creditCard"
                component={ReactSelect}
                placeholder={translate('portals.component.shoppingCartForm.selectCardLabel')}
                options={creditCardOptions}
                disabled={cards.fetching || submitting}
                onChange={this.onSelectCard}
              />
              <Modal
                className="modal-add-new-card"
                show={this.state.addNewCardModalOpen}
                onHide={this.closeAddNewCardModal}
                dialogComponentClass={CenteredModal}
                backdrop
                keyboard
              >
                <Modal.Header>
                  <Modal.Title>{translate('portals.component.shoppingCartForm.addNewCard')}</Modal.Title>
                  <a className="lightbox-close close" onClick={this.closeAddNewCardModal}>
                    <i className="icomoon-icon_close" />
                  </a>
                </Modal.Header>
                <Modal.Body>
                  <AddNewCardForm onSubmit={this.onSaveCard} />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      );
    }

    return (
      <form className={formClassName}>
        <div className="shopping-cart order-summary order-summery scroll jcf--scrollabel">
          <div className="head">
            <h3>{title}</h3>
          </div>
          <div className="scroll-holder">
            <div className="table-holder">
              <table className="table-summary">
                <colgroup>
                  <col style={{ width: '44.2%' }} />
                  <col style={{ width: '22.6%' }} />
                  <col style={{ width: '13.6%' }} />
                  <col style={{ width: 'auto' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>{translate('portals.component.shoppingCartForm.product')} <i className="caret-arrow" /></th>
                    <th className="right">{translate('portals.component.shoppingCartForm.price')} <i className="caret-arrow" /></th>
                    <th className="right">{translate('portals.component.shoppingCartForm.qty')} <i className="caret-arrow" /></th>
                    <th className="right">{translate('portals.component.shoppingCartForm.total')} <i className="caret-arrow" /></th>
                  </tr>
                </thead>
                <tbody>
                  {addOnsContent}
                </tbody>
              </table>
            </div>

            <div className="coupon-area">
              {couponSelected
                ?
                <input
                  className="form-control"
                  value={couponId}
                  type="text"
                  name="couponId"
                  disabled
                />
                :
                <Field
                  name="couponId"
                  component={Input}
                  type="text"
                  placeholder={translate('portals.component.shoppingCartForm.couponPlaceholder')}
                  className={classNames({ couponSelected })}
                  onBlur={this.onFetchCoupon}
                />
              }
              <Button
                bsStyle="primary"
                className={classNames('coupon-btn')}
                onClick={this.onFetchCoupon}
                disabled={coupon.fetching || submitting}
              >
                {couponSelected
                  ? <span>{translate('portals.component.shoppingCartForm.removeCoupon')}</span>
                  : <span>{translate('portals.component.shoppingCartForm.applyCoupon')}</span>
                }
              </Button>
            </div>

            <div className="total clearfix">
              <span className="heading">{translate('portals.component.shoppingCartForm.subtotalLabel')}</span>
              <Money value={subTotal / 100} className="price subtotal-price" />
            </div>

            <div className="total discount clearfix">
              <span className="heading">{translate('portals.component.shoppingCartForm.discountLabel')}</span>
              {coupon.fetching
                ? <span className="price">
                  <LoadingSpinner showOnlyIcon size={20} className="price" />
                </span>
                : <Money value={discount / 100} discount className="price discount-amount" />
              }
            </div>

            <div className="total grand-total clearfix">
              <strong className="heading">{translate('portals.component.shoppingCartForm.totalLabel')}</strong>
              <Money value={total / 100} className="price total-price" />
            </div>

            <div className="total hidden-value">
              <Field
                name="total"
                component={Input}
                type="hidden"
              />
            </div>
            {cardsPanelContent}
            <Button
              disabled={coupon.fetching || cards.fetching || submitting || manualDisableSubmit}
              onClick={(ev) => {
                this.setState({ showLoading: true });
                clearCoupon();
                change('couponId', '');
                validateAndSubmit(ev);
              }}
            >
              <span>{translate('portals.component.shoppingCartForm.submitBtn')}</span>
              {(manualDisableSubmit) &&
                <span className="pull-right"><LoadingSpinner showOnlyIcon size={20} /></span>
              }
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

export default ShoppingCartForm;
