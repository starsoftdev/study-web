/*
 *
 * IrbAdCreationPage
 *
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { StickyContainer, Sticky } from 'react-sticky';
import { createStructuredSelector } from 'reselect';
import { touch } from 'redux-form';
import _ from 'lodash';

import IrbAdCreationForm from '../../components/IrbAdCreationForm';
import ShoppingCartForm from '../../components/ShoppingCartForm';
import { selectIrbAdCreationFormValues, selectIrbAdCreationFormError } from '../../components/IrbAdCreationForm/selectors';
import { fields as irbAdCreationFields } from '../../components/IrbAdCreationForm/validator';
import { selectIrbProductList, selectIrbAdCreationDetail, selectFormSubmissionStatus } from '../../containers/IrbAdCreationPage/selectors';
import { submitForm, fetchIrbProductList, fetchIrbAdCreation } from '../../containers/IrbAdCreationPage/actions';
import { selectShoppingCartFormError, selectShoppingCartFormValues } from '../../components/ShoppingCartForm/selectors';
import { shoppingCartFields } from '../../components/ShoppingCartForm/validator';
import { ComingSoon } from '../../components/ComingSoon';
import { translate } from '../../../common/utilities/localization';

import {
  fetchClientSites,
  fetchIndications,
} from '../../containers/App/actions';
import {
  selectSiteLocations,
  selectIndications,
  selectCurrentUser,
  selectUserRoleType,
} from '../../containers/App/selectors';

export class IrbAdCreationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    currentUser: PropTypes.object,
    siteLocations: PropTypes.array,
    indications: PropTypes.array,
    submitForm: PropTypes.func.isRequired,
    fetchClientSites: PropTypes.func,
    fetchIndications: PropTypes.func,
    formValues: PropTypes.object,
    hasError: PropTypes.bool,
    productList: PropTypes.array,
    irbAdCreationDetail: PropTypes.object,
    params: PropTypes.object,
    shoppingCartFormValues: PropTypes.object,
    shoppingCartFormError: PropTypes.bool,
    fetchProductList: PropTypes.func,
    fetchIrbAdCreation: PropTypes.func,
    touchIrbAdCreation: PropTypes.func,
    touchShoppingCart: PropTypes.func,
    userRoleType: PropTypes.string,
    formSubmissionStatus: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.submitForm = this.props.submitForm.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);

    if (!isNaN(props.params.id)) {
      this.props.fetchIrbAdCreation(props.params.id);
    }

    this.state = {
      shoppingcartLoading: props.formSubmissionStatus.submitting,
    };
  }

  componentWillMount() {
    const { currentUser } = this.props;
    if (currentUser.roleForClient) {
      const purchasable = currentUser.roleForClient.name === 'Super Admin' ? true : currentUser.roleForClient.canPurchase;
      if (!purchasable) {
        browserHistory.push('/app');
      }
    }
  }

  componentDidMount() {
    const { currentUser, fetchClientSites, fetchIndications, fetchProductList, userRoleType } = this.props;
    // coming soon for sponsor
    if (userRoleType === 'client') {
      fetchClientSites(currentUser.roleForClient.client_id);
      fetchIndications();
      fetchProductList();
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.formSubmissionStatus.submitting !== newProps.formSubmissionStatus.submitting) {
      this.setState({ shoppingcartLoading: newProps.formSubmissionStatus.submitting });
    }
  }

  onSubmitForm() {
    const { hasError, shoppingCartFormValues, shoppingCartFormError, touchIrbAdCreation, touchShoppingCart } = this.props;
    if (hasError || shoppingCartFormError) {
      touchIrbAdCreation();
      touchShoppingCart();
      return;
    }

    const siteLocation = _.find(this.props.siteLocations, { id: this.props.formValues.siteLocation });
    const indication = _.find(this.props.indications, { id: this.props.formValues.indication_id });

    this.submitForm(shoppingCartFormValues, {
      ...this.props.formValues,
      siteLocationName: siteLocation.name,
      indicationName: indication.name,
      user_id: this.props.currentUser.id,
      stripeProductId: this.props.productList[0].stripeProductId,
      stripeCustomerId: this.props.currentUser.roleForClient.client.stripeCustomerId,
    });
  }

  renderClientIRBAdCreation() {
    const { siteLocations, indications, productList, irbAdCreationDetail, userRoleType, currentUser } = this.props;
    let purchasable = false;
    if (currentUser.roleForClient) {
      purchasable = currentUser.roleForClient.name === 'Super Admin' ? true : currentUser.roleForClient.canPurchase;
    }

    if ((userRoleType === 'client' && purchasable) && productList[0]) {
      const addOns = [{
        title: translate(`common.irbAdProductList.id${productList[0].id}`),
        price: productList[0].price * 100,
        quantity: 1,
        total: productList[0].price * 100,
      }];
      return (
        <div>
          <StickyContainer className="container-fluid">
            <Helmet title={translate('portals.page.irbAdCreationPage.helmetTitle')} />
            <section className="study-portal">
              <h2 className="main-heading">{translate('portals.page.irbAdCreationPage.pageTitle')}</h2>
              <div className="form-study row">
                <div className="col-xs-6 form-holder">
                  <IrbAdCreationForm
                    siteLocations={siteLocations}
                    indications={indications}
                    initialValues={irbAdCreationDetail}
                  />
                </div>

                <div className="fixed-block">
                  <div className="fixed-block-holder">
                    <div className="order-summery-container">
                      <Sticky className="sticky-shopping-cart">
                        <ShoppingCartForm
                          showCards
                          addOns={addOns}
                          validateAndSubmit={this.onSubmitForm}
                          manualDisableSubmit={this.state.shoppingcartLoading}
                        />
                      </Sticky>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </StickyContainer>
        </div>
      );
    }
    return <div></div>;
  }

  renderSponsorIRBAdCreation() {
    const { userRoleType } = this.props;
    if (userRoleType === 'sponsor') {
      return (
        <div>
          <Helmet title={translate('portals.page.irbAdCreationPage.helmetTitle')} />
          <ComingSoon />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {this.renderClientIRBAdCreation()}
        {this.renderSponsorIRBAdCreation()}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  siteLocations : selectSiteLocations(),
  indications   : selectIndications(),
  formValues: selectIrbAdCreationFormValues(),
  hasError: selectIrbAdCreationFormError(),
  productList: selectIrbProductList(),
  irbAdCreationDetail: selectIrbAdCreationDetail(),
  shoppingCartFormValues: selectShoppingCartFormValues(),
  shoppingCartFormError: selectShoppingCartFormError(),
  userRoleType: selectUserRoleType(),
  formSubmissionStatus: selectFormSubmissionStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchClientSites: (id) => dispatch(fetchClientSites(id)),
    fetchIndications: () => dispatch(fetchIndications()),
    fetchProductList: () => dispatch(fetchIrbProductList()),
    fetchIrbAdCreation: (id) => dispatch(fetchIrbAdCreation(id)),
    submitForm:     (cartValues, formValues) => dispatch(submitForm(cartValues, formValues)),
    touchIrbAdCreation: () => dispatch(touch('irbAdCreation', ...irbAdCreationFields)),
    touchShoppingCart: () => dispatch(touch('shoppingCart', ...shoppingCartFields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IrbAdCreationPage);
