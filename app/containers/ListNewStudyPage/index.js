/*
 *
 * ListNewStudyPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StickyContainer, Sticky } from 'react-sticky';
import { touch } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import _, { find } from 'lodash';

import { CAMPAIGN_LENGTH_LIST, MESSAGING_SUITE_PRICE, CALL_TRACKING_PRICE, QUALIFICATION_SUITE_PRICE } from '../../common/constants';
import CenteredModal from '../../components/CenteredModal/index';
import ListNewStudyForm from '../../components/ListNewStudyForm';
import ShoppingCartForm from '../../components/ShoppingCartForm';
import { selectListNewStudyFormValues, selectListNewStudyFormError } from '../../components/ListNewStudyForm/selectors';
import { fields as newStudyFields } from '../../components/ListNewStudyForm/validator';
import { selectShoppingCartFormError, selectShoppingCartFormValues } from '../../components/ShoppingCartForm/selectors';
import { shoppingCartFields } from '../../components/ShoppingCartForm/validator';
import { ComingSoon } from '../../components/ComingSoon';
import { submitForm, hideSubmitFormModal, clearFormSubmissionData } from '../../containers/ListNewStudyPage/actions';
import { selectListNewStudyPageDomain, selectFormSubmissionStatus, selectShowSubmitFormModal, selectIndicationLevelPrice, selectListNewStudyClientAdmins } from './selectors';

import LoadingSpinner from '../../components/LoadingSpinner';

import Helmet from 'react-helmet';
import {
  fetchSites,
  fetchIndications,
  fetchLevels,
  saveSite,
  getAvailPhoneNumbers,
  fetchIndicationLevelPrice,
  fetchClientSites,
  fetchClientAdmins,
} from '../../containers/App/actions';
import {
  selectSiteLocations,
  selectIndications,
  selectStudyLevels,
  selectCurrentUser,
  selectAvailPhoneNumbers,
  selectCurrentUserClientId,
  selectClientSites,
  selectUserRoleType,
} from '../../containers/App/selectors';

export class ListNewStudyPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    siteLocations: PropTypes.array,
    fullSiteLocations: PropTypes.object,
    indications: PropTypes.array,
    studyLevels: PropTypes.array,
    fetchSites: PropTypes.func,
    fetchIndications: PropTypes.func,
    fetchLevels: PropTypes.func,
    listNewStudyState: PropTypes.object,
    formValues: PropTypes.object,
    submitForm: PropTypes.func,
    saveSite: PropTypes.func,
    hasErrors: PropTypes.bool,
    availPhoneNumbers: PropTypes.array,
    getAvailPhoneNumbers: PropTypes.func,
    currentUser: PropTypes.object,
    formSubmissionStatus: PropTypes.object,
    showSubmitFormModal: PropTypes.bool,
    hideSubmitFormModal: PropTypes.func,
    indicationLevelPrice: PropTypes.number,
    fetchIndicationLevelPrice: PropTypes.func,
    clearFormSubmissionData: PropTypes.func,
    history: PropTypes.object,
    shoppingCartFormValues: PropTypes.object,
    shoppingCartFormError: PropTypes.bool,
    touchNewStudy: PropTypes.func,
    touchShoppingCart: PropTypes.func,
    fetchClientSites: PropTypes.func,
    currentUserClientId: PropTypes.number,
    userRoleType: PropTypes.string,
    fetchClientAdmins: PropTypes.func,
    clientAdmins: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.submitForm = this.props.submitForm.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.closeSubmitFormModal = this.closeSubmitFormModal.bind(this);
    this.goToStudyPage = this.goToStudyPage.bind(this);
    this.state = {
      uniqueId: '1',
    };
  }

  componentDidMount() {
    this.props.fetchSites();

    this.props.fetchIndications();
    this.props.fetchLevels();
    this.props.getAvailPhoneNumbers();
    if (this.props.userRoleType === 'client') {
      this.props.fetchClientSites(this.props.currentUserClientId, {});
      this.props.fetchClientAdmins(this.props.currentUserClientId);
    }
  }

  componentWillReceiveProps(newProps) {
    // indication change
    if (
      ((newProps.formValues.indication_id !== this.props.formValues.indication_id) ||
      (newProps.formValues.exposureLevel !== this.props.formValues.exposureLevel)) &&
      newProps.formValues.indication_id && newProps.formValues.exposureLevel &&
      newProps.formValues.indication_id !== undefined && newProps.formValues.exposureLevel !== undefined
    ) {
      this.props.fetchIndicationLevelPrice(newProps.formValues.indication_id, newProps.formValues.exposureLevel);
    }
  }

  onSubmitForm() {
    const { hasErrors, shoppingCartFormValues, shoppingCartFormError, touchNewStudy, touchShoppingCart } = this.props;
    if (hasErrors || shoppingCartFormError) {
      touchNewStudy();
      touchShoppingCart();
      return;
    }

    const filteredEmails = [];
    _.forEach(this.props.formValues.emailNotifications, (item) => {
      if (item.isChecked) {
        filteredEmails.push({ userId: item.userId, firstName: item.firstName, lastName: item.lastName, email: item.email });
      }
    });

    const siteLocation = _.find(this.props.siteLocations, { id: this.props.formValues.siteLocation });
    const indication = _.find(this.props.indications, { id: this.props.formValues.indication_id });
    const studyLevel = _.find(this.props.studyLevels, { id: this.props.formValues.exposureLevel });

    this.submitForm(shoppingCartFormValues, {
      ...this.props.formValues,
      siteLocationName: siteLocation.name,
      indicationName: indication.name,
      user_id: this.props.currentUser.id,
      currentUser: this.props.currentUser,
      emailNotifications: filteredEmails,
      stripeCustomerId: this.props.currentUser.roleForClient.client.stripeCustomerId,
      exposureLevelName: studyLevel.label,
    });

    if (this.state.uniqueId.length > 1) {
      this.setState({
        uniqueId: '1',
      });
    } else {
      this.setState({
        uniqueId: '11',
      });
    }
  }

  goToStudyPage() {
    // TODO: need to change url to patient-details when page will be ready
    this.props.clearFormSubmissionData();
    this.props.hideSubmitFormModal();
    this.props.history.push('patient-details');
  }

  closeSubmitFormModal() {
    this.props.clearFormSubmissionData();
    this.props.hideSubmitFormModal();
  }

  render() {
    const { indications, studyLevels, formValues, fullSiteLocations, indicationLevelPrice, userRoleType } = this.props;
    const { uniqueId } = this.state;

    const addOns = [];
    const level = find(studyLevels, { id: formValues.exposureLevel });
    const months = find(CAMPAIGN_LENGTH_LIST, { value: formValues.campaignLength });

    if (level && months && indicationLevelPrice) {
      addOns.push({
        title: ((formValues.condenseTwoWeeks && months.value === 1) ? `2 Weeks ${level.type}` : `${months.label} ${level.type}`),
        price: indicationLevelPrice,
        quantity: months.value,
        total: indicationLevelPrice * months.value,
      });
    }

    if (formValues.patientMessagingSuite) {
      addOns.push({
        title: 'Patient Messaging Suite',
        price: MESSAGING_SUITE_PRICE,
        quantity: 1,
        total: MESSAGING_SUITE_PRICE,
      });
    }

    if (formValues.patientQualificationSuite) {
      addOns.push({
        title: 'Patient Qualification Suite',
        price: QUALIFICATION_SUITE_PRICE,
        quantity: 1,
        total: QUALIFICATION_SUITE_PRICE,
      });
    }

    if (formValues.callTracking) {
      addOns.push({
        title: 'Call Tracking',
        price: CALL_TRACKING_PRICE,
        quantity: 1,
        total: CALL_TRACKING_PRICE,
      });
    }
    return (
      <div>
        { userRoleType === 'client' &&
          <StickyContainer className="container-fluid">
            <Helmet title="List New Study - StudyKIK" />
            <section className="study-portal">

              <h2 className="main-heading">LIST NEW STUDY</h2>

              <div className="row form-study">

                <div className="col-xs-6 form-holder">
                  <ListNewStudyForm
                    key={uniqueId}
                    formValues={formValues}
                    fullSiteLocations={fullSiteLocations}
                    indications={indications}
                    studyLevels={studyLevels}
                    listNewStudyState={this.props.listNewStudyState}
                    saveSite={this.props.saveSite}
                    availPhoneNumbers={this.props.availPhoneNumbers}
                    clientAdmins={this.props.clientAdmins}
                  />
                </div>

                <div className="fixed-block">
                  <div className="fixed-block-holder">
                    <div className="order-summery-container">
                      <Sticky className="sticky-shopping-cart">
                        {<ShoppingCartForm showCards addOns={addOns} validateAndSubmit={this.onSubmitForm} />}
                      </Sticky>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Modal
              dialogComponentClass={CenteredModal}
              show={this.props.showSubmitFormModal}
              backdrop
            >
              <Modal.Header>
                <Modal.Title>Processing payment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {(() => {
                  if (this.props.formSubmissionStatus.submitting) {
                    return (
                      <div className="text-center"><span><LoadingSpinner showOnlyIcon size={20} /></span></div>
                    );
                  }
                  if (this.props.formSubmissionStatus.response) {
                    return (
                      <div className="text-center">
                        <div className="study-submit-form-modal-text alert alert-success" role="alert">Study has been
                          listed successfully.
                        </div>
                        <button
                          onClick={this.goToStudyPage}
                          type="button"
                          className="study-submit-form-modal-button btn btn-success"
                        >
                          Go To Study Page
                        </button>
                      </div>
                    );
                  }
                  if (this.props.formSubmissionStatus.error) {
                    return (
                      <div className="text-center">
                        <div
                          className="study-submit-form-modal-text alert alert-danger"
                          role="alert"
                        >
                          {`Error occurred while submitting your request. ${this.props.formSubmissionStatus.error.message}`}
                        </div>
                        <button
                          onClick={this.closeSubmitFormModal}
                          type="button"
                          className="study-submit-form-modal-button btn btn-danger"
                        >
                          OK
                        </button>
                      </div>
                    );
                  }
                  return false;
                })()}
              </Modal.Body>
            </Modal>
          </StickyContainer>
        }
        {
          userRoleType === 'sponsor' &&
            <ComingSoon />
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
  fullSiteLocations : selectClientSites(),
  indications   : selectIndications(),
  studyLevels   : selectStudyLevels(),
  listNewStudyState : selectListNewStudyPageDomain(),
  formValues: selectListNewStudyFormValues(),
  hasErrors: selectListNewStudyFormError(),
  availPhoneNumbers: selectAvailPhoneNumbers(),
  currentUser: selectCurrentUser(),
  formSubmissionStatus: selectFormSubmissionStatus(),
  showSubmitFormModal: selectShowSubmitFormModal(),
  indicationLevelPrice: selectIndicationLevelPrice(),
  shoppingCartFormValues: selectShoppingCartFormValues(),
  shoppingCartFormError: selectShoppingCartFormError(),
  currentUserClientId: selectCurrentUserClientId(),
  userRoleType: selectUserRoleType(),
  clientAdmins: selectListNewStudyClientAdmins(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites:       () => dispatch(fetchSites()),
    fetchClientSites: (clientId, searchParams) => dispatch(fetchClientSites(clientId, searchParams)),
    fetchIndications: () => dispatch(fetchIndications()),
    fetchLevels:      () => dispatch(fetchLevels()),
    submitForm:     (cartValues, formValues) => dispatch(submitForm(cartValues, formValues)),
    saveSite: (clientId, id, data) => dispatch(saveSite(clientId, id, data)),
    getAvailPhoneNumbers: () => dispatch(getAvailPhoneNumbers()),
    hideSubmitFormModal:  () => dispatch(hideSubmitFormModal()),
    fetchIndicationLevelPrice: (indicationId, levelId) => dispatch(fetchIndicationLevelPrice(indicationId, levelId)),
    clearFormSubmissionData: () => (dispatch(clearFormSubmissionData())),
    fetchClientAdmins: (payload) => dispatch(fetchClientAdmins(payload)),
    touchNewStudy: () => (dispatch(touch('listNewStudy', ...newStudyFields))),
    touchShoppingCart: () => (dispatch(touch('shoppingCart', ...shoppingCartFields))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNewStudyPage);
