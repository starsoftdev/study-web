/**
*
* PQSModal
*
*/

import React from 'react';
import { Modal } from 'react-bootstrap';
import PQSStatsForm from '../../components/PQSStatsForm';
import CenteredModal from '../../components/CenteredModal/index';

class PQSModal extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    showModal: React.PropTypes.bool,
    closePQSModal: React.PropTypes.func.isRequired,
  };

  render() {
    return (
      <div>
        <Modal dialogComponentClass={CenteredModal} dialogClassName={'pqs-stats-modal'} show={this.props.showModal} onHide={this.props.closePQSModal}>
          <Modal.Header>
            <Modal.Title>Patient Qualification Suite Stats</Modal.Title>
            <a className="lightbox-close close" onClick={this.props.closePQSModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <PQSStatsForm />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default PQSModal;
