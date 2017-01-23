import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getLocalTime } from 'utils/time';
import { selectSelectedUser, selectCurrentUser } from '../../containers/App/selectors';

import defaultUserImage from 'assets/images/Default-User-Img.png';
import defaultUserImageGirl from 'assets/images/Default-User-Img-Girl.png';
import defaultUserImageDoctor from 'assets/images/Default-User-Img-Dr.png';

class MessageItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    messageData: PropTypes.object,
    currentUser: PropTypes.object,
  };

  render() {
    const { messageData, currentUser } = this.props;
    const cts = messageData.twilioTextMessage.dateCreated;
    const cdate = getLocalTime(cts, currentUser.timezone).format('MM/DD/YYYY [at] H:mm A');

    let addon = '';
    let containerClassName = 'post-holder';
    let senderImage = defaultUserImageGirl;
    // todo remove and put back Anonymous behavior
    // let senderName = 'Anonymous';
    let senderName = `${currentUser.firstName} ${currentUser.lastName}`;

    if (messageData.twilioTextMessage.direction === 'outbound-api') {
      containerClassName = 'post-holder even';
      senderImage = defaultUserImageDoctor;
      if (this.props.currentUser.profileImageURL) {
        senderImage = this.props.currentUser.profileImageURL;
      }
      if (messageData.user) {
        senderName = messageData.user.firstName.concat(' '.concat(messageData.user.lastName));
      }
    } else {
      if (messageData.patient.gender === 'Male') {
        senderImage = defaultUserImage;
      }
      if (messageData.patient) {
        senderName = messageData.patient.firstName.concat(' '.concat(messageData.patient.lastName));
      }
    }

    if (messageData.twilioTextMessage.isStopMessage) {
      addon = <span className="stop-list-notification">This patient no longer wants to receive text messages. The ability to text him/her through your portal has been removed. You may still call or email to see if he/she qualifies for the study.</span>;
    } else if (messageData.twilioTextMessage.isStartMessage) {
      addon = <span className="stop-list-notification">This patient is able to receive text messages.</span>;
    }

    return (
      <div className={containerClassName} data-post="1">
        <div className="img-holder"><img alt="" src={senderImage} /></div>
        <div className="post-content">
          <p>
            {messageData.twilioTextMessage.body}
            {addon}
          </p>
        </div>
        <strong className="email">{senderName}</strong>
        <time>{cdate}</time>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedUser: selectSelectedUser(),
  currentUser: selectCurrentUser(),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MessageItem);
