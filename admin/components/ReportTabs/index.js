import React from 'react';
import classNames from 'classnames';
import ReportTabTable from '../../components/ReportTabTable';

const tabs = [
  { type: 'total' },
  { type: 'studykik' },
  { type: 'database' },
  { type: 'tv' },
  { type: 'radio' },
  { type: 'digital' },
  { type: 'print' },
  { type: 'other' },
  { type: 'disposition' },
];

export default class ReportTabs extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'studykik',
    };

    this.handleClick = this.handleClick.bind(this);
    this.renderTab = this.renderTab.bind(this);
  }

  handleClick(type) {
    this.setState({ activeTab: type });
  }

  renderTab(type) {
    const { activeTab } = this.state;
    return (
      <div
        className={classNames('tab', { active: (activeTab === type) })}
        onClick={() => this.handleClick(type)}
      >
        {type}
      </div>
    );
  }

  render() {
    const { activeTab } = this.state;
    return (
      <div id="reportTabs">
        <div className="tabs-holder">
          {
            tabs.map(tab => {
              return this.renderTab(tab.type);
            })
          }
        </div>
        <div className="content-holder">
          <section className={classNames('total', { active: (activeTab === 'total') })} />
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
        </div>
      </div>
    );
  }
}
