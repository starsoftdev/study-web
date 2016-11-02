/**
 * Created by mike on 10/6/16.
 */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Field, reduxForm, change } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-bootstrap/lib/Modal';
import formValidator from './validator';
import CenteredModal from '../../../components/CenteredModal/index';
import Input from '../../../components/Input/index';
import { addPatientsToTextBlast, findPatientsForTextBlast, filterPatientsForTextBlast, removePatientFromTextBlast, removePatientsFromTextBlast, submitTextBlast } from '../actions';
import { selectActiveField, selectValues, selectSyncErrors } from '../../../common/selectors/form.selector';
import { actions as toastrActions } from 'react-redux-toastr';

const formName = 'TextBlastModal';


@reduxForm({
  form: formName,
  validate: formValidator,
})
class TextBlastModal extends React.Component {
  static propTypes = {
    activeField: React.PropTypes.any,
    addPatients: React.PropTypes.func.isRequired,
    bsClass: React.PropTypes.string,
    change: React.PropTypes.func.isRequired,
    className: React.PropTypes.any,
    dialogClassName: React.PropTypes.string,
    displayToastrError: React.PropTypes.func.isRequired,
    findPatients: React.PropTypes.func.isRequired,
    filterPatients: React.PropTypes.func.isRequired,
    formValues: React.PropTypes.object,
    formSyncErrors: React.PropTypes.object,
    onClose: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    patientCategories: React.PropTypes.array,
    removePatient: React.PropTypes.func.isRequired,
    removePatients: React.PropTypes.func.isRequired,
    role: React.PropTypes.string,
    show: React.PropTypes.bool.isRequired,
    style: React.PropTypes.object,
    submitTextBlast: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.filterPatients = this.filterPatients.bind(this);
    this.submitTextBlast = this.submitTextBlast.bind(this);
    this.renderPatientSearchList = this.renderPatientSearchList.bind(this);
    this.renderPatients = this.renderPatients.bind(this);
    this.renderPatientCount = this.renderPatientCount.bind(this);
  }

  filterPatients(event) {
    const { formValues, filterPatients } = this.props;
    if (formValues.patientSearchValues) {
      filterPatients(event.target.value, formValues.patients);
    }
  }

  submitTextBlast(event) {
    event.preventDefault();
    const { displayToastrError, formSyncErrors, formValues, submitTextBlast, onClose } = this.props;
    if (!formSyncErrors.message && !formSyncErrors.patients) {
      submitTextBlast(formValues.patients, formValues.message, onClose);
    } else if (formSyncErrors.message) {
      displayToastrError(formSyncErrors.message);
    } else if (formSyncErrors.patients) {
      displayToastrError(formSyncErrors.patients);
    }
  }

  renderPatientSearchList() {
    const { activeField, addPatients, formValues } = this.props;
    if (formValues.filteredPatientSearchValues) {
      return (
        <ul className={classNames('list list-unstyled', { active: activeField === 'search' })}>
          {formValues.filteredPatientSearchValues.map(patient => (
            <li
              key={patient.id}
              onClick={() => {
                addPatients([patient]);
              }}
            >
              {patient.firstName} {patient.lastName}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  }

  renderPatients() {
    const { formValues, removePatient } = this.props;
    if (formValues.patients) {
      return (
        <div className="selected-patients-list">
          {formValues.patients.map(patient => (
            <div className="patient" key={patient.id}>
              <span className="name">{patient.firstName} {patient.lastName}</span>
              <a
                className="btn-remove"
                onClick={() => {
                  removePatient(patient);
                }}
              >
                <i className="icomoon-icon_trash" />
              </a>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

  renderPatientCount() {
    const { formValues, removePatients } = this.props;
    if (formValues.patients && formValues.patients.length > 0) {
      return (
        <span className="emails-counter">
          <span className="counter">{formValues.patients.length}</span>
          <span className="text"> Patients</span>
          <a className="btn-close">
            <i className="icomoon-icon_close" onClick={removePatients} />
          </a>
        </span>
      );
    }
    return null;
  }

  render() {
    const { show, className, onHide } = this.props;
    return (
      <Modal
        show={show}
        className={className}
        id="text-blast-popup"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong className="title">Text Blast</strong>
          </Modal.Title>
          <a className="close" onClick={onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <Form className="text-email-blast-form no-sidebar user-active">
            <div className="form-holder">
              <div className="scroll-holder">
                <div className="sub-holder">
                  <div className="subject-field">
                    <FormControl type="text" className="recievers" placeholder="To" disabled />
                    {this.renderPatientCount()}
                  </div>
                  <Field name="message" component={Input} componentClass="textarea" placeholder="Type a message..." required />
                  <div className="footer">
                    <Button type="submit" className="pull-right" onClick={this.submitTextBlast}>Submit</Button>
                  </div>
                </div>
              </div>
              <input type="reset" className="hidden btn btn-gray-outline" value="reset" />
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  activeField: selectActiveField(formName),
  formValues: selectValues(formName),
  formSyncErrors: selectSyncErrors(formName),
});

function mapDispatchToProps(dispatch) {
  return {
    addPatients: (patients) => dispatch(addPatientsToTextBlast(patients)),
    change: (field, value) => dispatch(change(formName, field, value)),
    displayToastrError: (error) => dispatch(toastrActions.error(error)),
    findPatients: (studyId, text, categoryIds, sourceIds) => dispatch(findPatientsForTextBlast(studyId, text, categoryIds, sourceIds)),
    filterPatients: (text) => dispatch(filterPatientsForTextBlast(text)),
    removePatient: (patient) => dispatch(removePatientFromTextBlast(patient)),
    removePatients: () => dispatch(removePatientsFromTextBlast()),
    submitTextBlast: (patients, message, onClose) => dispatch(submitTextBlast(patients, message, onClose)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBlastModal);
