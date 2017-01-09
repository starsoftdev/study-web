/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import moment from 'moment-timezone';
import classNames from 'classnames';

class PatientText extends React.Component {
  static propTypes = {
    currentUser: React.PropTypes.object.isRequired,
    currentPatient: React.PropTypes.object.isRequired,
    textMessage: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.renderTextMessageOriginUser = this.renderTextMessageOriginUser.bind(this);
    this.renderProfileImage = this.renderProfileImage.bind(this);
  }

  componentDidMount() {
  }

  renderProfileImage() {
    const { currentPatient, textMessage } = this.props;
    /* eslint-disable global-require */
    if (textMessage.user) {
      return (
        <img role="presentation" src={textMessage.user.profileImageURL} />
      );
    } else if (textMessage.direction === 'outbound-api' || textMessage.direction === 'outbound') {
      let url = require('../../../assets/images/Default-User-Img-Dr.png');
      if (this.props.currentUser.profileImageURL) {
        url = this.props.currentUser.profileImageURL;
      }
      return (
        <img role="presentation" src={url} />
      );
    } else if (currentPatient.gender === 'Female') {
      const url = require('../../../assets/images/Default-User-Img-Girl.png');
      return (
        <img role="presentation" src={url} />
      );
    }
    const url = require('../../../assets/images/Default-User-Img.png');
    return (
      <img role="presentation" src={url} />
    );
  }

  renderTextMessageOriginUser() {
    const { currentPatient, textMessage, currentUser } = this.props;
    if (textMessage.direction === 'outbound-api' || textMessage.direction === 'outbound') {
      return (
        <strong className="name">{currentUser.firstName} {currentUser.lastName}</strong>
      );
    }
    return (
      <strong className="name">{currentPatient.firstName} {currentPatient.lastName}</strong>
    );
  }

  render() {
    const { currentUser, textMessage } = this.props;
    if (textMessage) {
      let addon = ''

      if (textMessage.isStopMessage) {
        addon = <span className="stop-list-notification">
          This patient no longer wants to receive text messages.
          The ability to text him/her through your portal has been removed.
          You may still call or email to see if he/she qualifies for the study.
          </span>
      } else if (textMessage.isStartMessage) {
        addon = <span className="stop-list-notification">
          This patient is able to receive text messages.
          </span>
      }
      return (
        <div className={classNames('post-msg', { reply: textMessage.direction === 'outbound-api' || textMessage.direction === 'outbound' })}>
          <div className="img-holder">
            {this.renderProfileImage()}
          </div>
          <div className="post-content">
            <p>
              {textMessage.body}
              {addon}
              {(textMessage.isBlastMessage) ?
                <span className="blast-message-notification"><br />
                  Text STOP to stop.
                </span> : '' }
            </p>
            <a className="btn-trash">
              <i className="icomoon-icon_trash" />
            </a>
          </div>
          {this.renderTextMessageOriginUser()}
          <time dateTime={textMessage.dateCreated}>
            {moment.tz(textMessage.dateCreated, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}
          </time>
        </div>
      );
    }
    return null;
  }
}

export default PatientText;
