import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';
import { map, omit } from 'lodash';

import EditPatientForm from 'containers/PatientDatabasePage/EditPatientForm';
import { selectPatients, selectSelectedPatient, selectSelectedPatientDetailsForForm, selectSavedPatient } from 'containers/PatientDatabasePage/selectors';
import { clearSelectedPatient, savePatient } from 'containers/PatientDatabasePage/actions';
import PatientItem from './PatientItem';
import './styles.less';

class PatientsList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    patients: PropTypes.object,
    selectedPatient: PropTypes.object,
    selectedPatientDetailsForForm: PropTypes.object,
    savedPatient: PropTypes.object,
    clearSelectedPatient: PropTypes.func,
    savePatient: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.closeEditPatientModal = this.closeEditPatientModal.bind(this);
    this.updatePatient = this.updatePatient.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.savedPatient.saving && this.props.savedPatient.saving) {
      this.closeEditPatientModal();
    }
  }

  editPatientModalShouldBeShown() {
    const { selectedPatient } = this.props;
    const displayed = (selectedPatient.details) ? true: false; // eslint-disable-line

    return displayed;
  }

  closeEditPatientModal() {
    this.props.clearSelectedPatient();
  }

  updatePatient(patientData) {
    const { selectedPatient } = this.props;
    const payload = omit(patientData, ['indications', 'status', 'source']);
    payload.indications = map(patientData.indications, indicationIterator => indicationIterator.value);
    payload.source_id = patientData.source;
    payload.patient_category_id = patientData.status;

    this.props.savePatient(selectedPatient.details.id, payload);
  }

  render() {
    const { patients, selectedPatientDetailsForForm } = this.props;
    const patientsListContents = patients.details.map((item, index) => (
      <PatientItem {...item} key={index} index={index} />
    ));
    const editPatientModalShown = this.editPatientModalShouldBeShown();

    if (patients.details.length > 0) {
      return (
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <caption>Total Patients Count: {patients.details.length}</caption>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                    <th>INDICATIONS</th>
                    <th>AGE</th>
                    <th>GENDER</th>
                    <th>BMI</th>
                    <th>STATUS</th>
                    <th>SOURCE</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {patientsListContents}
                </tbody>
              </table>
            </div>
            <Modal className="edit-patient" show={editPatientModalShown} onHide={this.closeEditPatientModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Patient</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditPatientForm
                  initialValues={selectedPatientDetailsForForm}
                  onSubmit={this.updatePatient}
                />
              </Modal.Body>
            </Modal>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h3>No matching patients found!</h3>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  patients: selectPatients(),
  selectedPatient: selectSelectedPatient(),
  selectedPatientDetailsForForm: selectSelectedPatientDetailsForForm(),
  savedPatient: selectSavedPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    clearSelectedPatient: () => dispatch(clearSelectedPatient()),
    savePatient: (id, data) => dispatch(savePatient(id, data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsList);
