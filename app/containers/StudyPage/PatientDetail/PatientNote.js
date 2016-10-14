/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import moment from 'moment-timezone';

class PatientNote extends React.Component {
  static propTypes = {
    currentUser: React.PropTypes.object.isRequired,
    note: React.PropTypes.object.isRequired,
  };
  

  render() {
    const { currentUser, note } = this.props;
    return (
      <div className="post-msg">
        <div className="img-holder">
          <img role="presentation" src={note.user.profileImageURL} />
        </div>
        <div className="post-content">
          <p>{note.note}</p>
          <a className="btn-trash">
            <i className="icomoon-icon_trash" />
          </a>
        </div>
        <strong className="email patient-name">
          <span className="first-name">{note.user.firstName}</span>
          <span className="last-name"> {note.user.lastName}</span>
        </strong>
        <time dateTime={note.createdAt}>{moment.tz(note.createdAt, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
      </div>
    );
  }
}

export default PatientNote;
