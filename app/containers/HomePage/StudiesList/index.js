import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _, { countBy, find, filter, sumBy } from 'lodash';
import { touch } from 'redux-form';

import { CAMPAIGN_LENGTH_LIST, MESSAGING_SUITE_PRICE, CALL_TRACKING_PRICE } from '../../../common/constants';
import { selectShoppingCartFormError, selectShoppingCartFormValues } from '../../../components/ShoppingCartForm/selectors';
import { shoppingCartFields } from '../../../components/ShoppingCartForm/validator';
import { fetchLevels, saveCard } from '../../App/actions';
import { selectCurrentUser, selectStudyLevels, selectCurrentUserStripeCustomerId, selectSitePatients, selectCurrentUserClientId, selectClientSites } from '../../App/selectors';
import { ACTIVE_STATUS_VALUE, INACTIVE_STATUS_VALUE } from '../constants';
import { fetchIndicationLevelPrice, clearIndicationLevelPrice, renewStudy, upgradeStudy, editStudy, setActiveSort, sortSuccess, fetchUpgradeStudyPrice } from '../actions';
import { selectStudies, selectSelectedIndicationLevelPrice, selectRenewedStudy, selectUpgradedStudy, selectEditedStudy, selectPaginationOptions } from '../selectors';
import { selectEditStudyFormValues, selectEditStudyFormError } from '../EditStudyForm/selectors';
import { selectRenewStudyFormValues, selectRenewStudyFormError } from '../RenewStudyForm/selectors';
import { selectUpgradeStudyFormValues, selectUpgradeStudyFormError } from '../UpgradeStudyForm/selectors';
import RenewStudyForm from '../RenewStudyForm/index';
import UpgradeStudyForm from '../UpgradeStudyForm/index';
import EditStudyForm from '../EditStudyForm/index';
import { upgradeStudyFields } from '../UpgradeStudyForm/validator';
import { renewStudyFields } from '../RenewStudyForm/validator';
import { editStudyFields } from '../EditStudyForm/validator';
import StudyItem from './StudyItem';

class StudiesList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clientSites: PropTypes.object,
    clearIndicaoionLevelPrice: PropTypes.func,
    currentUserStripeCustomerId: PropTypes.string,
    currentUser: PropTypes.object,
    fetchLevels: PropTypes.func,
    fetchIndicationLevelPrice: PropTypes.func,
    fetchUpgradeStudyPrice: PropTypes.func,
    editStudy: PropTypes.func,
    editedStudy: PropTypes.object,
    editStudyFormError: PropTypes.bool,
    editStudyFormValues: PropTypes.object,
    paginationOptions: React.PropTypes.object,
    renewStudyFormError: PropTypes.bool,
    renewStudyFormValues: PropTypes.object,
    renewedStudy: PropTypes.object,
    renewStudy: PropTypes.func,
    selectedIndicationLevelPrice: PropTypes.object,
    setActiveSort: PropTypes.func,
    shoppingCartFormError: PropTypes.bool,
    shoppingCartFormValues: PropTypes.object,
    sitePatients: React.PropTypes.object,
    sortSuccess: PropTypes.func,
    studies: PropTypes.object,
    studyLevels: PropTypes.array,
    touchEditStudy: PropTypes.func,
    touchRenewStudy: PropTypes.func,
    touchUpgradeStudy: PropTypes.func,
    touchShoppingCart: PropTypes.func,
    upgradeStudy: PropTypes.func,
    upgradedStudy: PropTypes.object,
    upgradeStudyFormValues: PropTypes.object,
    upgradeStudyFormError: PropTypes.bool,
    saveCard: PropTypes.func,
    clearIndicationLevelPrice: PropTypes.func,
    currentUserClientId: PropTypes.number,
    clientAdmins: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      renewModalOpen: false,
      upgradeModalOpen: false,
      editModalOpen: false,
      selectedStudyId: null,
      selectedIndicationId: null,
      selectedCampaign: null,
      selectedSiteId: null,
      indicationName: null,
      locationName: null,
      addCardModalOpen: false,
      isReNew: false,
    };

    this.openRenewModal = this.openRenewModal.bind(this);
    this.openUpgradeModal = this.openUpgradeModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.closeRenewModal = this.closeRenewModal.bind(this);
    this.closeUpgradeModal = this.closeUpgradeModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleRenewStudyFormSubmit = this.handleRenewStudyFormSubmit.bind(this);
    this.handleUpgradeStudyFormSubmit = this.handleUpgradeStudyFormSubmit.bind(this);
    this.handleEditStudyFormSubmit = this.handleEditStudyFormSubmit.bind(this);
    this.handleNewModalOpen = this.handleNewModalOpen.bind(this);
    this.openAddCardModal = this.openAddCardModal.bind(this);
    this.closeAddCardModal = this.closeAddCardModal.bind(this);
    this.onSaveCard = this.onSaveCard.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.showRenewModal = this.showRenewModal.bind(this);
    this.showUpgradeModal = this.showUpgradeModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchLevels();
  }

  componentWillReceiveProps(newProps) {
    const newRenewedStudy = newProps.renewedStudy;
    const oldRenewedStudy = this.props.renewedStudy;
    const newUpgradedStudy = newProps.upgradedStudy;
    const oldUpgradedStudy = this.props.upgradedStudy;
    const newEditedStudy = newProps.editedStudy;
    const oldEditedStudy = this.props.editedStudy;
    const newExposureLevelOfRenewStudy = newProps.renewStudyFormValues.exposureLevel;
    const oldExposureLevelOfRenewStudy = this.props.renewStudyFormValues.exposureLevel;
    const newLevelOfUpgradeStudy = newProps.upgradeStudyFormValues.level;
    const oldLevelOfUpgradeStudy = this.props.upgradeStudyFormValues.level;

    if (!newRenewedStudy.submitting && oldRenewedStudy.submitting) {
      this.closeRenewModal();
    }

    if (!newUpgradedStudy.submitting && oldUpgradedStudy.submitting) {
      this.closeUpgradeModal();
    }

    if (!newEditedStudy.submitting && oldEditedStudy.submitting) {
      this.closeEditModal();
    }

    if (newExposureLevelOfRenewStudy !== oldExposureLevelOfRenewStudy) {
      if (newExposureLevelOfRenewStudy) {
        this.props.fetchIndicationLevelPrice(newExposureLevelOfRenewStudy, this.state.selectedIndicationId);
      } else {
        this.props.clearIndicationLevelPrice();
      }
    }

    if (newLevelOfUpgradeStudy !== oldLevelOfUpgradeStudy) {
      if (newLevelOfUpgradeStudy) {
        const selectedStudy = _.find(this.props.studies.details, (o) => (o.studyId === this.state.selectedStudyId));
        this.props.fetchUpgradeStudyPrice(selectedStudy.level_id, newLevelOfUpgradeStudy);
      } else {
        this.props.clearIndicationLevelPrice();
      }
    }
  }

  onSaveCard(params) {
    this.props.saveCard(this.props.currentUserStripeCustomerId, params);
  }

  openRenewModal(studyId, indicationId, campaign, siteId, iName, lName) {
    this.setState({
      renewModalOpen: true,
      selectedStudyId: studyId,
      selectedIndicationId: indicationId,
      selectedCampaign: campaign,
      selectedSiteId: siteId,
      indicationName: iName,
      locationName: lName,
    });
  }

  openUpgradeModal(studyId, indicationId, campaign, siteId, iName, lName) {
    this.setState({
      upgradeModalOpen: true,
      selectedStudyId: studyId,
      selectedIndicationId: indicationId,
      selectedCampaign: campaign,
      selectedSiteId: siteId,
      indicationName: iName,
      locationName: lName,
    });
  }

  openEditModal(studyId, siteUsers, siteId) {
    this.setState({
      editModalOpen: true,
      selectedStudyId: studyId,
      selectedSiteUsers: siteUsers,
      selectedSiteId: siteId,
    });
  }

  openAddCardModal() {
    this.setState({
      addCardModalOpen: true,
    });
  }

  closeRenewModal(flag) {
    if (flag) {
      this.setState({
        renewModalOpen: false,
      });
    } else {
      this.setState({
        renewModalOpen: false,
        selectedStudyId: null,
        selectedIndicationId: null,
        selectedSiteId: null,
        indicationName: null,
        locationName: null,
      });
    }
  }

  showRenewModal() {
    this.setState({
      renewModalOpen: true,
    });
  }

  showUpgradeModal() {
    this.setState({
      upgradeModalOpen: true,
    });
  }

  closeUpgradeModal(flag) {
    if (flag) {
      this.setState({
        upgradeModalOpen: false,
      });
    } else {
      this.setState({
        upgradeModalOpen: false,
        selectedStudyId: null,
        selectedIndicationId: null,
        selectedCampaign: null,
        selectedSiteId: null,
        indicationName: null,
        locationName: null,
      });
    }
  }

  closeEditModal(flag) {
    if (flag) {
      this.setState({
        editModalOpen: false,
      });
    } else {
      this.setState({
        editModalOpen: false,
        selectedStudyId: null,
        selectedSiteUsers: null,
        selectedSiteId: null,
      });
    }
  }

  showEditModal() {
    this.setState({
      editModalOpen: true,
    });
  }

  closeAddCardModal() {
    if (this.state.isReNew) {
      this.setState({
        addCardModalOpen: false,
        renewModalOpen: true,
      });
    } else {
      this.setState({
        addCardModalOpen: false,
        upgradeModalOpen: true,
      });
    }
  }

  handleNewModalOpen() {
    const { renewModalOpen, upgradeModalOpen, editModalOpen } = this.state;
    if (renewModalOpen) {
      this.setState({
        renewModalOpen: false,
        isReNew: true,
      });
    } else if (upgradeModalOpen) {
      this.setState({
        upgradeModalOpen: false,
        isReNew: false,
      });
    } else if (editModalOpen) {
      this.closeEditModal();
    }
    this.openAddCardModal();
  }

  handleRenewStudyFormSubmit() {
    const { currentUserStripeCustomerId, renewStudyFormValues, renewStudy, renewStudyFormError, shoppingCartFormValues, shoppingCartFormError,
      touchRenewStudy, touchShoppingCart } = this.props;

    if (renewStudyFormError || shoppingCartFormError) {
      touchRenewStudy();
      touchShoppingCart();
      return;
    }
    const studyLevel = _.find(this.props.studyLevels, { id: renewStudyFormValues.exposureLevel });
    const selectedStudy = _.find(this.props.studies.details, (o) => (o.studyId === this.state.selectedStudyId));

    renewStudy(this.state.selectedStudyId, shoppingCartFormValues, {
      ...selectedStudy,
      ...renewStudyFormValues,
      stripeCustomerId: currentUserStripeCustomerId,
      selectedIndicationId: this.state.selectedIndicationId,
      selectedSiteId: this.state.selectedSiteId,
      user_id: this.props.currentUser.id,
      indicationName: this.state.indicationName,
      locationName: this.state.locationName,
      exposureLevelName: studyLevel.label,
    });
  }

  handleUpgradeStudyFormSubmit() {
    const { shoppingCartFormError, shoppingCartFormValues, upgradeStudyFormError, touchUpgradeStudy, touchShoppingCart,
      currentUserStripeCustomerId, upgradeStudyFormValues, upgradeStudy } = this.props;

    if (upgradeStudyFormError || shoppingCartFormError) {
      touchUpgradeStudy();
      touchShoppingCart();
      return;
    }

    const selectedStudy = _.find(this.props.studies.details, (o) => (o.studyId === this.state.selectedStudyId));

    if (!upgradeStudyFormValues.level) {
      upgradeStudyFormValues.level = selectedStudy.campaign.level_id;
    }

    const studyLevel = _.find(this.props.studyLevels, { id: upgradeStudyFormValues.level });

    upgradeStudy(this.state.selectedStudyId, shoppingCartFormValues, {
      ...selectedStudy,
      ...upgradeStudyFormValues,
      stripeCustomerId: currentUserStripeCustomerId,
      selectedIndicationId: this.state.selectedIndicationId,
      selectedCampaignId: this.state.selectedCampaign.id,
      selectedSiteId: this.state.selectedSiteId,
      user_id: this.props.currentUser.id,
      indicationName: this.state.indicationName,
      locationName: this.state.locationName,
      exposureLevelName: studyLevel.label,
      name: '',
    });
  }

  handleEditStudyFormSubmit() {
    const { editStudyFormError, editStudyFormValues, touchEditStudy } = this.props;
    if (editStudyFormError) {
      touchEditStudy();
      return;
    }

    this.props.editStudy(this.state.selectedStudyId, { ...editStudyFormValues, clientId: this.props.currentUserClientId });
  }

  generateRenewStudyShoppingCartAddOns() {
    const { studyLevels, selectedIndicationLevelPrice } = this.props;
    const { exposureLevel, campaignLength, condenseTwoWeeks,
      patientMessagingSuite, callTracking } = this.props.renewStudyFormValues;
    const addOns = [];

    if (exposureLevel && campaignLength) {
      if (!selectedIndicationLevelPrice.fetching && selectedIndicationLevelPrice.details) {
        const foundExposureLevel = find(studyLevels, { id: exposureLevel });
        const monthLength = find(CAMPAIGN_LENGTH_LIST, { value: campaignLength });
        const durationString = (condenseTwoWeeks) ? '2 Weeks' : monthLength.label;

        addOns.push({
          title: `${durationString} ${foundExposureLevel.type}`,
          price: selectedIndicationLevelPrice.details,
          quantity: monthLength.value,
          total: selectedIndicationLevelPrice.details * monthLength.value,
        });
      }
    }
    if (patientMessagingSuite) {
      addOns.push({
        title: 'Patient Messaging Suite',
        price: MESSAGING_SUITE_PRICE,
        quantity: 1,
        total: MESSAGING_SUITE_PRICE,
      });
    }
    if (callTracking) {
      addOns.push({
        title: 'Call Tracking',
        price: CALL_TRACKING_PRICE,
        quantity: 1,
        total: CALL_TRACKING_PRICE,
      });
    }

    return addOns;
  }

  generateUpgradeStudyShoppingCartAddOns() {
    const { studyLevels, selectedIndicationLevelPrice } = this.props;
    const { level, patientMessagingSuite, callTracking } = this.props.upgradeStudyFormValues;
    const addOns = [];

    if (level) {
      if (!selectedIndicationLevelPrice.fetching && selectedIndicationLevelPrice.details) {
        const foundLevel = find(studyLevels, { id: level });

        addOns.push({
          title: `${foundLevel.type}`,
          price: selectedIndicationLevelPrice.details,
          quantity: 1,
          total: selectedIndicationLevelPrice.details,
        });
      }
    }
    if (patientMessagingSuite) {
      addOns.push({
        title: 'Patient Messaging Suite',
        price: MESSAGING_SUITE_PRICE,
        quantity: 1,
        total: MESSAGING_SUITE_PRICE,
      });
    }
    if (callTracking) {
      addOns.push({
        title: 'Call Tracking',
        price: CALL_TRACKING_PRICE,
        quantity: 1,
        total: CALL_TRACKING_PRICE,
      });
    }

    return addOns;
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';
    const defaultSort = 'orderNumber';

    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);

    const dir = ((direction === 'down') ? 'desc' : 'asc');
    const sorted = _.orderBy(this.props.studies.details, [function (o) {
      if (sort === 'indication') {
        return o.indication.name;
      }
      return o[(sort || defaultSort)];
    }], [dir]);
    this.props.sortSuccess(sorted);
  }

  render() {
    const { studies, sitePatients, currentUser, clientSites } = this.props;
    const countResult = countBy(studies.details, entityIterator => entityIterator.status);
    const activeCount = countResult[ACTIVE_STATUS_VALUE] || 0;
    const inactiveCount = countResult[INACTIVE_STATUS_VALUE] || 0;
    const totalCount = studies.details.length;

    let selectedStudy = null;
    let selectedSiteID = null;
    if (currentUser && currentUser.roleForClient) {
      selectedSiteID = (currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin') ? null : true;
      if (selectedSiteID) {
        selectedSiteID = currentUser.roleForClient.site_id ? currentUser.roleForClient.site_id : null;
      }
    }
    let siteArray = [];
    if (clientSites && clientSites.details) {
      siteArray = clientSites.details.map((item) =>
        item.id
      );
    }
    const studiesListContents = studies.details.map((item, index) => {
      if (item.studyId === this.state.selectedStudyId) {
        selectedStudy = item;
      }
      const unreadMessageCount = sumBy(filter(sitePatients.details, { study_id: item.studyId }), (sitePatient) => {
        if (sitePatient.count_unread == null) {
          return 0;
        }
        return parseInt(sitePatient.count_unread);
      });
      if (siteArray.indexOf(item.siteId) === -1 || (selectedSiteID && item.siteId !== selectedSiteID)) {
        return null;
      }
      return (
        <StudyItem
          {...item}
          orderNumber={index + 1}
          currentUser={currentUser}
          key={index}
          index={index}
          unreadMessageCount={unreadMessageCount}
          onRenew={this.openRenewModal}
          onUpgrade={this.openUpgradeModal}
          onEdit={this.openEditModal}
        />
      );
    });

    return (
      <div className="studies">
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table">
                <caption>
                  <span className="pull-left">Study Status</span>
                  <span className="pull-right">
                    <span className="inner-info">
                      <span className="info-label">ACTIVE</span>
                      <span className="info-value">{activeCount}</span>
                    </span>
                    <span className="inner-info">
                      <span className="info-label">INACTIVE</span>
                      <span className="info-value">{inactiveCount}</span>
                    </span>
                    <span className="inner-info">
                      <span className="info-label">TOTAL</span>
                      <span className="info-value">{totalCount}</span>
                    </span>
                  </span>
                </caption>
                <thead>
                  <tr>
                    <th onClick={this.sortBy} data-sort="orderNumber" className={(this.props.paginationOptions.activeSort === 'orderNumber') ? this.props.paginationOptions.activeDirection : ''}>#<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="indication" className={(this.props.paginationOptions.activeSort === 'indication') ? this.props.paginationOptions.activeDirection : ''}>INDICATION<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="location" className={(this.props.paginationOptions.activeSort === 'location') ? this.props.paginationOptions.activeDirection : ''}>LOCATION<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="sponsor" className={(this.props.paginationOptions.activeSort === 'sponsor') ? this.props.paginationOptions.activeDirection : ''}>SPONSOR<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="protocol" className={(this.props.paginationOptions.activeSort === 'protocol') ? this.props.paginationOptions.activeDirection : ''}>PROTOCOL<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="patientMessagingSuite" className={(this.props.paginationOptions.activeSort === 'patientMessagingSuite') ? this.props.paginationOptions.activeDirection : ''}>
                      <span className="icomoon-credit" data-original-title="Patient Messaging Suite" />
                      <i className="caret-arrow" />
                    </th>
                    <th onClick={this.sortBy} data-sort="status" className={(this.props.paginationOptions.activeSort === 'status') ? this.props.paginationOptions.activeDirection : ''}>STATUS<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="startDate" className={(this.props.paginationOptions.activeSort === 'startDate') ? this.props.paginationOptions.activeDirection : ''}>START DATE<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="endDate" className={(this.props.paginationOptions.activeSort === 'endDate') ? this.props.paginationOptions.activeDirection : ''}>END DATE<i className="caret-arrow" /></th>
                  </tr>
                </thead>
                <tbody>
                  {studies.details.length > 0 && studiesListContents}
                </tbody>
              </table>
            </div>
            <RenewStudyForm
              selectedStudy={selectedStudy}
              show={this.state.renewModalOpen}
              onHide={this.closeRenewModal}
              onShow={this.showRenewModal}
              manualDisableSubmit={this.props.renewedStudy.submitting}
              validateAndSubmit={this.handleRenewStudyFormSubmit}
              currentUserStripeCustomerId={this.props.currentUserStripeCustomerId}
            />
            <UpgradeStudyForm
              selectedStudy={selectedStudy}
              show={this.state.upgradeModalOpen}
              onHide={this.closeUpgradeModal}
              onShow={this.showUpgradeModal}
              manualDisableSubmit={this.props.upgradedStudy.submitting}
              validateAndSubmit={this.handleUpgradeStudyFormSubmit}
              currentUserStripeCustomerId={this.props.currentUserStripeCustomerId}
            />
            <EditStudyForm
              selectedStudyId={this.state.selectedStudyId}
              selectedSiteId={this.state.selectedSiteId}
              siteUsers={this.state.selectedSiteUsers}
              onSubmit={this.handleEditStudyFormSubmit}
              show={this.state.editModalOpen}
              onHide={this.closeEditModal}
              onShow={this.showEditModal}
              clientAdmins={this.props.clientAdmins}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  currentUserStripeCustomerId: selectCurrentUserStripeCustomerId(),
  editedStudy: selectEditedStudy(),
  editStudyFormValues: selectEditStudyFormValues(),
  editStudyFormError: selectEditStudyFormError(),
  paginationOptions: selectPaginationOptions(),
  renewedStudy: selectRenewedStudy(),
  renewStudyFormValues: selectRenewStudyFormValues(),
  renewStudyFormError: selectRenewStudyFormError(),
  selectedIndicationLevelPrice: selectSelectedIndicationLevelPrice(),
  shoppingCartFormError: selectShoppingCartFormError(),
  shoppingCartFormValues: selectShoppingCartFormValues(),
  sitePatients: selectSitePatients(),
  studies: selectStudies(),
  studyLevels: selectStudyLevels(),
  upgradeStudyFormValues: selectUpgradeStudyFormValues(),
  upgradeStudyFormError: selectUpgradeStudyFormError(),
  upgradedStudy: selectUpgradedStudy(),
  currentUserClientId: selectCurrentUserClientId(),
  clientSites: selectClientSites(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearIndicationLevelPrice: () => dispatch(clearIndicationLevelPrice()),
    fetchLevels: () => dispatch(fetchLevels()),
    fetchIndicationLevelPrice: (levelId, indicationId) => dispatch(fetchIndicationLevelPrice(levelId, indicationId)),
    fetchUpgradeStudyPrice: (fromLevel, toLevel) => dispatch(fetchUpgradeStudyPrice(fromLevel, toLevel)),
    editStudy: (studyId, formValues) => dispatch(editStudy(studyId, formValues)),
    renewStudy: (studyId, cartValues, formValues) => dispatch(renewStudy(studyId, cartValues, formValues)),
    saveCard: (customerId, cardData) => dispatch(saveCard(customerId, cardData)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    sortSuccess: (payload) => dispatch(sortSuccess(payload)),
    touchEditStudy: () => dispatch(touch('editStudy', ...editStudyFields)),
    touchRenewStudy: () => dispatch(touch('renewStudy', ...renewStudyFields)),
    touchUpgradeStudy: () => dispatch(touch('upgradeStudy', ...upgradeStudyFields)),
    touchShoppingCart: () => dispatch(touch('shoppingCart', ...shoppingCartFields)),
    upgradeStudy: (studyId, cartValues, formValues) => dispatch(upgradeStudy(studyId, cartValues, formValues)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudiesList);
