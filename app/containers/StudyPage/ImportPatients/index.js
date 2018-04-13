/**
 * Created by mike on 10/3/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import sanitizeProps from '../../../utils/sanitizeProps';

const mapStateToProps = (state) => ({
  clientId: state.global.userData.roleForClient.client.id,
  studyId: state.studyPage.studyId,
});

const mapDispatchToProps = (dispatch) => ({
  push: (path) => dispatch(push(path)),
});

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({ form: 'importPatients' })
export default class ImportPatientsModal extends React.Component {
  static propTypes = {
    push: React.PropTypes.func,
    clientId: React.PropTypes.number,
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    toggleAddPatient: React.PropTypes.func.isRequired,
    studyId: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.renderUpload = this.renderUpload.bind(this);
    this.moveToUploadPage = this.moveToUploadPage.bind(this);
  }

  componentDidMount() {
  }

  moveToUploadPage() {
    const { push } = this.props;
    push('/app/upload-patients');
  }

  renderUpload() {
    const { toggleAddPatient } = this.props;
    return (
      <div>
        <span className="modal-opener" onClick={this.moveToUploadPage}>
          <div className="table">
            <div className="table-cell">
              <i className="icomoon-arrow_up_alt" />
              <span className="text">Upload Patients</span>
            </div>
          </div>
        </span>
        <span className="or">
          <span>or</span>
        </span>
        <a className="add-patient-info-import" onClick={toggleAddPatient}>
          <div className="table">
            <div className="table-cell">
              <i className="icomoon-icon_plus_alt" />
              <span className="text">Add Patient</span>
            </div>
          </div>
        </a>
      </div>
    );
  }

  render() {
    const { onHide, ...props } = this.props;
    const sanitizedProps = sanitizeProps(props);
    delete sanitizedProps.toggleAddPatient;
    delete sanitizedProps.studyId;
    delete sanitizedProps.push;
    return (
      <Modal
        {...sanitizedProps}
        id="import-info"
        dialogComponentClass={CenteredModal}
        onHide={onHide}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong>Import</strong>
          </Modal.Title>
          <a className="close" onClick={onHide}>
            <i className="icomoon-icon_close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          {this.renderUpload()}
        </Modal.Body>
      </Modal>
    );
  }
}
