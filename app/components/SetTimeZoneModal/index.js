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
      timezoneDemoUrl = '/images/timezone-demo.gif';
    } else if (currentUserRoleType === 'sponsor') {
      timezoneDemoUrl = '/images/sponsor-timezone-demo.gif';
    } else {
      timezoneDemoUrl = '/images/dashboard-timezone-demo.gif';
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
          <p>Please click below to set your time zone by entering your city or address.
            This will make sure all patient notifications are timestamped in your time zone.</p>
          <div>
            <Link className="btn btn-default" to="/app/me/profile">Get Started</Link>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default SetTimeZoneModal;
