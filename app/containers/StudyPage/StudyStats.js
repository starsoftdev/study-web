/**
 * Created by mike on 9/20/16.
 */

import React from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import classNames from 'classnames';

class StudyStats extends React.Component {
  static propTypes = {
    stats: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(event) {
    event.preventDefault();
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const { stats } = this.props;
    const date = new Date(null);
    let callsDuration = '00:00:00';
    if (stats.callsDuration) {
      date.setSeconds(stats.callsDuration);
      callsDuration = date.toISOString().substr(11, 8);
    }
    return (
      <div className={classNames('stats', { active: this.state.open })}>
        <div className="head">
          <h2>STATS</h2>
          <span className="opener" onClick={this.onToggle}></span>
        </div>
        <Collapse className="infoarea" in={this.state.open}>
          <Row>
            <Col xs={4}>
              <div className="box same-height-left">
                <i className="icomoon-open-eye" />
                <strong className="number">{stats.views ? stats.views : 0}</strong>
                <h3>TOTAL STUDY VIEWS</h3>
              </div>
              <div className="box same-height-left">
                <i className="icomoon-user-in" />
                <strong className="number">{stats.referrals ? stats.referrals : 0}</strong>
                <h3>TOTAL PATIENT REFERRALS</h3>
              </div>
            </Col>
            <Col xs={4} className="green">
              <div className="box">
                <i className="icomoon-phone" />
                <strong className="number">{stats.calls ? stats.calls : 0}</strong>
                <h3>CALL RECEIVED</h3>
              </div>
              <div className="box">
                <i className="icomoon-icon_clock_alt" />
                <strong className="number">{callsDuration}</strong>
                <h3>CALL DURATION</h3>
              </div>
            </Col>
            <Col xs={4} className="orange">
              <div className="box same-height-right">
                <i className="icomoon-chat-up" />
                <strong className="number">{stats.textsSent ? stats.textsSent : 0}</strong>
                <h3>TEXT SENT</h3>
              </div>
              <div className="box same-height-right">
                <i className="icomoon-chat-down" />
                <strong className="number">{stats.textsReceived ? stats.textsReceived : 0}</strong>
                <h3>TEXT RECEIVED</h3>
              </div>
            </Col>
          </Row>
        </Collapse>
      </div>
    );
  }
}

export default StudyStats;
