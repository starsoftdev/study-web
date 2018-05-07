import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../containers/App/selectors';
import { translate } from '../../../common/utilities/localization';

import defaultUserImage from '../../assets/images/Default-User-Img.png';
import defaultUserImageGirl from '../../assets/images/Default-User-Img-Girl.png';


class PatientItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    patientData: PropTypes.object,
    onSelectPatient: PropTypes.func,
    patientSelected: PropTypes.bool,
    timezone: PropTypes.string,
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.selectPatient = this.selectPatient.bind(this);
  }

  selectPatient() {
    this.props.onSelectPatient(this.props.patientData);
  }

  render() {
    const { patientData, patientSelected, currentUser } = this.props;

    const timezone = this.props.timezone || currentUser.timezone;

    const lastDate = (new Date(patientData.last_message_date ? patientData.last_message_date : patientData.created_at));
    const lastDateFormatted = moment(lastDate).tz(timezone).format(`MM/DD/YYYY [${translate('common.timeString.at')}] h:mm A`);
    return (
      <li className={patientSelected === true ? 'active' : ''} onClick={this.selectPatient}>
        <a className="tab-opener">
          <div className="user-img">
            <img src={patientData.gender === 'Female' ? defaultUserImageGirl : defaultUserImage} alt="" />
          </div>
          <strong className="name">{patientData.first_name} {patientData.last_name}</strong>
          <p>{(patientData.last_message_body !== null && patientData.last_message_body !== undefined) ? patientData.last_message_body : translate('portals.component.globalPMSModal.patientItem.noMessage')}</p>
          <time>
            {lastDateFormatted}
            {patientData.count_unread > 0
              ? <span className="counter-circle">{patientData.count_unread}</span>
              : ''
            }
          </time>
        </a>
      </li>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PatientItem);
