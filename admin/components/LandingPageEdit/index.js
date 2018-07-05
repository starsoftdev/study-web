import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import RichTextEditor from 'react-rte';
import Form from 'react-bootstrap/lib/Form';

import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, reset, touch, change, blur } from 'redux-form';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';

import { normalizePhoneForServer, normalizePhoneDisplay } from '../../common/helper/functions';

import Checkbox from '../Input/Checkbox';
import Input from '../Input/index';
import Toggle from '../../components/Input/Toggle';

import CenteredModal from '../../components/CenteredModal/index';
import StudyAdForm from '../../components/StudyAdForm';
import LoadingSpinner from '../LoadingSpinner';

import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';

import {
  updateLandingPage,
  resetLandingPageState,
  changeStudyAd,
  resetChangeStudyAdState,
  removeStudyAd,
  fetchLanding,
} from '../../containers/AdminStudyEdit/actions';
import {
  selectLandingPageUpdateProcess,
  selectLanding,
  selectUpdatedStudyAd,
  selectChangeStudyAdProcess,
  selectRemovedStudyAdId,
} from '../../containers/AdminStudyEdit/selectors';
import formValidator, { fields } from './validator';

const formName = 'adminlandingPageForm';

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

export class LandingPageEdit extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    submitForm: PropTypes.func.isRequired,
    fetchLanding:  PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    blur: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    resetChangeAdState: PropTypes.func.isRequired,
    formError: PropTypes.bool.isRequired,
    studies: PropTypes.any,
    studyId: PropTypes.any,
    newList: PropTypes.any,
    landing: PropTypes.object,
    updateLandingPageProcess: PropTypes.any,
    changeStudyAdProcess: PropTypes.any,
    submitStudyAd: PropTypes.func.isRequired,
    removeStudyAd: PropTypes.func.isRequired,
    touchFields: PropTypes.func.isRequired,
    isOnTop: PropTypes.bool,
    updatedStudyAd: PropTypes.any,
    removedStudyAdId: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      code: RichTextEditor.createEmptyValue(),
      studyAdModalOpen: false,
      studyPreviewModalOpen: false,
      updatedStudyAd: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.openStudyAdModal = this.openStudyAdModal.bind(this);
    this.closeStudyAdModal = this.closeStudyAdModal.bind(this);
    this.openStudyPreviewModal = this.openStudyPreviewModal.bind(this);
    this.closeStudyPreviewModal = this.closeStudyPreviewModal.bind(this);
    this.uploadStudyAd = this.uploadStudyAd.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.removeStudyAd = this.removeStudyAd.bind(this);
  }

  componentWillMount() {
    const { studyId, fetchLanding } = this.props;

    if (studyId) {
      fetchLanding(studyId);
    }
  }

  componentWillReceiveProps(newProps) {
    const { resetState, updatedStudyAd, resetChangeAdState, change } = this.props;

    if (newProps.landing && newProps.landing.details && !newProps.landing.error) {
      const landing = newProps.landing.details;

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
          change('isSendInitialMessageText', landing.isSendInitialMessageText);
          change('displayAlways', landing.displayAlways);
        });
      }
    }

    if (newProps.removedStudyAdId) {
      this.setState({ updatedStudyAd: null });
    }

    if (!newProps.updateLandingPageProcess.saving && newProps.updateLandingPageProcess.success) {
      resetState();
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
    const { resetForm } = this.props;
    this.closeStudyAdModal();
    resetForm();
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur(event.target.name, formattedPhoneNumber);
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { formError, newList, touchFields, submitForm, studyId, landing } = this.props;
    if (formError) {
      touchFields();
      return;
    }

    const formValues = newList;
    formValues.clickToCallButtonNumber = normalizePhoneForServer(formValues.clickToCallButtonNumber);
    formValues.mlpPhone = normalizePhoneForServer(formValues.mlpPhone);
    const list = Object.assign({ studyId, description: this.state.code.toString('markdown') }, formValues);
    if (list.isSendInitialMessageText === undefined) {
      list.isSendInitialMessageText = false;
    }
    if (list.locationMask === undefined && landing.details && landing.details.locationMask !== list.locationMask) {
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
    const { studyId } = this.props;
    if (e.type !== 'application/pdf') {
      e.toBlob((blob) => {
        this.props.submitStudyAd({ file: blob, study_id: studyId });
      });
    } else {
      this.props.submitStudyAd({ file: e, study_id: studyId });
    }
  }

  removeStudyAd() {
    const { studyId } = this.props;
    this.props.removeStudyAd(studyId);
    this.closeStudyAdModal();
  }

  render() {
    const { changeStudyAdProcess, landing } = this.props;
    let fileSrc = null;
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

    if (landing.details && !this.state.updatedStudyAd) {
      fileSrc = landing.details.imgSrc;
    } else {
      fileSrc = this.state.updatedStudyAd;
    }

    return (
      <div id="landingPageEdit">
        <Form onSubmit={this.handleSubmit}>
          <div className="text">
            <div>
              <strong className="label">
                <label>Text:</label>
              </strong>
              <div className="field rich-text-editor-container">
                <RichTextEditor
                  value={this.state.code}
                  onChange={this.updateCode}
                  toolbarConfig={toolbarConfig}
                />
              </div>
            </div>
          </div>
          <div className="initial-text-message">
            <div>
              <strong className="label">
                <label>Initial text message:</label>
              </strong>
              <div className="field">
                <Field
                  name="initialMessageText"
                  component={Input}
                  componentClass="textarea"
                />
              </div>
            </div>
          </div>
          <div className="study-ad">
            <div>
              <strong className="label">
                <label>Study Ad:</label>
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
          </div>
          <div className="custom-info-fields">
            <div className="field-row">
              <strong className="label">
                <label>Title:</label>
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
                <label>Location:</label>
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
                <label>Enter Your information To Join!:</label>
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
                <label>* Full Name:</label>
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
                <label>* Email:</label>
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
                <label>* Mobile Phone:</label>
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
                <label>Sign up Now!:</label>
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
                <label>Click To Call!:</label>
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
                <label>Click To Call number:</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  name="clickToCallButtonNumber"
                  component={Input}
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label>If interested, enter information above to sign up!:</label>
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
                <label>By Signing up...:</label>
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
                <label>Share this study:</label>
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
                <label>Initial text:</label>
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
                <label>Upcoming Study:</label>
              </strong>
              <div className="field">
                <Field
                  name="displayAlways"
                  component={Toggle}
                  className="field"
                />
              </div>
            </div>
            <div className="field-row">
              <strong className="label">
                <label>Hide click to call button:</label>
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
                <label>Hide share this study Icons and text:</label>
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
                <label>MLP Distance:</label>
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
                <label>MLP Phone:</label>
              </strong>
              <div className="field">
                <Field
                  type="text"
                  name="mlpPhone"
                  component={Input}
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
  removedStudyAdId: selectRemovedStudyAdId(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageEdit);
