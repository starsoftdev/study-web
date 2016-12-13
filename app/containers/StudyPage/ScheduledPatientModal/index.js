import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment-timezone';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import CenteredModal from '../../../components/CenteredModal/index';
import Input from '../../../components/Input/index';

const fieldName = 'ScheduledPatientModal';

@reduxForm({
  form: fieldName,
})
class ScheduledPatientModal extends React.Component {
  static propTypes = {
    onHide: React.PropTypes.func,
    show: React.PropTypes.bool.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { onHide, ...props } = this.props;
    return (
      <Modal
        {...props}
        id="scheduled-patient"
        dialogComponentClass={CenteredModal}
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
          <div />
        </Modal.Body>
      </Modal>
    );
  }
}

export default ScheduledPatientModal;
