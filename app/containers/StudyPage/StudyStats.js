/**
 * Created by mike on 9/20/16.
 */

import React from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import classNames from 'classnames';
import { translate } from '../../../common/utilities/localization';

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
    let callsDuration = translate('client.component.studyStats.defaultDuration');
    if (stats.callsDuration) {
      date.setSeconds(stats.callsDuration);
      callsDuration = date.toISOString().substr(11, 8);
    }
    return (
      <div className={classNames('stats', { active: this.state.open })}>
        <div className="head">
          <h2>{translate('client.component.studyStats.title')}</h2>
          <span className="opener" onClick={this.onToggle} />
        </div>
        <Collapse className="infoarea" in={this.state.open}>
          <Row>
            <Col xs={4}>
              <div className="box same-height-left">
                <i className="icomoon-open-eye" />
                <strong className="number">{stats.views ? stats.views : 0}</strong>
                <h3>{translate('client.component.studyStats.counterViews')}</h3>
              </div>
              <div className="box same-height-left">
                <i className="icomoon-user-in" />
                <strong className="number">{stats.totalReferrals || 0}</strong>
                <h3>{translate('client.component.studyStats.counterReferrals')}</h3>
              </div>
            </Col>
            <Col xs={4} className="green">
              <div className="box">
                <i className="icomoon-phone" />
                <strong className="number">{stats.calls ? stats.calls : 0}</strong>
                <h3>{translate('client.component.studyStats.counterCallReceived')}</h3>
              </div>
              <div className="box">
                <i className="icomoon-icon_clock_alt" />
                <strong className="number">{callsDuration}</strong>
                <h3>{translate('client.component.studyStats.counterDuration')}</h3>
              </div>
            </Col>
            <Col xs={4} className="orange">
              <div className="box same-height-right">
                <i className="icomoon-chat-up" />
                <strong className="number">{stats.textsSent ? stats.textsSent : 0}</strong>
                <h3>{translate('client.component.studyStats.counterSent')}</h3>
              </div>
              <div className="box same-height-right">
                <i className="icomoon-chat-down" />
                <strong className="number">{stats.textsReceived ? stats.textsReceived : 0}</strong>
                <h3>{translate('client.component.studyStats.counterTextReceived')}</h3>
              </div>
            </Col>
          </Row>
        </Collapse>
      </div>
    );
  }
}

export default StudyStats;
