/**
 * Created by mike on 10/2/16.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import { createStructuredSelector } from 'reselect';

import CenteredModal from '../../components/CenteredModal/index';
import ImportPatientsModal from './ImportPatients/index';
import TextEmailBlastModal from './TextEmailBlastModal';
import TextBlastModal from './TextBlastModal/index';
import EmailBlastModal from '../../components/EmailBlastModal/index';
import AddPatientForm from './ImportPatients/AddPatientForm';
import { selectCurrentUser } from '../../containers/App/selectors';

import { exportPatients } from './actions';

class StudyActionButtons extends Component {
  static propTypes = {
    campaign: PropTypes.number,
    search: PropTypes.string,
    source: PropTypes.number,
    studyId: PropTypes.number.isRequired,
    exportPatients: PropTypes.func,
    ePMS: PropTypes.bool,
    studyName: PropTypes.string,
    currentUser: PropTypes.any,
    sourceMapped: PropTypes.array,
  };
  constructor(props) {
    super(props);
    this.state = {
      showImportPatientsModal: false,
      showAddPatientModal: false,
      showTextEmailBlastModal: false,
      showTextBlastModal: false,
      showEmailBlastModal: false,
    };
    this.toggleImportPatientsModal = this.toggleImportPatientsModal.bind(this);
    this.toggleAddPatientModal = this.toggleAddPatientModal.bind(this);
    this.closeAddPatientModal = this.closeAddPatientModal.bind(this);
    this.toggleTextEmailBlastModal = this.toggleTextEmailBlastModal.bind(this);
    this.toggleTextBlastModal = this.toggleTextBlastModal.bind(this);
    this.closeTextBlastModal = this.closeTextBlastModal.bind(this);
    this.toggleEmailBlastModal = this.toggleEmailBlastModal.bind(this);
    this.closeEmailBlastModal = this.closeEmailBlastModal.bind(this);
    this.download = this.download.bind(this);
  }

  toggleImportPatientsModal() {
    this.setState({
      showImportPatientsModal: !this.state.showImportPatientsModal,
    });
  }

  toggleAddPatientModal() {
    this.setState({
      showImportPatientsModal: !this.state.showImportPatientsModal,
      showAddPatientModal: !this.state.showAddPatientModal,
    });
  }

  closeAddPatientModal() {
    this.setState({
      showImportPatientsModal: false,
      showAddPatientModal: false,
    });
  }

  toggleTextEmailBlastModal() {
    this.setState({
      showTextEmailBlastModal: !this.state.showTextEmailBlastModal,
    });
  }

  toggleTextBlastModal() {
    this.setState({
      showTextEmailBlastModal: !this.state.showTextEmailBlastModal,
      showTextBlastModal: !this.state.showTextBlastModal,
    });
  }

  closeTextBlastModal() {
    this.setState({
      showTextEmailBlastModal: false,
      showTextBlastModal: false,
    });
  }

  toggleEmailBlastModal() {
    this.setState({
      showTextEmailBlastModal: !this.state.showTextEmailBlastModal,
      showEmailBlastModal: !this.state.showEmailBlastModal,
    });
  }

  closeEmailBlastModal() {
    this.setState({
      showTextEmailBlastModal: false,
      showEmailBlastModal: false,
    });
  }

  download() {
    const { exportPatients, studyId, campaign, source, search, currentUser } = this.props;
    if (currentUser && currentUser.roleForClient) {
      exportPatients(studyId, currentUser.roleForClient.id, search, campaign, source);
    }
  }

  render() {
    return (
      <div className="btns-popups pull-right">
        <div className="col pull-right no-right-padding">
          <button type="button" className="btn btn-primary download pull-right" onClick={this.download}>
            <i className="icomoon-icon_download" />
            &nbsp;Download
          </button>
        </div>
        <div className="col pull-right">
          <span className="btn btn-primary import" onClick={this.toggleImportPatientsModal}>
            <i className="icomoon-icon_upload" />
            &nbsp;Upload Patients
          </span>
          <ImportPatientsModal show={this.state.showImportPatientsModal} onHide={this.toggleImportPatientsModal} toggleAddPatient={this.toggleAddPatientModal} />
          <Modal
            id="add-patient-info-import"
            dialogComponentClass={CenteredModal}
            show={this.state.showAddPatientModal}
            onHide={this.toggleAddPatientModal}
            backdrop
            keyboard
          >
            <Modal.Header>
              <Modal.Title>
                <strong>Add Patient</strong>
              </Modal.Title>
              <a className="close" onClick={this.toggleAddPatientModal}>
                <i className="icomoon-icon_close" />
              </a>
            </Modal.Header>
            <Modal.Body>
              <AddPatientForm onClose={this.closeAddPatientModal} sourceMapped={this.props.sourceMapped} />
            </Modal.Body>
          </Modal>
        </div>
        <div className="col pull-right">
          <span className="btn btn-primary email" onClick={this.toggleTextEmailBlastModal}>
            <i className="icomoon-icon_chat_alt" />
            &nbsp;Text / Email Blast
            <TextEmailBlastModal
              show={this.state.showTextEmailBlastModal}
              onHide={this.toggleTextEmailBlastModal}
              toggleEmailBlast={this.toggleEmailBlastModal}
              toggleTextBlast={this.toggleTextBlastModal}
            />
            <TextBlastModal
              show={this.state.showTextBlastModal}
              campaign={this.props.campaign}
              onClose={this.closeTextBlastModal}
              onHide={this.toggleTextBlastModal}
              ePMS={this.props.ePMS}
              studyName={this.props.studyName}
            />
            <EmailBlastModal
              show={this.state.showEmailBlastModal}
              campaign={this.props.campaign}
              onClose={this.closeEmailBlastModal}
              onHide={this.toggleEmailBlastModal}
              studyName={this.props.studyName}
            />
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    exportPatients: (studyId, clientRoleId, text, campaignId, sourceId) => dispatch(exportPatients(studyId, clientRoleId, text, campaignId, sourceId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudyActionButtons);
