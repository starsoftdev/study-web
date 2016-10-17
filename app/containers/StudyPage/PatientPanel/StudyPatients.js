/**
 * Created by mike on 9/20/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import * as Selector from '../selectors';
import { selectCurrentUser } from 'containers/App/selectors';

import Patient from './Patient';
import PatientDetailModal from '../PatientDetail/PatientDetailModal';
import { fetchPatientDetails, setCurrentPatientCategoryId, setCurrentPatientId } from '../actions';

class StudyPatients extends React.Component {
  static propTypes = {
    currentUser: React.PropTypes.object.isRequired,
    currentPatientId: React.PropTypes.number,
    fetchPatientDetails: React.PropTypes.func.isRequired,
    patientCategories: React.PropTypes.array.isRequired,
    setCurrentPatientCategoryId: React.PropTypes.func.isRequired,
    setCurrentPatientId: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      openPatientModal: false,
    };
    this.onPatientClick = this.onPatientClick.bind(this);
    this.renderPatientCategory = this.renderPatientCategory.bind(this);
  }

  onPatientClick(category, patient) {
    const { fetchPatientDetails, setCurrentPatientCategoryId, setCurrentPatientId } = this.props;
    const show = patient && this.state.selectedPatientId !== patient.id;
    if (show) {
      setCurrentPatientCategoryId(category.id);
      setCurrentPatientId(patient.id);
      fetchPatientDetails(patient.id);
    } else {
      setCurrentPatientCategoryId(-1);
      setCurrentPatientId(-1);
    }
    this.setState({
      openPatientModal: show || false,
    });
  }

  renderPatientCategory(category) {
    const { currentPatientId, currentUser } = this.props;
    return (
      <li key={category.id}>
        <span className="opener">
          <strong className="number">{category.patients.length}</strong>
          <span className="text">{category.name}</span>
        </span>
        <div className="slide">
          <div className="slide-holder">
            <ul className="list-unstyled">
              {category.patients.map(patient => (
                <Patient key={patient.id} category={category} currentPatientId={currentPatientId} patient={patient} currentUser={currentUser} onPatientClick={this.onPatientClick} />
              ))}
            </ul>
          </div>
        </div>
      </li>
    );
  }

  render() {
    const { currentUser, patientCategories } = this.props;
    return (
      <div className="clearfix patients-list-area-holder">
        <div className={classNames("patients-list-area", {"form-active": this.state.openPatientModal})}>
          <nav className="nav-status">
            <ul className="list-inline">
              {patientCategories.map(patientCategory => {
                return this.renderPatientCategory(patientCategory);
              })}
            </ul>
          </nav>
          <PatientDetailModal currentUser={currentUser} openPatientModal={this.state.openPatientModal} />
        </div>
        <div className="patients-form-closer" onClick={this.onPatientClick} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  currentPatientId: Selector.selectCurrentPatientId(),
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPatientDetails: (categoryId, patient) => dispatch(fetchPatientDetails(categoryId, patient)),
    setCurrentPatientId: (id) => dispatch(setCurrentPatientId(id)),
    setCurrentPatientCategoryId: (id) => dispatch(setCurrentPatientCategoryId(id)),
  };
}

// StudyPatients = DragDropContext(HTML5Backend)(StudyPatients);
export default connect(mapStateToProps, mapDispatchToProps)(StudyPatients);