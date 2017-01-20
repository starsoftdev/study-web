import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change, reset } from 'redux-form';
import { Modal } from 'react-bootstrap';
import moment from 'moment';

import CenteredModal from '../../../components/CenteredModal/index';
import Input from 'components/Input';
import ReactSelect from 'components/Input/ReactSelect';
import DatePicker from 'components/Input/DatePicker';
import Toggle from 'components/Input/Toggle';
import ShoppingCartForm from 'components/ShoppingCartForm';
import AddNewCardForm from 'components/AddNewCardForm';
import {
  selectRenewStudyFormCampaignLengthValue,
} from './selectors';
import { selectStudyLevels } from 'containers/App/selectors';
import { saveCard } from 'containers/App/actions';
import { selectSelectedIndicationLevelPrice } from 'containers/HomePage/selectors';
import { CAMPAIGN_LENGTH_LIST, MESSAGING_SUITE_PRICE, CALL_TRACKING_PRICE } from 'common/constants';
import formValidator from './validator';
import LoadingSpinner from 'components/LoadingSpinner';
import _, { find } from 'lodash';

const mapStateToProps = createStructuredSelector({
  studyLevels: selectStudyLevels(),
  selectedIndicationLevelPrice: selectSelectedIndicationLevelPrice(),
  campaignLength: selectRenewStudyFormCampaignLengthValue(),
});

@reduxForm({ form: 'renewStudy', validate: formValidator })

class RenewStudyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    studyLevels: PropTypes.array,
    selectedIndicationLevelPrice: PropTypes.object,
    campaignLength: PropTypes.number,
    selectedStudy: PropTypes.object,
    show: PropTypes.bool,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    saveCard: PropTypes.func,
    currentUserStripeCustomerId: PropTypes.string,
    resetForm: PropTypes.func,
    manualDisableSubmit: PropTypes.bool,
    validateAndSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleNewModalOpen = this.handleNewModalOpen.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.generateRenewStudyShoppingCartAddOns = this.generateRenewStudyShoppingCartAddOns.bind(this);
    this.onSaveCard = this.onSaveCard.bind(this);
    this.closeAddCardModal = this.closeAddCardModal.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleExposureChoose = this.handleExposureChoose.bind(this);
    this.handleLengthChoose = this.handleLengthChoose.bind(this);
    this.handleCondenseChoose = this.handleCondenseChoose.bind(this);
    this.handlePatientChoose = this.handlePatientChoose.bind(this);
    this.handleCallChoose = this.handleCallChoose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      exposureLevel: null,
      campaignLength: null,
      condenseToTwoWeeks: false,
      patientMessagingSuite: false,
      callTracking: false,
      addCardModalOpen: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.campaignLength !== this.props.campaignLength) {
      if (newProps.campaignLength !== 1) {
        this.props.dispatch(change('renewStudy', 'condenseToTwoWeeks', false));
      }
    }
  }

  onSaveCard(params) {
    this.props.saveCard(this.props.currentUserStripeCustomerId, params);
  }

  closeAddCardModal() {
    this.setState({
      addCardModalOpen: false,
    });
    this.props.onShow();
  }

  resetState() {
    const resetState = {
      exposureLevel: null,
      campaignLength: null,
      condenseToTwoWeeks: false,
      patientMessagingSuite: false,
      callTracking: false,
    };

    this.setState(resetState, () => {
      this.props.resetForm();
    });
  }

  handleCloseModal() {
    this.props.onHide(false);
    this.resetState();
  }

  handleNewModalOpen() {
    this.setState({
      addCardModalOpen: true,
    });
    this.props.onHide(true);
  }

  handleExposureChoose(e) {
    this.setState({
      exposureLevel: e,
    });
  }

  handleLengthChoose(e) {
    this.setState({
      campaignLength: e,
    });
  }

  handleCondenseChoose(e) {
    this.setState({
      condenseToTwoWeeks: e,
    });
  }

  handlePatientChoose(e) {
    this.setState({
      patientMessagingSuite: e,
    });
  }

  handleCallChoose(e) {
    this.setState({
      callTracking: e,
    });
  }

  handleSubmit() {
    this.resetState();
    this.props.validateAndSubmit();
  }

  generateRenewStudyShoppingCartAddOns() {
    const { studyLevels, selectedIndicationLevelPrice } = this.props;
    const { exposureLevel, campaignLength, condenseToTwoWeeks,
      patientMessagingSuite, callTracking } = this.state;
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
    const { studyLevels, campaignLength, selectedIndicationLevelPrice, selectedStudy } = this.props;

    let initDate = moment();
    let minDate = 'none';

    if (selectedStudy && selectedStudy.maxCampaign && selectedStudy.maxCampaign.dateTo) {
      minDate = moment.utc(selectedStudy.maxCampaign.dateTo).add(1, 'days');
      if (initDate <= minDate) {
        initDate = _.cloneDeep(minDate);
      }
    }

    const addOns = this.generateRenewStudyShoppingCartAddOns();

    return (
      <div>
        <Modal
          className="renew-study-modal"
          id="renew-study"
          dialogComponentClass={CenteredModal}
          show={this.props.show}
          onHide={this.handleCloseModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>Renew Study</Modal.Title>
            <a className="lightbox-close close" onClick={this.handleCloseModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="form-study">
              <div className="pull-left col">
                <div className="scroll jcf--scrollable">
                  <div className="holder-inner">
                    <form className="form-renew-study">
                      <div className="renew-study form-fields">
                        <div className="field-row">
                          <strong className="label required">
                            <label>EXPOSURE LEVEL</label>
                          </strong>
                          <div className="field">
                            <Field
                              name="exposureLevel"
                              className="with-loader-disabled-for-now"
                              component={ReactSelect}
                              placeholder="Select Exposure Level"
                              options={studyLevels}
                              disabled={selectedIndicationLevelPrice.fetching}
                              onChange={this.handleExposureChoose}
                            />
                            {selectedIndicationLevelPrice.fetching &&
                            (
                              <span className="hide">
                                <LoadingSpinner showOnlyIcon size={20} />
                              </span>
                            )
                            }
                          </div>
                        </div>
                        <div className="field-row">
                          <strong className="label required">
                            <label>CAMPAIGN LENGTH</label>
                          </strong>
                          <div className="field">
                            <Field
                              name="campaignLength"
                              component={ReactSelect}
                              placeholder="Select Campaign Length"
                              options={CAMPAIGN_LENGTH_LIST}
                              onChange={this.handleLengthChoose}
                            />
                          </div>
                        </div>
                        {campaignLength === 1 &&
                        (
                          <div className="field-row">
                            <strong className="label">
                              <label>CONDENSE TO 2 WEEKS</label>
                            </strong>
                            <div className="field">
                              <Field
                                name="condenseToTwoWeeks"
                                component={Toggle}
                                onChange={this.handleCondenseChoose}
                              />
                            </div>
                          </div>
                        )
                        }
                        <div className="field-row">
                          <strong className="label">
                            <label>PATIENT MESSAGING SUITE: $247</label>
                          </strong>
                          <div className="field">
                            <Field
                              name="patientMessagingSuite"
                              component={Toggle}
                              onChange={this.handlePatientChoose}
                            />
                          </div>
                        </div>
                        {false &&
                          <div className="field-row">
                            <strong className="label">
                              <label>CALL TRACKING: $247</label>
                            </strong>
                            <div className="field">
                              <Field
                                name="callTracking"
                                component={Toggle}
                                onChange={this.handleCallChoose}
                              />
                            </div>
                          </div>
                        }
                        <div className="field-row">
                          <strong className="label required">
                            <label>START DATE</label>
                          </strong>
                          <div className="field">
                            <Field
                              name="startDate"
                              component={DatePicker}
                              className="form-control datepicker-input"
                              initialDate={initDate}
                              minDate={minDate}
                            />
                          </div>
                        </div>
                        <div className="field-row label-top">
                          <strong className="label">
                            <label>NOTES</label>
                          </strong>
                          <div className="field">
                            <Field
                              name="notes"
                              component={Input}
                              componentClass="textarea"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="pull-left col">
                <ShoppingCartForm
                  showCards
                  noBorder
                  addOns={addOns}
                  manualDisableSubmit={this.props.manualDisableSubmit}
                  validateAndSubmit={this.handleSubmit}
                  showAddNewCard={this.handleNewModalOpen}
                />
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

function mapDispatchToProps(dispatch) {
  return {
    saveCard: (customerId, cardData) => dispatch(saveCard(customerId, cardData)),
    resetForm: () => dispatch(reset('renewStudy')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RenewStudyForm);
