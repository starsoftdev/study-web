/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import { Link } from 'react-router';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../components/CenteredModal';

class SetTimeZoneModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    currentUserRoleType: React.PropTypes.string.isRequired,
  };

  render() {
    const { show, currentUserRoleType } = this.props;
    let timezoneDemoUrl;
    if (currentUserRoleType === 'client') {
      timezoneDemoUrl = '/timezone-demo.gif';
    } else if (currentUserRoleType === 'sponsor') {
      timezoneDemoUrl = '/sponsor-timezone-demo.gif';
    } else {
      timezoneDemoUrl = '/dashboard-timezone-demo.gif';
    }
    return (
      <Modal
        className="set-timezone-modal"
        dialogComponentClass={CenteredModal}
        show={show}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>Welcome to Your MyStudyKIK Portal!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img alt="" src={timezoneDemoUrl} style={{ width: '100%' }} />
          <p>Before getting started, please click below to set your default time zone by entering your address.
            This is very important to make sure all notifications are received at the correct times.</p>
          <div>
            <Link className="btn btn-default" to="/app/me/profile">OK</Link>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default SetTimeZoneModal;
