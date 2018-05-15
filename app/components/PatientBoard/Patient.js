/**
 * Created by mike on 10/14/16.
 */

import React from 'react';
import classNames from 'classnames';
import moment from 'moment-timezone';
import { DragSource } from 'react-dnd';
import Button from 'react-bootstrap/lib/Button';
import { formatPhone } from '../../common/helper/functions';
import { translate } from '../../../common/utilities/localization';
import DragTypes from './dragSourceTypes';

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const patientSource = {
  isDragging(props, monitor) {
    // If your component gets unmounted while dragged
    // you can implement something like this to keep its
    // appearance dragged:
    return monitor.getItem().id === props.patient.id;
  },
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = {
      id: props.patient.id,
      patientCategoryId: props.category.id,
    };
    return item;
  },
};

const collect = (connect, monitor) => ({
  // Call this function inside render()
  // to let React DnD handle the drag events:
  connectDragSource: connect.dragSource(),
  // You can ask the monitor about the current drag state:
  isDragging: monitor.isDragging(),
});

@DragSource(DragTypes.PATIENT, patientSource, collect)
class Patient extends React.Component {

  static propTypes = {
    category: React.PropTypes.object.isRequired,
    connectDragSource: React.PropTypes.func.isRequired,
    currentSite: React.PropTypes.object.isRequired,
    currentUser: React.PropTypes.object.isRequired,
    currentPatientId: React.PropTypes.number,
    isDragging: React.PropTypes.bool.isRequired,
    onPatientClick: React.PropTypes.func.isRequired,
    onPatientTextClick: React.PropTypes.func.isRequired,
    patient: React.PropTypes.object.isRequired,
    unreadMessageCount: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.renderUnreadMessageCount = this.renderUnreadMessageCount.bind(this);
    this.renderTextCreatedDate = this.renderTextCreatedDate.bind(this);
    this.renderPatientTextMessageSummary = this.renderPatientTextMessageSummary.bind(this);
  }

  renderUnreadMessageCount() {
    const { unreadMessageCount } = this.props;
    if (unreadMessageCount > 0) {
      return (
        <span className="counter-circle">{unreadMessageCount}</span>
      );
    }
    return null;
  }

  renderTextCreatedDate() {
    const { currentUser, currentSite, patient: { lastTextMessage } } = this.props;

    const timezone = currentUser.roleForClient && currentUser.roleForClient.site_id ? currentSite.timezone : currentUser.timezone;

    if (lastTextMessage && lastTextMessage.dateCreated) {
      return (
        <time dateTime={lastTextMessage.dateCreated}>{moment.tz(lastTextMessage.dateCreated, timezone).format(translate('client.component.patient.dateMask'))}</time>
      );
    }
    return null;
  }

  renderPatientTextMessageSummary() {
    const { category, onPatientTextClick, patient, unreadMessageCount } = this.props;

    if ((patient.lastTextMessage && patient.lastTextMessage.dateCreated) || unreadMessageCount > 0) {
      return (
        <a
          className={classNames({ bottom: true, 'has-counter': unreadMessageCount > 0 })}
          onClick={() => {
            if (unreadMessageCount === 0) {
              onPatientTextClick(category, patient);
            }
          }}
        >
          <div className="msg-alert">
            <div className="msg">
              <p>{patient.lastTextMessage ? patient.lastTextMessage.body : ''}</p>
            </div>
            <div className="time">
              {this.renderUnreadMessageCount()}
              <Button bsStyle="primary" className="btn-reply" onClick={() => { onPatientTextClick(category, patient); }}>{translate('client.component.patient.reply')}</Button>
              {this.renderTextCreatedDate()}
            </div>
          </div>
        </a>
      );
    }
    return null;
  }

  render() {
    const { connectDragSource, category, currentPatientId, onPatientClick, patient } = this.props;
    let patientPhone;
    if (patient.phone) {
      // phone number error will be ignored and the phone number will be displayed regardless, even though formatting is incorrect
      try {
        patientPhone = formatPhone(patient.phone);
      } catch (err) {
        patientPhone = patient.phone;
      }
    }
    return connectDragSource(
      <li
        className={classNames({ 'patient-li': true, 'patient-selected': patient.id === currentPatientId })}
        data-patient-id={patient.id}
      >
        <div className="patient-inner">
          <a
            className="top"
            onClick={() => {
              onPatientClick(category, patient);
            }}
          >
            <strong className="name">
              <span className="first-name">{patient.firstName}</span>
              <span> </span>
              <span className="last-name">{patient.lastName}</span>
            </strong>
            <span className="email">{patient.email}</span>
            <span className="phone">{patientPhone}</span>
          </a>
          {this.renderPatientTextMessageSummary()}
        </div>
      </li>
    );
  }
}

export default Patient;
