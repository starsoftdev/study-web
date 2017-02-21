import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, FieldArray, reduxForm, change, reset } from 'redux-form';
import { Modal } from 'react-bootstrap';
import _, { find } from 'lodash';

import { MESSAGING_SUITE_PRICE, CALL_TRACKING_PRICE, QUALIFICATION_SUITE_PRICE, QUALIFICATION_SUITE_UPGRADE_PRICE } from '../../../common/constants';
import CenteredModal from '../../../components/CenteredModal/index';
import Input from '../../../components/Input';
import ReactSelect from '../../../components/Input/ReactSelect';
import Toggle from '../../../components/Input/Toggle';
import ShoppingCartForm from '../../../components/ShoppingCartForm';
import AddNewCardForm from '../../../components/AddNewCardForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { saveCard } from '../../App/actions';
import { selectStudyLevels, selectAvailPhoneNumbers } from '../../App/selectors';
import { selectSelectedIndicationLevelPrice } from '../selectors';
import { selectUpgradeStudyFormCallTrackingValue, selectUpgradeStudyFormLeadsCount } from './selectors';
import RenderLeads from './renderLeads';
import formValidator from './validator';

@reduxForm({ form: 'upgradeStudy', validate: formValidator })
class UpgradeStudyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    studyLevels: PropTypes.array,
    selectedIndicationLevelPrice: PropTypes.object,
    callTracking: PropTypes.bool,
    leadsCount: PropTypes.number,
    availPhoneNumbers: PropTypes.array,
    selectedStudy: PropTypes.object,
    show: PropTypes.bool,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    saveCard: PropTypes.func,
    resetForm: PropTypes.func,
    manualDisableSubmit: PropTypes.bool,
    validateAndSubmit: PropTypes.func,
    currentUserStripeCustomerId: PropTypes.string,
    ValidationChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleNewModalOpen = this.handleNewModalOpen.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.generateUpgradeStudyShoppingCartAddOns = this.generateUpgradeStudyShoppingCartAddOns.bind(this);
    this.onSaveCard = this.onSaveCard.bind(this);
    this.closeAddCardModal = this.closeAddCardModal.bind(this);
    this.resetState = this.resetState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleExposureChoose = this.handleExposureChoose.bind(this);
    this.handleMessagingChoose = this.handleMessagingChoose.bind(this);
    this.handleQualificationChoose = this.handleQualificationChoose.bind(this);
    this.handleCallChoose = this.handleCallChoose.bind(this);
    this.state = {
      level: null,
      patientMessagingSuite: false,
      patientQualificationSuite: false,
      callTracking: false,
      addCardModalOpen: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.leadsCount === 0 && this.props.leadsCount === 1) {
      this.props.dispatch(change('upgradeStudy', 'callTracking', false));
    }

    if (newProps.selectedStudy) {
      const { patientMessagingSuite, patientQualificationSuite } = newProps.selectedStudy;
      if (patientMessagingSuite === 'On' && patientQualificationSuite === 'Off') {
        this.props.dispatch(change('upgradeStudy', 'addPatientMessagingSuite', true));
        this.setState({
          patientMessagingSuite: true,
        });
      }

      if (patientQualificationSuite === 'On') {
        this.props.dispatch(change('upgradeStudy', 'addPatientQualificationSuite', true));
        this.props.dispatch(change('upgradeStudy', 'addPatientMessagingSuite', false));
        this.setState({
          patientQualificationSuite: true,
        });
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
    this.props.ValidationChange();
    const resetState = {
      level: null,
      patientMessagingSuite: false,
      patientQualificationSuite: false,
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
      level: e,
    });
    if (this.props.selectedStudy && !e) {
      const { patientMessagingSuite, patientQualificationSuite } = this.props.selectedStudy;
      const pMS = patientMessagingSuite === 'On';
      const pQS = patientQualificationSuite === 'On';
      if (pMS === this.state.patientMessagingSuite && pQS === this.state.patientQualificationSuite) {
        this.props.dispatch(change('upgradeStudy', 'validateToggle', false));
      } else {
        this.props.dispatch(change('upgradeStudy', 'validateToggle', true));
      }
    } else {
      this.props.dispatch(change('upgradeStudy', 'validateToggle', true));
    }
  }

  handleMessagingChoose(e) {
    let { patientQualificationSuite } = this.state;
    if (e && this.state.patientQualificationSuite) {
      patientQualificationSuite = false;
      this.props.dispatch(change('upgradeStudy', 'addPatientQualificationSuite', false));
    }
    this.setState({
      patientMessagingSuite: e,
      patientQualificationSuite,
    });
    if (this.props.selectedStudy && !e) {
      const { patientQualificationSuite } = this.props.selectedStudy;
      const pQS = patientQualificationSuite === 'On';
      if (pQS === this.state.patientQualificationSuite && !this.state.level) {
        this.props.dispatch(change('upgradeStudy', 'validateToggle', false));
      } else {
        this.props.dispatch(change('upgradeStudy', 'validateToggle', true));
      }
    } else {
      this.props.dispatch(change('upgradeStudy', 'validateToggle', true));
    }
  }

  handleQualificationChoose(e) {
    let { patientMessagingSuite } = this.state;
    if (e && this.state.patientMessagingSuite) {
      patientMessagingSuite = false;
      this.props.dispatch(change('upgradeStudy', 'addPatientMessagingSuite', false));
    }
    this.setState({
      patientQualificationSuite: e,
      patientMessagingSuite,
    });
    if (this.props.selectedStudy && !e) {
      const { patientMessagingSuite } = this.props.selectedStudy;
      const pMS = patientMessagingSuite === 'On';
      if (pMS === this.state.patientMessagingSuite && !this.state.level) {
        this.props.dispatch(change('upgradeStudy', 'validateToggle', false));
      } else {
        this.props.dispatch(change('upgradeStudy', 'validateToggle', true));
      }
    } else {
      this.props.dispatch(change('upgradeStudy', 'validateToggle', true));
    }
  }

  handleCallChoose(e) {
    this.setState({
      callTracking: e,
    });
  }

  handleSubmit() {
    this.props.validateAndSubmit();
  }

  generateUpgradeStudyShoppingCartAddOns() {
    const { studyLevels, selectedIndicationLevelPrice, selectedStudy } = this.props;
    const { level, patientMessagingSuite, callTracking, patientQualificationSuite } = this.state;
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
    if (patientQualificationSuite) {
      if (selectedStudy.patientMessagingSuite === 'On') {
        addOns.push({
          title: 'Upgrade to Patient Qualification Suite',
          price: QUALIFICATION_SUITE_UPGRADE_PRICE,
          quantity: 1,
          total: QUALIFICATION_SUITE_UPGRADE_PRICE,
        });
      } else {
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
    const { studyLevels, selectedIndicationLevelPrice, callTracking, availPhoneNumbers, selectedStudy } = this.props;
    let patientQualificationSuite = false;
    let qualificationSuitePrice = QUALIFICATION_SUITE_PRICE;
    let patientMessagingSuite = false;

    let filteredLevels = studyLevels;
    let isDisabled = false;
    let value = null;

    if (selectedStudy) {
      patientQualificationSuite = selectedStudy.patientQualificationSuite;
      patientMessagingSuite = selectedStudy.patientMessagingSuite;

      if (patientMessagingSuite === 'On' && patientQualificationSuite === 'Off') {
        qualificationSuitePrice = QUALIFICATION_SUITE_UPGRADE_PRICE;
      }

      if (selectedStudy.campaign) {
        filteredLevels = _.filter(studyLevels, (o) => (o.id > selectedStudy.campaign.level_id));
      }
    }

    if (filteredLevels.length === 0 && selectedStudy) {
      const topLevel = _.find(studyLevels, o => o.isTop);
      filteredLevels.push(topLevel);
      value = topLevel.id;
      isDisabled = true;
    }

    const addOns = this.generateUpgradeStudyShoppingCartAddOns();

    return (
      <div>
        <Modal
          className="upgrade-study-modal"
          id="upgrade-study"
          dialogComponentClass={CenteredModal}
          show={this.props.show}
          onHide={this.handleCloseModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>Upgrade Study</Modal.Title>
            <a className="lightbox-close close" onClick={this.handleCloseModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="form-study">
              <div className="pull-left col">
                <div className="scroll jcf--scrollable">
                  <div className="holder-inner">
                    <form className="form-upgrade-study">
                      <div className="upgrade-study form-fields">
                        <div className="field-row">
                          <strong className="label">
                            <label>UPGRADE LEVEL</label>
                          </strong>
                          <div className="field">
                            <Field
                              name="level"
                              className="with-loader-disabled-for-now"
                              component={ReactSelect}
                              placeholder="Select Upgrade"
                              onChange={this.handleExposureChoose}
                              options={filteredLevels}
                              selectedValue={value || undefined}
                              disabled={selectedIndicationLevelPrice.fetching || isDisabled}
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
                          <strong className="label">
                            <label>PATIENT MESSAGING SUITE: $247</label>
                          </strong>
                          <div className="field">
                            <Field
                              name="addPatientMessagingSuite"
                              disabled={patientMessagingSuite === 'On' || patientQualificationSuite === 'On'}
                              component={Toggle}
                              onChange={this.handleMessagingChoose}
                            />
                            <Field
                              name="validateToggle"
                              className="validate-toggle"
                              component={Toggle}
                              visible="false"
                              onChange={this.handleMessagingChoose}
                            />
                          </div>
                        </div>
                        <div className="field-row">
                          <strong className="label"><label>Patient qualification <br />
                            Suite: ${qualificationSuitePrice / 100} <br />
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
                        {callTracking &&
                          <FieldArray name="leads" component={RenderLeads} availPhoneNumbers={availPhoneNumbers} />
                        }
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

const mapStateToProps = createStructuredSelector({
  studyLevels: selectStudyLevels(),
  selectedIndicationLevelPrice: selectSelectedIndicationLevelPrice(),
  callTracking: selectUpgradeStudyFormCallTrackingValue(),
  leadsCount: selectUpgradeStudyFormLeadsCount(),
  availPhoneNumbers: selectAvailPhoneNumbers(),
});

const mapDispatchToProps = (dispatch) => ({
  saveCard: (customerId, cardData) => dispatch(saveCard(customerId, cardData)),
  resetForm: () => dispatch(reset('upgradeStudy')),
  ValidationChange: () => dispatch(change('upgradeStudy', 'addPatientMessagingSuite', true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpgradeStudyForm);
