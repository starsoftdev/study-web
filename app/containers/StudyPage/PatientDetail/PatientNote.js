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

  constructor(props) {
    super(props);
    this.renderProfileImage = this.renderProfileImage.bind(this);
  }

  renderProfileImage() {
    const { note } = this.props;
    /* eslint-disable global-require */
    if (note.user && note.user.profileImageURL) {
      return (
        <img alt="" src={note.user.profileImageURL} />
      );
    }
    const url = require('../../../assets/images/Default-User-Img-Dr.png');
    return (
      <img alt="" src={url} />
    );
  }

  render() {
    const { currentPatient, currentUser, note, submitDeleteNote } = this.props;
    return (
      <div className={classNames('note-msg', { reply: (note.user && note.user.id === currentUser.id) })}>
        <div className="note">
          <div className="note-header">
            <a
              className="btn-trash"
              onClick={() => {
                submitDeleteNote(currentPatient.id, currentPatient.patientCategoryId, note.id);
              }}
            >
              <i className="icomoon-icon_trash" />
            </a>
          </div>
          <div className="note-content">
            <p>{note.note}</p>
          </div>
          <div className="note-userinfo">
            <div className="img-holder">
              {this.renderProfileImage()}
            </div>
            <div className="info">
              <div className="info-line">
                <span className="label"> Name: </span>
                <div className="content">
                  <span>
                    {(note.user && (note.user.roleForClient || note.archivedAuthor)) ? `${note.user.firstName} ${note.user.lastName}` : 'StudyKIK'}
                  </span>
                </div>
              </div>

              <div className="info-line">
                <span className="label"> Date: </span>
                <div className="content">
                  <span>
                    {moment.tz(note.createdAt, currentUser.timezone).format('MM/DD/YY')}
                  </span>
                </div>
              </div>

              <div className="info-line">
                <span className="label"> Time: </span>
                <div className="content">
                  <span>
                    {moment.tz(note.createdAt, currentUser.timezone).format('h:mm A')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientNote;
