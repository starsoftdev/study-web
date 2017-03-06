import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import { map } from 'lodash';

import Checkbox from '../../../../components/Input/Checkbox';
import Toggle from '../../../../components/Input/Toggle';

class StudyLeftItem extends Component { // eslint-disable-line react/prefer-stateless-function
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
    const { index, studyInfo, siteInfo, indication } = this.props;
    const indicationNames = map(indication, (i, index) => (<li key={index}><span>{i}</span></li>));
    const memberNames = map(studyInfo.members, (v, index) => (<li key={index}><span>{v}</span></li>));
    return (
      <tr>
        <td>
          <Field
            name={`study-${index}`}
            type="checkbox"
            component={Checkbox}
          />
        </td>
        <td>
          <Field
            name={`status-${index}`}
            component={Toggle}
            className="field"
          />
        </td>
        <td></td>
        <td className="list">
          <ul className="list-unstyled">
            <li><span>{studyInfo.id}</span></li>
            <li><span>{studyInfo.percentage}</span></li>
            {memberNames}
            <li><span className={`color ${studyInfo.color.toLowerCase()}`}>{studyInfo.color}</span></li>
          </ul>
        </td>
        <td>
          <span className="site-location">{ siteInfo.name }</span>
          <ul className="list-unstyled">
            <li className="site-number">Site Number: <span>{siteInfo.siteNumber}</span></li>
            <li className="protocol">Protocol: <span>{siteInfo.protocol}</span></li>
            <li className="sponsor">Sponsor: <span>{siteInfo.sponsor}</span></li>
            <li className="cro">CRO: <span>{siteInfo.cro}</span></li>
            <li className="login-info">Last Login: <span>{siteInfo.lastLogin}</span></li>
          </ul>
        </td>
        <td>
          <ul className="list-unstyled">
            {indicationNames}
          </ul>
        </td>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps)(StudyLeftItem);
