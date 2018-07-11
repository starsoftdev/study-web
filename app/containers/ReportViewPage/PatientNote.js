/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import moment from 'moment-timezone';
import classNames from 'classnames';
import { translate } from '../../../common/utilities/localization';

class PatientNote extends React.Component {
  static propTypes = {
    currentPatient: React.PropTypes.object,
    currentUser: React.PropTypes.object.isRequired,
    note: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.renderProfileImage = this.renderProfileImage.bind(this);
  }

  renderProfileImage() {
    const { note } = this.props;
    /* eslint-disable global-require */
    if (note.profileImageURL) {
      return (
        <img alt="" src={note.profileImageURL} />
      );
    }
    const url = require('../../assets/images/Default-User-Img-Dr.png');
    return (
      <img alt="" src={url} />
    );
  }

  render() {
    const { currentUser, note } = this.props;
    return (
      <div className={classNames('note-msg', { reply: note.user_id === currentUser.id })}>
        <div className="note">
          <div className="note-header">
          </div>
          <div className="note-content">
            <p>{note.note}</p>
          </div>
          <div className="note-userinfo">
            <div className="img-holder">
              { this.renderProfileImage() }
            </div>
            <div className="info">
              <div className="info-line">
                <span className="label"> {translate('sponsor.component.patientNote.name')} </span>
                <div className="content">
                  <span>
                    {(!note.is_proxy) ? `${note.firstName} ${note.lastName}` : translate('sponsor.component.patientNote.studyKIK')}
                  </span>
                </div>
              </div>

              <div className="info-line">
                <span className="label"> {translate('sponsor.component.patientNote.date')} </span>
                <div className="content">
                  <span>
                    {moment.tz(note.created_at, currentUser.timezone).format(translate('sponsor.component.patientNote.defaultDateMask'))}
                  </span>
                </div>
              </div>

              <div className="info-line">
                <span className="label"> {translate('sponsor.component.patientNote.time')} </span>
                <div className="content">
                  <span>
                    {moment.tz(note.created_at, currentUser.timezone).format(translate('sponsor.component.patientNote.defaultTimeMask'))}
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
