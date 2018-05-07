import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment-timezone';

import { selectSelectedUser, selectCurrentUser } from '../../containers/App/selectors';
import { translate } from '../../../common/utilities/localization';

import defaultUserImage from '../../assets/images/Default-User-Img.png';
import defaultUserImageGirl from '../../assets/images/Default-User-Img-Girl.png';
import defaultUserImageDoctor from '../../assets/images/Default-User-Img-Dr.png';

class MessageItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    messageData: PropTypes.object,
    currentUser: PropTypes.object,
    timezone: PropTypes.string,
  };

  render() {
    const { messageData, currentUser } = this.props;
    const cts = messageData.twilioTextMessage.dateCreated;
    let addon = '';
    let containerClassName = 'post-holder';
    let senderImage = defaultUserImage;
    // todo remove and put back Anonymous behavior
    // let senderName = 'Anonymous';
    let senderName = `${currentUser.firstName} ${currentUser.lastName || ''}`;
    const timezone = this.props.timezone || currentUser.timezone;

    if (messageData.twilioTextMessage.direction === 'outbound-api') {
      containerClassName = 'post-holder even';
      senderImage = defaultUserImageDoctor;
      if (this.props.currentUser.profileImageURL) {
        senderImage = this.props.currentUser.profileImageURL;
      }
      if (messageData.user) {
        senderName = (!messageData.twilioTextMessage.isProxyMessage) ? messageData.user.firstName.concat(' '.concat(messageData.user.lastName || '')) : translate('common.layout.title');
      }
    } else {
      if (messageData.patient.gender === 'Female') {
        senderImage = defaultUserImageGirl;
      }
      if (messageData.patient) {
        senderName = messageData.patient.firstName.concat(' '.concat(messageData.patient.lastName || ''));
      }
    }

    if (messageData.twilioTextMessage.isStopMessage) {
      addon = <span className="stop-list-notification"></span>;
    } else if (messageData.twilioTextMessage.isStartMessage) {
      addon = <span className="stop-list-notification">{translate('portals.component.globalPMSModal.messageItem.startMessage')}</span>;
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
        <time>{moment(cts).tz(timezone).format(translate('portals.component.globalPMSModal.messageItem.dateMask'))}</time>
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
