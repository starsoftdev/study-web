/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, reset, touch, change } from 'redux-form';
import { Modal } from 'react-bootstrap';
import Collapse from 'react-bootstrap/lib/Collapse';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from '../Input/Checkbox';
import Input from '../Input/index';
import Editor from 'react-md-editor';
import Form from 'react-bootstrap/lib/Form';
import CenteredModal from '../../components/CenteredModal/index';
import StudyAddForm from '../../components/StudyAddForm';
import { selectSyncErrorBool, selectValues } from '../../common/selectors/form.selector';
import { fetchLanding } from '../../containers/App/actions';
import { selectLanding } from '../../containers/App/selectors';
import {
  updateLandingPage,
  resetLandingPageState,
  changeStudyAdd,
} from '../../containers/HomePage/AdminDashboard/actions';
import { selectLandingPageUpdateProcess } from '../../containers/HomePage/AdminDashboard/selectors';
import formValidator, { fields } from './validator';

import './styles.less';

const formName = 'landingPageForm';

@reduxForm({
  form: formName,
  validate: formValidator,
})

export class LandingPageModal extends React.Component {
  static propTypes = {
    submitForm: React.PropTypes.func.isRequired,
    fetchLanding:  React.PropTypes.func.isRequired,
    openModal: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    resetState: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    studies: React.PropTypes.any,
    newList: React.PropTypes.any,
    landing: React.PropTypes.object,
    updateLandingPageProcess: React.PropTypes.any,
    submitStudyAdd: React.PropTypes.func.isRequired,
    touchFields: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onHide = this.onHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.openStudyAddModal = this.openStudyAddModal.bind(this);
    this.closeStudyAddModal = this.closeStudyAddModal.bind(this);
    this.uploadStudyAdd = this.uploadStudyAdd.bind(this);

    this.state = {
      code: null,
      selected: null,
      landingFetched: false,
      studyAddModalOpen: false,
      initialValuesEntered: false,
    };
  }

  componentWillReceiveProps(newProps) {
    // console.log('componentWillReceiveProps', newProps, this.state);
    const { resetState, onClose, fetchLanding } = this.props;

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
      }, () => {
        let landing = null;
        let study = null;

        if (this.props.landing) {
          study = this.props.landing;

          for (const studySource of study.studySources) {
            if (studySource.landingPage) {
              landing = studySource.landingPage;
            }
          }
        }

        // console.log('landing', landing);

        if (!this.state.initialValuesEntered) {
          this.props.dispatch(change(formName, 'instructions', landing.instructions));
          this.props.dispatch(change(formName, 'fullNamePlaceholder', landing.fullNamePlaceholder));
          this.props.dispatch(change(formName, 'emailPlaceholder', landing.emailPlaceholder));
          this.props.dispatch(change(formName, 'phonePlaceholder', landing.phonePlaceholder));
          this.props.dispatch(change(formName, 'signupButtonText', landing.signupButtonText));
          this.props.dispatch(change(formName, 'clickToCallButtonText', landing.clickToCallButtonText));
          this.props.dispatch(change(formName, 'clickToCallButtonNumber', landing.clickToCallButtonNumber));
          this.props.dispatch(change(formName, 'ifInterestedInstructions', landing.ifInterestedInstructions));
          this.props.dispatch(change(formName, 'bySignUpText', landing.bySignUpText));
          this.props.dispatch(change(formName, 'shareThisStudyText', landing.shareThisStudyText));
          this.props.dispatch(change(formName, 'showSocialMediaButtons', landing.showSocialMediaButtons));

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

    const list = Object.assign({ studyId: this.state.selected.study_id, description: this.state.code }, newList);
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

  uploadStudyAdd(e) {
    e.toBlob((blob) => {
      this.props.submitStudyAdd({ file: blob });
      this.closeStudyAddModal();
    });
  }

  render() {
    const { openModal, onClose } = this.props;
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
      <Collapse dimension="width" in={openModal} timeout={250} className="landing-slider">
        <div>
          <div className="slider-area">
            <div className="head">
              <div className="inner-head">
                <strong className="title">Landing Page</strong>
                <a href="#" className="btn-right-arrow" onClick={onClose}><i className="glyphicon glyphicon-menu-right"></i></a>
              </div>
            </div>
            <Form
              className="holder"
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
                  <strong className="label required">
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
                  <strong className="label required">
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
                  <strong className="label required">
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
                    <label htmlFor="new-patient-phone">Click To Call number</label>
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
                    <label htmlFor="new-patient-phone">Study Ad</label>
                  </strong>
                  <div className="field">
                    { false && this.state.fileSrc &&
                      <div className="img-preview">
                        <a href="#image-perview" className="lightbox-opener">
                          <img src="images/img5.png" alt="description" onError="this.src='images/error.png';" id="img-preview" />
                        </a>
                      </div>
                    }
                    {/* <label htmlFor="study-ad" data-text="Browse" data-hover-text="Attach File" className="btn btn-gray upload-btn"></label>*/}
                    <a
                      className="btn btn-gray upload-btn"
                      onClick={this.openStudyAddModal}
                    >
                      Browse
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
                <div className="field-row text-right">
                  <Button bsStyle="primary" type="submit" disabled={false}>Submit</Button>
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
              <Modal.Title>UPDATE STUDY ADD</Modal.Title>
              <a className="lightbox-close close" onClick={this.closeStudyAddModal}>
                <i className="icomoon-icon_close" />
              </a>
            </Modal.Header>
            <Modal.Body>
              <StudyAddForm handleSubmit={this.uploadStudyAdd} />
            </Modal.Body>
          </Modal>s
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
});

function mapDispatchToProps(dispatch) {
  return {
    submitForm: (values) => dispatch(updateLandingPage(values)),
    resetState: () => dispatch(resetLandingPageState()),
    submitStudyAdd: (values) => dispatch(changeStudyAdd(values)),
    fetchLanding: (studyId) => dispatch(fetchLanding(studyId)),
    resetForm: () => dispatch(reset(formName)),
    touchFields: () => dispatch(touch(formName, ...fields)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageModal);
