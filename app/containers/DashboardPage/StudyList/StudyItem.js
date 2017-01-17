import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { map } from 'lodash';

import Checkbox from '../../../components/Input/Checkbox';
import Toggle from '../../../components/Input/Toggle';

class StudyItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    index: PropTypes.number,
    status: PropTypes.string,
    studyInfo: PropTypes.object,
    siteInfo: PropTypes.object,
    indication: PropTypes.array,
    location: PropTypes.string,
    exposureLevel: PropTypes.string,
    goal: PropTypes.number,
    patients: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.showHover = this.showHover.bind(this);
    this.hideHover = this.hideHover.bind(this);
  }

  showHover() {
    this.setState({ hover: true });
  }

  hideHover() {
    this.setState({ hover: false });
  }

  render() {
    const { index, studyInfo, siteInfo, location, exposureLevel, goal, indication, patients } = this.props;
    const indicationNames = map(indication, indicationIterator => indicationIterator).join(', ');
    const memberNames = map(studyInfo.members, v => `<span>${v}</span>`).join(', ');
    return (
      <div className={classNames('tr', 'study-container', { 'tr-active': this.state.hover })} onMouseEnter={this.showHover} onMouseLeave={this.hideHover}>
        <div className="td">
          <Field
            name={`study-${index}`}
            type="checkbox"
            component={Checkbox}
          />
        </div>
        <div className="td status">
          <Field
            name={`status-${index}`}
            component={Toggle}
            className="field"
          />
        </div>
        <div className="td index">
          <span>{index}</span>
        </div>
        <div className="td studyInfo">
          <span>{studyInfo.id}</span>
          <span>{studyInfo.percentage}</span>
          <div>{memberNames}</div>
          <span>{studyInfo.color}</span>
        </div>
        <div className="td siteInfo">
          <div>
            { siteInfo.name }
            Site Number: {siteInfo.siteNumber}
            Protocol: {siteInfo.protocol}
            Sponsor: {siteInfo.sponsor}
            CRO: {siteInfo.cro}
            Last Login: {siteInfo.lastLogin}
          </div>
        </div>
        <div className="td indication">
          <span>{indicationNames}</span>
        </div>
        <div className="td location">
          <span>{location}</span>
        </div>
        <div className="td exposureLevel">
          <span>{exposureLevel}</span>
        </div>
        <div className="td goal">
          <span>{goal}</span>
        </div>
        <div className="td patients">
          <div>
            Today: {patients.today}
            Yesterday: {patients.yesterday}
            Campaign: {patients.campaign}
            Grand Total: {patients.grandTotal}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps)(StudyItem);
