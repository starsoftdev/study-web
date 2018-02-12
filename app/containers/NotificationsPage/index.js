/* eslint-disable no-unused-vars, global-require */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { orderBy } from 'lodash';
import moment from 'moment-timezone';
import classnames from 'classnames';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingSpinner from '../../components/LoadingSpinner';
import {
  selectCurrentUser,
} from '../../containers/App/selectors';
import {
  selectNotifications,
  selectPaginationOptions,
} from '../../containers/GlobalNotifications/selectors';
import {
  fetchNotifications,
} from '../../containers/GlobalNotifications/actions';

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
  const data = JSON.parse(event_log.eventData);
  let url = require('../../assets/images/Default-User-Img-Dr.png');
  if (event_log.eventType === 'twilio-message' || event_log.eventType === 'new-patient' || event_log.eventType === 'twilio-call') {
    if (data.patientGender === 'Female') {
      url = require('../../assets/images/Default-User-Img-Girl.png');
    } else {
      url = require('../../assets/images/Default-User-Img.png');
    }
  } else if ((event_log.eventType === 'earn-rewards' && data.type === 'enroll') || event_log.eventType === 'set-time-zone') {
    url = require('../../assets/images/site_location.png');
  }

  return url;
};

export const eventMessage = (eventLog) => {
  if (eventLog.eventType === 'create-appointment') {
    /*
    const data = JSON.parse(eventLog.eventData);
    const userTime = moment(data.time).tz(data.timezone);
    const date = userTime.format('MM/DD/YY');
    const time = userTime.format('h:mm A');
    return `${eventLog.eventMessage} at ${time} on ${date}.`;
    */
  }
  return eventLog.eventMessage;
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
    paginationOptions: PropTypes.object,
    push: PropTypes.func,
  }

  constructor(props) {
    super(props);

    const initialNotifications = sanitize(props.notifications);
    this.loadMore = this.loadMore.bind(this);
    this.handleClickItem = this.handleClickItem.bind(this);

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

  loadMore() {
    const { fetchNotifications, paginationOptions, currentUser } = this.props;
    if (!paginationOptions.fetching) {
      const offset = paginationOptions.page * 10;
      const limit = 10;
      fetchNotifications(currentUser.id, limit, offset);
    }
  }

  render() {
    const { sortDescription, sortDate, sortTime, notifications } = this.state;
    return (
      <div className="container-fluid">
        <Helmet title="Notifications - StudyKIK" />
        <section className="rewards">
          <h2 className="main-heading">NOTIFICATIONS</h2>

          <section className="table-holder">
            <header>
              <h2>HISTORY</h2>
            </header>
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadMore}
              initialLoad={false}
              hasMore={this.props.paginationOptions.hasMoreItems}
              loader={null}
            >
              <table className="table notifications">
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
                    notifications.map((n, i) => <NotificationItem key={i} notification={n} onClick={() => { this.handleClickItem(n); }} />)
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3">
                      {this.props.paginationOptions.fetching && <div className="text-center"><LoadingSpinner showOnlyIcon /></div>}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </InfiniteScroll>
          </section>
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  notifications: selectNotifications,
  paginationOptions: selectPaginationOptions,
});

function mapDispatchToProps(dispatch) {
  return {
    fetchNotifications: (userId, limit, offset) => dispatch(fetchNotifications(userId, limit, offset)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPage);
