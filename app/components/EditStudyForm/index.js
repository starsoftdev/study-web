import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, FieldArray, change, reduxForm, reset, blur } from 'redux-form';
import { Modal } from 'react-bootstrap';
import _, { forEach, filter } from 'lodash';

import { normalizePhoneDisplay, normalizePhoneForServer } from '../../../app/common/helper/functions';
import Input from '../../components/Input';
import AddEmailNotificationForm from '../../components/AddEmailNotificationForm';
import CenteredModal from '../../components/CenteredModal/index';
import LoadingSpinner from '../../components/LoadingSpinner';
import { addEmailNotificationUser, fetchClientAdmins, fetchStudyLeadSources } from '../../containers/App/actions';
import { selectCurrentUser, selectClientSites, selectStudyLevels } from '../../containers/App/selectors';
import { selectSyncErrorBool, selectSyncErrors, selectValues } from '../../common/selectors/form.selector';
import { setEmailNotifications } from '../../containers/HomePage/actions';
import { selectEditedStudy, selectHomePageClientAdmins, selectStudies, selectEditStudyEmailNotifications, selectStudyLeadSources } from '../../containers/HomePage/selectors';
import StudyAddForm from '../../components/StudyAddForm';
import RenderLeads from '../../components/RenderLeads';
import {
  changeStudyAdd,
  removeStudyAd,
  resetChangeStudyAddState,
} from '../../containers/HomePage/AdminDashboard/actions';
import {
  selectChangeStudyAddProcess,
  selectUpdatedStudyAd,
  selectRemovedStudyAdId,
} from '../../containers/HomePage/AdminDashboard/selectors';
import RenderEmailsList from './RenderEmailsList';
import formValidator from './validator';

const formName = 'editStudy';

const mapDispatchToProps = (dispatch) => ({
  addEmailNotificationUser: (payload) => dispatch(addEmailNotificationUser(payload)),
  fetchClientAdmins: (id) => dispatch(fetchClientAdmins(id)),
  change: (name, value) => dispatch(change(formName, name, value)),
  blur: (field, value) => dispatch(blur(formName, field, value)),
  submitStudyAdd: (values) => dispatch(changeStudyAdd(values)),
  removeStudyAd: (studyId) => dispatch(removeStudyAd(studyId)),
  resetChangeAddState: () => dispatch(resetChangeStudyAddState()),
  setEmailNotifications: (fields) => dispatch(setEmailNotifications(fields)),
  resetForm: () => dispatch(reset(formName)),
  fetchStudyLeadSources: (studyId, excludeSourceIds) => dispatch(fetchStudyLeadSources(studyId, excludeSourceIds)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  formError: selectSyncErrorBool(formName),
  clientAdmins: selectHomePageClientAdmins(),
  formErrors: selectSyncErrors(formName),
  formValues: selectValues(formName),
  emailNotifications: selectEditStudyEmailNotifications(),
  editedStudy: selectEditedStudy(),
  clientSites: selectClientSites(),
  updatedStudyAd: selectUpdatedStudyAd(),
  removedStudyAdId: selectRemovedStudyAdId(),
  changeStudyAddProcess: selectChangeStudyAddProcess(),
  studyLevels: selectStudyLevels(),
  studies: selectStudies(),
  studyLeadSources: selectStudyLeadSources(),
});
@reduxForm({
  form: formName,
  validate: formValidator,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})
@connect(mapStateToProps, mapDispatchToProps)
export default class EditStudyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    blur: React.PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    formError: PropTypes.bool,
    formErrors: PropTypes.object,
    formValues: PropTypes.object,
    editedStudy: PropTypes.object,
    siteUsers: PropTypes.array,
    handleSubmit: PropTypes.func,
    setEmailNotifications: PropTypes.func,
    emailNotifications: PropTypes.any,
    show: PropTypes.bool,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    resetForm: PropTypes.func,
    onSubmit: PropTypes.func,
    fields: PropTypes.object,
    selectedStudyId: PropTypes.number,
    selectedSiteId: PropTypes.number,
    clientSites: PropTypes.object,
    addEmailNotificationUser: PropTypes.func,
    clientAdmins: PropTypes.object,
    fetchClientAdmins: PropTypes.func.isRequired,
    submitStudyAdd: PropTypes.func.isRequired,
    removeStudyAd: PropTypes.func.isRequired,
    changeStudyAddProcess: PropTypes.any,
    updatedStudyAd: PropTypes.any,
    removedStudyAdId: PropTypes.number,
    resetChangeAddState: PropTypes.func.isRequired,
    studyLevels: PropTypes.array,
    studies: PropTypes.object,
    fetchStudyLeadSources: PropTypes.func.isRequired,
    studyLeadSources: PropTypes.object,
  };
  constructor(props) {
    super(props);

    this.resetState = this.resetState.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderEmailList = this.renderEmailList.bind(this);
    this.addEmailNotificationClick = this.addEmailNotificationClick.bind(this);
    this.closeAddEmailModal = this.closeAddEmailModal.bind(this);
    this.addEmailNotificationSubmit = this.addEmailNotificationSubmit.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectEmail = this.selectEmail.bind(this);
    this.openStudyAddModal = this.openStudyAddModal.bind(this);
    this.closeStudyAddModal = this.closeStudyAddModal.bind(this);
    this.openStudyPreviewModal = this.openStudyPreviewModal.bind(this);
    this.closeStudyPreviewModal = this.closeStudyPreviewModal.bind(this);
    this.uploadStudyAdd = this.uploadStudyAdd.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.removeStudyAd = this.removeStudyAd.bind(this);

    this.handleFileChange = this.handleFileChange.bind(this);

    this.state = {
      updatedStudyAd: null,
      addEmailModalShow: false,
      studyAddModalOpen: false,
      studyPreviewModalOpen: false,
      exposureLevel: null,
      campaignLength: null,
      condenseTwoWeeks: false,
      patientMessagingSuite: false,
      callTracking: false,
      minDate: 'none',
      isReset: false,
      emailFields: null,
    };
  }

  componentWillMount() {
    const { currentUser, fetchClientAdmins } = this.props;
    if (currentUser && currentUser.roleForClient.isAdmin) {
      fetchClientAdmins(currentUser.roleForClient.client_id);
    }
  }

  componentWillReceiveProps(newProps) {
    const { clientAdmins, clientSites, change, selectedStudyId, studyLevels, studies, setEmailNotifications, emailNotifications, resetChangeAddState } = this.props;

    if (newProps.selectedStudyId && newProps.selectedStudyId !== selectedStudyId) {
      this.props.fetchStudyLeadSources(newProps.selectedStudyId, [1]);
      const fields = [];
      let currentStudy = null;
      let isAllChecked = true;
      _.forEach(clientSites.details, (site) => {
        if (site.id === newProps.selectedSiteId) {
          _.forEach(site.studies, (study) => {
            if (study.id === newProps.selectedStudyId) {
              currentStudy = study;
              if (studies && studies.details) {
                const studyDetails = studies.details.find(s => s.studyId === newProps.selectedStudyId);
                if (studyDetails) {
                  currentStudy = { ...currentStudy, ...studyDetails };
                }
              }
              this.setState({ currentStudy });
            }
          });
          if (clientAdmins) {
            // add admin users to the list
            _.forEach(clientAdmins.details, (role) => {
              const isChecked = !!_.find(currentStudy.studyNotificationEmails, (item) => (item.user_id === role.userId));
              if (!isChecked) {
                isAllChecked = false;
              }
              fields.push({
                firstName: role.firstName,
                lastName: role.lastName,
                userId: role.userId,
                isChecked,
              });
            });
          }
          // add site users to the list
          _.forEach(site.roles, (role) => {
            if (role.user) {
              const isChecked = !!_.find(currentStudy.studyNotificationEmails, (item) => (item.user_id === role.user.id));
              if (!isChecked) {
                isAllChecked = false;
              }
              // if user has been deleted, their role still exists, but they aren't fetched anymore
              fields.push({
                firstName: role.user.firstName,
                lastName: role.user.lastName,
                userId: role.user.id,
                isChecked,
              });
            }
          });
        }
      });
      const foundExposureLevel = studyLevels.find(l => l.id === currentStudy.level_id);
      if (foundExposureLevel) {
        change('exposureLevel', foundExposureLevel.name);
      }
      change('recruitmentPhone', normalizePhoneDisplay(currentStudy.recruitmentPhone));
      change('checkAllInput', isAllChecked);

      if (fields.length > 0) {
        setEmailNotifications(fields);
      }

      this.setState({
        updatedStudyAd: null,
        fileSrc: (currentStudy.image || null),
      });

      if (currentStudy.callTracking) {
        this.setState({
          callTracking: true,
        });
      } else {
        this.setState({
          callTracking: false,
        });
      }
    }

    if (this.props.studyLeadSources.fetching && !newProps.studyLeadSources.fetching) {
      change('leadSource', newProps.studyLeadSources.details);
    }

    if (newProps.emailNotifications.length > 0 && newProps.emailNotifications !== emailNotifications) {
      change('emailNotifications', newProps.emailNotifications);
    }

    if (newProps.changeStudyAddProcess.error && this.state.studyAddModalOpen) {
      this.closeStudyAddModal();
      resetChangeAddState();
    }

    if (newProps.updatedStudyAd && this.state.updatedStudyAd !== newProps.updatedStudyAd) {
      const currentStudy = this.state.currentStudy;
      if (currentStudy) {
        currentStudy.image = newProps.updatedStudyAd;
      }
      this.setState({ updatedStudyAd: newProps.updatedStudyAd, currentStudy });
      if (this.state.studyAddModalOpen) {
        this.closeStudyAddModal();
      }
    }
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('recruitmentPhone', formattedPhoneNumber);
  }

  handleFileChange(e) {
    if (e.target.files[0]) {
      this.setState({ fileName: e.target.files[0].name, fileSrc: URL.createObjectURL(e.target.files[0]) });
    }
  }

  resetState() {
    const resetState = {
      updatedStudyAd: null,
      addEmailModalShow: false,
      studyAddModalOpen: false,
      studyPreviewModalOpen: false,
      exposureLevel: null,
      campaignLength: null,
      condenseTwoWeeks: false,
      patientMessagingSuite: false,
      callTracking: false,
      minDate: 'none',
      isReset: false,
      emailFields: null,
    };

    this.setState(resetState, () => {
      this.props.resetForm();
    });
  }

  handleCloseModal() {
    this.props.resetChangeAddState();
    this.resetState();
    this.props.onHide(false);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { formError, formValues, emailNotifications, onSubmit } = this.props;
    const params = {
      exposureLevel: formValues.exposureLevel,
      recruitmentPhone: normalizePhoneForServer(formValues.recruitmentPhone),
    };

    if (!formError) {
      const newEmailNotifications = _.pickBy(formValues.emailNotifications, (value, key) => {
        const isCheckedCurrent = (_.has(value, 'isChecked')) ? value.isChecked : false;
        const isCheckedCached = emailNotifications[key].isChecked;

        return isCheckedCurrent !== isCheckedCached;
      });

      _.forEach(newEmailNotifications, (value, key) => {
        if (!_.has(value, 'isChecked')) {
          newEmailNotifications[key].isChecked = false;
        }
      });

      if (!_.isEmpty(newEmailNotifications)) {
        params.emailNotifications = newEmailNotifications;
      }
    }
    params.leadSource = formValues.leadSource;
    onSubmit(params);
  }

  addEmailNotificationClick() {
    this.setState({ addEmailModalShow: true });
    this.props.onHide(true);
  }

  closeAddEmailModal() {
    this.setState({ addEmailModalShow: false });
    this.props.onShow();
  }

  addEmailNotificationSubmit(values) {
    const { currentUser, selectedStudyId, selectedSiteId } = this.props;
    this.props.addEmailNotificationUser({
      ...values,
      clientId: currentUser.roleForClient.client_id,
      studyId: selectedStudyId,
      clientRole:{
        siteId: selectedSiteId,
      },
    });

    this.closeAddEmailModal();
  }

  selectAll(e) {
    if (this.props.formValues.emailNotifications) {
      const { change } = this.props;
      forEach(this.props.formValues.emailNotifications, (value, index) => {
        change(`emailNotifications[${index}].isChecked`, e);
      });
    }
  }

  selectEmail(e) {
    const { change } = this.props;
    if (this.props.formValues.checkAllInput && !e) {
      change('checkAllInput', false);
    } else if (!this.props.formValues.checkAllInput && e) {
      const checkedArr = filter(this.props.formValues.emailNotifications, (o) => o.isChecked);
      if ((checkedArr.length + 1) === this.props.formValues.emailNotifications.length) {
        change('checkAllInput', true);
      }
    }
  }

  closeStudyAddModal() {
    this.setState({ studyAddModalOpen: false });
    this.props.onShow();
  }

  openStudyAddModal() {
    this.setState({ studyAddModalOpen: true });
    this.props.onHide(true);
  }

  closeStudyPreviewModal() {
    this.setState({ studyPreviewModalOpen: false });
  }

  openStudyPreviewModal() {
    this.setState({ studyPreviewModalOpen: true });
  }

  uploadStudyAdd(e) {
    if (e.type !== 'application/pdf') {
      e.toBlob((blob) => {
        this.props.submitStudyAdd({ file: blob, study_id: this.state.currentStudy.id });
      });
    } else {
      this.props.submitStudyAdd({ file: e, study_id: this.state.currentStudy.id });
    }
  }

  removeStudyAd() {
    this.props.removeStudyAd(this.state.currentStudy.id);
    this.closeStudyAddModal();
  }

  renderEmailList() {
    const { change, formValues } = this.props;

    return (
      <div className="emails-list-holder">
        <FieldArray
          name="emailNotifications"
          component={RenderEmailsList}
          change={change}
          formValues={formValues}
          addEmailNotification={this.addEmailNotificationClick}
          closeEmailNotification={this.closeAddEmailModal}
          emailFields={this.state.emailFields}
        />
      </div>
    );
  }

  render() {
    const { editedStudy, changeStudyAddProcess, removedStudyAdId } = this.props;
    const image = (this.state.currentStudy && this.state.currentStudy.image) ? this.state.currentStudy.image : null;
    const fileSrc = (removedStudyAdId && removedStudyAdId === this.state.currentStudy.id) ? null : image || this.state.updatedStudyAd;
    const preview =
      (<div className="img-preview">
        <a
          className="lightbox-opener"
          onClick={this.openStudyPreviewModal}
        >
          <img src={fileSrc} id="img-preview" alt="preview" />
        </a>
      </div>);

    return (
      <div>
        <Modal
          className="edit-study-modal"
          id="edit-study"
          dialogComponentClass={CenteredModal}
          show={this.props.show}
          onHide={this.handleCloseModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>Edit Information</Modal.Title>
            <a className="lightbox-close close" onClick={this.handleCloseModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <div className="form-study">
              <div className="scroll jcf--scrollable">
                <div className="holder-inner">
                  <form className="form-edit-study" onSubmit={this.handleFormSubmit}>
                    <div className="edit-study form-fields">
                      <div className="field-row">
                        <strong className="label">
                          <label>EXPOSURE LEVEL</label>
                        </strong>
                        <div className="field">
                          <Field
                            name="exposureLevel"
                            component={Input}
                            type="text"
                            isDisabled
                          />
                        </div>
                      </div>
                      <div className="field-row">
                        <strong className="label required">
                          <label>RECRUITMENT PHONE</label>
                        </strong>
                        <div className="field">
                          <Field
                            name="recruitmentPhone"
                            component={Input}
                            type="text"
                            onBlur={this.onPhoneBlur}
                          />
                        </div>
                      </div>
                      <div className="field-row">
                        <strong className="label">
                          <label>EMAIL NOTIFICATIONS</label>
                        </strong>
                        <div className="field">
                          {this.renderEmailList()}
                        </div>
                      </div>
                      <div className="field-row">
                        <strong className="label">
                          <label>STUDY AD</label>
                        </strong>
                        <div className="field">
                          { fileSrc &&
                            preview
                          }
                          <a
                            className="btn btn-gray upload-btn"
                            onClick={this.openStudyAddModal}
                          >
                            update study ad
                          </a>
                          {/* TODO need to put an error message up so that people know to upload a file. */}
                          {/* formError
                          ? <div className="has-error">{formErrors.studyAd}</div>
                          : null
                          */}
                        </div>
                      </div>

                      {this.state.callTracking &&
                        <FieldArray name="leadSource" component={RenderLeads} formValues={this.props.formValues} disableDelete isClientEditForm />
                      }

                      <div className="clearfix">
                        <button
                          type="submit"
                          className="btn btn-default btn-submit pull-right"
                          disabled={editedStudy.submitting}
                        >
                          {editedStudy.submitting
                            ? <span><LoadingSpinner showOnlyIcon size={20} /></span>
                            : <span>Update</span>
                          }
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          dialogComponentClass={CenteredModal}
          show={this.state.addEmailModalShow}
          onHide={this.closeAddEmailModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>ADD EMAIL NOTIFICATION</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeAddEmailModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <AddEmailNotificationForm onSubmit={this.addEmailNotificationSubmit} />
          </Modal.Body>
        </Modal>
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
            <StudyAddForm
              handleSubmit={this.uploadStudyAdd}
              changeStudyAddProcess={changeStudyAddProcess}
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
