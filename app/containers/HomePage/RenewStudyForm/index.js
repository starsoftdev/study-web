import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change, reset } from 'redux-form';
import { Modal } from 'react-bootstrap';
import { Calendar } from 'react-date-range';
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
import { CAMPAIGN_LENGTH_LIST, MESSAGING_SUITE_PRICE, QUALIFICATION_SUITE_PRICE, CALL_TRACKING_PRICE, QUALIFICATION_SUITE_UPGRADE_PRICE } from 'common/constants';
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
    this.handleMessagingChoose = this.handleMessagingChoose.bind(this);
    this.handleQualificationChoose = this.handleQualificationChoose.bind(this);
    this.handleCallChoose = this.handleCallChoose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDatePickerClose = this.handleDatePickerClose.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.navigateToday = this.navigateToday.bind(this);
    this.state = {
      exposureLevel: null,
      campaignLength: null,
      condenseToTwoWeeks: false,
      patientMessagingSuite: false,
      patientQualificationSuite: false,
      callTracking: false,
      addCardModalOpen: false,
      showDatePicker: false,
      initDate: moment(),
      minDate: 'none',
      dateStyle: 'MM/DD/YY',
      isReset: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.campaignLength !== this.props.campaignLength) {
      if (newProps.campaignLength !== 1) {
        this.props.dispatch(change('renewStudy', 'condenseToTwoWeeks', false));
      }
    }

    if (newProps.selectedStudy) {
      const { patientMessagingSuite, patientQualificationSuite } = newProps.selectedStudy;

      if (patientMessagingSuite === 'On' && patientMessagingSuite === 'Off') {
        this.props.dispatch(change('renewStudy', 'addPatientMessagingSuite', true));
      }

      if (patientQualificationSuite === 'On') {
        this.props.dispatch(change('renewStudy', 'addPatientQualificationSuite', true));
        this.props.dispatch(change('renewStudy', 'addPatientMessagingSuite', false));
      }
    }

    if (newProps.selectedStudy && newProps.selectedStudy.maxCampaign && newProps.selectedStudy.maxCampaign.dateTo && !this.state.isReset) {
      const minDate = moment.utc(newProps.selectedStudy.maxCampaign.dateTo).add(1, 'days');
      this.setState({
        minDate: moment.utc(newProps.selectedStudy.maxCampaign.dateTo).add(1, 'days'),
      });

      if (this.state.initDate <= minDate) {
        this.setState({
          initDate: _.cloneDeep(minDate),
        });
      }
    }
  }

  onSaveCard(params) {
    this.props.saveCard(this.props.currentUserStripeCustomerId, params);
  }

  setToBeDetermined = () => {
    this.setState({
      initDate: null,
    });
    this.props.dispatch(change('renewStudy', 'startDate', null));
  }

  handleDateSelect(date) {
    this.setState({
      initDate: date,
    });
    this.props.dispatch(change('renewStudy', 'startDate', date));
    this.handleDatePickerClose(false);
  }

  navigateToday() {
    const today = moment();
    const todayYear = today.year();
    const todayMonth = today.month();
    const calendarYear = this.calendar.getShownDate().year();
    const calendarMonth = this.calendar.getShownDate().month();
    const monthDiff = ((todayYear - calendarYear) * 12) + (todayMonth - calendarMonth);

    this.calendar.changeMonth(monthDiff, { preventDefault: _.noop });
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
      initDate: moment(),
      minDate: 'none',
      isReset: false,
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

  handleMessagingChoose(e) {
    let { patientQualificationSuite } = this.state;
    if (e && this.state.patientQualificationSuite) {
      patientQualificationSuite = false;
      this.props.dispatch(change('renewStudy', 'addPatientQualificationSuite', false));
    }
    this.setState({
      patientMessagingSuite: e,
      patientQualificationSuite,
    });
  }

  handleQualificationChoose(e) {
    let { patientMessagingSuite } = this.state;
    if (e && this.state.patientMessagingSuite) {
      patientMessagingSuite = false;
      this.props.dispatch(change('renewStudy', 'addPatientMessagingSuite', false));
    }
    this.setState({
      patientQualificationSuite: e,
      patientMessagingSuite,
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

  handleDatePickerClose(flag) {
    this.setState({
      isReset: true,
      showDatePicker: flag,
    });
    if (flag) {
      this.props.onHide(true);
    } else {
      this.props.onShow();
    }
  }

  generateRenewStudyShoppingCartAddOns() {
    const { studyLevels, selectedIndicationLevelPrice, selectedStudy } = this.props;
    const { exposureLevel, campaignLength, condenseToTwoWeeks,
      patientMessagingSuite, patientQualificationSuite, callTracking } = this.state;
    const addOns = [];

    console.log('Selected Study', selectedStudy);

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
    if (patientQualificationSuite) {
      addOns.push({
        title: 'Patient Qualification Suite',
        price: QUALIFICATION_SUITE_PRICE,
        quantity: 1,
        total: QUALIFICATION_SUITE_PRICE,
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
    let patientQualificationSuite = false;
    let qualificationSuitePrice = QUALIFICATION_SUITE_PRICE;
    let patientMessagingSuite = false;

    _.reverse(studyLevels);

    if (selectedStudy) {
      patientQualificationSuite = selectedStudy.patientQualificationSuite;
      patientMessagingSuite = selectedStudy.patientMessagingSuite;

      if (patientMessagingSuite === 'On' && patientQualificationSuite === 'Off') {
        qualificationSuitePrice = QUALIFICATION_SUITE_UPGRADE_PRICE;
      }
    }

    const currentDate = moment();

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
                              name="addPatientMessagingSuite"
                              disabled={patientQualificationSuite === 'On' || patientMessagingSuite ==='On'}
                              component={Toggle}
                              onChange={this.handleMessagingChoose}
                            />
                          </div>
                        </div>
                        <div className="field-row">
                          <strong className="label"><label>Patient qualification <br />
                            Suite: $894 <br />
                            <span className="label-blue">(Includes patient <br />
                            messaging suite)</span></label></strong>
                          <div className="field">
                            <Field
                              name="addPatientQualificationSuite"
                              disabled={patientQualificationSuite === 'On'}
                              component={Toggle}
                              onChange={this.handleQualificationChoose}
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
                              initialDate={this.state.initDate}
                              minDate={this.state.minDate}
                              onClick={() => { this.handleDatePickerClose(true); }}
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
        <Modal
          className="datepicker-modal"
          dialogComponentClass={CenteredModal}
          show={this.state.showDatePicker}
          onHide={() => {
            this.handleDatePickerClose(false);
          }}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>Choose Start Date</Modal.Title>
            <a className="lightbox-close close" onClick={() => { this.handleDatePickerClose(false); }}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <Calendar
              date={this.state.initDate}
              onChange={this.handleDateSelect}
              className="calendar custom-calendar"
              ref={(calendar) => { this.calendar = calendar; }}
              minDate={this.state.minDate || 'none'}
            />
            <div className="current-date" onClick={this.navigateToday}>
              Today: {currentDate.format('dddd, MMMM Do, YYYY')}
            </div>
            <div className="link-holder text-center">
              <a onClick={() => { this.setToBeDetermined(); this.handleDatePickerClose(false); }}>To Be Determined</a>
            </div>
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
