/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import RichTextEditor from 'react-rte';
import Form from 'react-bootstrap/lib/Form';
import _ from 'lodash';

import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, reset, touch, change, blur } from 'redux-form';
import { Modal } from 'react-bootstrap';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../../app/common/helper/functions';
import Checkbox from '../Input/Checkbox';
import Input from '../Input/index';
import Toggle from '../../components/Input/Toggle';
import CenteredModal from '../../components/CenteredModal/index';
import StudyAdForm from '../../components/StudyAdForm';
import LoadingSpinner from '../LoadingSpinner';
import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';
import { fetchLanding } from '../../containers/App/actions';
import { selectLanding } from '../../containers/App/selectors';
import {
  updateLandingPage,
  resetLandingPageState,
  changeStudyAd,
  resetChangeStudyAdState,
  removeStudyAd,
} from '../../containers/HomePage/AdminDashboard/actions';
import {
  selectLandingPageUpdateProcess,
  selectUpdatedStudyAd,
  selectChangeStudyAdProcess,
} from '../../containers/HomePage/AdminDashboard/selectors';
import formValidator, { fields } from './validator';

const formName = 'landingPageForm';

function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    blur: (field, value) => dispatch(blur(formName, field, value)),
    submitForm: (values) => dispatch(updateLandingPage(values)),
    resetState: () => dispatch(resetLandingPageState()),
    resetChangeAdState: () => dispatch(resetChangeStudyAdState()),
    submitStudyAd: (values) => dispatch(changeStudyAd(values)),
    removeStudyAd: (studyId) => dispatch(removeStudyAd(studyId)),
    fetchLanding: (studyId) => dispatch(fetchLanding(studyId)),
    resetForm: () => dispatch(reset(formName)),
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}

@reduxForm({
  form: formName,
  validate: formValidator,
})
@connect(null, mapDispatchToProps)

export class LandingPageModal extends React.Component {
  static propTypes = {
    submitForm: React.PropTypes.func.isRequired,
    fetchLanding:  React.PropTypes.func.isRequired,
    openModal: React.PropTypes.bool.isRequired,
    change: React.PropTypes.func.isRequired,
    blur: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    resetState: React.PropTypes.func.isRequired,
    resetChangeAdState: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    studies: React.PropTypes.any,
    newList: React.PropTypes.any,
    landing: React.PropTypes.object,
    updateLandingPageProcess: React.PropTypes.any,
    changeStudyAdProcess: React.PropTypes.any,
    submitStudyAd: React.PropTypes.func.isRequired,
    removeStudyAd: React.PropTypes.func.isRequired,
    touchFields: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    isOnTop: React.PropTypes.bool,
    updatedStudyAd: React.PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.openStudyAdModal = this.openStudyAdModal.bind(this);
    this.closeStudyAdModal = this.closeStudyAdModal.bind(this);
    this.openStudyPreviewModal = this.openStudyPreviewModal.bind(this);
    this.closeStudyPreviewModal = this.closeStudyPreviewModal.bind(this);
    this.uploadStudyAd = this.uploadStudyAd.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.removeStudyAd = this.removeStudyAd.bind(this);

    this.state = {
      code: RichTextEditor.createEmptyValue(),
      studyAdModalOpen: false,
      studyPreviewModalOpen: false,
      initialValuesEntered: false,
      updatedStudyAd: null,
    };
  }

  componentWillMount() {
    const { studies, fetchLanding } = this.props;

    if (studies) {
      const selected = _.find(studies, { selected: true });
      if (selected) {
        fetchLanding(selected.study_id);
      }
    }
  }

  componentWillReceiveProps(newProps) {
    const { resetState, onClose, updatedStudyAd, resetChangeAdState, change } = this.props;

    if (newProps.landing) {
      const landing = newProps.landing;

      if (!this.state.initialValuesEntered) {
        this.setState({
          initialValuesEntered: true,
          code: RichTextEditor.createValueFromString(landing.description || '', 'markdown') || RichTextEditor.createEmptyValue(),
        }, () => {
          change('title', landing.title);
          change('locationMask', landing.locationMask);
          change('instructions', landing.instructions);
          change('fullNamePlaceholder', landing.fullNamePlaceholder);
          change('emailPlaceholder', landing.emailPlaceholder);
          change('phonePlaceholder', landing.phonePlaceholder);
          change('distance', landing.distance);
          change('mlpPhone', normalizePhoneDisplay(landing.mlpPhone));
          change('signupButtonText', landing.signupButtonText);
          change('clickToCallButtonText', landing.clickToCallButtonText);
          change('clickToCallButtonNumber', normalizePhoneDisplay(landing.clickToCallButtonNumber));
          change('ifInterestedInstructions', landing.ifInterestedInstructions);
          change('bySignUpText', landing.bySignUpText);
          change('shareThisStudyText', landing.shareThisStudyText);
          change('showSocialMediaButtons', landing.showSocialMediaButtons);
          change('hideClickToCall', landing.hideClickToCall);
          change('initialMessageText', landing.initialMessageText);
          change('facebookUrl', landing.facebookUrl);
          change('isSendInitialMessageText', landing.isSendInitialMessageText);
          change('displayAlways', landing.displayAlways);
        });
      }
    }

    if (!newProps.updateLandingPageProcess.saving && newProps.updateLandingPageProcess.success) {
      resetState();
      onClose();
    }

    if (newProps.changeStudyAdProcess.error && this.state.studyAdModalOpen) {
      this.closeStudyAdModal();
      resetChangeAdState();
    }

    if (!newProps.changeStudyAdProcess.saving && newProps.changeStudyAdProcess.success) {
      if (newProps.updatedStudyAd && newProps.updatedStudyAd !== updatedStudyAd) {
        this.setState({ updatedStudyAd: newProps.updatedStudyAd });
      }

      this.closeStudyAdModal();
    }
  }

  componentWillUnmount() {
    const { onClose, resetForm } = this.props;
    this.closeStudyAdModal();
    resetForm();
    onClose();
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur(event.target.name, formattedPhoneNumber);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { formError, newList, touchFields, submitForm, studies, landing } = this.props;
    const selected = _.find(studies, { selected: true });
    if (formError) {
      touchFields();
      return;
    }

    const formValues = newList;
    formValues.clickToCallButtonNumber = normalizePhoneForServer(formValues.clickToCallButtonNumber);
    formValues.mlpPhone = normalizePhoneForServer(formValues.mlpPhone);
    const list = Object.assign({ studyId: selected.study_id, description: this.state.code.toString('markdown') }, formValues);
    if (list.isSendInitialMessageText === undefined) {
      list.isSendInitialMessageText = false;
    }
    if (list.locationMask === undefined && landing && landing.locationMask !== list.locationMask) {
      list.locationMask = null;
    }
    submitForm(list);
  }

  updateCode(newCode) {
    this.setState({ code: newCode });
  }

  closeStudyAdModal() {
    this.setState({ studyAdModalOpen: false });
  }

  openStudyAdModal() {
    this.setState({ studyAdModalOpen: true });
  }

  closeStudyPreviewModal() {
    this.setState({ studyPreviewModalOpen: false });
  }

  openStudyPreviewModal() {
    this.setState({ studyPreviewModalOpen: true });
  }

  uploadStudyAd(e) {
    const selected = _.find(this.props.studies, { selected: true });
    if (e.type !== 'application/pdf') {
      e.toBlob((blob) => {
        this.props.submitStudyAd({ file: blob, study_id: selected.study_id });
      });
    } else {
      this.props.submitStudyAd({ file: e, study_id: selected.study_id });
    }
  }

  removeStudyAd() {
    const selected = _.find(this.props.studies, { selected: true });
    this.props.removeStudyAd(selected.study_id);
    this.closeStudyAdModal();
  }


  render() {
    const { openModal, onClose, changeStudyAdProcess, landing } = this.props;
    let fileSrc = null;

    if (landing && !this.state.updatedStudyAd) {
      fileSrc = landing.imgSrc;
    } else {
      fileSrc = this.state.updatedStudyAd;
    }
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN'],
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' },
      ],
      BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'H1', style: 'header-one' },
        { label: 'H2', style: 'header-two' },
        { label: 'H3', style: 'header-three' },
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' },
        { label: '"', style: 'blockquote' },
      ],
    };

    return (
      <Collapse dimension="width" in={openModal} timeout={250} className={classNames('landing-slider', (this.props.isOnTop > 0 ? 'slider-on-top' : ''))}>
        <div>
          <div className="slider-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">Landing Page</strong>
                <a className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right" /></a>
              </div>
            </div>
            <Form
              className="holder landing-holder"
              onSubmit={this.handleSubmit}
              noValidate="novalidate"
            >
              <div className="frame">
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">Title</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      id="enter-landing-page-name"
                      name="title"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">Location</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      id="enter-landing-page-location"
                      name="locationMask"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">Enter Your...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      id="enter-landing-page-name"
                      name="instructions"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">Full Name</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      id="landing-page-name"
                      name="fullNamePlaceholder"
                      component={Input}
                      required
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-email">Email</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="email"
                      name="emailPlaceholder"
                      component={Input}
                      required
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Mobile Phone</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="phonePlaceholder"
                      component={Input}
                      required
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Sign up Now Button</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="signupButtonText"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Click To Call Button</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="clickToCallButtonText"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Hide click to call button</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="checkbox"
                      name="hideClickToCall"
                      component={Checkbox}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Click To Call number</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="clickToCallButtonNumber"
                      component={Input}
                      onBlur={this.onPhoneBlur}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">MLP Distance</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="distance"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">MLP Phone</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="mlpPhone"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Study Ad</label>
                  </strong>
                  <div className="field">
                    { fileSrc &&
                      <div className="img-preview">
                        <a
                          className="lightbox-opener"
                          onClick={this.openStudyPreviewModal}
                        >
                          <img src={fileSrc} id="img-preview" alt="preview" />
                        </a>
                      </div>
                    }
                    <a
                      className="btn btn-gray upload-btn"
                      onClick={this.openStudyAdModal}
                    >
                      update study ad
                    </a>
                  </div>
                </div>
                <div className="field-row textarea">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Text</label>
                  </strong>
                  <div className="field rich-text-editor-container">
                    <RichTextEditor
                      value={this.state.code}
                      onChange={this.updateCode}
                      toolbarConfig={toolbarConfig}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">If Interested...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="ifInterestedInstructions"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">By Signing up...</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="bySignUpText"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Share this study</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="shareThisStudyText"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Share this study Icons and text</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="checkbox"
                      name="showSocialMediaButtons"
                      component={Checkbox}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-first-name">Initial text</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="isSendInitialMessageText"
                      component={Toggle}
                      className="field"
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Initial text message</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="initialMessageText"
                      component={Input}
                      componentClass="textarea"
                    />
                  </div>
                </div>

                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="facebook-url">FACEBOOK URL</label>
                  </strong>
                  <div className="field">
                    <Field
                      id="facebook-url"
                      type="text"
                      name="facebookUrl"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Display Always</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="checkbox"
                      name="displayAlways"
                      component={Checkbox}
                    />
                  </div>
                </div>

                <div className="field-row text-right">
                  <Button type="submit" bsStyle="primary" className="fixed-small-btn">
                    {this.props.updateLandingPageProcess.saving
                      ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
                      : <span>Update</span>
                    }
                  </Button>
                </div>
              </div>
            </Form>
          </div>
          <Modal
            className="study-add-modal avatar-modal"
            dialogComponentClass={CenteredModal}
            show={this.state.studyAdModalOpen}
            onHide={this.closeStudyAdModal}
            backdrop
            keyboard
          >
            <Modal.Header>
              <Modal.Title>UPDATE STUDY AD</Modal.Title>
              <a className="lightbox-close close" onClick={this.closeStudyAdModal}>
                <i className="icomoon-icon_close" />
              </a>
            </Modal.Header>
            <Modal.Body>
              <StudyAdForm
                handleSubmit={this.uploadStudyAd}
                changeStudyAdProcess={changeStudyAdProcess}
                removeStudyAd={this.removeStudyAd}
              />
            </Modal.Body>
          </Modal>
          <Modal
            className="study-preview-modal preview-modal"
            dialogComponentClass={CenteredModal}
            show={this.state.studyPreviewModalOpen}
            onHide={this.closeStudyPreviewModal}
            backdrop
            keyboard
          >
            <Modal.Header>
              <Modal.Title>Image Preview</Modal.Title>
              <a className="lightbox-close close" onClick={this.closeStudyPreviewModal}>
                <i className="icomoon-icon_close" />
              </a>
            </Modal.Header>
            <Modal.Body>
              <div className="img-holder">
                <img src={fileSrc} alt="modal-preview" />
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </Collapse>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formError: selectSyncErrorBool(formName),
  newList: selectValues(formName),
  landing: selectLanding(),
  updateLandingPageProcess: selectLandingPageUpdateProcess(),
  changeStudyAdProcess: selectChangeStudyAdProcess(),
  updatedStudyAd: selectUpdatedStudyAd(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageModal);
