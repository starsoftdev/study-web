import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm, change } from 'redux-form';
import { Modal } from 'react-bootstrap';
import { map, omit } from 'lodash';
import moment from 'moment-timezone';
import { StickyContainer, Sticky } from 'react-sticky';
import InfiniteScroll from 'react-infinite-scroller';

import LoadingSpinner from '../../components/LoadingSpinner';
import Checkbox from '../../components/Input/Checkbox';
import CenteredModal from '../../components/CenteredModal/index';
import EditPatientForm from '../../containers/PatientDatabasePage/EditPatientForm';
import ChatForm from '../../components/ChatForm';
import PatientItem from './PatientItem';
import { selectPatients,
  selectTotalPatients,
  selectSelectedPatient,
  selectSelectedPatientDetailsForForm,
  selectSavedPatient,
  selectChat } from '../../containers/PatientDatabasePage/selectors';
import {
  sendStudyPatientMessages,
} from '../../containers/GlobalNotifications/actions';
import {
  clearSelectedPatient,
  savePatient,
  initChat,
  disableChat,
  addPatientsToTextBlast,
  removePatientsFromTextBlast,
  removePatientFromTextBlast,
  setActiveSort,
  updateSelectAll,
} from '../../containers/PatientDatabasePage/actions';
import { selectProtocols, selectCurrentUser } from '../../containers/App/selectors';
import { selectValues } from '../../common/selectors/form.selector';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../common/helper/functions';
import { translate } from '../../../common/utilities/localization';

const formName = 'PatientDatabase.TextBlastModal';

@reduxForm({ form: formName })
class PatientsList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    addPatientsToTextBlast: PropTypes.func,
    change: PropTypes.func,
    removePatientsFromTextBlast: PropTypes.func,
    removePatientFromTextBlast: PropTypes.func,
    patients: PropTypes.object,
    selectedPatient: PropTypes.object,
    selectedPatientDetailsForForm: PropTypes.object,
    savedPatient: PropTypes.object,
    chat: PropTypes.object,
    clearSelectedPatient: PropTypes.func,
    savePatient: PropTypes.func,
    initChat: PropTypes.func,
    disableChat: PropTypes.func,
    sendStudyPatientMessages: PropTypes.func,
    paginationOptions: PropTypes.object,
    searchPatients: PropTypes.func,
    setActiveSort: PropTypes.func,
    protocols: PropTypes.object,
    currentUser: PropTypes.object,
    formValues: PropTypes.object,
    updateSelectAll: PropTypes.func,
    totalPatients: PropTypes.number,
    textBlastFormValues: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.closeEditPatientModal = this.closeEditPatientModal.bind(this);
    this.updatePatient = this.updatePatient.bind(this);
    this.openChat = this.openChat.bind(this);
    this.closeChat = this.closeChat.bind(this);
    this.toggleAllPatientSelection = this.toggleAllPatientSelection.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.sortBy = this.sortBy.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.savedPatient.saving && this.props.savedPatient.saving) {
      this.closeEditPatientModal();
    }
  }

  componentWillUnmount() {
    this.props.setActiveSort('orderNumber', null);
  }

  editPatientModalShouldBeShown() {
    const { selectedPatient } = this.props;
    return selectedPatient.details !== null;
  }

  closeEditPatientModal() {
    this.props.clearSelectedPatient();
  }

  updatePatient(patientData) {
    const { selectedPatient, currentUser, savePatient } = this.props;
    const payload = omit(patientData, ['indications', 'status', 'source', 'protocol']);

    payload.indications = map(patientData.indications, indicationIterator => ({ id: indicationIterator.id, isOriginal: indicationIterator.isOriginal }));
    payload.studySourceId = patientData.source;
    payload.patient_category_id = patientData.status;
    payload.phone = normalizePhoneForServer(patientData.phone);
    payload.site_id = patientData.site;
    payload.studyId = patientData.protocol;

    if (patientData.dobDay && patientData.dobMonth && patientData.dobYear) {
      const date = moment().year(patientData.dobYear).month(patientData.dobMonth - 1).date(patientData.dobDay).startOf('day');
      payload.dob = date.toISOString();
    }

    savePatient(currentUser.roleForClient.id, selectedPatient.details.id, payload);
  }

  chatModalShouldBeShown() {
    return this.props.chat.active;
  }

  openChat(payload) {
    this.props.initChat(payload);
  }

  closeChat() {
    this.props.disableChat();
  }

  toggleAllPatientSelection(checked) {
    const { addPatientsToTextBlast, change, patients, removePatientsFromTextBlast, updateSelectAll } = this.props;
    if (checked) {
      addPatientsToTextBlast(patients.details);
      change('selectAllUncheckedManually', false);
    } else {
      removePatientsFromTextBlast(patients.details);
    }
    updateSelectAll(checked);
    for (const patient of patients.details) {
      if (patient.unsubscribed && checked) {
        // const { id } = patient;
        // removePatientFromTextBlast([{ id }]);
      } else {
        change(`patient-${patient.id}`, checked);
      }
    }
  }

  loadItems() {
    if (this.props.paginationOptions.hasMoreItems) {
      this.props.searchPatients(this.props.paginationOptions.prevSearchFilter, false);
    }
  }

  sortBy(ev) {
    const { setActiveSort, searchPatients, paginationOptions } = this.props;
    ev.preventDefault();
    const sort = ev.currentTarget.dataset.sort;
    let direction = 'up';

    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    }

    setActiveSort(sort, direction);
    searchPatients({ clearPatients: true, ...paginationOptions.prevSearchFilter, sort, direction }, true);
  }

  renderPatientsTable() {
    const { patients } = this.props;
    const patientsListContents = patients.details.map((item, index) => {
      const patient = item;
      patient.phone = normalizePhoneDisplay(patient.phone);
      return (
        <PatientItem {...patient} key={index} index={index} openChat={this.openChat} />
      );
    });

    if (!patients.details.length && patients.fetching) {
      return (
        <LoadingSpinner showOnlyIcon={false} noMessage />
      );
    }

    if (patients.details.length > 0) {
      return (
        <div className="table">
          <InfiniteScroll
            className="tbody"
            pageStart={0}
            loadMore={this.loadItems}
            initialLoad={false}
            hasMore={this.props.paginationOptions.hasMoreItems}
            loader={null}
          >
            {patientsListContents}
            {(patients.fetching) && <LoadingSpinner showOnlyIcon={false} noMessage />}
          </InfiniteScroll>
        </div>
      );
    }

    return null;
  }

  render() {
    const { patients, selectedPatientDetailsForForm, totalPatients, textBlastFormValues } = this.props;
    const chat = this.props.chat.active ? this.props.chat.details : null;
    const editPatientModalShown = this.editPatientModalShouldBeShown();
    const chatModalShown = this.chatModalShouldBeShown();
    const selectedPatient = Object.assign({}, selectedPatientDetailsForForm);
    if (selectedPatient) {
      selectedPatient.phone = normalizePhoneDisplay(selectedPatient.phone);
      if (selectedPatient.dob) {
        const dob = moment(selectedPatient.dob);
        selectedPatient.dobMonth = dob.month() + 1;
        selectedPatient.dobDay = dob.date();
        selectedPatient.dobYear = dob.year();
        delete selectedPatient.dob;
      }
      if (selectedPatient.site_id) {
        selectedPatient.site = selectedPatient.site_id;
        delete selectedPatient.site_id;
      }
      if (selectedPatient.study_source_id) {
        selectedPatient.source = selectedPatient.study_source_id;
        delete selectedPatient.study_source_id;
      }
    }

    let total = 0;
    if (patients.total === null) {
      total = totalPatients;
    } else if (!textBlastFormValues.selectAllUncheckedManually && textBlastFormValues.patients && textBlastFormValues.patients.length > 0) {
      total = patients.total - ((textBlastFormValues.uncheckedPatients && textBlastFormValues.uncheckedPatients.length > 0) ? textBlastFormValues.uncheckedPatients.length : 0);
    } else if ((textBlastFormValues.patients && textBlastFormValues.patients.length > 0) || (textBlastFormValues.patients && textBlastFormValues.patients.length === 0 && textBlastFormValues.uncheckedPatients.length > 0)) {
      total = textBlastFormValues.patients.length;
    }
    return (
      <div className="patient-database-fixed-table-wrapper fs-hide">
        <StickyContainer className="table-holder fixed-table">
          <Sticky className="fixed-table-sticky-header">
            <header className="fixed-table-head">
              <h2 className="pull-left">{translate('client.component.patientsList.tableHeadSubscribed')}
                <span className="patient-count"> {total}</span>
              </h2>
              <h2 className="pull-left">{translate('client.component.patientsList.tableHeadUnsubscribed')}
                <span className="patient-count"> {patients.totalUnsubscribed || 0}</span>
              </h2>
              <h2 className="pull-left">{translate('client.component.patientsList.tableHeadTotal')}
                <span className="patient-count"> {(total + patients.totalUnsubscribed)}</span>
              </h2>
            </header>
            <div className="fixed-table-thead">
              <div className="table">
                <div className="thead">
                  <div className="tr">
                    <div className="th default-cursor">
                      <Field
                        name="all-patients"
                        type="checkbox"
                        component={Checkbox}
                        className="pull-left"
                        onChange={this.toggleAllPatientSelection}
                      />
                      <span>#<i className="caret-arrow" /></span>
                    </div>
                    <div onClick={this.sortBy} data-sort="firstName" className={`th ${(this.props.paginationOptions.activeSort === 'firstName') ? this.props.paginationOptions.activeDirection : ''}`}>
                      {translate('client.component.patientsList.tableTitleName')}<i className="caret-arrow" />
                    </div>
                    <div onClick={this.sortBy} data-sort="email" className={`th ${(this.props.paginationOptions.activeSort === 'email') ? this.props.paginationOptions.activeDirection : ''}`}>
                      {translate('client.component.patientsList.tableTitleEmail')}<i className="caret-arrow" />
                    </div>
                    <div onClick={this.sortBy} data-sort="phone" className={`th ${(this.props.paginationOptions.activeSort === 'phone') ? this.props.paginationOptions.activeDirection : ''}`}>
                      {translate('client.component.patientsList.tableTitlePhone')}<i className="caret-arrow" />
                    </div>
                    <div onClick={this.sortBy} data-sort="indication" className={`th ${(this.props.paginationOptions.activeSort === 'indication') ? this.props.paginationOptions.activeDirection : ''}`}>
                      {translate('client.component.patientsList.tableTitleIndications')}<i className="caret-arrow" />
                    </div>
                    <div onClick={this.sortBy} data-sort="age" className={`th ${(this.props.paginationOptions.activeSort === 'age') ? this.props.paginationOptions.activeDirection : ''}`}>
                      {translate('client.component.patientsList.tableTitleAge')}<i className="caret-arrow" />
                    </div>
                    <div onClick={this.sortBy} data-sort="gender" className={`th ${(this.props.paginationOptions.activeSort === 'gender') ? this.props.paginationOptions.activeDirection : ''}`}>
                      {translate('client.component.patientsList.tableTitleGender')}<i className="caret-arrow" />
                    </div>
                    <div onClick={this.sortBy} data-sort="bmi" className={`th ${(this.props.paginationOptions.activeSort === 'bmi') ? this.props.paginationOptions.activeDirection : ''}`}>
                      {translate('client.component.patientsList.tableTitleBmi')}<i className="caret-arrow" />
                    </div>
                    <div onClick={this.sortBy} data-sort="status" className={`th ${(this.props.paginationOptions.activeSort === 'status') ? this.props.paginationOptions.activeDirection : ''}`}>
                      {translate('client.component.patientsList.tableTitleStatus')}<i className="caret-arrow" />
                    </div>
                    <div onClick={this.sortBy} data-sort="source" className={`th ${(this.props.paginationOptions.activeSort === 'source') ? this.props.paginationOptions.activeDirection : ''}`}>
                      {translate('client.component.patientsList.tableTitleSource')}<i className="caret-arrow" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Sticky>
          {this.renderPatientsTable()}
        </StickyContainer>

        <div className="patients">
          <Modal
            className="edit-patient"
            dialogComponentClass={CenteredModal}
            show={editPatientModalShown}
            onHide={this.closeEditPatientModal}
            backdrop
            keyboard
          >
            <Modal.Header>
              <Modal.Title>
                <strong>{translate('client.component.patientsList.editModalTitle')}</strong>
              </Modal.Title>
              <a className="close" onClick={this.closeEditPatientModal}>
                <i className="icomoon-icon_close" />
              </a>
            </Modal.Header>
            <Modal.Body>
              <EditPatientForm
                initialValues={selectedPatient}
                onSubmit={this.updatePatient}
              />
            </Modal.Body>
          </Modal>
          {(chat)
            ?
              <Modal className="chat-patient" dialogComponentClass={CenteredModal} show={chatModalShown} onHide={this.closeChat}>
                <Modal.Header>
                  <Modal.Title>Chat with {chat.firstName || ''} {chat.lastName || ''}</Modal.Title>
                  <a className="lightbox-close close" onClick={this.closeRenewModal}>
                    <i className="icomoon-icon_close" />
                  </a>
                </Modal.Header>
                <Modal.Body>
                  <ChatForm chat={chat} sendStudyPatientMessages={sendStudyPatientMessages} />
                </Modal.Body>
              </Modal>
            : null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  totalPatients: selectTotalPatients(),
  patients: selectPatients(),
  selectedPatient: selectSelectedPatient(),
  selectedPatientDetailsForForm: selectSelectedPatientDetailsForForm(),
  savedPatient: selectSavedPatient(),
  chat: selectChat(),
  protocols: selectProtocols(),
  currentUser: selectCurrentUser(),
  formValues: selectValues(formName),
  textBlastFormValues: selectValues('PatientDatabase.TextBlastModal'),
});

function mapDispatchToProps(dispatch) {
  return {
    addPatientsToTextBlast: (patients) => dispatch(addPatientsToTextBlast(patients)),
    change: (field, value) => dispatch(change(formName, field, value)),
    removePatientsFromTextBlast: (patients) => dispatch(removePatientsFromTextBlast(patients)),
    removePatientFromTextBlast: (patient) => dispatch(removePatientFromTextBlast(patient)),
    clearSelectedPatient: () => dispatch(clearSelectedPatient()),
    savePatient: (clientRoleId, id, data) => dispatch(savePatient(clientRoleId, id, data)),
    initChat: (payload) => dispatch(initChat(payload)),
    disableChat: (payload) => dispatch(disableChat(payload)),
    sendStudyPatientMessages: (payload, cb) => dispatch(sendStudyPatientMessages(payload, cb)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    updateSelectAll: (val) => dispatch(updateSelectAll(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientsList);
