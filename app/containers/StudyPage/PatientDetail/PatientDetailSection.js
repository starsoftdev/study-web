/**
 * Created by mike on 10/16/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { reset, blur, Field, reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import moment from 'moment-timezone';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Checkbox from '../../../components/Input/Checkbox';
import Input from '../../../components/Input/index';
import {
  setCurrentPatientCategoryId, setCurrentPatientId, submitMovePatientBetweenCategories,
  submitPatientUpdate,
} from '../actions';
import { selectPatientBoardLoading, selectSubmittingSchedule } from '../selectors';
import formValidator from './detailValidator';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../../common/helper/functions';
import { selectSyncErrors, selectValues, selectFormDidChange } from '../../../common/selectors/form.selector';
import ReactSelect from '../../../components/Input/ReactSelect';

const formName = 'PatientDetailModal.Detail';

@reduxForm({
  form: formName,
  validate: formValidator,
  enableReinitialize: true,
})
class PatientDetailSection extends React.Component {
  static propTypes = {
    blur: React.PropTypes.func,
    initialValues: React.PropTypes.object,
    reset: React.PropTypes.func,
    setCurrentPatientCategoryId: React.PropTypes.func,
    setCurrentPatientId: React.PropTypes.func,
    submitting: React.PropTypes.bool.isRequired,
    submittingSchedule: React.PropTypes.object,
    submitPatientUpdate: React.PropTypes.func.isRequired,
    submitMovePatientBetweenCategories: React.PropTypes.func.isRequired,
    formSyncErrors: React.PropTypes.object,
    formValues: React.PropTypes.object,
    formDidChange: React.PropTypes.bool,
    patientBoardLoading: React.PropTypes.bool,
    site: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    patientCategories: React.PropTypes.array,
    onPatientDraggedToScheduled: React.PropTypes.func.isRequired,
    studyId: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      openScheduledModal: false,
    };
    this.targetCategory = null;

    this.onReset = this.onReset.bind(this);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.targetCategory && ((newProps.patientBoardLoading && !this.props.patientBoardLoading) ||
      (newProps.submittingSchedule.submitting && !this.props.submittingSchedule.submitting && !newProps.submittingSchedule.error))) {
      this.props.setCurrentPatientCategoryId(this.targetCategory);
      this.props.setCurrentPatientId(this.props.initialValues.id);
      this.targetCategory = null;
    }
  }

  onReset() {
    this.props.reset();
  }

  onPhoneBlur(event) {
    event.preventDefault();
    const { blur } = this.props;
    // change the phone number to be formatted for display
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phone', formattedPhoneNumber);
  }

  onSubmit(event) {
    event.preventDefault();
    const { blur, formSyncErrors, formValues, initialValues, reset, submitPatientUpdate, submitMovePatientBetweenCategories,
      onPatientDraggedToScheduled, studyId } = this.props;
    if (!formSyncErrors.firstName && !formSyncErrors.lastName && !formSyncErrors.email && !formSyncErrors.phone) {
      // change the phone number to be formatted for display
      const formattedPhoneNumber = normalizePhoneDisplay(formValues.phone);
      blur('phone', formattedPhoneNumber);
      // normalize the number in international format for submission to the server
      const phoneNumber = normalizePhoneForServer(formValues.phone);
      submitPatientUpdate(initialValues.id, initialValues.patientCategoryId, {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phone: phoneNumber,
        unsubscribed: formValues.unsubscribed,
      });
      if (initialValues.patientCategoryId !== formValues.patientCategoryId) {
        if (formValues.patientCategoryId === 5) {
          onPatientDraggedToScheduled(initialValues.id, initialValues.patientCategoryId, formValues.patientCategoryId);
        } else {
          submitMovePatientBetweenCategories(studyId, initialValues.patientCategoryId, formValues.patientCategoryId, initialValues.id, null);
        }
        this.targetCategory = formValues.patientCategoryId;
      }
    }
    reset(formName);
  }

  renderUpdateButtons() {
    const { formDidChange } = this.props;
    if (formDidChange) {
      return (
        <div className="pull-right">
          <Button bsStyle="primary" onClick={this.onReset}>Cancel</Button>
          <Button type="submit">Update</Button>
        </div>
      );
    }
    return null;
  }

  render() {
    const { submitting, initialValues, site, currentUser, patientCategories } = this.props;
    let unsubscribedClassName = 'pull-left';
    if (initialValues.isUnsubscribedByPatient) {
      unsubscribedClassName += ' none-event';
    }
    const timezone = currentUser.roleForClient && currentUser.roleForClient.site_id ? site.timezone : currentUser.timezone;
    const categories = patientCategories.map(cat => ({ label: cat.name, value: cat.id }));

    return (
      <Form className="form-lightbox form-patients-list" onSubmit={this.onSubmit}>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="new-patient-first-name">Name</label>
          </strong>
          <div className="field">
            <div className="row">
              <div className="col pull-left">
                <Field
                  type="text"
                  name="firstName"
                  component={Input}
                  placeholder="First Name"
                  isDisabled={submitting}
                  required
                />
              </div>
              <div className="col pull-right">
                <Field
                  type="text"
                  name="lastName"
                  component={Input}
                  placeholder="Last Name"
                  isDisabled={submitting}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field-row">
          <strong className="label">
            <label htmlFor="new-patient-email">Email</label>
          </strong>
          <div className="field">
            <Field
              type="email"
              name="email"
              component={Input}
            />
          </div>
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="new-patient-phone">Phone</label>
          </strong>
          <div className="field">
            <Field
              type="tel"
              name="phone"
              component={Input}
              onBlur={this.onPhoneBlur}
              required
            />
          </div>
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="new-patient-phone">Category</label>
          </strong>
          <div className="field patient-category">
            <Field
              name="patientCategoryId"
              component={ReactSelect}
              options={categories}
              disabled={submitting}
              placeholder="Select Category"
            />
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label htmlFor="new-patient-phone">Signed Up</label>
          </strong>
          <div className="field">
            <time dateTime={initialValues.createdAt}>{moment.tz(initialValues.createdAt, timezone).format('MM/DD/YY [at] h:mm A')}</time>
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label htmlFor="new-patient-phone">Updated</label>
          </strong>
          <div className="field">
            <time dateTime={initialValues.updatedAt}>{moment.tz(initialValues.updatedAt, timezone).format('MM/DD/YY [at] h:mm A')}</time>
          </div>
        </div>

        <div className="field-row">
          <strong className="label">
            <label htmlFor="unsubscribed">Unsubscribe</label>
          </strong>
          <div className="field">
            <Field
              name="unsubscribed"
              type="checkbox"
              component={Checkbox}
              className={unsubscribedClassName}
            />
          </div>
        </div>
        {this.renderUpdateButtons()}
        <div className="clearfix" />
      </Form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  formSyncErrors: selectSyncErrors(formName),
  formValues: selectValues(formName),
  formDidChange: selectFormDidChange(formName),
  patientBoardLoading: selectPatientBoardLoading(),
  submittingSchedule: selectSubmittingSchedule(),
});

const mapDispatchToProps = (dispatch) => ({
  blur: (field, value) => dispatch(blur(formName, field, value)),
  reset: () => dispatch(reset(formName)),
  submitPatientUpdate: (patientId, patientCategoryId, fields) => dispatch(submitPatientUpdate(patientId, patientCategoryId, fields)),
  submitMovePatientBetweenCategories: (studyId, fromCategoryId, toCategoryId, patientId, afterPatientId) => dispatch(submitMovePatientBetweenCategories(studyId, fromCategoryId, toCategoryId, patientId, afterPatientId)),
  setCurrentPatientCategoryId: (id) => dispatch(setCurrentPatientCategoryId(id)),
  setCurrentPatientId: (id) => dispatch(setCurrentPatientId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailSection);
