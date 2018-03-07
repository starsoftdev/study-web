/**
 * Created by mike on 10/9/16.
 */
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { blur, Field, reduxForm, touch, change } from 'redux-form';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import ReactMultiSelect from '../../../components/Input/ReactMultiSelect';
import { selectSyncErrorBool, selectValues } from '../../../common/selectors/form.selector';
import { normalizePhoneForServer, normalizePhoneDisplay } from '../../../common/helper/functions';
import { selectSources, selectCurrentUserClientId } from '../../App/selectors';
import Input from '../../../components/Input/index';
import { submitAddPatient } from '../actions';
import { selectStudyId, selectAddPatientStatus } from '../selectors';
import formValidator, { fields } from './validator';

const formName = 'addPatient';

@reduxForm({ form: formName, validate: formValidator })
class AddPatientForm extends React.Component {
  static propTypes = {
    clientId: React.PropTypes.number,
    addPatientStatus: React.PropTypes.object,
    blur: React.PropTypes.func.isRequired,
    formError: React.PropTypes.bool.isRequired,
    newPatient: React.PropTypes.object,
    studyId: React.PropTypes.number.isRequired,
    submitAddPatient: React.PropTypes.func.isRequired,
    onClose: React.PropTypes.func.isRequired,
    sources: React.PropTypes.array.isRequired,
    touchFields: React.PropTypes.func.isRequired,
    changeField: React.PropTypes.func.isRequired,
    sourceMapped: React.PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.onPhoneBlur = this.onPhoneBlur.bind(this);
    this.addPatient = this.addPatient.bind(this);
    this.groupHeaderClicked = this.groupHeaderClicked.bind(this);
  }

  onPhoneBlur(event) {
    const { blur } = this.props;
    const formattedPhoneNumber = normalizePhoneDisplay(event.target.value);
    blur('phone', formattedPhoneNumber);
  }

  addPatient(event) {
    event.preventDefault();
    const { clientId, formError, onClose, newPatient, studyId, submitAddPatient, touchFields } = this.props;

    if (formError) {
      touchFields();
      return;
    }

    const patient = Object.assign({}, newPatient);
    patient.client_id = clientId;
    /* normalizing the phone number */
    patient.phone = normalizePhoneForServer(newPatient.phone);
    patient.source_id = newPatient.source;
    delete patient.source;
    submitAddPatient(studyId, patient, onClose);
  }

  groupHeaderClicked(group) {
    const foundItem = _.find(this.props.sourceMapped, (item) => {
      return item.group === group;
    });
    if (foundItem && !foundItem.studySourceId) {
      this.props.changeField('source', foundItem);
      this.props.blur('source', foundItem);
      this.sourceSelectContainer.click(); // fake click to close the dropdown
    }
  }

  render() {
    const { addPatientStatus } = this.props;
    const uploadSources = _.clone(this.props.sourceMapped);
    uploadSources.shift();
    const itemTemplate = (controlSelectedValue) => {
      return (<div key={controlSelectedValue.value} className={`${controlSelectedValue.label === 'none' ? 'hiddenSelectOption studySourceSelectOption' : 'studySourceSelectOption'}`}>
        {controlSelectedValue.label}
        <i className="close-icon icomoon-icon_close" />
      </div>);
    };

    const selectedItemsTemplate = (controlSelectedValue) => {
      if (controlSelectedValue.length === 1) {
        return (<div className="truncate">
          {controlSelectedValue[0].studySourceId ? controlSelectedValue[0].label : controlSelectedValue[0].group}
        </div>);
      }
      return (<div>
        {controlSelectedValue.length} item(s) selected
      </div>);
    };

    const groupHeaderTemplate = (group) => {
      return <div onClick={() => { this.groupHeaderClicked(group); }}>{group}</div>;
    };
    return (
      <Form className="form-lightbox" onSubmit={this.addPatient} noValidate="novalidate">
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="import-patient-first-name">Patient Name</label></strong>
          <div className="field">
            <div className="row">
              <Field
                name="firstName"
                component={Input}
                type="text"
                placeholder="First Name"
                className="col pull-left"
                id="import-patient-first-name"
                required
              />
              <Field
                name="lastName"
                component={Input}
                type="text"
                placeholder="Last Name"
                className="col pull-left"
                id="import-patient-last-name"
                required
              />
            </div>
          </div>
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="import-patient-email"> Patient Email </label>
          </strong>
          <Field
            name="email"
            component={Input}
            type="text"
            className="field"
            id="import-patient-email"
            required
          />
        </div>
        <div className="field-row">
          <strong className="label required">
            <label htmlFor="import-patient-phone"> Patient Phone </label>
          </strong>
          <Field
            name="phone"
            component={Input}
            type="tel"
            className="field"
            id="import-patient-phone"
            required
            onBlur={this.onPhoneBlur}
          />
        </div>
        <div
          className="field-row"
          ref={(sourceSelectContainer) => {
            this.sourceSelectContainer = sourceSelectContainer;
          }}
        >
          <strong className="label required">
            <label>Source</label>
          </strong>
          <Field
            name="source"
            component={ReactMultiSelect}
            placeholder="Select Source"
            searchPlaceholder="Search"
            searchable
            optionLabelKey="label"
            includeAllOption={false}
            customOptionTemplateFunction={itemTemplate}
            customSelectedValueTemplateFunction={selectedItemsTemplate}
            customGroupHeadingTemplateFunction={groupHeaderTemplate}
            dataSource={uploadSources}
            customSearchIconClass="icomoon-icon_search2"
            groupBy="group"
            initialValue={this.props.newPatient.source}
            className="studySourceMultiSelect studySourceMultiSelectShort"
          />
        </div>
        <div className="text-right">
          <Button type="submit" disabled={addPatientStatus.adding}>Submit</Button>
        </div>
      </Form>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  clientId: selectCurrentUserClientId(),
  addPatientStatus: selectAddPatientStatus(),
  formError: selectSyncErrorBool(formName),
  newPatient: selectValues(formName),
  studyId: selectStudyId(),
  sources: selectSources(),
});

function mapDispatchToProps(dispatch) {
  return {
    blur: (field, value) => dispatch(blur(formName, field, value)),
    submitAddPatient: (studyId, patient, onClose) => dispatch(submitAddPatient(studyId, patient, onClose)),
    touchFields: () => dispatch(touch(formName, ...fields)),
    changeField: (field, value) => dispatch(change(formName, field, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPatientForm);
