/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import moment from 'moment-timezone';
import classNames from 'classnames';
import { translate } from '../../../../common/utilities/localization';

class PatientText extends React.Component {
  static propTypes = {
    currentUser: React.PropTypes.object.isRequired,
    currentPatient: React.PropTypes.object.isRequired,
    textMessage: React.PropTypes.object,
    site: React.PropTypes.object,
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
    if (textMessage.user && textMessage.user.profileImageURL) {
      return (
        <img alt="" src={textMessage.user.profileImageURL} />
      );
    } else if (textMessage.direction === 'outbound-api' || textMessage.direction === 'outbound') {
      let url = require('../../../assets/images/Default-User-Img-Dr.png');
      if (this.props.currentUser.profileImageURL) {
        url = this.props.currentUser.profileImageURL;
      }
      return (
        <img alt="" src={url} />
      );
    } else if (currentPatient.gender === 'Female') {
      const url = require('../../../assets/images/Default-User-Img-Girl.png');
      return (
        <img alt="" src={url} />
      );
    }
    const url = require('../../../assets/images/Default-User-Img.png');
    return (
      <img alt="" src={url} />
    );
  }

  renderTextMessageOriginUser() {
    const { currentPatient, textMessage, currentUser } = this.props;
    if (textMessage.direction === 'outbound-api' || textMessage.direction === 'outbound') {
      const user = (textMessage.user || currentUser);
      const author = (!textMessage.isProxyMessage) ? `${user.firstName} ${user.lastName || ''}` : translate('client.component.patientText.studyKIK');
      return (
        <strong className="name">{author}</strong>
      );
    }
    return (
      <strong className="name">{currentPatient.firstName} {currentPatient.lastName || ''}</strong>
    );
  }

  render() {
    const { textMessage, site, currentUser } = this.props;
    const timezone = currentUser.roleForClient && currentUser.roleForClient.site_id ? site.timezone : currentUser.timezone;

    if (textMessage) {
      let addon = '';

      if (textMessage.isStopMessage) {
        addon = <span className="stop-list-notification">{translate('client.component.patientText.stopListNotification')}</span>;
      } else if (textMessage.isStartMessage) {
        addon = <span className="stop-list-notification">{translate('client.component.patientText.startListNotification')}</span>;
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
                  {translate('client.component.patientText.blastMessageNotification')}
                </span> : '' }
            </p>
            <a className="btn-trash">
              <i className="icomoon-icon_trash" />
            </a>
          </div>
          {this.renderTextMessageOriginUser()}
          <time dateTime={textMessage.dateCreated}>
            {moment.tz(textMessage.dateCreated, timezone).format(translate('client.component.patientText.dateMask'))}
          </time>
        </div>
      );
    }
    return null;
  }
}

export default PatientText;
