/**
 * Created by mike on 10/3/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../../components/CenteredModal/index';
import sanitizeProps from '../../../utils/sanitizeProps';

const mapStateToProps = (state) => ({
  clientId: state.global.userData.roleForClient.client.id,
  studyId: state.studyPage.studyId,
});

const mapDispatchToProps = () => ({
});

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({ form: 'importPatients' })
export default class ImportPatientsModal extends React.Component {
  static propTypes = {
    clientId: React.PropTypes.number,
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    toggleAddPatient: React.PropTypes.func.isRequired,
    studyId: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.renderUpload = this.renderUpload.bind(this);
  }

  componentDidMount() {
  }

  renderUpload() {
    const { toggleAddPatient } = this.props;
    return (
      <div>
        <span className="modal-opener coming-soon-wrapper">
          <div className="table">
            <div className="table-cell">
              <i className="icomoon-arrow_up_alt" />
              <span className="text coming-soon-old">Upload Patients</span>
              <span className="text coming-soon-new" />
            </div>
          </div>
        </span>
        <span className="or">
          <span>or</span>
        </span>
        <span className="modal-opener" onClick={toggleAddPatient}>
          <div className="table">
            <div className="table-cell">
              <i className="icomoon-icon_plus_alt" />
              <span className="text">Add Patient</span>
            </div>
          </div>
        </span>
      </div>
    );
  }

  render() {
    const { onHide, ...props } = this.props;
    const sanitizedProps = sanitizeProps(props);
    delete sanitizedProps.toggleAddPatient;
    delete sanitizedProps.studyId;
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
