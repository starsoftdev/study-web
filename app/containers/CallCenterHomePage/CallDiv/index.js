import React from 'react';

import { translate } from '../../../../common/utilities/localization';

import './style.less';

export default class CallDiv extends React.Component {
  render() {
    return (
      <div className="cc-container">
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.newpatient')}
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
        </div>
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.call')}1
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
        </div>
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.call')}2
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
        </div>
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.call')}3
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
          </div>
        </div>
        <div className="cc-row">
          <div className="cc-box cc-box-heading">
            {translate('container.page.callcenter.heading.meetings')}
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
            <span>Meeting Time</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
            <span>Meeting Time</span>
          </div>
          <div className="cc-box">
            <span>Patient Name</span>
            <span>Indication</span>
            <span>Meeting Time</span>
          </div>
        </div>
      </div>
    );
  }
}
