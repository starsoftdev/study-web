/*
 *
 * GlobalNotifications
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from 'containers/App/selectors';
import selectSocket from 'containers/GlobalNotifications/selectors';
import {
  setSocketConnection,
  subscribeToPageEvent,
  unsubscribeFromPageEvent,
  unsubscribeFromAll,
  subscribeToChatEvent,
} from 'containers/GlobalNotifications/actions';

export class GlobalNotifications extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    setSocketConnection: PropTypes.func,
    subscribeToPageEvent: PropTypes.func,
    unsubscribeFromPageEvent: PropTypes.func,
    unsubscribeFromAll: PropTypes.func,
    subscribeToChatEvent: PropTypes.func,
    socket: PropTypes.any,
    currentUser: PropTypes.any,
    events: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.subscribeToPageEvents = this.subscribeToPageEvents.bind(this);
    this.unsubscribeCurrent = this.unsubscribeCurrent.bind(this);
    this.unsubscribeAll = this.unsubscribeAll.bind(this);
    this.subscribeToChat = this.subscribeToChat.bind(this);
  }

  componentDidMount() {
    // ..
  }

  subscribeToPageEvents() {
    this.props.events.forEach(event => {
      this.props.subscribeToPageEvent({
        events: event.events,
        raw: event.raw,
        cb: (err, data) => {
          if (!err) {
            this.props.socket.on(data.event[0] + data.sid, (payload) => {
              event.cb(null, payload);
            });
          } else {
            event.cb(err, null);
          }
        },
      });
    });
  }

  subscribeToChat() {
    this.props.subscribeToChatEvent({
      events: ['subscribe-chat'],
      raw: {
        studyId: 1,
        patientId: 1,
        firstName: 'test',
        lastName: 'test',
        phone: '111111111',
      },
      cb: (err, data) => {
        console.log(err, data);
      },
    });
  }

  unsubscribeCurrent() {
    const events = this.getEventTypes();
    this.props.unsubscribeFromPageEvent({
      events,
      raw: { pathname: this.props.location.pathname },
      cb: (err, data) => {
        console.log(err, data);
      },
    });
  }

  unsubscribeAll() {
    const events = this.getEventTypes();
    this.props.unsubscribeFromAll({
      events,
      cb: (err, data) => {
        console.log(err, data);
      },
    });
  }

  getEventTypes() {
    switch (this.props.location.pathname) {
      default:
        return [
          'twilio-message',
        ];
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.socket && nextProps.currentUser) {
      nextProps.setSocketConnection({
        nsp: 'nsp',
        props: nextProps,
        cb: (err, socket) => {
          if (!err) {
            socket.on('notification', (notification) => {
              console.log(notification);
            });
            socket.on('connect', () => {
              this.subscribeToPageEvents();
            });
          } else {
            console.error(err);
          }
        },
      });
    }
  }

  render() {
    const layout = (<div>
      <div onClick={this.subscribeToPageEvents}>subscribe to twilio-message</div>
      <div onClick={this.subscribeToChat}>subscribe to chat</div>
      <div onClick={this.unsubscribeCurrent}>unsubscribe from twilio-message</div>
      <div onClick={this.unsubscribeAll}>unsubscribe from all</div>
    </div>);

    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  socket: selectSocket(),
});

function mapDispatchToProps(dispatch) {
  return {
    setSocketConnection: (values) => dispatch(setSocketConnection(values)),
    subscribeToPageEvent: (values) => dispatch(subscribeToPageEvent(values)),
    unsubscribeFromPageEvent: (values) => dispatch(unsubscribeFromPageEvent(values)),
    unsubscribeFromAll: (values) => dispatch(unsubscribeFromAll(values)),
    subscribeToChatEvent: (values) => dispatch(subscribeToChatEvent(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalNotifications);
