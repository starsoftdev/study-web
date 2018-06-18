import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';

import { translate } from '../../../common/utilities/localization';

class Tabs extends Component {
  static propTypes = {
    onExit: PropTypes.func.isRequired,
    onSelectTab: PropTypes.func.isRequired,
    selectedTab: PropTypes.string.isRequired,
  };

  render() {
    const { onExit, onSelectTab, selectedTab } = this.props;

    return (
      <div className="tabs">
        <Button
          className={classNames('tab', { active: selectedTab === 'call1' })}
          onClick={() => onSelectTab('call1')}
        >
          {translate('container.page.callCenterPatient.tab.call')} 1
        </Button>
        <Button
          className={classNames('tab', { active: selectedTab === 'call2' })}
          onClick={() => onSelectTab('call2')}
        >
          {translate('container.page.callCenterPatient.tab.call')} 2
        </Button>
        <Button
          className={classNames('tab', { active: selectedTab === 'call3' })}
          onClick={() => onSelectTab('call3')}
        >
          {translate('container.page.callCenterPatient.tab.call')} 3
        </Button>
        <Button
          className={classNames('tab', { active: selectedTab === 'scheduled' })}
          onClick={() => onSelectTab('scheduled')}
        >
          {translate('container.page.callCenterPatient.tab.scheduled')}
        </Button>
        <Button
          className={classNames('tab', { active: selectedTab === 'prescreened' })}
          onClick={() => onSelectTab('prescreened')}
        >
          {translate('container.page.callCenterPatient.tab.prescreened')}
        </Button>
        <Button
          className={classNames('tab', { active: selectedTab === 'dnq' })}
          onClick={() => onSelectTab('dnq')}
        >
          {translate('container.page.callCenterPatient.tab.dnq')}
        </Button>
        <Button
          className={classNames('tab', { active: selectedTab === 'ni' })}
          onClick={() => onSelectTab('ni')}
        >
          {translate('container.page.callCenterPatient.tab.ni')}
        </Button>
        <Button
          className={classNames('tab', { active: selectedTab === 'cnc' })}
          onClick={() => onSelectTab('cnc')}
        >
          {translate('container.page.callCenterPatient.tab.cnc')}
        </Button>
        <Button className="tab exit" onClick={onExit}>
          {translate('container.page.callCenterPatient.tab.exit')}
        </Button>
      </div>
    );
  }
}

export default Tabs;
