import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSelectedUser, selectCurrentUser } from '../../containers/App/selectors';

import moment from 'moment';
class CallItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    messageData: PropTypes.object,
    currentUser: PropTypes.object,
    postMsg: PropTypes.bool,
  };

  render() {
    const { messageData, currentUser } = this.props;
    const cts = messageData.twilioCallRecord.created;
    const cdate = `${moment.utc(cts).format('MM/DD/YY')} at ${moment(cts).format('h:mm A')}`;

    let containerClassName = 'post-holder';
    // todo remove and put back Anonymous behavior
    // let senderName = 'Anonymous';
    let senderName = `${currentUser.firstName} ${currentUser.lastName}`;

    if (messageData.twilioCallRecord.direction === 'outbound-api') {
      containerClassName = 'post-holder even';
      if (messageData.user) {
        senderName = messageData.user.firstName.concat(' '.concat(messageData.user.lastName));
      }
    } else if (messageData.patient) {
      senderName = messageData.patient.firstName.concat(' '.concat(messageData.patient.lastName));
    }

    let addClass = 'long-text-width';
    if (this.props.postMsg) {
      containerClassName = 'post-msg';
      addClass = 'small-text-width';
    }

    return (
      <div className={containerClassName} data-post="1">
        {(() => {
          if (messageData.twilioCallRecord.duration === 0) {
            return (
              <div className="global-pms-chat-call-record-text">
                <div className={`call-record-text ${addClass}`}>Missed call from {senderName}</div>
                <div className="call-record-date">{cdate}</div>
              </div>
            );
          } else if (messageData.type === 'ended') {
            const ms = parseInt(messageData.twilioCallRecord.duration) * 1000;
            const durationStr = moment.utc(ms).format('HH:mm:ss');
            return (
              <div className="global-pms-chat-call-record-text">
                <div className={`call-record-text ${addClass}`}>Call ended, duration {durationStr}.</div>
                <div className="call-record-date">{cdate}</div>
              </div>
            );
          }
          return (
            <div className="global-pms-chat-call-record-text">
              <div className={`call-record-text ${addClass}`}>Call from {senderName}.</div>
              <div className="call-record-date">{cdate}</div>
            </div>
          );
        })()}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedUser: selectSelectedUser(),
  currentUser: selectCurrentUser(),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CallItem);
