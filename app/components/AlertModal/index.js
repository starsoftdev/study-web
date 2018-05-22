/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../components/CenteredModal';
import { translate } from '../../../common/utilities/localization';

class AlertModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
  };

  render() {
    const { show, name, onHide } = this.props;
    return (
      <Modal
        show={show}
        id="patient-database-alert"
        dialogComponentClass={CenteredModal}
        onHide={onHide}
        backdrop
        keyboard
      >

        <Modal.Body>
          <div className="text-center">
            <p>
              {translate('client.component.alertModal.name', { name })}
            </p>
            <div className="btn-block">
              <a className="btn btn-default lightbox-close" onClick={onHide}>{translate('client.component.alertModal.ok')}</a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default AlertModal;
