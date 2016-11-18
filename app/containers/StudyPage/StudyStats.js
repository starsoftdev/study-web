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
                <strong className="number">{stats.views}</strong>
                <h3>TOTAL STUDY VIEWS</h3>
              </div>
              <div className="box same-height-left">
                <i className="icomoon-user-in" />
                <strong className="number">{stats.referrals}</strong>
                <h3>TOTAL PATIENT REFERRALS</h3>
              </div>
            </Col>
            <Col xs={4} className="green">
              <div className="box">
                <i className="icomoon-phone" />
                <strong className="number">{stats.calls}</strong>
                <h3>CALLS PLACED</h3>
              </div>
              <div className="box">
                <i className="icomoon-icon_clock_alt" />
                <strong className="number">{stats.callsDuration}</strong>
                <h3>CALLS DURATION</h3>
              </div>
            </Col>
            <Col xs={4} className="orange">
              <div className="box same-height-right">
                <i className="icomoon-chat-up" />
                <strong className="number">{stats.texts}</strong>
                <h3>TEXTS SENT</h3>
              </div>
              <div className="box same-height-right">
                <i className="icomoon-chat-down" />
                <strong className="number">{stats.textsReceived}</strong>
                <h3>TEXTS RECEIVED</h3>
              </div>
            </Col>
          </Row>
        </Collapse>
      </div>
    );
  }
}

export default StudyStats;
