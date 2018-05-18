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
} from '../../../containers/GlobalNotifications/actions';

import {
  selectNotifications,
  selectUnreadNotificationsCount,
} from '../../../containers/GlobalNotifications/selectors';

import {
  selectSites,
} from '../../../containers/App/selectors';

import {
  getAvatarUrl,
  eventMessage,
} from '../../../containers/NotificationsPage';
import { translate } from '../../../../common/utilities/localization';


class NotificationBox extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    sites: PropTypes.array,
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
    return moment(time).tz(timezone).format(translate('portals.component.topHeaderBar.notificationBox.dateMask'));
  }

  render() {
    const { currentUser, sites } = this.props;
    let timezone = currentUser.timezone;
    if (currentUser.roleForClient && currentUser.roleForClient.site_id) {
      const site = _.find(sites, site => site.id === currentUser.roleForClient.site_id);
      if (site) {
        timezone = site.timezone;
      }
    }

    return (
      <div className="notifications pull-left open-close">
        <a
          className={classNames('opener', { active: this.state.dropdownOpen })}
          onClick={() => this.handleBadgeNumberClick()}
        >
          {(currentUser.roleForClient && currentUser.roleForClient.site_id) && <i className="icomoon-bell" />}
          { this.props.unreadNotificationsCount > 0 && <span className="counter">{this.props.unreadNotificationsCount}</span> }
        </a>

        {this.state.dropdownOpen &&
        <div className="notifications-drop slide">
          <div className="well">
            <strong className="title">{translate('portals.component.topHeaderBar.notificationBox.title')}</strong>

            {this.props.notifications.length > 0 &&
              <div className="jcf-scrollable">
                <ul className="list-unstyled">
                  {
                    _.take(this.props.notifications, 3).map(n => {
                      let html = eventMessage(n.event_log);
                      let showTime = true;
                      if (html.indexOf('<a href="/app/study') !== -1) {
                        showTime = false;
                        html = `${html.substring(0, html.indexOf('</a>'))}
                          <time>${this.parseNotificationTime(n.event_log.created, timezone)}</time></a>`;
                      }
                      return (
                        <li key={n.id}>
                          <a>
                            <div className="img-circle bg-gray">
                              <img src={getAvatarUrl(n)} width="43" height="43" alt="Avatar" />
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: html }} />
                            {showTime &&
                            <time>{this.parseNotificationTime(n.event_log.created, timezone)}</time>
                            }
                          </a>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
            }

            <div className="btn-block text-center">
              <Link onClick={this.seeAllClick} className="hover-underline" to="/app/notifications">
                {translate('portals.component.topHeaderBar.notificationBox.seeAll')}
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
  sites: selectSites(),
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
