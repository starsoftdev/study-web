/*
 *
 * Fake Shopping Cart on RequestProposalPage
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _, { find, sumBy } from 'lodash';
import { touch } from 'redux-form';
import Button from 'react-bootstrap/lib/Button';

import LoadingSpinner from '../../components/LoadingSpinner';
import Money from '../../components/Money';
import {
  CAMPAIGN_LENGTH_LIST,
  QUALIFICATION_SUITE_PRICE,
  CALL_TRACKING_PRICE,
} from '../../common/constants';
import {
  selectProposalFormValues,
  selectProposalFormError,
} from '../../components/RequestProposalForm/selectors';
import {
  selectLevels,
} from '../../containers/App/selectors';
import {
  submitForm, fetchCoupon, clearCoupon,
} from '../../containers/RequestProposalPage/actions';
import {
  selectCoupon,
  selectFormSubmissionStatus,
  selectIndicationLevelPrice,
  selectRegisteredFields,
} from '../../containers/RequestProposalPage/selectors';

import { fetchIndicationLevelPrice } from '../../containers/App/actions';
import { translate } from '../../../common/utilities/localization';

export class RequestProposalCart extends Component {
  static propTypes = {
    levels: PropTypes.array,
    formValues: PropTypes.object,
    coupon: PropTypes.object,
    hasError: PropTypes.bool,
    fetchCoupon: PropTypes.func.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    formSubmissionStatus: PropTypes.object,
    fetchIndicationLevelPrice: PropTypes.func,
    indicationLevelPrice: PropTypes.number,
    touchRequestProposal: PropTypes.func,
    currentUser: PropTypes.object,
    siteLocations: PropTypes.array,
    indications: PropTypes.array,
    clearCoupon: PropTypes.func,
    newProposalFields: PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.onFetchCoupon = this.onFetchCoupon.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onCouponChange = this.onCouponChange.bind(this);

    this.state = {
      couponId: '',
      shoppingCartLoading: props.formSubmissionStatus.submitting,
    };
  }

  componentWillReceiveProps(newProps) {
    // indication change
    if (
      ((newProps.formValues.indication_id !== this.props.formValues.indication_id) ||
      (newProps.formValues.level_id !== this.props.formValues.level_id)) &&
      newProps.formValues.indication_id && newProps.formValues.level_id &&
      newProps.formValues.indication_id !== undefined && newProps.formValues.level_id !== undefined
    ) {
      this.props.fetchIndicationLevelPrice(newProps.formValues.indication_id, newProps.formValues.level_id);
    }

    if (this.props.formSubmissionStatus.submitting !== newProps.formSubmissionStatus.submitting) {
      this.setState({ shoppingCartLoading: newProps.formSubmissionStatus.submitting });
      if (!newProps.formSubmissionStatus.submitting) {
        this.props.clearCoupon();
        this.setState({ couponId: '' });
      }
    }

    if (newProps.coupon.details) {
      this.calculateTotal();
    }
  }

  componentWillUnmount() {
    this.props.clearCoupon();
  }

  onCouponChange(evt) {
    this.setState({ couponId: evt.target.value });
  }

  onSubmitForm() {
    if (this.props.hasError) {
      this.props.touchRequestProposal(this.props.newProposalFields);
      return;
    }

    const { formValues, currentUser, levels, indicationLevelPrice } = this.props;
    const selectedSite = _.find(this.props.siteLocations, (o) => (o.id === formValues.site));
    const selectedIndication = _.find(this.props.indications, (o) => (o.id === formValues.indication_id));
    const selectedLevel = _.find(this.props.levels, (o) => (o.id === formValues.level_id));
    const { coupon } = this.props;

    const level = find(levels, { id: formValues.level_id });
    let total = 0;
    let discount = 0;
    const months = find(CAMPAIGN_LENGTH_LIST, { value: formValues.campaignLength });
    if (level && months && indicationLevelPrice) {
      total = indicationLevelPrice * months.value;
    }

    if (formValues.patientQualificationSuite) {
      total += QUALIFICATION_SUITE_PRICE * months.value;
    }

    if (formValues.mediaTracking) {
      total += CALL_TRACKING_PRICE;
    }

    const newFormValues = formValues;
    if (!newFormValues.sponsorEmail) {
      newFormValues.sponsorEmail = null;
    }
    if (!newFormValues.croEmail) {
      newFormValues.croEmail = null;
    }
    if (!newFormValues.irbEmail) {
      newFormValues.irbEmail = null;
    }

    if (coupon.details) {
      if (coupon.details.amountOff) {
        discount = coupon.details.amountOff;
      } else if (coupon.details.percentOff) {
        discount = Math.round(total * (coupon.details.percentOff / 100));
      }
    }

    this.props.onSubmitForm({
      ...newFormValues,
      siteLocationName: selectedSite.name,
      indicationName: selectedIndication.name,
      protocolNumber: formValues.protocol,
      proposalNumber: 11,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      timezone: currentUser.timezone,
      site_id: formValues.site,
      exposureLevelName: selectedLevel.name,
      phone: '1111',
      organization: selectedSite.name,
      totalBeforeDiscount: total,
      coupon: this.props.coupon.details,
      total: Math.round(total - discount < 0 ? 0 : total - discount),
      discount,
    });
  }

  onFetchCoupon() {
    const { fetchCoupon, clearCoupon, coupon } = this.props;
    if (!coupon.details) {
      if (this.state.couponId) {
        fetchCoupon(this.state.couponId);
      }
    } else {
      clearCoupon();
      this.setState({ couponId: '' });
    }
  }

  listProducts() {
    const products = [];
    const { formValues, levels, indicationLevelPrice } = this.props;

    const level = find(levels, { id: formValues.level_id });
    if (level && formValues.campaignLength && indicationLevelPrice) {
      const months = find(CAMPAIGN_LENGTH_LIST, { value: formValues.campaignLength });
      const levelLabel = translate(`common.exposureLevel.id${level.id}`);
      products.push({
        title: ((formValues.condenseTwoWeeks && months.value === 1) ? `${translate('portals.component.requestProposalCart.2weeks')} ${levelLabel}` : `${months.label} ${levelLabel}`),
        price: indicationLevelPrice,
        quantity: months.value,
        total: indicationLevelPrice * months.value,
      });
      if (formValues.patientQualificationSuite) {
        products.push({
          title: translate('portals.component.requestProposalCart.pqs'),
          price: QUALIFICATION_SUITE_PRICE,
          quantity: months.value,
          total: QUALIFICATION_SUITE_PRICE * months.value,
        });
      }
    }

    if (formValues.mediaTracking) {
      products.push({
        title: translate('portals.component.requestProposalCart.mediaTracking'),
        price: CALL_TRACKING_PRICE,
        quantity: 1,
        total: CALL_TRACKING_PRICE,
      });
    }

    return products;
  }

  calculateTotal(products) {
    const { coupon } = this.props;
    const subTotal = sumBy(products, 'total') / 100;
    let discount = 0;
    if (coupon.details) {
      if (coupon.details.amountOff) {
        discount = coupon.details.amountOff / 100;
      } else if (coupon.details.percentOff) {
        discount = subTotal * (coupon.details.percentOff / 100);
      }
    }
    const total = subTotal - discount < 0 ? 0 : subTotal - discount;

    return { subTotal, discount, total };
  }

  render() {
    const { coupon } = this.props;
    const products = this.listProducts();
    const { subTotal, discount, total } = this.calculateTotal(products);
    const noBorderClassName = '';
    const formClassName = `form-shopping-cart ${noBorderClassName}`;
    const couponSelected = coupon && coupon.details;

    return (
      <div className={formClassName}>
        <div className="shopping-cart order-summary order-summery scroll jcf--scrollabel">
          <div className="head">
            <h3>{translate('portals.component.requestProposalCart.title')}</h3>
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
                    <th>{translate('portals.component.requestProposalCart.productColumn')} <i className="caret-arrow" /></th>
                    <th className="right">{translate('portals.component.requestProposalCart.priceColumn')} <i className="caret-arrow" /></th>
                    <th className="right">{translate('portals.component.requestProposalCart.qtyColumn')} <i className="caret-arrow" /></th>
                    <th className="right">{translate('portals.component.requestProposalCart.totalColumn')} <i className="caret-arrow" /></th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product, index) => (
                      <tr className="add-on" key={index}>
                        <td>{product.title}</td>
                        <td className="right">
                          <Money value={product.price / 100} />
                        </td>
                        <td className="right">{product.quantity}</td>
                        <td className="right">
                          <Money value={product.total / 100} className="price" />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

            <div className="coupon-area">
              {couponSelected ?
                <input
                  className="form-control"
                  value={this.state.couponId}
                  type="text"
                  name="couponId"
                  disabled
                />
                :
                <input
                  type="text"
                  placeholder={translate('portals.component.requestProposalCart.couponPlaceholder')}
                  className="form-control"
                  value={this.state.couponId}
                  onChange={this.onCouponChange}
                />
              }
              <button
                className="btn btn-primary coupon-btn"
                onClick={this.onFetchCoupon}
                disabled={coupon.fetching || this.state.shoppingCartLoading}
              >
                {couponSelected
                  ? <span>{translate('portals.component.requestProposalCart.removeBtn')}</span>
                  : <span>{translate('portals.component.requestProposalCart.applyBtn')}</span>
                }
              </button>
            </div>

            <div className="total clearfix">
              <span className="heading">{translate('portals.component.requestProposalCart.subtotalLabel')}</span>
              <Money value={subTotal} className="price subtotal-price" />
            </div>

            <div className="total discount clearfix">
              <span className="heading">{translate('portals.component.requestProposalCart.discountLabel')}</span>
              {coupon.fetching
                ? <span className="price">
                  <LoadingSpinner showOnlyIcon size={20} className="price" />
                </span>
                : <Money value={discount} className="price discount-amount" />
              }
            </div>

            <div className="total grand-total clearfix">
              <strong className="heading">{translate('portals.component.requestProposalCart.totalLabel')}</strong>
              <Money value={total} className="price total-price" />
            </div>

            <Button
              disabled={coupon.fetching}
              onClick={this.onSubmitForm}
            >
              <span>{translate('portals.component.requestProposalCart.submitBtn')}</span>
              {(this.state.shoppingCartLoading) &&
              <span className="pull-right"><LoadingSpinner showOnlyIcon size={20} /></span>
              }
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  coupon: selectCoupon(),
  levels: selectLevels(),
  hasError: selectProposalFormError(),
  formValues: selectProposalFormValues(),
  indicationLevelPrice: selectIndicationLevelPrice(),
  formSubmissionStatus: selectFormSubmissionStatus(),
  newProposalFields: selectRegisteredFields(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCoupon: (id) => dispatch(fetchCoupon(id)),
    clearCoupon: () => dispatch(clearCoupon()),
    onSubmitForm: (values) => dispatch(submitForm(values)),
    fetchIndicationLevelPrice: (indicationId, levelId) => dispatch(fetchIndicationLevelPrice(indicationId, levelId)),
    touchRequestProposal: (fields) => dispatch(touch('requestProposal', ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestProposalCart);
