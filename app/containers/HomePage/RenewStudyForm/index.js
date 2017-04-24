import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change, reset } from 'redux-form';
import { Modal } from 'react-bootstrap';
import { Calendar } from 'react-date-range';
import classnames from 'classnames';
import moment from 'moment-timezone';
import _, { find } from 'lodash';

import { CAMPAIGN_LENGTH_LIST, QUALIFICATION_SUITE_PRICE, CALL_TRACKING_PRICE } from '../../../common/constants';
import CenteredModal from '../../../components/CenteredModal/index';
import Input from '../../../components/Input';
import ReactSelect from '../../../components/Input/ReactSelect';
import DatePickerDisplay from '../../../components/Input/DatePickerDisplay';
import Toggle from '../../../components/Input/Toggle';
import ShoppingCartForm from '../../../components/ShoppingCartForm';
import AddNewCardForm from '../../../components/AddNewCardForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
  selectRenewStudyFormCampaignLengthValue,
} from './selectors';
import { selectStudyLevels, selectCurrentUserClientId } from '../../App/selectors';
import { saveCard } from '../../App/actions';
import { selectSelectedIndicationLevelPrice } from '../selectors';
import formValidator from './validator';


const formName = 'renewStudy';
@reduxForm({ form: formName, validate: formValidator })
class RenewStudyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    clientId: PropTypes.number,
    change: PropTypes.func.isRequired,
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
    this.setToBeDetermined = this.setToBeDetermined.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleExposureChoose = this.handleExposureChoose.bind(this);
    this.handleLengthChoose = this.handleLengthChoose.bind(this);
    this.handleCondenseChoose = this.handleCondenseChoose.bind(this);
    this.handleQualificationChoose = this.handleQualificationChoose.bind(this);
    this.handleCallChoose = this.handleCallChoose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDatePickerClose = this.handleDatePickerClose.bind(this);
    this.navigateToday = this.navigateToday.bind(this);
    this.state = {
      exposureLevel: null,
      campaignLength: null,
      condenseTwoWeeks: false,
      patientQualificationSuite: false,
      callTracking: false,
      addCardModalOpen: false,
      showDatePicker: false,
      initDate: moment(),
      minDate: moment(),
      dateStyle: 'MM/DD/YY',
      isReset: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.campaignLength !== this.props.campaignLength) {
      if (newProps.campaignLength !== 1) {
        const { change } = this.props;
        change('condenseTwoWeeks', false);
      }
    }

    if (newProps.selectedStudy) {
      const { patientQualificationSuite } = newProps.selectedStudy;
      const { change } = this.props;
      if (patientQualificationSuite === 'On') {
        change('addPatientQualificationSuite', true);
      }
    }

    if (!this.props.selectedStudy && newProps.selectedStudy) {
      if (newProps.selectedStudy.campaignLastDate && moment(newProps.selectedStudy.campaignLastDate).isAfter(moment())) {
        const { selectedStudy } = newProps;
        const minDate = moment(selectedStudy.campaignLastDate).add(1, 'days');
        this.setState({
          minDate,
          initDate: minDate,
        });
        const { change } = this.props;
        change('startDate', minDate);
      } else {
        this.setState({
          initDate: moment(),
        });
        const { change } = this.props;
        change('startDate', moment());
      }
    }

    if (newProps.manualDisableSubmit === false && this.props.manualDisableSubmit === true) {
      this.resetState();
    }
  }

  onSaveCard(params) {
    this.props.saveCard(this.props.clientId, this.props.currentUserStripeCustomerId, params);
  }

  setToBeDetermined() {
    this.setState({
      initDate: null,
    });
    const { change } = this.props;
    change('startDate', null);
    this.handleDatePickerClose(false);
  }

  handleDateSelect(momentDate) {
    this.setState({
      initDate: momentDate,
    });
    const { change } = this.props;
    change('startDate', momentDate);
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

    if (moment(this.state.minDate).isSameOrBefore(today, 'day')) {
      this.setState({
        initDate: today,
      });
      const { change } = this.props;
      change('startDate', today);
      this.handleDatePickerClose(false);
    }
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
      condenseTwoWeeks: false,
      patientQualificationSuite: false,
      callTracking: false,
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
      condenseTwoWeeks: e,
    });
  }

  handleQualificationChoose(e) {
    this.setState({
      patientQualificationSuite: e,
    });
  }

  handleCallChoose(e) {
    this.setState({
      callTracking: e,
    });
  }

  handleSubmit() {
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
    const { exposureLevel, campaignLength, condenseTwoWeeks, patientQualificationSuite, callTracking } = this.state;
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
    if (patientQualificationSuite) {
      if (selectedStudy && selectedStudy.patientQualificationSuite !== 'On') {
        addOns.push({
          title: 'Patient Qualification Suite',
          price: QUALIFICATION_SUITE_PRICE,
          quantity: 1,
          total: QUALIFICATION_SUITE_PRICE,
        });
      }
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
    const qualificationSuitePrice = QUALIFICATION_SUITE_PRICE;

    if (selectedStudy) {
      patientQualificationSuite = selectedStudy.patientQualificationSuite;
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
                        <div className={classnames('field-row', { hidden: campaignLength !== 1 })}>
                          <strong className="label">
                            <label>CONDENSE TO 2 WEEKS</label>
                          </strong>
                          <div className="field">
                            <Field
                              name="condenseTwoWeeks"
                              component={Toggle}
                              onChange={this.handleCondenseChoose}
                            />
                          </div>
                        </div>
                        <div className="field-row">
                          <strong className="label"><label>Patient qualification <br />
                            Suite: ${qualificationSuitePrice / 100}
                          </label></strong>
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
                          <div className="field" onClick={() => { this.handleDatePickerClose(true); }}>
                            <Field
                              name="startDate"
                              component={DatePickerDisplay}
                              className="form-control datepicker-input"
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
                  submitting={this.props.manualDisableSubmit}
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
              minDate={this.state.minDate || currentDate}
            />
            <div className="current-date" onClick={this.navigateToday}>
              Today: {currentDate.format('dddd, MMMM Do, YYYY')}
            </div>
            <div className="link-holder text-center">
              <a onClick={this.setToBeDetermined}>To Be Determined</a>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clientId: selectCurrentUserClientId(),
  studyLevels: selectStudyLevels(),
  selectedIndicationLevelPrice: selectSelectedIndicationLevelPrice(),
  campaignLength: selectRenewStudyFormCampaignLengthValue(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (name, value) => dispatch(change(formName, name, value)),
  saveCard: (clientId, customerId, cardData) => dispatch(saveCard(clientId, customerId, cardData)),
  resetForm: () => dispatch(reset(formName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RenewStudyForm);
