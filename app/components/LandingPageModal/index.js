/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Editor from 'react-md-editor';
import Form from 'react-bootstrap/lib/Form';

import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, reset, touch, change, blur } from 'redux-form';
import { Modal } from 'react-bootstrap';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../../app/common/helper/functions';
import Checkbox from '../Input/Checkbox';
import Input from '../Input/index';
import CenteredModal from '../../components/CenteredModal/index';
import StudyAddForm from '../../components/StudyAddForm';
import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';
import { fetchLanding } from '../../containers/App/actions';
import { selectLanding } from '../../containers/App/selectors';
import {
  updateLandingPage,
  resetLandingPageState,
  changeStudyAdd,
  resetChangeStudyAddState,
} from '../../containers/HomePage/AdminDashboard/actions';
import {
  selectLandingPageUpdateProcess,
  selectChangeStudyAddProcess,
} from '../../containers/HomePage/AdminDashboard/selectors';
import formValidator, { fields } from './validator';

const formName = 'landingPageForm';

function mapDispatchToProps(dispatch) {
  return {
    change: (name, value) => dispatch(change(formName, name, value)),
    blur: (field, value) => dispatch(blur(formName, field, value)),
    submitForm: (values) => dispatch(updateLandingPage(values)),
    resetState: () => dispatch(resetLandingPageState()),
    resetChangeAddState: () => dispatch(resetChangeStudyAddState()),
    submitStudyAdd: (values) => dispatch(changeStudyAdd(values)),
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
    resetChangeAddState: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    studies: React.PropTypes.any,
    newList: React.PropTypes.any,
    landing: React.PropTypes.object,
    updateLandingPageProcess: React.PropTypes.any,
    changeStudyAddProcess: React.PropTypes.any,
    submitStudyAdd: React.PropTypes.func.isRequired,
    touchFields: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    isOnTop: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.onHide = this.onHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.openStudyAddModal = this.openStudyAddModal.bind(this);
    this.closeStudyAddModal = this.closeStudyAddModal.bind(this);
    this.openStudyPreviewModal = this.openStudyPreviewModal.bind(this);
    this.closeStudyPreviewModal = this.closeStudyPreviewModal.bind(this);
    this.uploadStudyAdd = this.uploadStudyAdd.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);

    this.state = {
      code: null,
      selected: null,
      landing: null,
      landingFetched: false,
      studyAddModalOpen: false,
      studyPreviewModalOpen: false,
      initialValuesEntered: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { resetState, resetChangeAddState, onClose, fetchLanding } = this.props;

    if (newProps.studies) {
      for (const study of newProps.studies) {
        if (study.selected) {
          this.setState({
            selected: study,
          });
        }
      }
    }

    if (newProps.landing) {
      this.setState({
        landingFetched: true,
        landing: newProps.landing,
      }, () => {
        const landing = newProps.landing;

        if (!this.state.initialValuesEntered) {
          const { change } = this.props;
          change('instructions', landing.instructions);
          change('fullNamePlaceholder', landing.fullNamePlaceholder);
          change('emailPlaceholder', landing.emailPlaceholder);
          change('phonePlaceholder', landing.phonePlaceholder);
          change('signupButtonText', landing.signupButtonText);
          change('clickToCallButtonText', landing.clickToCallButtonText);
          change('clickToCallButtonNumber', normalizePhoneDisplay(landing.clickToCallButtonNumber));
          change('ifInterestedInstructions', landing.ifInterestedInstructions);
          change('bySignUpText', landing.bySignUpText);
          change('shareThisStudyText', landing.shareThisStudyText);
          change('showSocialMediaButtons', landing.showSocialMediaButtons);
          change('hideClickToCall', landing.hideClickToCall);
          change('initialMessageText', landing.initialMessageText);

          this.setState({
            initialValuesEntered: true,
            code: landing.description || null,
          });
        }
      });
    }

    if (this.state.selected && newProps.openModal && !this.state.landingFetched) {
      fetchLanding(this.state.selected.study_id);
    }

    if (!newProps.updateLandingPageProcess.saving && newProps.updateLandingPageProcess.success) {
      fetchLanding(this.state.selected.study_id);
      resetState();
      onClose();
    }

    if (!newProps.changeStudyAddProcess.saving && newProps.changeStudyAddProcess.success) {
      this.setState({
        landingFetched: false,
        initialValuesEntered: false,
      }, () => {
        fetchLanding(this.state.selected.study_id);
        resetChangeAddState();
      });
    }
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('clickToCallButtonNumber', formattedPhoneNumber);
  }

  onHide() {
    const { onClose, resetForm } = this.props;
    this.setState({
      landingFetched: false,
      initialValuesEntered: false,
    }, () => {
      this.closeStudyAddModal();
      resetForm();
      onClose();
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const { formError, newList, touchFields, submitForm } = this.props;
    if (formError) {
      touchFields();
      return;
    }

    const formValues = newList;
    formValues.clickToCallButtonNumber = normalizePhoneForServer(formValues.clickToCallButtonNumber);
    const list = Object.assign({ studyId: this.state.selected.study_id, description: this.state.code }, formValues);
    submitForm(list);
  }

  updateCode(newCode) {
    this.setState({ code: newCode });
  }

  closeStudyAddModal() {
    this.setState({ studyAddModalOpen: false });
  }

  openStudyAddModal() {
    this.setState({ studyAddModalOpen: true });
  }

  closeStudyPreviewModal() {
    this.setState({ studyPreviewModalOpen: false });
  }

  openStudyPreviewModal() {
    this.setState({ studyPreviewModalOpen: true });
  }

  uploadStudyAdd(e) {
    e.toBlob((blob) => {
      this.props.submitStudyAdd({ file: blob, study_id: this.state.selected.study_id });
      this.closeStudyAddModal();
    });
  }

  render() {
    const { openModal, onClose } = this.props;
    let fileSrc = null;

    if (this.state.landing) {
      const landing = this.state.landing;
      fileSrc = landing.imgSrc;
    }
    /* const country = [{ label: 'USA', value: 'USA', id: 0 },
                    { label: 'Canada', value: 'Canada', id: 1 },
                    { label: 'UK', value: 'UK', id: 2 },
                    { label: 'France', value: 'France', id: 3 },
                    { label: 'Italy', value: 'Italy', id: 4 },
                    { label: 'Germany', value: 'Germany', id: 5 },
                    { label: 'Brazil', value: 'Brazil', id: 6 },
                    { label: 'Chile', value: 'Chile', id: 7 },
                    { label: 'Colombia', value: 'Colombia', id: 8 },
                    { label: 'Cuba', value: 'Cuba', id: 9 },
                    { label: 'Czech Republic', value: 'Czech Republic', id: 10 },
                    { label: 'Denmark', value: 'Denmark', id: 11 },
                    { label: 'Fiji', value: 'Fiji', id: 12 },
                    { label: 'Australia', value: 'Australia', id: 13 },
                    { label: 'Hungary', value: 'Hungary', id: 14 },
                    { label: 'Iceland', value: 'Iceland', id: 15 },
                    { label: 'Japan', value: 'Japan', id: 16 },
                    { label: 'Luxembourg', value: 'Luxembourg', id: 17 },
                    { label: 'Malaysia', value: 'Malaysia', id: 18 },
    ];*/
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
                      type="tel"
                      name="phonePlaceholder"
                      component={Input}
                      required
                    />
                  </div>
                </div>
                {/* <div className="field-row">
                  <strong className="label required">
                    <label htmlFor="new-patient-phone">Country</label>
                  </strong>
                  <div className="field">
                    <Field
                      name="country"
                      component={ReactSelect}
                      placeholder="Select Country"
                      searchPlaceholder="Search"
                      searchable
                      options={country}
                      customSearchIconClass="icomoon-icon_search2"
                    />
                  </div>
                </div>*/}
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
                    {/* <label htmlFor="study-ad" data-text="Browse" data-hover-text="Attach File" className="btn btn-gray upload-btn"></label>*/}
                    <a
                      className="btn btn-gray upload-btn"
                      onClick={this.openStudyAddModal}
                    >
                      update study ad
                    </a>
                    {/* <Field
                      id="study-ad"
                      name="studyAd"
                      component={Input}
                      type="file"
                      className="hidden"
                      onChange={this.handleFileChange}
                    />*/}
                    {/* TODO need to put an error message up so that people know to upload a file. */}
                    {/* formError
                    ? <div className="has-error">{formErrors.studyAd}</div>
                    : null
                    */}
                  </div>
                </div>
                <div className="field-row textarea">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">Text</label>
                  </strong>
                  <div className="field">
                    <Editor value={this.state.code} onChange={this.updateCode} />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="new-patient-phone">If Intersted...</label>
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
                <div className="field-row text-right">
                  <Button bsStyle="primary" type="submit" disabled={false}>Update</Button>
                </div>
              </div>
            </Form>
          </div>
          <Modal
            className="study-add-modal avatar-modal"
            dialogComponentClass={CenteredModal}
            show={this.state.studyAddModalOpen}
            onHide={this.closeStudyAddModal}
            backdrop
            keyboard
          >
            <Modal.Header>
              <Modal.Title>UPDATE STUDY AD</Modal.Title>
              <a className="lightbox-close close" onClick={this.closeStudyAddModal}>
                <i className="icomoon-icon_close" />
              </a>
            </Modal.Header>
            <Modal.Body>
              <StudyAddForm handleSubmit={this.uploadStudyAdd} />
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
  changeStudyAddProcess: selectChangeStudyAddProcess(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageModal);
