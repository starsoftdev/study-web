import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReportTabTable from '../ReportTabTable';
import TotalTabContent from '../TotalTabContent';
import StudyEndDateRangeTab from '../StudyEndDateRangeTab';

const tabs = [
  { type: 'total', title: 'total' },
  { type: 'studykik', title: 'studykik' },
  { type: 'database', title: 'database' },
  { type: 'tv', title: 'tv' },
  { type: 'radio', title: 'radio' },
  { type: 'digital', title: 'digital' },
  { type: 'print', title: 'print' },
  { type: 'other', title: 'other' },
  { type: 'disposition', title: 'disposition' },
  { type: 'studyEndDateRange', title: 'study end date range' },
];

export default class ReportTabs extends Component {
  static propTypes = {
    activateManually: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'total',
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
        className={classNames('tab', { active: (activeTab === type) })}
        onClick={() => this.handleClick(type)}
        key={key}
      >
        {title}
      </div>
    );
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div id="reportTabs">
        <div className="tabs-holder">
          {
            tabs.map((tab, key) => {
              return this.renderTab(tab.type, tab.title, key);
            })
          }
        </div>
        <div className="content-holder">
          <section className={classNames('total', { active: (activeTab === 'total') })}>
            <TotalTabContent />
          </section>
          <section className={classNames('studykik', { active: (activeTab === 'studykik') })}>
            <ReportTabTable />
          </section>
          <section className={classNames('database', { active: (activeTab === 'database') })}>
            <ReportTabTable />
          </section>
          <section className={classNames('tv', { active: (activeTab === 'tv') })}>
            <ReportTabTable />
          </section>
          <section className={classNames('radio', { active: (activeTab === 'radio') })}>
            <ReportTabTable />
          </section>
          <section className={classNames('digital', { active: (activeTab === 'digital') })}>
            <ReportTabTable />
          </section>
          <section className={classNames('print', { active: (activeTab === 'print') })}>
            <ReportTabTable />
          </section>
          <section className={classNames('other', { active: (activeTab === 'other') })}>
            <ReportTabTable />
          </section>
          <section className={classNames('disposition', { active: (activeTab === 'disposition') })} />
          <section className={classNames('disposition', { active: (activeTab === 'studyEndDateRange') })}>
            <StudyEndDateRangeTab />
          </section>
        </div>
      </div>
    );
  }
}
