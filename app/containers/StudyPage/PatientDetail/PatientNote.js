/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import moment from 'moment-timezone';
import classNames from 'classnames';

class PatientNote extends React.Component {
  static propTypes = {
    currentPatient: React.PropTypes.object,
    currentUser: React.PropTypes.object.isRequired,
    note: React.PropTypes.object.isRequired,
    submitDeleteNote: React.PropTypes.func.isRequired,
  };


  render() {
    const { currentPatient, currentUser, note, submitDeleteNote } = this.props;
    return (
      <div className={classNames('post-msg', { reply: note.user.id === currentUser.id })}>
        <div className="img-holder">
          <img role="presentation" src={note.user.profileImageURL} />
        </div>
        <div className="post-content">
          <p>{note.note}</p>
          <a className="btn-trash" onClick={() => {
            submitDeleteNote(currentPatient.id, note.id);
          }}>
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
