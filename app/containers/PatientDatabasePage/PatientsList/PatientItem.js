import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { map } from 'lodash';

import { selectSelectedPatient } from 'containers/PatientDatabasePage/selectors';
import { fetchPatient } from 'containers/PatientDatabasePage/actions';
import LoadingSpinner from 'components/LoadingSpinner';

class PatientItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    index: PropTypes.number,
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
    bmi: PropTypes.number,
    indications: PropTypes.array,
    source: PropTypes.object,
    studyPatientCategory: PropTypes.object,
    selectedPatient: PropTypes.object,
    fetchPatient: PropTypes.func,
    openChat: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.editPatient = this.editPatient.bind(this);
    this.openChat = this.openChat.bind(this);
  }

  editPatient() {
    this.props.fetchPatient(this.props.id);
  }

  openChat() {
    const props = this.props;
    props.openChat({
      id: props.id,
      source_id: props.source_id,
      phone: props.phone,
      study_id: props.studyPatientCategory.study_id,
      firstName: props.firstName,
      lastName: props.lastName,
    });
  }

  currentPatientIsBeingFetched() {
    const { selectedPatient, id } = this.props;

    return (selectedPatient.fetching && selectedPatient.id === id);
  }

  render() {
    const { index, firstName, lastName, email, phone, age, gender, bmi, indications,
      source, studyPatientCategory } = this.props;
    const indicationNames = map(indications, indicationIterator => indicationIterator.name).join(', ');

    return (
      <tr className="patient-container">
        <td className="index">
          <span>{index + 1}</span>
        </td>
        <td className="name">
          <span>{firstName} {lastName}</span>
        </td>
        <td className="email">
          <span>{email}</span>
        </td>
        <td className="phone">
          <span>{phone}</span>
        </td>
        <td className="indication">
          <span>{indicationNames}</span>
        </td>
        <td className="age">
          <span>{age}</span>
        </td>
        <td className="gender">
          <span>{gender}</span>
        </td>
        <td className="bmi">
          <span>{bmi}</span>
        </td>
        <td className="status">
          <span>{studyPatientCategory.patientCategory.name}</span>
        </td>
        <td className="source">
          <span>{source.type}</span>
        </td>
        <td className="action">
          <button className="btn btn-primary btn-edit-patient pull-right" onClick={this.editPatient} disabled={(this.currentPatientIsBeingFetched())}>
            {(this.currentPatientIsBeingFetched())
              ? <span><LoadingSpinner showOnlyIcon size={20} className="fetching-patient" /></span>
              : <span>Edit</span>
            }
          </button>
        </td>
        <td className="open-chat">
          <i className="fa fa-comments" aria-hidden="true" onClick={this.openChat} />
        </td>
      </tr>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedPatient: selectSelectedPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchPatient: id => dispatch(fetchPatient(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientItem);
