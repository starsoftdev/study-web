import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment-timezone';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import { Calendar } from 'react-date-range';
import ReactSelect from '../../../components/Input/ReactSelect';
import { HOUR_OPTIONS, MINUTES_OPTIONS, AM_PM_OPTIONS } from '../../../common/constants/index';
import CenteredModal from '../../../components/CenteredModal/index';
import Input from '../../../components/Input/index';
import RadioButton from '../../../components/Input/RadioButton';
const fieldName = 'ScheduledPatientModal';

@reduxForm({
  form: fieldName,
})
class ScheduledPatientModal extends React.Component {
  static propTypes = {
    onHide: React.PropTypes.func,
    show: React.PropTypes.bool.isRequired,
  };
  constructor(props) {
    super(props)
    this.state = {
    };
  }
  componentDidMount() {
  }

  changeDate(e) {
    this.setState({ date: e });
  }
  render() {
    const { onHide, firstName, lastName, ...props } = this.props;
    return (
      <div>
        <Calendar
          className="calendar custom-calendar"
        />
        <div>
          <label>*Patient</label>
          <label>{firstName}</label>
          <label>{lastName}</label>
        </div>
        <Field
          name="hours"
          options={HOUR_OPTIONS}
          component={ReactSelect}
        />
        <Field
          name="minutes"
          options={MINUTES_OPTIONS}
          component={ReactSelect}
        />
        <Field
          name="amPm"
          options={AM_PM_OPTIONS}
          component={ReactSelect}
        />
        <Field
          name="text-reminder"
          component={RadioButton}
          />
      </div>
    );
  }
}

export default ScheduledPatientModal;
