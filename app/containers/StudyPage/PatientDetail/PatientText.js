/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import moment from 'moment-timezone';

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
    const { textMessage } = this.props;
    if (textMessage.user) {
      return (
        <img role="presentation" src={textMessage.user.profileImageURL} />
      );
    }
    return null;
  }

  renderTextMessageOriginUser() {
    const { currentPatient, textMessage } = this.props;
    if (textMessage.user) {
      return (
        <strong className="name">{textMessage.user.firstName} {textMessage.user.lastName}</strong>
      );
    }
    return (
      <strong className="name">{currentPatient.firstName} {currentPatient.lastName}</strong>
    );
  }

  render() {
    const { currentUser, textMessage } = this.props;
    const messageStyle = (textMessage.direction === 'outbound-api' || textMessage.direction === 'outbound') ? '' : 'reply';
    if (textMessage) {
      return (
        <div className={`post-msg ${messageStyle}`}>
          <div className="img-holder">
            {this.renderProfileImage()}
          </div>
          <div className="post-content">
            <p>{textMessage.body}</p>
            <a className="btn-trash">
              <i className="icomoon-icon_trash" />
            </a>
          </div>
          {this.renderTextMessageOriginUser()}
          <time dateTime={textMessage.createdAt}>
            {moment.tz(textMessage.createdAt, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}
          </time>
        </div>
      );
    }
    return null;
  }
}

export default PatientText;
