/**
 * Created by mike on 10/14/16.
 */

import React from 'react';

class PatientText extends React.Component {
  static propTypes = {
    currentPatient: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    textMessage: React.PropTypes.object.isRequired,
  };
  

  render() {
    const { currentUser, currentPatient, textMessage } = this.props;
    return (
      <div className="post-msg">
        <div className="img-holder">
          <img role="presentation" src="" />
        </div>
        <div className="post-content">
          <p>{textMessage.body}</p>
          <a className="btn-trash">
            <i className="icomoon-icon_trash" />
          </a>
        </div>
        <time dateTime={textMessage.createdAt}>{moment.tz(textMessage.createdAt, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
      </div>
    );
  }
}

export default PatientText;
