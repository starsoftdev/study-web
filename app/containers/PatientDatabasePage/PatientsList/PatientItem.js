import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import { Field } from 'redux-form';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { map } from 'lodash';

import Checkbox from '../../../components/Input/Checkbox';
import { selectSelectedPatient } from '../../../containers/PatientDatabasePage/selectors';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { fetchPatient, addPatientsToTextBlast,
  removePatientFromTextBlast } from '../actions';

class PatientItem extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    addPatientsToTextBlast: PropTypes.func,
    removePatientFromTextBlast: PropTypes.func,
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
    this.state = {
      hover: false,
    };
    this.showHover = this.showHover.bind(this);
    this.hideHover = this.hideHover.bind(this);
    this.editPatient = this.editPatient.bind(this);
    this.openChat = this.openChat.bind(this);
    this.currentPatientIsBeingFetched = this.currentPatientIsBeingFetched.bind(this);
    this.togglePatientForTextBlast = this.togglePatientForTextBlast.bind(this);
  }

  showHover() {
    this.setState({ hover: true });
  }

  hideHover() {
    this.setState({ hover: false });
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

  togglePatientForTextBlast(checked, id) {
    const { addPatientsToTextBlast, id, removePatientFromTextBlast } = this.props;
    if (checked) {
      addPatientsToTextBlast([{ id }]);
    } else {
      removePatientFromTextBlast([{ id }]);
    }
  }

  render() {
    const { id, index, firstName, lastName, email, phone, age, gender, bmi, indications, source, studyPatientCategory } = this.props;
    const indicationNames = map(indications, indicationIterator => indicationIterator.name).join(', ');

    return (
      <tr className={classNames('patient-container', { 'tr-active': this.state.hover })} onMouseEnter={this.showHover} onMouseLeave={this.hideHover}>
        <td>
          <Field
            name={`patient-${id}`}
            type="checkbox"
            component={Checkbox}
            onChange={(checked) => {
              this.togglePatientForTextBlast(checked, id);
            }}
          />
        </td>
        <td className="index">
          {index + 1}
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
          <div className="btn-block">
            <span>{source.type}</span>
            <Button bsStyle="primary" className="btn-edit-patient pull-right" onClick={this.editPatient} disabled={(this.currentPatientIsBeingFetched())}>
              {(this.currentPatientIsBeingFetched())
                ? <span><LoadingSpinner showOnlyIcon size={20} className="fetching-patient" /></span>
                : <span>Edit</span>
              }
            </Button>
          </div>
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
    addPatientsToTextBlast: (patients) => dispatch(addPatientsToTextBlast(patients)),
    removePatientFromTextBlast: (patient) => dispatch(removePatientFromTextBlast(patient)),
    fetchPatient: id => dispatch(fetchPatient(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientItem);
