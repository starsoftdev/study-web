import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import { touch, reset } from 'redux-form';
import ReactTooltip from 'react-tooltip';

import LoadingSpinner from '../../components/LoadingSpinner';
import { selectShoppingCartFormError, selectShoppingCartFormValues } from '../../components/ShoppingCartForm/selectors';
import { shoppingCartFields } from '../../components/ShoppingCartForm/validator';
import { fetchLevels, saveCard, fetchClientAdmins } from '../../containers/App/actions';
import { selectCurrentUser, selectStudyLevels, selectCurrentUserStripeCustomerId, selectCurrentUserClientId, selectClientSites } from '../../containers/App/selectors';
import { fetchIndicationLevelPrice, clearIndicationLevelPrice, renewStudy, upgradeStudy, editStudy, setActiveSort, sortSuccess, fetchUpgradeStudyPrice, fetchStudies } from '../../containers/HomePage/actions';
import { selectStudies, selectSelectedIndicationLevelPrice, selectRenewedStudy, selectUpgradedStudy, selectEditedStudy, selectPaginationOptions, selectHomePageClientAdmins } from '../../containers/HomePage/selectors';
import { selectSyncErrorBool } from '../../common/selectors/form.selector';
import { selectRenewStudyFormValues, selectRenewStudyFormError, selectRenewStudyFields } from '../../components/RenewStudyForm/selectors';
import { selectUpgradeStudyFormValues, selectUpgradeStudyFormError, selectUpgradeStudyFields } from '../../components/UpgradeStudyForm/selectors';
import { selectEditStudyFields } from '../../components/EditStudyForm/selectors';
import RenewStudyForm from '../../components/RenewStudyForm/index';
import UpgradeStudyForm from '../../components/UpgradeStudyForm/index';
import EditStudyForm from '../../components/EditStudyForm';
import StudyItem from './StudyItem';
import pqsImage from '../../assets/images/pqs.png';

class StudiesList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clientId: PropTypes.number,
    sites: PropTypes.object,
    clearIndicaoionLevelPrice: PropTypes.func,
    currentUserStripeCustomerId: PropTypes.string,
    currentUser: PropTypes.object.isRequired,
    fetchLevels: PropTypes.func,
    fetchIndicationLevelPrice: PropTypes.func,
    fetchUpgradeStudyPrice: PropTypes.func,
    editStudy: PropTypes.func,
    editedStudy: PropTypes.object,
    editStudyFormError: PropTypes.bool,
    editStudyFields: PropTypes.array,
    paginationOptions: React.PropTypes.object,
    renewStudyFormError: PropTypes.bool,
    renewStudyFormValues: PropTypes.object,
    renewStudyFields: PropTypes.array,
    renewedStudy: PropTypes.object,
    renewStudy: PropTypes.func,
    reset: PropTypes.func.isRequired,
    selectedIndicationLevelPrice: PropTypes.object,
    setActiveSort: PropTypes.func,
    shoppingCartFormError: PropTypes.bool,
    shoppingCartFormValues: PropTypes.object,
    sortSuccess: PropTypes.func,
    studies: PropTypes.object,
    fetchStudies: PropTypes.func,
    clientAdmins: PropTypes.object,
    studyLevels: PropTypes.array,
    touchEditStudy: PropTypes.func,
    touchRenewStudy: PropTypes.func,
    touchUpgradeStudy: PropTypes.func,
    touchShoppingCart: PropTypes.func,
    upgradeStudy: PropTypes.func,
    upgradedStudy: PropTypes.object,
    upgradeStudyFormValues: PropTypes.object,
    upgradeStudyFields: PropTypes.array,
    upgradeStudyFormError: PropTypes.bool,
    saveCard: PropTypes.func,
    clearIndicationLevelPrice: PropTypes.func,
    currentUserClientId: PropTypes.number,
    fetchClientAdmins: PropTypes.func.isRequired,
    queryParams: PropTypes.object,
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
    this.loadItems = this.loadItems.bind(this);
    this.renderStudiesTable = this.renderStudiesTable.bind(this);
  }

  componentWillMount() {
    const { currentUser, fetchClientAdmins } = this.props;
    if (currentUser && currentUser.roleForClient.isAdmin) {
      fetchClientAdmins(currentUser.roleForClient.client_id);
    }
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
    const studies = this.props.studies;
    const queryParams = this.props.queryParams;

    if (!newRenewedStudy.submitting && oldRenewedStudy.submitting) {
      let allowFetch = false;

      if (queryParams.status === 'Active') {
        allowFetch = (studies.active > queryParams.skip);
      } else if (queryParams.status === 'Inactive') {
        allowFetch = (studies.inactive > queryParams.skip);
      } else {
        allowFetch = (studies.total > queryParams.skip);
      }

      if (queryParams.hasMoreItems && !studies.fetching && allowFetch) {
        const params = queryParams;
        params.filter = false;
        this.props.fetchStudies(this.props.currentUser, params);
      }
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

  componentWillUnmount() {
    const defaultSort = 'orderNumber';
    this.props.setActiveSort(defaultSort, null);
  }

  onSaveCard(params) {
    this.props.saveCard(this.props.currentUserClientId, this.props.currentUserStripeCustomerId, params);
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
      const { reset } = this.props;
      reset('renewStudy');
      reset('shoppingCart');
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
      touchRenewStudy, touchShoppingCart, renewStudyFields } = this.props;

    if (renewStudyFormError || shoppingCartFormError) {
      touchRenewStudy(renewStudyFields);
      touchShoppingCart();
      return;
    }
    const studyLevel = _.find(this.props.studyLevels, { id: renewStudyFormValues.exposureLevel });
    const selectedStudy = _.find(this.props.studies.details, (o) => (o.studyId === this.state.selectedStudyId));

    const eSelectedSite = _.find(this.props.sites.details, (o) => (o.id === this.state.selectedSiteId));
    const eSelectedStudy = _.find(eSelectedSite.studies, (o) => (o.id === this.state.selectedStudyId));

    const emailNotificationArray = [];
    _.forEach(this.props.sites.details, (site) => {
      _.forEach(site.roles, (role) => {
        const isChecked = _.find(eSelectedStudy.studyNotificationEmails, (item) => (item.user_id === role.user_id));
        if (isChecked && role.user) {
          emailNotificationArray.push({
            firstName: role.user.firstName,
            lastName: role.user.lastName,
            userId: role.user.email,
          });
        }
      });
    });

    if (this.props.clientAdmins) {
      // add admin users to the list
      _.forEach(this.props.clientAdmins.details, (role) => {
        const isChecked = _.find(eSelectedStudy.studyNotificationEmails, (item) => (item.user_id === role.userId));
        if (isChecked && role) {
          emailNotificationArray.push({
            firstName: role.firstName,
            lastName: role.lastName,
            userId: role.email,
          });
        }
      });
    }

    renewStudy(this.state.selectedStudyId, shoppingCartFormValues, {
      ...selectedStudy,
      ...renewStudyFormValues,
      stripeCustomerId: currentUserStripeCustomerId,
      selectedIndicationId: this.state.selectedIndicationId,
      selectedSiteId: this.state.selectedSiteId,
      user_id: this.props.currentUser.id,
      currentUser: this.props.currentUser,
      indicationName: this.state.indicationName,
      locationName: this.state.locationName,
      exposureLevelName: studyLevel.label,
      client_id: this.props.currentUser.roleForClient.client_id,
      studyNotificationEmails: emailNotificationArray,
    }, this.closeRenewModal);
  }

  handleUpgradeStudyFormSubmit() {
    const { shoppingCartFormError, shoppingCartFormValues, upgradeStudyFormError, touchUpgradeStudy, touchShoppingCart,
      currentUserStripeCustomerId, upgradeStudyFormValues, upgradeStudy, upgradeStudyFields } = this.props;

    if (upgradeStudyFormError || shoppingCartFormError) {
      touchUpgradeStudy(upgradeStudyFields);
      touchShoppingCart();
      return;
    }

    const selectedStudy = _.find(this.props.studies.details, (o) => (o.studyId === this.state.selectedStudyId));
    const pqsIsSelected = (selectedStudy.patientQualificationSuite === 'Off' && upgradeStudyFormValues.addPatientQualificationSuite);
    const levelIsSelected = upgradeStudyFormValues.level;
    const callTrackingIsSelected = (!selectedStudy.callTracking && upgradeStudyFormValues.callTracking);

    if (!pqsIsSelected && !levelIsSelected && !callTrackingIsSelected) {
      return;
    }

    if (!upgradeStudyFormValues.level) {
      upgradeStudyFormValues.level = selectedStudy.level_id;
    }
    const studyLevel = _.find(this.props.studyLevels, { id: upgradeStudyFormValues.level });

    const eSelectedSite = _.find(this.props.sites.details, (o) => (o.id === this.state.selectedSiteId));
    const eSelectedStudy = _.find(eSelectedSite.studies, (o) => (o.id === this.state.selectedStudyId));

    const emailNotificationArray = [];
    _.forEach(this.props.sites.details, (site) => {
      _.forEach(site.roles, (role) => {
        if (role.user) {
          const isChecked = _.find(eSelectedStudy.studyNotificationEmails, (item) => (item.user_id === role.user.id));
          if (isChecked) {
            emailNotificationArray.push({
              firstName: role.user.firstName,
              lastName: role.user.lastName,
              userId: role.user.email,
            });
          }
        }
      });
    });

    if (this.props.clientAdmins) {
      // add admin users to the list
      _.forEach(this.props.clientAdmins.details, (role) => {
        const isChecked = _.find(eSelectedStudy.studyNotificationEmails, (item) => (item.user_id === role.userId));
        if (isChecked) {
          emailNotificationArray.push({
            firstName: role.firstName,
            lastName: role.lastName,
            userId: role.email,
          });
        }
      });
    }

    upgradeStudy(this.state.selectedStudyId, shoppingCartFormValues, {
      ...selectedStudy,
      ...upgradeStudyFormValues,
      stripeCustomerId: currentUserStripeCustomerId,
      selectedIndicationId: this.state.selectedIndicationId,
      selectedCampaignId: selectedStudy.campaignId,
      prevLevelId: selectedStudy.level_id,
      selectedSiteId: this.state.selectedSiteId,
      user_id: this.props.currentUser.id,
      currentUser: this.props.currentUser,
      indicationName: this.state.indicationName,
      locationName: this.state.locationName,
      exposureLevelName: studyLevel.label,
      campaignlength: selectedStudy.campaignlength,
      client_id: this.props.currentUser.roleForClient.client_id,
      name: '',
      studyNotificationEmails: emailNotificationArray,
    });
  }

  handleEditStudyFormSubmit(params) {
    const { editStudyFormError, touchEditStudy, editStudyFields } = this.props;
    if (editStudyFormError) {
      touchEditStudy(editStudyFields);
      return;
    }

    this.props.editStudy(this.state.selectedStudyId, { ...params, clientId: this.props.currentUserClientId });
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

  loadItems() {
    const { queryParams, studies } = this.props;

    let allowFetch = false;

    if (queryParams.status === 'Active') {
      allowFetch = (studies.active > queryParams.skip);
    } else if (queryParams.status === 'Inactive') {
      allowFetch = (studies.inactive > queryParams.skip);
    } else {
      allowFetch = (studies.total > queryParams.skip);
    }

    if (queryParams.hasMoreItems && !studies.fetching && allowFetch) {
      const params = queryParams;
      params.filter = false;
      this.props.fetchStudies(this.props.currentUser, params);
    }
  }

  renderStudiesTable() {
    const { studies, currentUser, sites, queryParams } = this.props;
    let selectedSiteID = null;
    if (currentUser && currentUser.roleForClient) {
      selectedSiteID = (currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin') ? null : true;
      if (selectedSiteID) {
        selectedSiteID = currentUser.roleForClient.site_id ? currentUser.roleForClient.site_id : null;
      }
    }
    let siteArray = [];
    if (sites && sites.details) {
      siteArray = sites.details.map((item) =>
        item.id
      );
    }

    const studiesListContents = studies.details.map((item, index) => {
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
          unreadMessageCount={item.unreadMessageCount}
          onRenew={this.openRenewModal}
          onUpgrade={this.openUpgradeModal}
          onEdit={this.openEditModal}
        />
      );
    });

    let showSpinner = false;

    if (queryParams.status === 'Active') {
      showSpinner = (studies.active > queryParams.skip);
    } else if (queryParams.status === 'Inactive') {
      showSpinner = (studies.inactive > queryParams.skip);
    } else {
      showSpinner = (studies.total > queryParams.skip);
    }

    if (!studies.details.length && studies.fetching) {
      return (
        <tbody>
          <tr>
            <td colSpan="9">
              <LoadingSpinner showOnlyIcon={false} noMessage />
            </td>
          </tr>
        </tbody>
      );
    }

    if (studies.details.length > 0) {
      return (
        <InfiniteScroll
          element="tbody"
          pageStart={0}
          loadMore={this.loadItems}
          initialLoad={false}
          hasMore={queryParams.hasMoreItems}
          loader={null}
        >
          {studiesListContents}
          {(studies.fetching && showSpinner) &&
            <tr>
              <td colSpan="9">
                <LoadingSpinner showOnlyIcon={false} noMessage />
              </td>
            </tr>
          }
        </InfiniteScroll>
      );
    }

    return null;
  }

  render() {
    const { studies, upgradeStudyFormValues, renewStudyFormValues } = this.props;

    let selectedStudy = null; studies.details.forEach((item) => {
      if (item.studyId === this.state.selectedStudyId) {
        selectedStudy = item;
      }
    });

    return (
      <div className="studies">
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table has-absolute-caption">
                <caption className="absolute-caption">
                  <span className="pull-left">Study Status</span>
                  <span className="pull-right">
                    <span className="inner-info">
                      <span className="info-label">ACTIVE</span>
                      <span className="info-value">{studies.active || 0}</span>
                    </span>
                    <span className="inner-info">
                      <span className="info-label">INACTIVE</span>
                      <span className="info-value">{studies.inactive || 0}</span>
                    </span>
                    <span className="inner-info">
                      <span className="info-label">TOTAL</span>
                      <span className="info-value">{studies.total || 0}</span>
                    </span>
                  </span>
                </caption>
                <thead>
                  <tr>
                    <th className="default-cursor">#<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="indication" className={(this.props.paginationOptions.activeSort === 'indication') ? this.props.paginationOptions.activeDirection : ''}>INDICATION<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="location" className={(this.props.paginationOptions.activeSort === 'location') ? this.props.paginationOptions.activeDirection : ''}>LOCATION<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="sponsor" className={(this.props.paginationOptions.activeSort === 'sponsor') ? this.props.paginationOptions.activeDirection : ''}>SPONSOR<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="protocol" className={(this.props.paginationOptions.activeSort === 'protocol') ? this.props.paginationOptions.activeDirection : ''}>PROTOCOL<i className="caret-arrow" /></th>
                    <th className="default-cursor">
                      <img className="pqs-logo" src={pqsImage} alt="" data-for="pqs-logo" data-tip="Patient Qualification Suite" />
                      <ReactTooltip id="pqs-logo" type="info" class="tooltipClass wide" effect="solid" />
                    </th>
                    <th onClick={this.sortBy} data-sort="status" className={(this.props.paginationOptions.activeSort === 'status') ? this.props.paginationOptions.activeDirection : ''}>STATUS<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="startDate" className={(this.props.paginationOptions.activeSort === 'startDate') ? this.props.paginationOptions.activeDirection : ''}>START DATE<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="endDate" className={(this.props.paginationOptions.activeSort === 'endDate') ? this.props.paginationOptions.activeDirection : ''}>END DATE<i className="caret-arrow" /></th>
                  </tr>
                </thead>
                {this.renderStudiesTable()}
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
              formValues={renewStudyFormValues}
            />
            <UpgradeStudyForm
              selectedStudy={selectedStudy}
              show={this.state.upgradeModalOpen}
              onHide={this.closeUpgradeModal}
              onShow={this.showUpgradeModal}
              manualDisableSubmit={this.props.upgradedStudy.submitting}
              validateAndSubmit={this.handleUpgradeStudyFormSubmit}
              currentUserStripeCustomerId={this.props.currentUserStripeCustomerId}
              formValues={upgradeStudyFormValues}
            />
            <EditStudyForm
              selectedStudyId={this.state.selectedStudyId}
              selectedSiteId={this.state.selectedSiteId}
              siteUsers={this.state.selectedSiteUsers}
              onSubmit={this.handleEditStudyFormSubmit}
              show={this.state.editModalOpen}
              onHide={this.closeEditModal}
              onShow={this.showEditModal}
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
  editStudyFormError: selectSyncErrorBool('editStudy'),
  paginationOptions: selectPaginationOptions(),
  renewedStudy: selectRenewedStudy(),
  renewStudyFormValues: selectRenewStudyFormValues(),
  renewStudyFormError: selectRenewStudyFormError(),
  renewStudyFields: selectRenewStudyFields(),
  selectedIndicationLevelPrice: selectSelectedIndicationLevelPrice(),
  shoppingCartFormError: selectShoppingCartFormError(),
  shoppingCartFormValues: selectShoppingCartFormValues(),
  studies: selectStudies(),
  studyLevels: selectStudyLevels(),
  upgradeStudyFormValues: selectUpgradeStudyFormValues(),
  upgradeStudyFormError: selectUpgradeStudyFormError(),
  upgradeStudyFields: selectUpgradeStudyFields(),
  upgradedStudy: selectUpgradedStudy(),
  editStudyFields: selectEditStudyFields(),
  currentUserClientId: selectCurrentUserClientId(),
  sites: selectClientSites(),
  clientAdmins: selectHomePageClientAdmins(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearIndicationLevelPrice: () => dispatch(clearIndicationLevelPrice()),
    fetchLevels: () => dispatch(fetchLevels()),
    fetchIndicationLevelPrice: (levelId, indicationId) => dispatch(fetchIndicationLevelPrice(levelId, indicationId)),
    fetchUpgradeStudyPrice: (fromLevel, toLevel) => dispatch(fetchUpgradeStudyPrice(fromLevel, toLevel)),
    editStudy: (studyId, options) => dispatch(editStudy(studyId, options)),
    renewStudy: (studyId, cartValues, formValues, onClose) => dispatch(renewStudy(studyId, cartValues, formValues, onClose)),
    saveCard: (clientId, customerId, cardData) => dispatch(saveCard(clientId, customerId, cardData)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    sortSuccess: (payload) => dispatch(sortSuccess(payload)),
    reset: (formName) => dispatch(reset(formName)),
    touchEditStudy: (fields) => dispatch(touch('editStudy', ...fields)),
    touchRenewStudy: (fields) => dispatch(touch('renewStudy', ...fields)),
    touchUpgradeStudy: (fields) => dispatch(touch('upgradeStudy', ...fields)),
    touchShoppingCart: () => dispatch(touch('shoppingCart', ...shoppingCartFields)),
    upgradeStudy: (studyId, cartValues, formValues) => dispatch(upgradeStudy(studyId, cartValues, formValues)),
    fetchStudies: (currentUser, searchParams) => dispatch(fetchStudies(currentUser, searchParams)),
    fetchClientAdmins: (id) => dispatch(fetchClientAdmins(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudiesList);
