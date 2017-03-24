import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, FieldArray, change, reduxForm, reset } from 'redux-form';
import { Modal } from 'react-bootstrap';
import _, { forEach, filter } from 'lodash';

import Input from '../../../components/Input';
import AddEmailNotificationForm from '../../../components/AddEmailNotificationForm';
import CenteredModal from '../../../components/CenteredModal/index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { addEmailNotificationUser, fetchClientAdmins } from '../../App/actions';
import { selectCurrentUser, selectClientSites } from '../../App/selectors';
import { selectSyncErrorBool, selectSyncErrors, selectValues } from '../../../common/selectors/form.selector';
import { selectEditedStudy, selectAddNotificationProcess } from '../../../containers/HomePage/selectors';
import RenderEmailsList from './RenderEmailsList';
import formValidator from './validator';

const formName = 'editStudy';
@reduxForm({ form: formName, validate: formValidator })
class EditStudyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    formError: PropTypes.bool,
    formErrors: PropTypes.object,
    formValues: PropTypes.object,
    editedStudy: PropTypes.object,
    siteUsers: PropTypes.array,
    handleSubmit: PropTypes.func,
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
    addNotificationProcess: PropTypes.object,
    clientAdmins: PropTypes.object,
    fetchClientAdmins: PropTypes.func.isRequired,
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

    this.handleFileChange = this.handleFileChange.bind(this);

    this.state = {
      addEmailModalShow: false,
    };
  }

  componentWillMount() {
    const { change, currentUser, fetchClientAdmins, siteUsers } = this.props;
    console.log(currentUser);
    if (currentUser && currentUser.roleForClient.isAdmin) {
      fetchClientAdmins(currentUser.roleForClient.client_id);
    }
    change('emailNotifications', siteUsers);
  }

  componentWillReceiveProps(newProps) {
    const { clientAdmins, change } = this.props;
    if (newProps.selectedStudyId && newProps.selectedStudyId !== this.props.selectedStudyId) {
      const fields = [];
      let currentStudy = null;
      let isAllChecked = true;
      _.forEach(this.props.clientSites.details, (site) => {
        if (site.id === newProps.selectedSiteId) {
          _.forEach(site.studies, (study) => {
            if (study.id === newProps.selectedStudyId) {
              currentStudy = study;
              this.setState({ currentStudy });
            }
          });
          if (clientAdmins) {
            // add admin users to the list
            _.forEach(clientAdmins.details, (role) => {
              const isChecked = _.find(currentStudy.studyNotificationEmails, (item) => (item.user_id === role.user_id));
              if (!isChecked) {
                isAllChecked = false;
              }
              fields.push({
                firstName: role.first_name,
                lastName: role.last_name,
                userId: role.user_id,
                isChecked,
              });
            });
          }
          // add site users to the list
          _.forEach(site.roles, (role) => {
            const isChecked = _.find(currentStudy.studyNotificationEmails, (item) => (item.user_id === role.user.id));
            if (!isChecked) {
              isAllChecked = false;
            }
            fields.push({
              firstName: role.user.firstName,
              lastName: role.user.lastName,
              userId: role.user.id,
              isChecked,
            });
          });
        }
      });
      change('recruitmentPhone', currentStudy.recruitmentPhone);
      change('emailNotifications', fields);
      change('checkAllInput', isAllChecked);

      this.setState({ fileSrc: currentStudy.image || null });
    }

    if (this.props.addNotificationProcess.saving && !newProps.addNotificationProcess.saving && newProps.addNotificationProcess.savedUser) {
      let addFields = this.props.formValues.emailNotifications;
      const values = {
        firstName: newProps.addNotificationProcess.savedUser.firstName,
        lastName: newProps.addNotificationProcess.savedUser.lastName,
        userId: newProps.addNotificationProcess.savedUser.id,
        isChecked: true,
      };
      if (!addFields) {
        addFields = [values];
      } else {
        addFields.push(values);
      }
      change('emailNotifications', addFields);
    }
  }

  handleFileChange(e) {
    if (e.target.files[0]) {
      this.setState({ fileName: e.target.files[0].name, fileSrc: URL.createObjectURL(e.target.files[0]) });
    }
  }

  resetState() {
    const resetState = {
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
    this.props.onHide(false);
    this.resetState();
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    onSubmit();
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
      addForNotification: true,
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
    const { editedStudy } = this.props;

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
                        <strong className="label required">
                          <label>RECRUITMENT PHONE</label>
                        </strong>
                        <div className="field">
                          <Field
                            name="recruitmentPhone"
                            component={Input}
                            type="text"
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
                          { this.state.fileSrc && <img alt="" className="protocol-study-img" src={this.state.fileSrc} /> }
                          <label htmlFor="study-ad" data-text="Browse" data-hover-text="Attach File" className="btn btn-gray upload-btn"></label>
                          <Field
                            id="study-ad"
                            name="studyAd"
                            component={Input}
                            type="file"
                            className="hidden"
                            onChange={this.handleFileChange}
                          />
                          {/* TODO need to put an error message up so that people know to upload a file. */}
                          {/* formError
                          ? <div className="has-error">{formErrors.studyAd}</div>
                          : null
                          */}
                        </div>
                      </div>
                      <div className="clearfix">
                        <button type="submit" className="btn btn-default btn-submit pull-right" disabled={editedStudy.submitting}>
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
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  addNotificationProcess: selectAddNotificationProcess(),
  currentUser: selectCurrentUser(),
  formError: selectSyncErrorBool(formName),
  formErrors: selectSyncErrors(formName),
  formValues: selectValues(formName),
  editedStudy: selectEditedStudy(),
  clientSites: selectClientSites(),
});

const mapDispatchToProps = (dispatch) => ({
  addEmailNotificationUser: (payload) => dispatch(addEmailNotificationUser(payload)),
  fetchClientAdmins: (id) => dispatch(fetchClientAdmins(id)),
  change: (name, value) => dispatch(change(formName, name, value)),
  resetForm: () => dispatch(reset(formName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStudyForm);
