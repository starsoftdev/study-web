/**
 * Created by mike on 10/18/16.
 */

import React from 'react';
import classNames from 'classnames';

class EmailSection extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
  };

  componentDidMount() {
  }

  render() {
    const { active } = this.props;
    return (
      <div className={classNames((!active ? 'emails-tab' : ''), { active })}>
        {(!compose && currentPatient.id) &&
        <EmailSectionList
          switchCompose={this.switchCompose}
          fetchEmails={fetchEmails}
          emails={emails}
          studyId={studyId}
          currentPatient={currentPatient}
          active={active}
        />
        }

        {compose &&
        <EmailSectionSendForm
          submitEmailBlast={this.submitEmailBlast}
          switchCompose={this.switchCompose}
          active={active}
          change={change}
        />
        }
      </div>
    );
  }
}

export default EmailSection;
