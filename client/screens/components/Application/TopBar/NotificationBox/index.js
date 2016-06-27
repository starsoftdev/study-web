import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchUnreadNotificationsCount } from 'actions'

import NotificationList from '../../../NotificationList'

import './styles.less'

export default class NotificationBox extends React.Component {
  static propTypes = {
    authorization: PropTypes.any,
    notification: PropTypes.object,
    fetchUnreadNotificationsCount: PropTypes.func,
  }

  state = {
    dropdownOpen: false
  }

  componentWillMount () {
    const { authData } = this.props.authorization

    if (authData) {
      this.props.fetchUnreadNotificationsCount(authData.userId)
    }
  }

  handleBadgeNumberClick = () => {
    this.setState ({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render () {
    return (
      <div className="notification-box">
        <span className="badge-number" onClick={() => this.handleBadgeNumberClick()}>{this.props.notification.unreadNotificationsCount}</span>

        {this.state.dropdownOpen &&
          <div className="notification-dropdown">
            <div className="header-label">NOTIFICATIONS</div>
            <NotificationList authorization={this.props.authorization} notification={this.props.notification} isNotificationPage={false} />
            <Link to="/notifications">
              <div className="see-all-button">See All</div>
            </Link>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  notification: state.notification,
})

const mapDispatchToProps = {
  fetchUnreadNotificationsCount,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationBox)
