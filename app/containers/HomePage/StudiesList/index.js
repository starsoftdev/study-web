import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { countBy, find } from 'lodash';

import { selectStudyLevels, selectCurrentUserStripeCustomerId } from 'containers/App/selectors';
import { CAMPAIGN_LENGTH_LIST, MESSAGING_SUITE_PRICE, CALL_TRACKING_PRICE } from 'common/constants';
import { selectStudies, selectSelectedIndicationLevelPrice, selectRenewedStudy } from 'containers/HomePage/selectors';
import { ACTIVE_STATUS_VALUE, INACTIVE_STATUS_VALUE } from 'containers/HomePage/constants';
import { fetchIndicationLevelPrice, clearIndicationLevelPrice, renewStudy } from 'containers/HomePage/actions';
import { selectRenewStudyFormValues, selectRenewStudyFormError } from 'containers/HomePage/RenewStudyForm/selectors';
import StudyItem from './StudyItem';
import RenewStudyForm from 'containers/HomePage/RenewStudyForm';
import ShoppingCartForm from 'components/ShoppingCartForm';
import './styles.less';

class StudiesList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUserStripeCustomerId: PropTypes.string,
    studies: PropTypes.object,
    studyLevels: PropTypes.array,
    selectedIndicationLevelPrice: PropTypes.object,
    renewStudyFormValues: PropTypes.object,
    renewStudyFormError: PropTypes.bool,
    renewedStudy: PropTypes.object,
    fetchIndicationLevelPrice: PropTypes.func,
    clearIndicationLevelPrice: PropTypes.func,
    renewStudy: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      renewModalOpen: false,
      upgradeModalOpen: false,
      editModalOpen: false,
      selectedStudyId: null,
      selectedIndicationId: null,
    };

    this.openRenewModal = this.openRenewModal.bind(this);
    this.openUpgradeModal = this.openUpgradeModal.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.closeRenewModal = this.closeRenewModal.bind(this);
    this.closeUpgradeModal = this.closeUpgradeModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleRenewStudyFormSubmit = this.handleRenewStudyFormSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const newRenewedStudy = newProps.renewedStudy;
    const oldRenewedStudy = this.props.renewedStudy;
    const newExposureLevel = newProps.renewStudyFormValues.exposureLevel;
    const oldExposureLevel = this.props.renewStudyFormValues.exposureLevel;

    if (!newRenewedStudy.submitting && oldRenewedStudy.submitting) {
      this.closeRenewModal();
    }

    if (newExposureLevel !== oldExposureLevel) {
      if (newExposureLevel) {
        this.props.fetchIndicationLevelPrice(newExposureLevel, this.state.selectedIndicationId);
      } else {
        this.props.clearIndicationLevelPrice();
      }
    }
  }

  openRenewModal(studyId, indicationId) {
    this.setState({
      renewModalOpen: true,
      selectedStudyId: studyId,
      selectedIndicationId: indicationId,
    });
  }

  openUpgradeModal(studyId) {
    this.setState({
      upgradeModalOpen: true,
      selectedStudyId: studyId,
    });
  }

  openEditModal(studyId) {
    this.setState({
      editModalOpen: true,
      selectedStudyId: studyId,
    });
  }

  closeRenewModal() {
    this.setState({
      renewModalOpen: false,
      selectedStudyId: null,
      selectedIndicationId: null,
    });
  }

  closeUpgradeModal() {
    this.setState({
      upgradeModalOpen: false,
      selectedStudyId: null,
      selectedIndicationId: null,
    });
  }

  closeEditModal() {
    this.setState({
      editModalOpen: false,
      selectedStudyId: null,
      selectedIndicationId: null,
    });
  }

  handleRenewStudyFormSubmit(cartParams) {
    const { currentUserStripeCustomerId, renewStudyFormValues, renewStudy } = this.props;

    renewStudy(cartParams, { ...renewStudyFormValues, stripeCustomerId: currentUserStripeCustomerId, studyId: this.state.selectedStudyId });
  }

  generateRenewStudyShoppingCartAddOns() {
    const { studyLevels, selectedIndicationLevelPrice } = this.props;
    const { exposureLevel, campaignLength, condenseToTwoWeeks,
      patientMessagingSuite, callTracking } = this.props.renewStudyFormValues;
    const addOns = [];

    if (exposureLevel && campaignLength) {
      if (!selectedIndicationLevelPrice.fetching && selectedIndicationLevelPrice.details) {
        const foundExposureLevel = find(studyLevels, { id: exposureLevel });
        const monthLength = find(CAMPAIGN_LENGTH_LIST, { value: campaignLength });
        const durationString = (condenseToTwoWeeks) ? '2 Weeks' : monthLength.label;

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

  render() {
    const { studies, renewStudyFormError } = this.props;
    const countResult = countBy(studies.details, entityIterator => entityIterator.status);
    const activeCount = countResult[ACTIVE_STATUS_VALUE] || 0;
    const inactiveCount = countResult[INACTIVE_STATUS_VALUE] || 0;
    const totalCount = studies.details.length;
    const addOns = this.generateRenewStudyShoppingCartAddOns();
    const studiesListContents = studies.details.map((item, index) => (
      <StudyItem
        {...item}
        key={index}
        index={index}
        onRenew={this.openRenewModal}
        onUpgrade={this.openUpgradeModal}
        onEdit={this.openEditModal}
      />
    ));

    if (studies.details.length > 0) {
      return (
        <div className="studies">
          <div className="row">
            <div className="col-sm-12">
              <div className="table-responsive">
                <table className="table table-striped">
                  <caption>
                    <span className="pull-left">Study/Site Status</span>
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
                      <th>#</th>
                      <th>INDICATION</th>
                      <th>LOCATION</th>
                      <th>SPONSOR</th>
                      <th>PROTOCOL</th>
                      <th>
                        <span className="icon-credit" data-original-title="Patient Messaging Suite"></span>
                      </th>
                      <th>STATUS</th>
                      <th>START DATE</th>
                      <th>END DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studiesListContents}
                  </tbody>
                </table>
              </div>
              <Modal className="renew-study-modal" show={this.state.renewModalOpen} onHide={this.closeRenewModal} bsSize="large">
                <Modal.Header closeButton>
                  <Modal.Title>Renew Study</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    <div className="left-panel col-sm-6">
                      <RenewStudyForm />
                    </div>
                    <div className="right-panel col-sm-6">
                      <ShoppingCartForm
                        showCards
                        noBorder
                        addOns={addOns}
                        disableSubmit={renewStudyFormError}
                        onSubmit={this.handleRenewStudyFormSubmit}
                      />
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h3>No studies found!</h3>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserStripeCustomerId: selectCurrentUserStripeCustomerId(),
  studies: selectStudies(),
  studyLevels: selectStudyLevels(),
  selectedIndicationLevelPrice: selectSelectedIndicationLevelPrice(),
  renewStudyFormValues: selectRenewStudyFormValues(),
  renewStudyFormError: selectRenewStudyFormError(),
  renewedStudy: selectRenewedStudy(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchIndicationLevelPrice: (levelId, indicationId) => dispatch(fetchIndicationLevelPrice(levelId, indicationId)),
    clearIndicationLevelPrice: () => dispatch(clearIndicationLevelPrice()),
    renewStudy: (cartValues, formValues) => dispatch(renewStudy(cartValues, formValues)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudiesList);
