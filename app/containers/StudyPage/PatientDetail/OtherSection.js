/**
 * Created by mike on 10/18/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Overlay from 'react-bootstrap/lib/Overlay';
import FormControl from 'react-bootstrap/lib/FormControl';
import { reset, Field, reduxForm } from 'redux-form';
import moment from 'moment-timezone';
import { createStructuredSelector } from 'reselect';

import ReactSelect from '../../../components/Input/ReactSelect';
import Input from '../../../components/Input/index';
import { selectValues, selectSyncErrors, selectFormDidChange } from '../../../common/selectors/form.selector';
import {
  submitPatientUpdate, deletePatient, generateReferral, downloadReferral,
  removePatientIndication, addPatientIndication,
} from '../actions';
import { selectSocket } from '../../../containers/GlobalNotifications/selectors';
import { selectStudy, selectDeletePatientProcess, selectCurrentPatient } from '../selectors';
import formValidator from './otherValidator';
import DateOfBirthPicker from '../../../components/DateOfBirthPicker/index';
import IndicationOverlay from './IndicationOverlay';
import { selectIndications } from '../../App/selectors';
import { fetchIndications } from '../../App/actions';

const formName = 'PatientDetailModal.Other';

@reduxForm({
  form: formName,
  validate: formValidator,
  enableReinitialize: true,
})
class OtherSection extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
    change: React.PropTypes.func.isRequired,
    site: React.PropTypes.object,
    formSyncErrors: React.PropTypes.object,
    formValues: React.PropTypes.object,
    formDidChange: React.PropTypes.bool,
    initialValues: React.PropTypes.object,
    loading: React.PropTypes.bool,
    submitting: React.PropTypes.bool,
    reset: React.PropTypes.func,
    submitPatientUpdate: React.PropTypes.func.isRequired,
    currentStudy: React.PropTypes.object,
    deletePatient: React.PropTypes.func,
    generateReferral: React.PropTypes.func,
    downloadReferral: React.PropTypes.func,
    deletePatientProcess: React.PropTypes.object,
    socket: React.PropTypes.any,
    fetchIndications: React.PropTypes.func.isRequired,
    indications: React.PropTypes.array,
    currentPatient: React.PropTypes.object,
    currentPatientCategory: React.PropTypes.object,
    addPatientIndication: React.PropTypes.func.isRequired,
    removePatientIndication: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      socketBinded: false,
      showIndicationPopover: false,
      initialValues: null,
    };
    this.onReset = this.onReset.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderGender = this.renderGender.bind(this);
    this.downloadReferral = this.downloadReferral.bind(this);
    this.addIndication = this.addIndication.bind(this);
    this.deleteIndication = this.deleteIndication.bind(this);
    this.toggleIndicationPopover = this.toggleIndicationPopover.bind(this);
    this.renderIndications = this.renderIndications.bind(this);
  }

  componentWillMount() {
    this.props.fetchIndications();
  }

  componentWillReceiveProps(newProps) {
    const { params, socket, downloadReferral, currentPatientCategory } = this.props;
    if (socket && this.state.socketBinded === false) {
      this.setState({ socketBinded: true }, () => {
        socket.on('notifyPatientReferralReady', (data) => {
          if (data.studyId && parseInt(params.id) === data.studyId) {
            downloadReferral(data.reportName, data.studyId);
          }
        });
      });
    }

    const { currentPatient } = newProps;
    if (currentPatient && (currentPatient !== this.props.currentPatient || !this.state.initialValues)) {
      const formattedPatient = Object.assign({}, currentPatient);
      if (currentPatient.dob) {
        const dob = moment(currentPatient.dob);
        formattedPatient.dobMonth = dob.month() + 1;
        formattedPatient.dobDay = dob.date();
        formattedPatient.dobYear = dob.year();
      }
      formattedPatient.patientCategoryId = currentPatientCategory.id;
      this.setState({
        initialValues: formattedPatient,
      });
    }
  }

  onReset() {
    const { reset } = this.props;
    reset();
  }

  onSubmit(event) {
    event.preventDefault();
    const { formSyncErrors, initialValues, formValues, reset, submitPatientUpdate } = this.props;
    if (!formSyncErrors.gender && !formSyncErrors.bmi) {
      const data = {
        gender: null,
        bmi: null,
      };
      if (formValues.gender) {
        data.gender = formValues.gender;
      }
      if (formValues.bmi) {
        data.bmi = parseFloat(formValues.bmi);
      }
      if (formValues.dobDay && formValues.dobMonth && formValues.dobYear) {
        const date = moment().year(formValues.dobYear).month(formValues.dobMonth - 1).date(formValues.dobDay).startOf('day');
        data.dob = date.toISOString();
      }
      submitPatientUpdate(initialValues.id, initialValues.patientCategoryId, data);
      reset(formName);
    }
  }

  downloadReferral() {
    const { formValues, params } = this.props;
    this.props.generateReferral(formValues.id, parseInt(params.id));
  }

  addIndication(patientId, indication) {
    const { addPatientIndication } = this.props;
    const { initialValues } = this.state;
    addPatientIndication(initialValues.id, initialValues.patientCategoryId, indication);
  }

  deleteIndication(indication) {
    const { removePatientIndication } = this.props;
    const { initialValues } = this.state;
    removePatientIndication(initialValues.id, initialValues.patientCategoryId, indication.id);
  }

  toggleIndicationPopover() {
    this.setState({
      showIndicationPopover: !this.state.showIndicationPopover,
    });
  }

  renderGender() {
    const { loading, submitting } = this.props;
    const genderOptions = [{
      label: 'N/A',
      value: 'N/A',
    }, {
      label: 'Male',
      value: 'Male',
    }, {
      label: 'Female',
      value: 'Female',
    }];
    return (
      <div className="field-row">
        <strong className="label">
          <label htmlFor="patient-gender">Gender</label>
        </strong>
        <div className="field patient-gender">
          <Field
            name="gender"
            component={ReactSelect}
            options={genderOptions}
            disabled={submitting || loading}
            placeholder="Select Gender"
          />
        </div>
      </div>
    );
  }

  renderIndications() {
    const { initialValues } = this.state;
    if (initialValues && initialValues.patientIndications) {
      return (
        <div className="category-list">
          {initialValues.patientIndications.map(pi => (
            <div key={pi.indication.id} className="category">
              <span className="link">
                <span className="text">{pi.indication.name}</span>
                { !pi.isOriginal &&
                <span
                  className="icomoon-icon_trash"
                  onClick={() => {
                    this.deleteIndication(pi.indication);
                  }}
                />
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

  renderUpdateButtons() {
    const { formDidChange, loading, submitting } = this.props;
    if (formDidChange) {
      return (
        <div className="pull-right study-page-update-patient-bttns-container">
          <button className="btn btn-gray-outline" onClick={this.onReset}>Cancel</button>
          <Button type="submit" disabled={submitting || loading}>Update</Button>
        </div>
      );
    }
    return null;
  }

  render() {
    const overlayValues = { ...this.state.initialValues };

    if (this.state.initialValues && this.state.initialValues.patientIndications) {
      overlayValues.indications = this.state.initialValues.patientIndications.map(pi => pi.indication);
    }

    const { formValues: { dobDay, dobMonth, dobYear }, initialValues, loading, submitting, indications } = this.props;

    if (initialValues) {
      return (
        <div className="item others">
          <div className="item-holder">
            <Form className="sub-holder form-lightbox" onSubmit={this.onSubmit}>
              <div className="fields-holder">
                <strong className="title">OTHER INFORMATION</strong>
                <DateOfBirthPicker
                  loading={loading}
                  submitting={submitting}
                  dobDay={dobDay}
                  dobMonth={dobMonth}
                  dobYear={dobYear}
                />
                {this.renderGender()}
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="patient-bmi">BMI</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="bmi"
                      component={Input}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="patient-source5">Source</label>
                  </strong>
                  <div className="field">
                    <FormControl disabled="true" type="text" value={initialValues.source ? initialValues.source.type : ''} />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="patient-source5">PATIENT REFERRAL</label>
                  </strong>
                  <button
                    type="button"
                    className="btn btn-primary btn-default-padding"
                    onClick={this.downloadReferral}
                  >
                    <i className="icomoon-icon_download" />
                    &nbsp;Download
                  </button>
                </div>
                {
                  this.props.currentStudy.canDeletePatient &&
                  <div className="field-row">
                    <strong className="label">
                      <label htmlFor="patient-source5">DELETE PATIENT</label>
                    </strong>
                    <button
                      type="button"
                      className="btn btn-primary btn-default-padding"
                      onClick={() => { this.props.deletePatient(this.props.initialValues.id); }}
                      disabled={this.props.deletePatientProcess.isDeleting}
                    >
                      DELETE
                    </button>
                  </div>
                }
                <div className="field-row">
                  <strong className="label">Tag Indications</strong>
                  <div className="field add-indications" ref={(parent) => (this.parent = parent)}>
                    <Button
                      bsStyle="primary"
                      ref={(target) => (this.target = target)}
                      onClick={this.toggleIndicationPopover}
                    >
                      + Add Indication
                    </Button>
                    <Overlay
                      show={this.state.showIndicationPopover}
                      placement="bottom"
                      container={this.parent}
                      target={() => this.target}
                      rootClose
                      onHide={() => { this.toggleIndicationPopover(); }}
                    >
                      <IndicationOverlay indications={indications} selectIndication={this.addIndication} patient={overlayValues} onClose={this.toggleIndicationPopover} />
                    </Overlay>
                  </div>
                </div>
                <div className="field-row remove-indication">
                  <span className="label" />
                  <div className="field">
                    {this.renderIndications()}
                  </div>
                </div>
              </div>
              {this.renderUpdateButtons()}
            </Form>
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  formSyncErrors: selectSyncErrors(formName),
  formValues: selectValues(formName),
  formDidChange: selectFormDidChange(formName),
  currentStudy: selectStudy(),
  deletePatientProcess: selectDeletePatientProcess(),
  socket: selectSocket(),
  currentPatient: selectCurrentPatient(),
  indications: selectIndications(),
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset(formName)),
  submitPatientUpdate: (patientId, patientCategoryId, fields) => dispatch(submitPatientUpdate(patientId, patientCategoryId, fields)),
  deletePatient: (id) => dispatch(deletePatient(id)),
  generateReferral: (patientId, studyId) => dispatch(generateReferral(patientId, studyId)),
  downloadReferral: (reportName, studyId) => dispatch(downloadReferral(reportName, studyId)),
  fetchIndications: () => dispatch(fetchIndications()),
  addPatientIndication: (patientId, patientCategoryId, indication) => dispatch(addPatientIndication(patientId, patientCategoryId, indication)),
  removePatientIndication: (patientId, patientCategoryId, indicationId) => dispatch(removePatientIndication(patientId, patientCategoryId, indicationId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherSection);
