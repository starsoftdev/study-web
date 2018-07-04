import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import NotesTabContent from '../NotesTabContent';
import LandingPageEdit from '../LandingPageEdit';
import MediaTrackingEdit from '../MediaTrackingEdit';
import LeadGenEdit from '../LeadGenEdit';
import ThankYouEdit from '../ThankYouEdit';

const tabs = [
  { type: 'notes', title: 'notes' },
  { type: 'landingPage', title: 'landing page' },
  { type: 'campaign', title: 'campaign' },
  { type: 'leadGen', title: 'lead gen' },
  { type: 'mediaTracking', title: 'media tracking' },
  { type: 'thankYou', title: 'thank you page' },
  { type: 'patientThankYouEmail', title: 'patient thank you email' },
];

export default class EditStudyTabs extends Component {
  static propTypes = {
    study: PropTypes.object,
    activateManually: PropTypes.string,
    note: PropTypes.object,
    addNote: PropTypes.func,
    deleteNote: PropTypes.func,
    formValues: PropTypes.any,
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'notes',
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderTab = this.renderTab.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { activateManually } = newProps;
    if (activateManually) {
      this.setState({ activeTab: activateManually });
    }
  }

  handleClick(type) {
    this.setState({ activeTab: type });
  }

  renderTab(type, title, key) {
    const { activeTab } = this.state;
    return (
      <div
        key={key}
        className={classNames('tab', { active: (activeTab === type) })}
        onClick={() => this.handleClick(type)}
      >
        {title}
      </div>
    );
  }

  render() {
    const { activeTab } = this.state;
    const { note, currentUser, addNote, deleteNote, formValues, study } = this.props;
    return (
      <div id="editStudyTabs">
        <div className="tabs-holder">
          {
            tabs.map((tab, key) => {
              return this.renderTab(tab.type, tab.title, key);
            })
          }
        </div>
        <div className="content-holder">
          <section className={classNames('notes', { active: (activeTab === 'notes') })}>
            {(activeTab === 'notes') &&
              <NotesTabContent
                note={note}
                studyId={study.id}
                currentUser={currentUser}
                addNote={addNote}
                deleteNote={deleteNote}
                formValues={formValues}
              />
            }
          </section>
          <section className={classNames('landingPage', { active: (activeTab === 'landingPage') })}>
            <LandingPageEdit />
          </section>
          <section className={classNames('campaign', { active: (activeTab === 'campaign') })} />
          <section className={classNames('leadGen', { active: (activeTab === 'leadGen') })}>
            {(activeTab === 'leadGen') &&
              <LeadGenEdit studyId={study.id} />
            }
          </section>
          <section className={classNames('mediaTracking', { active: (activeTab === 'mediaTracking') })}>
            {(activeTab === 'mediaTracking') &&
              <MediaTrackingEdit study={study} />
            }
          </section>
          <section className={classNames('thankYou', { active: (activeTab === 'thankYou') })}>
            {(activeTab === 'thankYou') &&
              <ThankYouEdit studyId={study.id} />
            }
          </section>
          <section className={classNames('patientThankYouEmail', { active: (activeTab === 'patientThankYouEmail') })} />
        </div>
      </div>
    );
  }
}
