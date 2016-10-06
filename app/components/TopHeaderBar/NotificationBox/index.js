/* eslint-disable no-unused-vars */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import { fetchUnreadNotificationsCount } from 'containers/GlobalNotifications/actions';

import avatar1 from 'assets/images/img2.png';
import avatar2 from 'assets/images/img3.png';
import avatar3 from 'assets/images/img4.png';

import './styles.less';

class NotificationBox extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    fetchUnreadNotificationsCount: PropTypes.func,
  }

  state = {
    dropdownOpen: false,
  }

  componentDidMount() {
    const { currentUser } = this.props;

    if (!currentUser) {
      console.error('Something is wrong with session');
      return;
    }

    // this.props.fetchUnreadNotificationsCount(currentUser);
  }

  handleBadgeNumberClick = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <div className="notifications pull-left open-close">
        <a className="opener" href="#" onClick={() => this.handleBadgeNumberClick()}>
          <i className="icon-bell"></i>
          <span className="counter">1</span>
        </a>

        {this.state.dropdownOpen &&
          <div className="notifications-drop slide">
            <div className="well">
              <strong className="title">NOTIFICATIONS</strong>
              <div className="jcf-scrollable">
                <ul className="list-unstyled">
                  <li>
                    <a href="#">
                      <div className="img-circle"><img src={avatar1} width="43" height="43" alt="Alan walker" /></div>
                      <p><strong>alan walker</strong> moved Thomas Morgan from New Patient to Consented.</p>
                      <time dateTime="2016-05-16">05/16/16 at 11:31 PM</time>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="img-circle"><img src={avatar2} width="43" height="43" alt="penny_worth" /></div>
                      <p><strong>penny worth</strong> listed a new Birth Control Study.</p>
                      <time dateTime="2016-05-16">05/16/16 at 11:30 PM</time>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="img-circle"><img src={avatar3} width="43" height="43" alt="arrow_island" /></div>
                      <p><strong>Oliver Queen</strong> sent a text message to Thomas Morgan</p>
                      <time dateTime="2016-05-16">05/16/16 at 9:30 PM</time>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <div className="img-circle"><img src={avatar3} width="43" height="43" alt="Alan walker" /></div>
                      <p><strong>alan walker</strong> moved Thomas Morgan from New Patient to Consented.</p>
                      <time dateTime="2016-05-16">05/16/16 at 11:31 PM</time>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="btn-block text-center">
                <Link to="/notifications">
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

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
  // fetchUnreadNotificationsCount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationBox);
