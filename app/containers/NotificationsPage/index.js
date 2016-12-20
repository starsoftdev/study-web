/* eslint-disable no-unused-vars, global-require */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { orderBy } from 'lodash';
import moment from 'moment';
import classnames from 'classnames';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';

import {
  selectCurrentUser,
} from 'containers/App/selectors';
import {
  selectNotifications,
} from 'containers/GlobalNotifications/selectors';
import {
  fetchNotifications,
} from 'containers/GlobalNotifications/actions';

import NotificationItem from './Item';

export const getRedirectionUrl = (notification) => {
  const data = JSON.parse(notification.event_log.eventData);
  switch (notification.event_log.eventType) {
    case 'create-user':
      return `/${data.user_id}/profile`;
    case 'create-irb_ad_creation':
      return `/order-irb-ad-creation/${data.irb_ad_creation_id}`;
    case 'create-proposal':
      return `/request-proposal/${data.proposal_id}`;
    case 'update-patientCategory':
      return '/studies/';
    default:
      return '/';
  }
};

export const getAvatarUrl = (notification) => {
  const { event_log } = notification;
  let url = require('assets/images/Default-User-Img-Dr.png');
  if (event_log.eventType === 'twilio-message') {
    const data = JSON.parse(event_log.eventData);
    if (data.patientGender === 'Female') {
      url = require('assets/images/Default-User-Img-Girl.png');
    } else {
      url = require('assets/images/Default-User-Img.png');
    }
  }

  return url;
};

const sanitize = (notifications) => notifications.map(n => {
  const { event_log } = n;
  const description = event_log.eventMessage.replace(/<strong>/g, '').replace(/<\/strong>/g, '');

  const date = moment(event_log.created).format('MM/DD/YY');
  const time = moment(event_log.created).format('hh:mm A');

  return {
    ...n,
    description,
    date,
    time,
  };
});

export class NotificationsPage extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    notifications: PropTypes.array,
    fetchNotifications: PropTypes.func,
    push: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const initialNotifications = sanitize(props.notifications);
    this.state = {
      notifications: initialNotifications,
      sortDescription: 0,     // 0: none, 1: asc, 2: desc
      sortDate: 0,
      sortTime: 0,
    };
  }

  componentDidMount() {
    this.props.fetchNotifications(this.props.currentUser.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.notifications !== nextProps.notifications) {
      this.setState({
        notifications: sanitize(nextProps.notifications),
      });
    }
  }

  handleClickItem = (notification) => {
    this.props.push(getRedirectionUrl(notification));
  }

  sortBy = (field) => {
    let { notifications } = this.state;
    let sortField;
    let sortDescription = 0;
    let sortDate = 0;
    let sortTime = 0;
    if (field === 'description') {
      sortField = 'sortDescription';
    } else if (field === 'date') {
      sortField = 'sortDate';
    } else {
      sortField = 'sortTime';
    }

    const sortVal = (this.state[sortField] + 1) % 3;
    if (sortVal === 0) {
      notifications = orderBy(notifications, ['id'], ['desc']);
    } else if (sortVal !== 0) {
      notifications = orderBy(notifications, [field], [sortVal === 1 ? 'asc' : 'desc']);
    }

    if (field === 'description') {
      sortDescription = sortVal;
    } else if (field === 'date') {
      sortDate = sortVal;
    } else {
      sortTime = sortVal;
    }
    this.setState({
      notifications,
      sortDescription,
      sortDate,
      sortTime,
    });
  }

  render() {
    const { sortDescription, sortDate, sortTime } = this.state;

    return (
      <div className="container-fluid">
        <Helmet title="Notifications - StudyKIK" />
        <section className="rewards">
          <h2 className="main-heading">NOTIFICATIONS</h2>

          <section className="table-holder">
            <header>
              <h2>HISTORY</h2>
            </header>
            <table className="table">
              <colgroup>
                <col style={{ width: 'auto' }} />
                <col style={{ width: '11%' }} />
                <col style={{ width: '11%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th className={classnames({ up: sortDescription === 1, down: sortDescription === 2 })} onClick={() => { this.sortBy('description'); }}>DESCRIPTION <i className="caret-arrow" /></th>
                  <th className={classnames({ up: sortDate === 1, down: sortDate === 2 })} onClick={() => { this.sortBy('date'); }}>DATE <i className="caret-arrow" /></th>
                  <th className={classnames({ up: sortTime === 1, down: sortTime === 2 })} onClick={() => { this.sortBy('time'); }}>TIME <i className="caret-arrow" /></th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.notifications.map((n, i) => <NotificationItem key={i} notification={n} onClick={() => { this.handleClickItem(n); }} />)
                }
              </tbody>
            </table>
          </section>
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  notifications: selectNotifications,
});

const mapDispatchToProps = {
  fetchNotifications,
  push,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPage);
