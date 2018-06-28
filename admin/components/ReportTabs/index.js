import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import TotalTabContent from '../TotalTabContent';
import StudyEndDateRangeTab from '../StudyEndDateRangeTab';
import MediaSourceTabContent from '../MediaSourceTabContent';
import DispositionTabContent from '../DispositionTabContent';

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
    mediaTotals: PropTypes.object,
    studies: PropTypes.object,
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
    const { mediaTotals, studies } = this.props;
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
            <TotalTabContent mediaTotals={mediaTotals} />
          </section>
          <section className={classNames('studykik', { active: (activeTab === 'studykik') })}>
            <MediaSourceTabContent studies={studies} type={'studykik'} active={(activeTab === 'studykik')} />
          </section>
          <section className={classNames('database', { active: (activeTab === 'database') })}>
            <MediaSourceTabContent studies={studies} type={'database'} active={(activeTab === 'database')} />
          </section>
          <section className={classNames('tv', { active: (activeTab === 'tv') })}>
            <MediaSourceTabContent studies={studies} type={'tv'} active={(activeTab === 'tv')} />
          </section>
          <section className={classNames('radio', { active: (activeTab === 'radio') })}>
            <MediaSourceTabContent studies={studies} type={'radio'} active={(activeTab === 'radio')} />
          </section>
          <section className={classNames('digital', { active: (activeTab === 'digital') })}>
            <MediaSourceTabContent studies={studies} type={'digital'} active={(activeTab === 'digital')} />
          </section>
          <section className={classNames('print', { active: (activeTab === 'print') })}>
            <MediaSourceTabContent studies={studies} type={'print'} active={(activeTab === 'print')} />
          </section>
          <section className={classNames('other', { active: (activeTab === 'other') })}>
            <MediaSourceTabContent studies={studies} type={'other'} active={(activeTab === 'other')} />
          </section>
          <section className={classNames('disposition', { active: (activeTab === 'disposition') })}>
            <DispositionTabContent studies={studies} active={(activeTab === 'disposition')} />
          </section>
          <section className={classNames('disposition', { active: (activeTab === 'studyEndDateRange') })}>
            <StudyEndDateRangeTab />
          </section>
        </div>
      </div>
    );
  }
}
