/**
 * Created by mike on 10/18/16.
 */

import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import { readStudyPatientMessages, updatePatientSuccess } from '../actions';
import CallItem from '../../../components/GlobalPMSModal/CallItem';
import { markAsReadPatientMessages, deleteMessagesCountStat } from '../../App/actions';
import { translate } from '../../../../common/utilities/localization';
import * as Selector from '../selectors';

import {
  sendStudyPatientMessages,
  fetchStudyPatientMessages,
  setProcessingStatus,
} from '../../GlobalNotifications/actions';

import { selectClientSites } from '../../App/selectors';
import PatientText from './PatientText';

const formName = 'CallCenterPatientPage.Text';

@reduxForm({
  form: formName,
})
class TextSection extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    currentPatient: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    fetchStudyPatientMessages: React.PropTypes.func.isRequired,
    sendStudyPatientMessages: React.PropTypes.func.isRequired,
    setProcessingStatus: React.PropTypes.func,
    socket: React.PropTypes.any,
    studyId: React.PropTypes.any,
    readStudyPatientMessages: React.PropTypes.func.isRequired,
    markAsReadPatientMessages: React.PropTypes.func,
    deleteMessagesCountStat: React.PropTypes.func,
    updatePatientSuccess: React.PropTypes.func,
    ePMS: React.PropTypes.bool,
    currentPatientCategory: React.PropTypes.object,
    site: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.renderText = this.renderText.bind(this);
    this.renderTextArea = this.renderTextArea.bind(this);
    this.submitText = this.submitText.bind(this);
    this.textAreaChange = this.textAreaChange.bind(this);
    this.initMessages = this.initMessages.bind(this);
    this.initSocket = this.initSocket.bind(this);
    this.initStudyPatientMessagesFetch = this.initStudyPatientMessagesFetch.bind(this);

    this.state = {
      maxCharacters: 160,
      patientToFetchMessages: null,
      enteredCharactersLength: 0,
      twilioMessages : [],
      socketBinded: false,
    };
  }

  componentDidMount() {
    this.initMessages(this.props);
    this.initSocket();
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.currentPatient) {
      this.textarea.value = '';
    }

    this.initMessages(newProps);
    this.initSocket();
  }

  initMessages(props) {
    if (props.active && props.currentPatient) {
      this.setState({ twilioMessages: [], patientToFetchMessages: props.currentPatient.id }, () => {
        this.initStudyPatientMessagesFetch(props);
      });
    }
  }

  initSocket() {
    if (this.props.socket && this.state.socketBinded === false) {
      this.props.socket.on('notifyMessage', (newMessage) => {
        if (this.props.active && newMessage && this.props.currentPatient) {
          this.setState({ patientToFetchMessages: this.props.currentPatient.id }, () => {
            this.initStudyPatientMessagesFetch(this.props);
          });
          this.props.readStudyPatientMessages(this.props.currentPatient.id);
          this.props.deleteMessagesCountStat(this.props.currentPatient.unreadMessageCount);
          this.props.updatePatientSuccess(this.props.currentPatient.id, this.props.currentPatientCategory.id, {
            unreadMessageCount: 0,
          });
        }
      });
      this.setState({ socketBinded: true });
    }
  }

  initStudyPatientMessagesFetch(props) {
    if (props.currentPatient && props.currentPatient.id) {
      // otherwise method componentWillReceiveProps
      // receiving data with a missing property currentPatient
      // which leads to an error
      props.fetchStudyPatientMessages({
        studyId: props.studyId,
        patientId: props.currentPatient.id,
        cb: (err, data) => {
          if (!err) {
            if (this.state.patientToFetchMessages === props.currentPatient.id) {
              this.setState({ twilioMessages: data.messages });
            }
          } else {
            console.error(err);
          }
          this.props.setProcessingStatus({ status: false });
        },
      });
    }
  }

  textAreaChange() {
    setTimeout(() => {
      const value = this.textarea.value;
      this.setState({ enteredCharactersLength: value ? value.length : 0 }, () => {
      });
    }, 0);
  }

  scrollElement() {
    const scope = this;
    window.requestAnimationFrame(() => {
      const scrollable = scope.scrollable;
      if (scrollable && scope.props.active) {
        scrollable.scrollTop = scrollable.scrollHeight;
      }
    });
  }

  submitText() {
    const { currentUser, currentPatient, currentPatientCategory, studyId } = this.props;
    const textarea = this.textarea;
    const options = {
      studyId,
      currentUserId: currentUser.id,
      isCallCenter: true,
      isProxy: currentUser.isProxy,
      patientId: currentPatient.id,
      body: textarea.value,
      to: currentPatient.phone,
    };
    this.props.sendStudyPatientMessages(options, (err, data) => {
      if (!err) {
        this.props.updatePatientSuccess(currentPatient.id, currentPatientCategory.id, {
          lastTextMessage: { body: data.body, dateCreated: data.dateCreated },
          updatedAt: data.dateCreated,
        });
        this.setState({ enteredCharactersLength: 0 }, () => {
          textarea.value = '';
        });
      } else {
        const errorMessage = err.errorMessage || err.message;
        toastr.error('', errorMessage);
      }
    });
  }

  checkForValidPhone = (notValidPhone) => {
    if (notValidPhone) {
      toastr.error(translate('common.constants.error'), translate('client.component.textSection.toastrEmptyPhoneError'));
    }
  }

  renderText() {
    const { currentUser, currentPatient, site } = this.props;
    const { twilioMessages } = this.state;
    const timezone = (currentUser.roleForClient && currentUser.roleForClient.isAdmin) ? currentUser.timezone : site.timezone;

    if (currentPatient && twilioMessages.length) {
      return (
        <section
          className="postarea text"
          ref={(scrollable) => {
            this.scrollable = scrollable;
          }}
        >
          {twilioMessages.map((twilioMessage, index) => {
            if (twilioMessage.text_message_id) {
              return (<PatientText
                key={index}
                currentPatient={currentPatient}
                currentUser={currentUser}
                site={site}
                textMessage={{ ...twilioMessage.twilioTextMessage, user: twilioMessage.user || null }}
              />);
            }
            return (<CallItem
              messageData={twilioMessage}
              key={index}
              timezone={timezone}
              postMsg
            />);
          })}
        </section>
      );
    }
    return (
      <section
        className="postarea text"
        ref={(scrollable) => {
          this.scrollable = scrollable;
        }}
      />
    );
  }

  renderTextArea(disabled) {
    const { maxCharacters } = this.state;

    if (disabled) {
      return (
        <textarea
          className="form-control test"
          placeholder={translate('client.component.textSection.placeholderMessage')}
          onChange={this.textAreaChange}
          maxLength={maxCharacters}
          disabled
          ref={(textarea) => {
            this.textarea = textarea;
          }}
        />
      );
    }
    return (
      <textarea
        className="form-control test"
        placeholder={translate('client.component.textSection.placeholderMessage')}
        onChange={this.textAreaChange}
        maxLength={maxCharacters}
        ref={(textarea) => {
          this.textarea = textarea;
        }}
      />
    );
  }

  render() {
    const { currentPatient, active, ePMS } = this.props;
    const unsubscribed = (currentPatient) ? currentPatient.unsubscribed : null;
    const { maxCharacters, enteredCharactersLength } = this.state;
    const notValidPhone = !currentPatient.phone;
    const sendDisabled = !ePMS || unsubscribed || notValidPhone || (this.textarea && this.textarea.value === '');
    this.scrollElement();

    return (
      <div className={classNames('item text', { active })}>
        {this.renderText()}
        <div className="textarea">
          {this.renderTextArea(unsubscribed || !ePMS)}
        </div>
        <div className="btns-section">
          <span className="remaining-counter">
            {`${maxCharacters - enteredCharactersLength}`}
          </span>
          <div onClick={() => this.checkForValidPhone(notValidPhone)}>
            <div
              className="btn btn-default lightbox-opener pull-right"
              onClick={(e) => (unsubscribed || !ePMS || notValidPhone || (this.textarea && this.textarea.value === '') ? null : this.submitText(e))}
              disabled={sendDisabled}
            >
              {translate('client.component.textSection.send')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentPatientCategory: Selector.selectCurrentPatientCategory(),
  site: selectClientSites(),
});

const mapDispatchToProps = (dispatch) => ({
  sendStudyPatientMessages: (payload, cb) => dispatch(sendStudyPatientMessages(payload, cb)),
  fetchStudyPatientMessages: (payload) => dispatch(fetchStudyPatientMessages(payload)),
  setProcessingStatus: (payload) => dispatch(setProcessingStatus(payload)),
  readStudyPatientMessages: (patientId) => dispatch(readStudyPatientMessages(patientId)),
  markAsReadPatientMessages: (patientId) => dispatch(markAsReadPatientMessages(patientId)),
  deleteMessagesCountStat: (payload) => dispatch(deleteMessagesCountStat(payload)),
  updatePatientSuccess: (patientId, patientCategoryId, payload) => dispatch(updatePatientSuccess(patientId, patientCategoryId, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TextSection);
