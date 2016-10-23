/**
 * Created by mike on 10/18/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import Overlay from 'react-bootstrap/lib/Overlay';
import { change, Field, reduxForm } from 'redux-form';
import classNames from 'classnames';
import moment from 'moment-timezone';
import ReactSelect from 'react-select';
import Input from '../../../components/Input/index';
import { fetchIndications } from '../../App/actions';
import { selectIndications } from '../../App/selectors';
import { createStructuredSelector } from 'reselect';
import { selectValues, selectSyncErrors } from '../../../common/selectors/form.selector';
import { submitAddPatientIndication, submitRemovePatientIndication, submitPatientUpdate } from '../actions';
import IndicationOverlay from './IndicationOverlay';
import formValidator from './otherValidator';

const formName = 'PatientDetailModal.Other';

@reduxForm({
  form: formName,
  validate: formValidator,
})
class OtherSection extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    change: React.PropTypes.func.isRequired,
    currentUser: React.PropTypes.object,
    fetchIndications: React.PropTypes.func.isRequired,
    formSyncErrors: React.PropTypes.object,
    formValues: React.PropTypes.object,
    indications: React.PropTypes.array,
    initialValues: React.PropTypes.object,
    loading: React.PropTypes.bool,
    submitting: React.PropTypes.bool,
    submitAddPatientIndication: React.PropTypes.func.isRequired,
    submitRemovePatientIndication: React.PropTypes.func.isRequired,
    submitPatientUpdate: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showIndicationPopover: false,
    };
    this.toggleIndicationPopover = this.toggleIndicationPopover.bind(this);
    this.changePatientDobMonth = this.changePatientDobMonth.bind(this);
    this.changePatientDobDay = this.changePatientDobDay.bind(this);
    this.changePatientDobYear = this.changePatientDobYear.bind(this);
    this.changeBMI = this.changeBMI.bind(this);
    this.changeGender = this.changeGender.bind(this);
    this.deleteIndication = this.deleteIndication.bind(this);
    this.renderGender = this.renderGender.bind(this);
    this.renderIndications = this.renderIndications.bind(this);
  }

  componentWillMount() {
    this.props.fetchIndications();
  }

  toggleIndicationPopover() {
    this.setState({
      showIndicationPopover: !this.state.showIndicationPopover,
    });
  }

  changePatientDobMonth(event) {
    const { formValues: { dobMonth, dobDay, dobYear }, submitPatientUpdate } = this.props;
  }

  changePatientDobDay(event) {
    const { formValues: { dobMonth, dobDay, dobYear }, submitPatientUpdate } = this.props;
  }

  changePatientDobYear(event) {
    const { formValues: { dobMonth, dobDay, dobYear }, submitPatientUpdate } = this.props;
  }

  changeBMI(event) {
    const { formSyncErrors, initialValues, submitPatientUpdate } = this.props;
    if (!formSyncErrors.bmi) {
      submitPatientUpdate(initialValues.id, {
        bmi: parseFloat(event.target.value),
      });
    }
  }

  changeGender(option) {
    const { change, initialValues, submitPatientUpdate } = this.props;
    submitPatientUpdate(initialValues.id, {
      gender: option.value,
    });
  }

  deleteIndication(indication) {
    const { initialValues, submitRemovePatientIndication } = this.props;
    submitRemovePatientIndication(initialValues.id, indication.id);
  }

  renderGender() {
    const { initialValues, loading, submitting } = this.props;
    const genderOptions = [{
      label: 'N/A',
      value: 'N/A',
    }, {
      label: 'Male',
      value: 'Male',
    }, {
      label: 'Female',
      value: 'Female',
    }];
    return (
      <div className="field-row">
        <strong className="label">
          <label htmlFor="patient-gender">Gender</label>
        </strong>
        <div className="field patient-gender">
          <Field
            name="gender"
            component={ReactSelect}
            className="form-control"
            options={genderOptions}
            disabled={submitting || loading}
            placeholder="Select Gender"
            onChange={this.changeGender}
          />
        </div>
      </div>
    );
  }

  renderIndications() {
    const { initialValues } = this.props;
    if (initialValues.indications) {
      return (
        <div className="category-list">
          {initialValues.indications.map(indication => (
            <div key={indication.id} className="category">
              <span className="link">
                <span className="text">{indication.name}</span>
                <span
                  className="icomoon-icon_trash"
                  onClick={() => {
                    this.deleteIndication(indication);
                  }}
                />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

  render() {
    const { active, currentUser, indications, initialValues, loading, submitting, submitAddPatientIndication } = this.props;
    if (initialValues) {
      const now = moment();
      const monthOptions = moment.monthsShort();
      for (let index = 0; index < 12; index++) {
        const month = monthOptions[index];
        monthOptions[index] = {
          label: month,
          value: index + 1,
        };
      }
      const dayOptions = [];
      for (let day = 1; day < 32; day++) {
        dayOptions.push({
          label: day,
          value: day,
        });
      }
      const nowYear = now.year();
      const yearOptions = [];
      for (let year = nowYear; year > 1900; year--) {
        yearOptions.push({
          label: year,
          value: year,
        });
      }
      return (
        <div className={classNames('item others', { active })}>
          <div className="item-holder">
            <div className="dates">
              <strong className="title">Dates</strong>
              <ul className="list-unstyled list-radios">
                <li>
                  <span className="title">Signed Up</span>
                  <time dateTime={initialValues.createdAt}>{moment.tz(initialValues.createdAt, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
                </li>
                <li>
                  <span className="title">Updated</span>
                  <time dateTime={initialValues.updatedAt}>{moment.tz(initialValues.updatedAt, currentUser.timezone).format('MM/DD/YY [at] h:mm A')}</time>
                </li>
              </ul>
            </div>
            <Form className="sub-holder form-lightbox" noValidate="novalidate">
              <div className="field-row full remove-indication">
                <strong className="label">Indications</strong>
                <div className="field">
                  {this.renderIndications()}
                </div>
              </div>
              <div className="field-row full">
                <div className="field add-indications" ref="parent">
                  <Button bsStyle="primary" ref="target" onClick={this.toggleIndicationPopover}>+ Add Indication</Button>
                  <Overlay
                    show={this.state.showIndicationPopover}
                    placement="bottom"
                    container={ReactDOM.findDOMNode(this.refs.parent)}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}
                  >
                    <IndicationOverlay indications={indications} submitAddIndication={submitAddPatientIndication} patient={initialValues} onClose={this.toggleIndicationPopover} />
                  </Overlay>
                </div>
              </div>
              <div className="fields-holder">
                <strong className="title">OTHER INFORMATION</strong>
                <div className="field-row">
                  <strong className="label"><label htmlFor="patient-dob">Date of Birth</label></strong>
                  <div className="field">
                    <div className="row">
                      <div className="col-small pull-left">
                        <Field
                          name="dobMonth"
                          component={ReactSelect}
                          className="form-control min-height"
                          options={monthOptions}
                          disabled={submitting || loading}
                          placeholder="Month"
                          onChange={this.changePatientDobMonth}
                        />
                      </div>
                      <div className="col-small pull-left">
                        <Field
                          name="dobDate"
                          component={ReactSelect}
                          className="form-control min-height"
                          options={dayOptions}
                          disabled={submitting || loading}
                          placeholder="Day"
                          onChange={this.changePatientDobDay}
                        />
                      </div>
                      <div className="col-small pull-left">
                        <Field
                          name="dobYear"
                          component={ReactSelect}
                          className="form-control min-height"
                          disabled={submitting || loading}
                          options={yearOptions}
                          placeholder="Year"
                          onChange={this.changePatientDobYear}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {this.renderGender()}
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="patient-bmi">BMI</label>
                  </strong>
                  <div className="field">
                    <Field
                      type="text"
                      name="bmi"
                      component={Input}
                      onBlur={this.changeBMI}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <strong className="label">
                    <label htmlFor="patient-source5">Source</label>
                  </strong>
                  <div className="field">
                    <FormControl type="text" value={initialValues.source ? initialValues.source.type : ''} disabled readOnly />
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  formSyncErrors: selectSyncErrors(formName),
  formValues: selectValues(formName),
  indications: selectIndications(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (field, value) => dispatch(change(formName, field, value)),
  submitAddPatientIndication: (patientId, indication) => dispatch(submitAddPatientIndication(patientId, indication)),
  submitRemovePatientIndication: (patientId, indicationId) => dispatch(submitRemovePatientIndication(patientId, indicationId)),
  submitPatientUpdate: (patientId, fields) => dispatch(submitPatientUpdate(patientId, fields)),
  fetchIndications: () => dispatch(fetchIndications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherSection);
