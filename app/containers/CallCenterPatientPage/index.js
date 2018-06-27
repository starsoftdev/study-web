import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';

import { translate } from '../../../common/utilities/localization';
import settings from '../../../common/settings/app-settings.json';

import { fetchProtocols } from '../App/actions';
import { selectCurrentUser, selectProtocols } from '../App/selectors';

import { setSocketConnection } from '../GlobalNotifications/actions';
import {
  selectSocket,
} from '../GlobalNotifications/selectors';

import {
  fetchPatient,
  fetchCallCenterPatientCategories,
  submitPatientUpdate,
  submitPatientDisposition,
} from './actions';
import {
  selectSelectedPatient,
  selectCallCenterPatientCategories,
  selectCallCenterScheduledModalFormValues,
} from './selectors';

import Tabs from './Tabs';
import ScheduledPatientModal from './ScheduledPatientModal';
import PatientInfo from './PatientInfo';
import SiteLocationInfo from './SiteLocationInfo';
import TextSection from './PatientDetail/TextSection';
import NotesSection from './PatientDetail/NotesSection';
import EmailSection from './PatientDetail/EmailSection';

import './styles.less';

const formName = 'callCenterPatientPage';
@reduxForm({ form: formName })
class CallCenterPatientPage extends Component {
  static propTypes = {
    callCenterPatientCategories: PropTypes.array,
    currentUser: PropTypes.object.isRequired,
    fetchCallCenterPatientCategories: PropTypes.func,
    fetchPatient: PropTypes.func,
    fetchProtocols: PropTypes.func,
    params: PropTypes.object,
    patient: PropTypes.object,
    protocols: PropTypes.object,
    scheduledModalFormValues: PropTypes.object,
    setSocketConnection: PropTypes.func,
    socket: PropTypes.any,
    submitPatientUpdate: PropTypes.func,
    submitPatientDisposition: PropTypes.func,
  };

  static defaultProps = {
    callCenterPatientCategories: [],
  };

  state = {
    carouselIndex: 0,
    isScheduleModalVisible: false,
    socketBinded: false,
    selectedTab: '',
  };

  componentWillMount() {
    const {
      params: { id: patientId },
      fetchCallCenterPatientCategories,
      fetchPatient,
      fetchProtocols,
      setSocketConnection,
    } = this.props;

    fetchCallCenterPatientCategories();
    fetchPatient(patientId);
    fetchProtocols();

    // initialize socket
    setSocketConnection({
      nsp: 'nsp',
      cb: () => console.log('Socket initialized in CallCenterPatientPage!'),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { patient, currentUser } = nextProps;

    if (this.props.patient !== patient && patient.details) {
      const ccPatientCategoryId = patient.details.call_center_patient_category_id;
      let selectedTab = '';
      switch (ccPatientCategoryId) {
        case 2:
          selectedTab = 'call1';
          break;
        case 3:
          selectedTab = 'call2';
          break;
        case 4:
          selectedTab = 'call3';
          break;
        case 5:
          selectedTab = 'scheduled';
          break;
        case 6: {
          const { dispositions } = patient.details;
          if (dispositions) {
            const disposition = dispositions.find(item => item.userId === currentUser.id);
            if (disposition) {
              this.updateTabFromDisposition(disposition.dispositionKey);
              return;
            }
          }
          break;
        }
        default:
      }
      this.setState({ selectedTab });
    }
  }

  handleExit = () => {
    browserHistory.push('/app/cc/home');
  }

  handleSelectCarousel = (index) => {
    this.setState({ carouselIndex: index });
  }

  handleSelectTab = (selectedTab) => {
    const { patient, submitPatientUpdate, submitPatientDisposition } = this.props;
    this.setState({ selectedTab });

    let callCenterPatientCategoryId = '';
    let patientCategoryId = '';
    let dispositionKey;

    switch (selectedTab) {
      case 'call1':
        callCenterPatientCategoryId = 2;
        patientCategoryId = 2; // Call / Text Attempted
        break;
      case 'call2':
        callCenterPatientCategoryId = 3;
        patientCategoryId = 2; // Call / Text Attempted
        break;
      case 'call3':
        callCenterPatientCategoryId = 4;
        patientCategoryId = 2; // Call / Text Attempted
        break;
      case 'scheduled':
        this.setState({ isScheduleModalVisible: true });
        break;
      case 'prescreened':
        callCenterPatientCategoryId = 6;
        patientCategoryId = 4; // Action Needed
        dispositionKey = settings.disposition.PRESCREENED;
        break;
      case 'dnq':
        callCenterPatientCategoryId = 6;
        patientCategoryId = 3; // Not Qualified / Not Interested
        dispositionKey = settings.disposition.DNQ;
        break;
      case 'ni':
        callCenterPatientCategoryId = 6;
        patientCategoryId = 3; // Not Qualified / Not Interested
        dispositionKey = settings.disposition.NI;
        break;
      case 'cnc':
        callCenterPatientCategoryId = 6;
        patientCategoryId = 3; // Not Qualified / Not Interested
        dispositionKey = settings.disposition.CNC;
        break;
      default:
    }
    if (!callCenterPatientCategoryId) return;

    submitPatientUpdate({
      patientId: patient.details.id,
      callCenterPatientCategoryId,
      patientCategoryId,
    });

    submitPatientDisposition({
      patientId: patient.details.id,
      dispositionKey,
    });
  }

  updateTabFromDisposition = (dispositionKey) => {
    switch (dispositionKey) {
      case settings.disposition.PRESCREENED:
        this.setState({ selectedTab: 'prescreened' });
        break;
      case settings.disposition.DNQ:
        this.setState({ selectedTab: 'dnq' });
        break;
      case settings.disposition.NI:
        this.setState({ selectedTab: 'ni' });
        break;
      case settings.disposition.CNC:
        this.setState({ selectedTab: 'cnc' });
        break;
      default:
    }
  }

  /* Schedule Patient Modal */
  closePatientScheduleModal = () => {
    this.setState({ isScheduleModalVisible: false });
  }

  handleDateChange= (date) => {
    this.scheduleDate = date;
  }

  onPatientScheduleSubmit = (e) => {
    e.preventDefault();

    const { patient, submitPatientUpdate, submitPatientDisposition } = this.props;
    submitPatientUpdate({
      patientId: patient.details.id,
      callCenterPatientCategoryId: 5,
      patientCategoryId: 2, // Call / Text Attempted
    });

    // Clear the patient disposition
    submitPatientDisposition({
      patientId: patient.details.id,
      dispositionKey: undefined,
    });

    this.setState({ isScheduleModalVisible: false });
  }

  render() {
    const { carouselIndex, selectedTab, isScheduleModalVisible } = this.state;
    const { patient, protocols, socket, currentUser } = this.props;
    const bucket = process.env.AWS_BUCKET || 'studykik-dev';

    let formattedPatient;
    let siteForPatient;
    let protocolForPatient;
    let patientIndications;
    let studyId;
    let ePMS;
    let pdfURL = '';

    if (patient && patient.details) {
      siteForPatient = patient.details.site;
      if (
        protocols && protocols.details && protocols.details.length > 0 &&
        patient.details.studyPatientCategory && patient.details.studyPatientCategory.study
      ) {
        protocolForPatient = protocols.details.find(protocol => protocol.id === patient.details.studyPatientCategory.study.protocol_id);
        pdfURL = `https://s3.amazonaws.com/${bucket}/${protocolForPatient.filename}`;
      }

      patientIndications = patient.details.patientIndications;
      formattedPatient = Object.assign({}, patient.details, {
        patientCategoryId: patient.details.studyPatientCategory.patient_category_id,
      });

      studyId = patient.details.studyPatientCategory.study_id;
      ePMS = patient.details.studyPatientCategory.study.patientMessagingSuite;
    }

    return (
      <div id="cc-patient-page">
        <div className="header">
          <Tabs
            onExit={this.handleExit}
            onSelectTab={this.handleSelectTab}
            selectedTab={selectedTab}
          />
          <form action="#" className="form-search clearfix">
            <div className="search-area">
              <div className="field">
                <Button className="btn-enter" type="submit">
                  <i className="icomoon-icon_search2" />
                </Button>
                <input name="query" type="text" className="form-control keyword-search" placeholder={translate('common.layout.placeholder.search')} />
              </div>
            </div>
          </form>
        </div>

        <div className="page-content">
          <div className="left-section">
            <div className="wrapper">
              <PatientInfo patient={patient} />
              <SiteLocationInfo site={siteForPatient} protocol={protocolForPatient} indications={patientIndications} />
            </div>
          </div>
          <div className="middle-section">
            <object data={pdfURL} width="100%" height="100%" type="application/pdf">
              <embed src={pdfURL} width="100%" height="100%" type="application/pdf" />
            </object>
          </div>
          <div className="right-section">
            <div className="column">
              <div id="carousel-example-generic" className="carousel slide popup-slider">
                <ol className="carousel-indicators">
                  <li className={classNames({ active: carouselIndex === 0 })} onClick={() => this.handleSelectCarousel(0)}>
                    {translate('container.page.callCenterPatient.carousel.tab.text')}
                  </li>
                  <li className={classNames({ active: carouselIndex === 1 })} onClick={() => this.handleSelectCarousel(1)}>
                    {translate('container.page.callCenterPatient.carousel.tab.note')}
                  </li>
                  <li className={classNames({ active: carouselIndex === 2 })} onClick={() => this.handleSelectCarousel(2)}>
                    {translate('container.page.callCenterPatient.carousel.tab.email')}
                  </li>
                  <li className={classNames({ active: carouselIndex === 3 })} onClick={() => this.handleSelectCarousel(3)}>
                    {translate('container.page.callCenterPatient.carousel.tab.calendar')}
                  </li>
                </ol>
                {
                  patient && patient.details && (
                    <div className="carousel-inner" role="listbox">
                      <TextSection active={carouselIndex === 0} socket={socket} studyId={studyId} currentUser={currentUser} currentPatient={formattedPatient} ePMS={ePMS} />
                      <NotesSection active={carouselIndex === 1} currentUser={currentUser} currentPatient={formattedPatient} notes={patient.details.notes} studyId={studyId} />
                      <EmailSection active={carouselIndex === 2} studyId={studyId} currentPatient={formattedPatient} />
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <ScheduledPatientModal
          show={isScheduleModalVisible}
          onHide={this.closePatientScheduleModal}
          handleSubmit={this.onPatientScheduleSubmit}
          handleDateChange={this.handleDateChange}
          currentPatient={patient.details}
          currentUser={currentUser}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  callCenterPatientCategories: selectCallCenterPatientCategories(),
  currentUser: selectCurrentUser(),
  patient: selectSelectedPatient(),
  protocols: selectProtocols(),
  scheduledModalFormValues: selectCallCenterScheduledModalFormValues(),
  socket: selectSocket(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCallCenterPatientCategories: () => dispatch(fetchCallCenterPatientCategories()),
    fetchPatient: (id) => dispatch(fetchPatient(id)),
    fetchProtocols: (clientRoleId) => dispatch(fetchProtocols(clientRoleId)),
    setSocketConnection: (payload) => dispatch(setSocketConnection(payload)),
    submitPatientUpdate: (payload) => dispatch(submitPatientUpdate(payload)),
    submitPatientDisposition: (payload) => dispatch(submitPatientDisposition(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CallCenterPatientPage);
