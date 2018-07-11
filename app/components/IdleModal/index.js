/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import CenteredModal from '../../components/CenteredModal';

class IdleModal extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    logout: React.PropTypes.func,
    stayLoggedIn: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.stayLoggedIn = this.stayLoggedIn.bind(this);
    this.logOff = this.logOff.bind(this);

    this.state = {
      remainingSeconds: 30,
      timerId: null,
    };
  }

  componentWillMount() {
    const timerId = setInterval(() => {
      this.setState({ remainingSeconds: this.state.remainingSeconds - 1 }, () => {
        if (this.state.remainingSeconds === 0) {
          clearInterval(this.state.timerId);
          this.props.logout();
        }
      });
    }, 1000);

    this.setState({ timerId });
  }

  stayLoggedIn() {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }
    this.props.stayLoggedIn();
  }

  logOff() {
    this.props.logout();
  }

  render() {
    const { show } = this.props;
    return (
      <Modal
        className="set-timezone-modal"
        dialogComponentClass={CenteredModal}
        show={show}
        backdrop
        keyboard
      >
        <Modal.Header>
          <Modal.Title>Session Timeout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are being timed-out due to inactivity. Please choose to stay signed in or to logoff.</p>
          <p>Otherwise, you will be logged off automatically.</p>
          <p>{`Time remaining: 00:${(this.state.remainingSeconds < 10) ? `0${this.state.remainingSeconds}` : this.state.remainingSeconds}`}</p>
          <div>
            <input type="button" value="Log Off" className="btn btn-gray-outline" style={{ marginRight: '15px' }} onClick={this.logOff} />
            <input type="button" value="Stay Logged In" className="btn btn-default" onClick={this.stayLoggedIn} />
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default IdleModal;
