import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSelectedUser } from 'containers/App/selectors';

import defaultUserImage from 'assets/images/Default-User-Img.png';
import defaultUserImageGirl from 'assets/images/Default-User-Img-Girl.png';
import defaultUserImageDoctor from 'assets/images/Default-User-Img-Dr.png';

class MessageItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    messageData: PropTypes.object,
  };

  render() {
    const { messageData } = this.props;
    const cts = messageData.twilioTextMessage.dateSent;
    const cdate = (new Date(cts)).toLocaleString();

    let containerClassName = 'post-holder';
    let senderImage = defaultUserImageGirl;

    let senderName = 'Anonymous';

    if (messageData.twilioTextMessage.direction === 'outbound-api') {
      containerClassName = 'post-holder even';
      senderImage = defaultUserImageDoctor;
      if (messageData.user) {
        senderName = messageData.user.firstName.concat(' '.concat(messageData.user.lastName));
      }
    } else if (messageData.patient.gender === 'Male') {
      senderImage = defaultUserImage;
      if (messageData.patient) {
        senderName = messageData.patient.firstName.concat(' '.concat(messageData.patient.lastName));
      }
    }

    return (
      <div className={containerClassName} data-post="1">
        <div className="img-holder"><img alt="" src={senderImage} /></div>
        <div className="post-content">
          <p>{messageData.twilioTextMessage.body}</p>
        </div>
        <strong className="email">{senderName}</strong>
        <time >{cdate}</time>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedUser: selectSelectedUser(),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MessageItem);
