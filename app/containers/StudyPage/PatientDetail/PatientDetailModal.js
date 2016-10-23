/**
 * Created by mike on 10/11/16.
 */

import React from 'react';
import classNames from 'classnames';
import Collapse from 'react-bootstrap/lib/Collapse';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as Selector from '../selectors';
import PatientDetailSection from './PatientDetailSection';
import NotesSection from './NotesSection';
import TextSection from './TextSection';
import EmailSection from './EmailSection';
import OtherSection from './OtherSection';
import { normalizePhoneDisplay } from '../helper/functions';

class PatientDetailModal extends React.Component {
  static propTypes = {
    currentPatientCategory: React.PropTypes.object,
    currentPatient: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    openPatientModal: React.PropTypes.bool.isRequired,
    onClose: React.PropTypes.func.isRequired,
    studyId: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      carousel: {
        note: true,
        text: false,
        email: false,
        other: false,
      },
    };
    this.toggleNoteSection = this.toggleNoteSection.bind(this);
    this.toggleTextSection = this.toggleTextSection.bind(this);
    this.toggleEmailSection = this.toggleEmailSection.bind(this);
    this.toggleOtherSection = this.toggleOtherSection.bind(this);
    this.renderOtherSection = this.renderOtherSection.bind(this);
    this.renderPatientDetail = this.renderPatientDetail.bind(this);
  }

  toggleNoteSection() {
    this.setState({
      carousel: {
        note: true,
        text: false,
        email: false,
        other: false,
      },
    });
  }

  toggleTextSection() {
    this.setState({
      carousel: {
        note: false,
        text: true,
        email: false,
        other: false,
      },
    });
  }

  toggleEmailSection() {
    this.setState({
      carousel: {
        note: false,
        text: false,
        email: true,
        other: false,
      },
    });
  }

  toggleOtherSection() {
    this.setState({
      carousel: {
        note: false,
        text: false,
        email: false,
        other: true,
      },
    });
  }

  renderOtherSection() {
    const { currentPatient, currentUser } = this.props;
    if (currentPatient) {
      return (
        <OtherSection active={this.state.carousel.other} initialValues={currentPatient} currentUser={currentUser} enableReinitialize />
      );
    }
    return null;
  }

  renderPatientDetail() {
    const { currentPatient } = this.props;

    if (currentPatient) {
      const formattedPatient = Object.assign({}, currentPatient);
      formattedPatient.phone = normalizePhoneDisplay(currentPatient.phone);
      return (
        <PatientDetailSection initialValues={formattedPatient} enableReinitialize />
      );
    }
    return null;
  }

  render() {
    const { currentPatientCategory, currentPatient, currentUser, openPatientModal, onClose, studyId } = this.props;
    return (
      <Collapse dimension="width" in={openPatientModal} timeout={250} className="patients-list-form">
        <div className="form-area">
          <div className="form-head">
            <strong className="title">{currentPatientCategory ? currentPatientCategory.name : null}</strong>
            <a className="lightbox-opener">
              <span className="date" />
              <span className="time" />
            </a>
            <a className="btn-close" onClick={onClose}>
              <i className="glyphicon glyphicon-menu-right" />
            </a>
          </div>
          {this.renderPatientDetail()}
          <div className="column">
            <div id="carousel-example-generic" className="carousel slide popup-slider">
              <ol className="carousel-indicators">
                <li className={classNames({ active: this.state.carousel.note })} onClick={this.toggleNoteSection}>Note</li>
                <li className={classNames({ active: this.state.carousel.text })} onClick={this.toggleTextSection}>Text</li>
                <li className={classNames({ active: this.state.carousel.email })} onClick={this.toggleEmailSection}>Email</li>
                <li className={classNames({ active: this.state.carousel.other })} onClick={this.toggleOtherSection}>Other</li>
              </ol>
              <div className="carousel-inner" role="listbox">
                <NotesSection active={this.state.carousel.note} currentUser={currentUser} currentPatient={currentPatient} studyId={studyId} />
                <TextSection active={this.state.carousel.text} currentUser={currentUser} currentPatient={currentPatient} />
                <EmailSection active={this.state.carousel.email} />
                {this.renderOtherSection()}
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentPatient: Selector.selectCurrentPatient(),
  currentPatientCategory: Selector.selectCurrentPatientCategory(),
  studyId: Selector.selectStudyId(),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetailModal);
