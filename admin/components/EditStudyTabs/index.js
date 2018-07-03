import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import NotesTabContent from '../NotesTabContent';
import LandingPageEdit from '../LandingPageEdit';
import MediaTrackingEdit from '../MediaTrackingEdit';
import LeadGenEdit from '../LeadGenEdit';
import ThankYouEdit from '../ThankYouEdit';
import { CampaignEdit } from '../CampaignEdit';

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
    studyId: PropTypes.any,
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
    const { note, currentUser, studyId, addNote, deleteNote, formValues } = this.props;
    /* TODO: fetch study at home container */
    const study = {
      action_needed: null,
      action_needed_campaign: null,
      ae_user_first_name: null,
      ae_user_id: null,
      ae_user_last_name: null,
      bd_user_first_name: null,
      bd_user_id: null,
      bd_user_last_name: null,
      call_attempted: null,
      call_attempted_campaign: null,
      campaign_count: null,
      campaign_datefrom: '2018-01-01T04:00:00.000Z',
      campaign_dateto: '2018-02-02T03:59:59.000Z',
      campaign_id: 2,
      campaign_length: '1',
      campaign_level_id: 1,
      campaigns_count: '1',
      canDeletePatient: false,
      cc_user_first_name: null,
      cc_user_id: null,
      cc_user_last_name: null,
      color: 'red',
      consented: null,
      consented_campaign: null,
      count_not_contacted: null,
      count_not_contacted_campaign: null,
      count_total: '0',
      cro_id: null,
      cro_name: null,
      custom_patient_goal: null,
      customer_credits: 171,
      dnq: null,
      dnq_campaign: null,
      emailCredits: 48,
      facebookUrl: null,
      five_9_value: null,
      goal: 1,
      inbound_text: 0,
      indication_id: 51,
      indication_name: 'Birth Control',
      isPublic: false,
      landingPageUrl: 'test2',
      last_login_time: '2018-06-18T21:49:52.652Z',
      level_id: 1,
      level_name: 'Bronze',
      mediaTracking: false,
      outbound_text: 0,
      patientMessagingSuite: true,
      patient_qualification_suite: false,
      percent: 0,
      phone_number: '+15104471379',
      piName: 'Test test',
      protocol_id: 2,
      protocol_number: 'AC-0',
      randomized: null,
      randomized_campaign: null,
      recruitment_phone: '+1714123124',
      reward_balance: 5,
      scheduled: null,
      scheduled_campaign: null,
      screen_failed: null,
      screen_failed_campaign: null,
      selected: true,
      shouldShowInSponsorPortal: false,
      siteAdminUserId: 3,
      site_address: '123 Wall Street, app. 57',
      site_city: null,
      site_country_code: 'US',
      site_id: 2,
      site_name: 'Wayne Enterprises',
      site_state: null,
      site_zip: '13063',
      sm_user_first_name: null,
      sm_user_id: null,
      sm_user_last_name: null,
      sponsor_id: 2,
      sponsor_name: 'Crazy Joe',
      study_id: 2,
      study_source_number_id: 8,
      suvoda_protocol_id: null,
      text_number_id: 2,
      tier_number: 4,
      timezone: 'America/New_York',
      today_count: null,
      unread_text: 0,
      views_count: 3,
      yesterday_count: null,
    };
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
            <NotesTabContent
              note={note}
              studyId={studyId}
              currentUser={currentUser}
              addNote={addNote}
              deleteNote={deleteNote}
              formValues={formValues}
            />
          </section>
          <section className={classNames('landingPage', { active: (activeTab === 'landingPage') })}>
            <LandingPageEdit />
          </section>
          <section className={classNames('campaign', { active: (activeTab === 'campaign') })}>
            <CampaignEdit study={study} formValues={formValues} />
          </section>
          <section className={classNames('leadGen', { active: (activeTab === 'leadGen') })}>
            <LeadGenEdit />
          </section>
          <section className={classNames('mediaTracking', { active: (activeTab === 'mediaTracking') })}>
            <MediaTrackingEdit studyId={studyId} />
          </section>
          <section className={classNames('thankYou', { active: (activeTab === 'thankYou') })}>
            {(activeTab === 'thankYou') &&
              <ThankYouEdit
                studyId={studyId}
              />
            }
          </section>
          <section className={classNames('patientThankYouEmail', { active: (activeTab === 'patientThankYouEmail') })} />
        </div>
      </div>
    );
  }
}
