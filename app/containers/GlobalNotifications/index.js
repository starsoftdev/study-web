/*
 *
 * GlobalNotifications
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';
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
    location: PropTypes.any,
    currentUser: PropTypes.any,
    events: React.PropTypes.array,
  }

  constructor(props) {
    super(props);
    this.subscribeToPageEvents = this.subscribeToPageEvents.bind(this);
    this.subscribeToChat = this.subscribeToChat.bind(this);
  }

  componentDidMount() {
    const props = this.props;
    if (!props.socket && props.currentUser) {
      props.setSocketConnection({
        nsp: 'nsp',
        props,
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

  componentWillReceiveProps() {}

  getEventTypes() {
    switch (this.props.location.pathname) {
      default:
        return [
          'twilio-message',
        ];
    }
  }

  get eventsList() {
    return this.EventsList;
  }

  set eventsList(value) {
    this.EventsList = value;
  }

  subscribeToPageEvents() {
    if (this.props.events) {
      this.props.events.forEach(event => {
        this.props.subscribeToPageEvent({
          events: event.events,
          raw: event.raw,
          cb: (err, data) => {
            if (!err) {
              const eventData = data;
              eventData.count = 0;
              const eventsList = this.eventsList || [];
              if (_.find(eventsList, eventData)) {
                eventData.count++;
              } else {
                eventsList.push(eventData);
              }
              this.eventsList = eventsList;
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

  render() {
    /* const layout = (<div>
      <div onClick={this.subscribeToPageEvents}>subscribe to twilio-message</div>
      <div onClick={this.subscribeToChat}>subscribe to chat</div>
    </div>); */

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
