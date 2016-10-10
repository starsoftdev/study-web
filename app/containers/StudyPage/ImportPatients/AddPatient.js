/**
 * Created by mike on 10/9/16.
 */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import CenteredModal from '../../../components/CenteredModal/index';

class AddPatient extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { onClose, onHide, ...props } = this.props;
    return (
      <Modal
        {...props}
        id="add-patient-info-import"
        dialogComponentClass={CenteredModal}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>
            <strong>Import</strong>
          </Modal.Title>
          <a className="close" onClick={onHide}>
            <i className="icomoon-close" />
          </a>
        </Modal.Header>
        <Modal.Body>
          <div className="scroll-holder jcf--scrollable">
            <Form className="form-lightbox" noValidate="novalidate">
              <div className="field-row">
                <strong className="label required">
                  <label htmlFor="import-patient-first-name">Patient Name</label></strong>
                <div className="field">
                  <div className="row">
                    <div className="col pull-left">
                      <input type="text" placeholder="First Name" className="form-control" id="import-patient-first-name" required />
                    </div>
                    <div className="col pull-left">
                      <input type="text" placeholder="Last Name" className="form-control" required />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field-row">
                <strong className="label required"><label htmlFor="import-patient-email">PATIENT EMAIL </label></strong>
                <div className="field">
                  <input type="email" id="import-patient-email" className="form-control" required />
                </div>
              </div>
              <div className="field-row">
                <strong className="label required"><label htmlFor="import-patient-phone"> PATIENT PHONE </label></strong>
                <div className="field">
                  <input type="text" data-type="number" id="import-patient-phone" className="form-control" required />
                </div>
              </div>
              <div className="text-right">
                <input type="submit" value="submit" className="btn btn-default" />
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddPatient;
