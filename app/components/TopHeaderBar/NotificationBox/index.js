/* eslint-disable no-unused-vars */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import enhanceWithClickOutside from 'react-click-outside';

import _ from 'lodash';

import {
  fetchNotifications,
  fetchUnreadNotificationsCount,
  markNotificationsRead,
} from 'containers/GlobalNotifications/actions';

import {
  selectNotifications,
  selectUnreadNotificationsCount,
} from 'containers/GlobalNotifications/selectors';

import {
  getRedirectionUrl,
  getAvatarUrl,
} from 'containers/NotificationsPage';


class NotificationBox extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    notifications: PropTypes.array,
    unreadNotificationsCount: PropTypes.number,
    fetchNotifications: PropTypes.func.isRequired,
    fetchUnreadNotificationsCount: PropTypes.func.isRequired,
    markNotificationsRead: PropTypes.func.isRequired,
  }

  state = {
    dropdownOpen: false,
  }

  componentDidMount() {
    const { currentUser } = this.props;

    this.props.fetchUnreadNotificationsCount(currentUser.id);
    this.props.fetchNotifications(currentUser.id);
  }

  handleBadgeNumberClick = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
    this.props.markNotificationsRead(this.props.currentUser.id);
  }

  handleClickOutside = () => {
    this.setState({ dropdownOpen: false });
  }

  seeAllClick = () => {
    this.setState({ dropdownOpen: false });
  }

  parseNotificationTime(time, timezone) {
    return moment(time).tz(timezone).format('MM/DD/YY [at] h:mm A');
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="notifications pull-left open-close">
        <a
          className={classNames('opener', { active: this.state.dropdownOpen })}
          onClick={() => this.handleBadgeNumberClick()}
        >
          <i className="icomoon-bell" />
          { this.props.unreadNotificationsCount > 0 && <span className="counter">{this.props.unreadNotificationsCount}</span> }
        </a>

        {this.state.dropdownOpen &&
          <div className="notifications-drop slide">
            <div className="well">
              <strong className="title">NOTIFICATIONS</strong>
              <div className="jcf-scrollable">
                <ul className="list-unstyled">
                  {
                    _.take(this.props.notifications, 3).map(n => (
                      <li key={n.id}>
                        <a href={getRedirectionUrl(n)}>
                          <div className="img-circle"><img src={getAvatarUrl(n)} width="43" height="43" alt="Avatar" /></div>
                          <p dangerouslySetInnerHTML={{ __html: n.event_log.eventMessage }} />
                          <time>{this.parseNotificationTime(n.event_log.created, currentUser.timezone)}</time>
                        </a>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="btn-block text-center">
                <Link onClick={this.seeAllClick} className="hover-underline" to="/notifications">
                  See All
                </Link>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  notifications: selectNotifications,
  unreadNotificationsCount: selectUnreadNotificationsCount,
});

const mapDispatchToProps = {
  fetchNotifications,
  fetchUnreadNotificationsCount,
  markNotificationsRead,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(enhanceWithClickOutside(NotificationBox));
