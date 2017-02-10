import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, FieldArray, change, reduxForm, reset } from 'redux-form';
import { Modal } from 'react-bootstrap';
import { forEach, filter } from 'lodash';

import Input from '../../../components/Input';
import AddEmailNotificationForm from '../../../components/AddEmailNotificationForm';
import CenteredModal from '../../../components/CenteredModal/index';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { selectCurrentUserClientId, selectClientSites } from '../../../containers/App/selectors';
import { selectEditStudyFormValues, selectEditStudyFormError, selectEditStudyFormErrors } from './selectors';
import { selectEditedStudy, selectAddNotificationProcess } from '../../../containers/HomePage/selectors';
import RenderEmailsList from './RenderEmailsList';
import formValidator from './validator';
import { addEmailNotificationUser } from 'containers/App/actions';

@reduxForm({ form: 'editStudy', validate: formValidator })
class EditStudyForm extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentUserClientId: PropTypes.number,
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
    selectedStudy: PropTypes.object,
    clientSites: PropTypes.object,
    addEmailNotificationUser: PropTypes.func,
    addNotificationProcess: PropTypes.object,
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

    this.state = {
      addEmailModalShow: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(change('editStudy', 'emailNotifications', this.props.siteUsers));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.selectedStudy && newProps.selectedStudy !== this.props.selectedStudy){
      this.props.dispatch(change('editStudy', 'recruitmentPhone', newProps.selectedStudy.recruitmentPhone));
    }

    if ( (newProps.selectedStudy && !this.props.selectedStudy) ){
      console.log(888);
      let fields = [];
      _.forEach(this.props.clientSites.details, (site) => {
        if (site.id === newProps.selectedStudy.siteId){
          _.forEach(site.roles, (role) => {
            let isChecked = _.find(newProps.selectedStudy.studyNotificationEmails, (item) => (item.user_id === role.user.id));
            fields.push({
              firstName: role.user.firstName,
              lastName: role.user.lastName,
              userId: role.user.id,
              isChecked: isChecked,
            });
          });
        }
      });
      this.props.dispatch(change('editStudy', `emailNotifications`, fields));
    }

    if (this.props.addNotificationProcess.saving && !newProps.addNotificationProcess.saving && newProps.addNotificationProcess.savedUser){
      console.log(4444);
      let addFields = this.props.formValues.emailNotifications;
      const values = {
        firstName: newProps.addNotificationProcess.savedUser.firstName,
        lastName: newProps.addNotificationProcess.savedUser.lastName,
        userId: newProps.addNotificationProcess.savedUser.id,
        isChecked: true,
      }
      if (!addFields) {
        addFields = [values];
      } else {
        addFields.push(values);
      }
      this.props.dispatch(change('editStudy', `emailNotifications`, addFields));
    }
  }

  resetState() {
    const resetState = {
      exposureLevel: null,
      campaignLength: null,
      condenseToTwoWeeks: false,
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

    console.log(888, this.props.selectedStudy);

    this.props.addEmailNotificationUser({
      ...values,
      clientId: this.props.currentUserClientId,
      addForNotification: true,
      studyId: this.props.selectedStudy.studyId,
      clientRole:{
        siteId: this.props.selectedStudy.siteId,
      }
    });

    this.closeAddEmailModal();
  }

  selectAll(e) {
    if (this.props.formValues.emailNotifications) {
      forEach(this.props.formValues.emailNotifications, (value, index) => {
        this.props.dispatch(change('editStudy', `emailNotifications[${index}].isChecked`, e));
      });
    }
  }

  selectEmail(e) {
    if (this.props.formValues.checkAllInput && !e) {
      this.props.dispatch(change('editStudy', 'checkAllInput', false));
    } else if (!this.props.formValues.checkAllInput && e) {
      const checkedArr = filter(this.props.formValues.emailNotifications, (o) => o.isChecked);
      if ((checkedArr.length + 1) === this.props.formValues.emailNotifications.length) {
        this.props.dispatch(change('editStudy', 'checkAllInput', true));
      }
    }
  }

  renderEmailList() {
    const { formValues } = this.props;

    return (
      <div className="emails-list-holder">
        <FieldArray
          name="emailNotifications"
          component={RenderEmailsList}
          formValues={formValues}
          dispatch={this.props.dispatch}
          addEmailNotification={this.addEmailNotificationClick}
          closeEmailNotification={this.closeAddEmailModal}
          emailFields={this.state.emailFields}
        />
      </div>
    );
  }

  render() {
    console.log(123, this.props)
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
                          <label htmlFor="study-ad" data-text="Browse" data-hover-text="Attach File" className="btn btn-gray upload-btn"></label>
                          <Field
                            id="study-ad"
                            name="studyAd"
                            component={Input}
                            type="file"
                            className="hidden"
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
        <Modal className="custom-modal" show={this.state.addEmailModalShow} onHide={this.closeAddEmailModal}>
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
  currentUserClientId: selectCurrentUserClientId(),
  formError: selectEditStudyFormError(),
  formErrors: selectEditStudyFormErrors(),
  formValues: selectEditStudyFormValues(),
  editedStudy: selectEditedStudy(),
  clientSites: selectClientSites(),
  addNotificationProcess: selectAddNotificationProcess(),
});

const mapDispatchToProps = (dispatch) => ({
  resetForm: () => dispatch(reset('editStudy')),
  addEmailNotificationUser: (payload) => dispatch(addEmailNotificationUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditStudyForm);
