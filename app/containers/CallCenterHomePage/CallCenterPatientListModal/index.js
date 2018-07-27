/**
 * Call Center Homepage
 *
 */

import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

import CenteredModal from '../../../../common/components/CenteredModal';
import { translate } from '../../../../common/utilities/localization';

import { closePatientsListModal } from '../actions';
import { selectIsFetchingPatients, selectPatients, selectShowPatientsListModal } from '../selectors';

const mapStateToProps = createStructuredSelector({
  isFetching: selectIsFetchingPatients(),
  patients: selectPatients(),
  showPatientsListModal: selectShowPatientsListModal(),
});

const mapDispatchToProps = (dispatch) => ({
  closePatientsListModal: () => dispatch(closePatientsListModal()),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class CallCenterPatientListModal extends Component {

  static propTypes = {
    closePatientsListModal: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    patients: PropTypes.array.isRequired,
    showPatientsListModal: PropTypes.bool.isRequired,
  };

  componentDidMount() {
  }

  onPatientClick(patientId) {
    browserHistory.push(`/app/cc/patient/${patientId}`);
  }

  renderPatient(patient) {
    return (
      <div key={patient.id} className="patient-container">
        <div className="patient" onClick={() => this.onPatientClick(patient.id)}>
          <div>{patient.firstName} {patient.lastName}</div>
          <div>{patient.email}</div>
          <div>{patient.phone}</div>
          <div>{patient.protocol}</div>
        </div>
      </div>
    );
  }

  render() {
    const { closePatientsListModal, patients, showPatientsListModal } = this.props;

    return (
      <Modal dialogComponentClass={CenteredModal} id="call-center-patient-list-modal" show={showPatientsListModal} onHide={closePatientsListModal}>
        <Modal.Header>
          <Modal.Title>{translate('container.page.callcenter.patientListModal.title')}</Modal.Title>
          <a className="lightbox-close close" onClick={closePatientsListModal}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          {patients.map(patient => {
            return this.renderPatient(patient);
          })}
        </Modal.Body>
      </Modal>
    );
  }
}
