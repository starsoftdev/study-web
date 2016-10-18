/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import classNames from 'classnames';
import moment from 'moment-timezone';

class PatientText extends React.Component {
  static propTypes = {
    currentUser: React.PropTypes.object.isRequired,
    textMessage: React.PropTypes.object,
  };

  componentDidMount() {
  }

  render() {
    const { currentUser, textMessage } = this.props;
    if (textMessage) {
      return (
        <div className={classNames('post-msg', { reply: !textMessage.user })}>
          <div className="img-holder">
            <img role="presentation" />
          </div>
          <div className="post-content">
            <p>{textMessage.body}</p>
            <a className="btn-trash">
              <i className="icomoon-icon_trash" />
            </a>
          </div>
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
