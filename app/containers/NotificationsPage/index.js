/* eslint-disable no-unused-vars */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import {
  selectCurrentUser,
} from 'containers/App/selectors';
import {
  selectNotifications,
} from 'containers/GlobalNotifications/selectors';
import {
  fetchNotifications,
} from 'containers/GlobalNotifications/actions';

export class NotificationsPage extends React.Component {
  static propTypes = {
    currentUser: PropTypes.any,
    notifications: PropTypes.array,
    fetchNotifications: PropTypes.func,
  }

  componentDidMount() {
    this.props.fetchNotifications(this.props.currentUser.id);
  }

  render() {
    return (
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
									<th>DESCRIPTION <i className="caret-arrow"></i></th>
									<th>DATE <i className="caret-arrow"></i></th>
									<th>TIME <i className="caret-arrow"></i></th>
								</tr>
							</thead>
							<tbody>
                { this.props.notifications.map(n =>
  								<tr className="">
  									<td>
  										<div className="info clearfix">
  											<div className="img-holder">
  												<img alt="image description" src="images/patient1.jpg" />
  											</div>
  											<div className="desc">
  												<p>
                            <span dangerouslySetInnerHTML={{ __html: n.event_log.eventMessage }} />
                            <br />
                            Fill Out Enrollment Data: Acne Study (Platinum Listing)
                          </p>
  											</div>
  										</div>
  									</td>
  									<td>{moment(n.event_log.created).format('MM/DD/YY')}</td>
  									<td>{moment(n.event_log.created).format('hh:mm A')}</td>
  								</tr>
                )}
							</tbody>
						</table>
					</section>
				</section>
      );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  notifications: selectNotifications,
});

const mapDispatchToProps = {
  fetchNotifications,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsPage);
