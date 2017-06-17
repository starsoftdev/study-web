import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import _ from 'lodash';
import ReactSelect from '../../../app/components/Input/ReactSelect';
import appointmentFormValidator from './validator';

@reduxForm({
  form: 'appointment',
  validate: appointmentFormValidator,
})

export class AppointmentForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    dates: PropTypes.array,
    footer: PropTypes.object,
    header: PropTypes.object,
    submitDisabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      timeOptions: [],
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  handleSelect(val) {
    /* code from legacy*/
    const weekTimes = ['8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM', '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '1:00 PM', '1:15 PM', '1:30 PM', '1:45 PM', '2:00 PM', '2:15 PM', '2:30 PM', '2:45 PM', '3:00 PM', '3:15 PM', '3:30 PM', '3:45 PM', '4:00 PM', '4:15 PM'];
    const friTimes = ['8:00 AM', '8:15 AM', '8:30 AM', '8:45 AM', '9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM'];

    const selectedDay = moment(val).format('dddd');
    const timeOptions = [];
    let r = 0;
    if (selectedDay === 'Friday') {
      for (let x = 0; x <= 10; x++) {
        const rand = Math.floor((Math.random() * 5) + 1);
        r += rand;
        if (r > 12) {
          r = 12;
          x = 99;
        }
        if (friTimes[r]) {
          timeOptions.push({ label: friTimes[r], value: friTimes[r] });
        }
      }
    } else {
      for (let x = 0; x <= 10; x++) {
        const rand = Math.floor((Math.random() * 5) + 1);
        r += rand;
        if (r > 28) {
          r = 28;
          x = 99;
        }
        if (weekTimes[r]) {
          timeOptions.push({ label: weekTimes[r], value: weekTimes[r] });
        }
      }
    }
    this.setState({ timeOptions });
  }

  render() {
    const { handleSubmit } = this.props;
    const options = [];

    _.forEach(this.props.dates, (item) => {
      options.push({ label: moment(item).format('dddd MM/DD/YYYY'), value: item });
    });

    return (
      <form
        action="#"
        className="form-billing appointment-form"
        data-formvalidation="true"
        onSubmit={handleSubmit}
      >
        <div className="form-holder">
          {this.props.header}
          <div className="field-row">
            <div className="row">
              <div className="col-sm-6 col-xs-12">
                <Field
                  name="date"
                  component={ReactSelect}
                  placeholder="Select Date"
                  options={options}
                  onChange={this.handleSelect}
                />
              </div>
              <div className="col-sm-6 col-xs-12">
                <Field
                  name="time"
                  component={ReactSelect}
                  placeholder="Select Time"
                  options={this.state.timeOptions}
                />
              </div>
            </div>
          </div>
          <div className="field-row">
            <input disabled={this.props.submitDisabled} type="submit" value="Finish Appointment" className="btn btn-default btn-block input-lg" />
          </div>
          {this.props.footer}
        </div>
      </form>
    );
  }
}

export default AppointmentForm;
