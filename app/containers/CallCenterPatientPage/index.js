import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { translate } from '../../../common/utilities/localization';

import { fetchClientSites, fetchProtocols } from '../App/actions';
import { selectCurrentUser, selectClientSites, selectProtocols } from '../App/selectors';

import { fetchPatient } from './actions';
import { selectSelectedPatient } from './selectors';

import PatientInfo from './PatientInfo';
import SiteLocationInfo from './SiteLocationInfo';
import './styles.less';

const questionnaireUrl = 'https://s3-us-west-2.amazonaws.com/static-assets.studykik.com/Advertising+Scripts+-+Prescreening+Questionnaire+-+StudyKIK+-+Osman.pdf';

const formName = 'callCenterPatientPage';
@reduxForm({ form: formName })
class CallCenterPatientPage extends Component {
  static propTypes = {
    currentUser: PropTypes.object.isRequired,
    fetchClientSites: PropTypes.func,
    fetchPatient: PropTypes.func,
    fetchProtocols: PropTypes.func,
    params: PropTypes.object,
    patient: PropTypes.object,
    protocols: PropTypes.object,
    sites: PropTypes.object,
  };

  state = {
    carouselIndex: 0,
  };

  componentWillMount() {
    const { params: { id: patientId }, currentUser, fetchClientSites, fetchPatient, fetchProtocols } = this.props;

    fetchClientSites(currentUser.roleForClient.client_id);
    fetchPatient(patientId);
    fetchProtocols(currentUser.roleForClient.id);
  }

  handleSelectCarousel = (index) => {
    this.setState({ carouselIndex: index });
  }

  render() {
    const { carouselIndex } = this.state;
    const { patient, protocols, sites } = this.props;

    let siteForPatient;
    let protocolForPatient;
    let patientIndications;

    if (patient && patient.details) {
      if (sites && sites.details && sites.details.length > 0) {
        siteForPatient = sites.details.find(site => site.id === patient.details.site_id);
      }

      if (
        protocols && protocols.details && protocols.details.length > 0 &&
        patient.details.studyPatientCategory && patient.details.studyPatientCategory.study
      ) {
        protocolForPatient = protocols.details.find(protocol => protocol.id === patient.details.studyPatientCategory.study.protocol_id);
      }

      patientIndications = patient.details.patientIndications;
    }

    return (
      <div id="cc-patient-page">
        <div className="header">
          <div className="tabs">
            <Button className="tab">{translate('container.page.callCenterPatient.tab.followUp')}</Button>
            <Button className="tab">{translate('container.page.callCenterPatient.tab.schedule')}</Button>
            <Button className="tab">{translate('container.page.callCenterPatient.tab.prescn')}</Button>
            <Button className="tab">{translate('container.page.callCenterPatient.tab.dnq')}</Button>
            <Button className="tab">{translate('container.page.callCenterPatient.tab.cnc')}</Button>
            <Button className="tab">{translate('container.page.callCenterPatient.tab.exit')}</Button>
          </div>
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

        <div className="content">
          <div className="left-section">
            <div className="wrapper">
              <PatientInfo patient={patient} />
              <SiteLocationInfo site={siteForPatient} protocol={protocolForPatient} indications={patientIndications} />
            </div>
          </div>
          <div className="middle-section">
            <object data={questionnaireUrl} width="100%" height="100%" type="application/pdf">
              <embed src={questionnaireUrl} width="100%" height="100%" type="application/pdf" />
            </object>
          </div>
          <div className="right-section">
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
              <div className="carousel-inner" role="listbox">
                {/* TODO: Content here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  patient: selectSelectedPatient(),
  protocols: selectProtocols(),
  sites: selectClientSites(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchClientSites: (clientId) => dispatch(fetchClientSites(clientId)),
    fetchPatient: (id) => dispatch(fetchPatient(id)),
    fetchProtocols: (clientRoleId) => dispatch(fetchProtocols(clientRoleId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CallCenterPatientPage);
