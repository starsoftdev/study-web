import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as XLSX from 'xlsx';
import { blur, change, Field, /* FieldArray, */reduxForm, reset, touch } from 'redux-form';
// import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';

import { selectIndications, selectSiteLocations, selectSources, selectCurrentUser } from '../../containers/App/selectors';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import { fetchFilteredProtcols } from '../../containers/UploadPatients/actions';
import { selectIsFetchingProtocols, selectProtocols, selectExportPatientsStatus, selectEmptyRowRequiredError } from '../../containers/UploadPatients/selectors';
import { selectSyncErrors } from '../../common/selectors/form.selector';
// import RenderPatientsList from './RenderPatientsList';
import UploadPatientsPreviewForm from './UploadPatientsPreview';
import { normalizePhoneForServer } from '../../common/helper/functions';
import formValidator, { fields as formFields } from './validator';

const formName = 'UploadPatients.UploadPatientsForm';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  indications: selectIndications(),
  isFetchingProtocols: selectIsFetchingProtocols(formName),
  protocols: selectProtocols(formName),
  sites: selectSiteLocations(),
  sources: selectSources(),
  exportPatientsStatus: selectExportPatientsStatus(),
  emptyRowRequiredError: selectEmptyRowRequiredError(formName),
  formSyncErrors: selectSyncErrors(formName),
});

const mapDispatchToProps = (dispatch) => ({
  touchFields: () => dispatch(touch(formName, ...formFields)),
  blur: (field, value) => dispatch(blur(formName, field, value)),
  clearForm: () => dispatch(reset(formName)),
  change: (field, value) => dispatch(change(formName, field, value)),
  fetchFilteredProtcols: (clientId, siteId) => dispatch(fetchFilteredProtcols(clientId, siteId)),
});

@reduxForm({
  form: formName,
  validate: formValidator,
  formFields,
})
@connect(mapStateToProps, mapDispatchToProps)
export default class UploadPatientsForm extends React.Component {
  static propTypes = {
    touchFields: React.PropTypes.func,
    formSyncErrors: React.PropTypes.object,
    addPatientStatus: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    change: React.PropTypes.func,
    fetchFilteredProtcols: React.PropTypes.func,
    showProtocolModal: React.PropTypes.func,
    clearForm: React.PropTypes.func,
    fileInputRef: React.PropTypes.func.isRequired,
    exportPatientsStatus: React.PropTypes.any,
    indications: React.PropTypes.array,
    isFetchingProtocols: React.PropTypes.bool,
    isImporting: React.PropTypes.bool,
    switchIsImporting: React.PropTypes.func,
    onClose: React.PropTypes.func,
    sites: React.PropTypes.array,
    sources: React.PropTypes.array,
    emptyRowRequiredError: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
    blur: React.PropTypes.func,
    protocols: React.PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      duplicateValidationResult: false,
      requiredValidationResult: false,
      showPreview: false,
      siteLocation: null,
      fileName: null,
      patients: [],
      fields: [],
      duplicates: [],
      prevItems: [],
      rowsCounts: {
        name: 0,
        email: 0,
        phone: 0,
        age: 0,
        gender: 0,
        bmi: 0,
      },
      cachedColumns: {
        name: null,
        email: null,
        phone: null,
        age: null,
        gender: null,
        bmi: null,
      },
      /*examples: {
        names: [
          'John Doe',
          'Jane Doe',
          'Janie Doe',
        ],
        emails: [
          'johndoe@example.com',
          'janedoe@example.com',
          'janiedoe@example.com',
        ],
        phones: [
          '(111) 111-1111',
          '(555) 555-5555',
          '(888) 888-8888',
        ],
        ages: [
          22,
          33,
          44,
        ],
        genders: [
          'Male',
          'Female',
          'Female',
        ],
        bmis: [
          '18.4',
          '24.5',
          '29',
        ],
      },*/
    };

    this.changeSiteLocation = this.changeSiteLocation.bind(this);
    this.selectIndication = this.selectIndication.bind(this);
    this.selectProtocol = this.selectProtocol.bind(this);
    this.mapTextAreaGroups = this.mapTextAreaGroups.bind(this);
    this.updateFields = this.updateFields.bind(this);
    this.addField = this.addField.bind(this);
    this.changeField = this.changeField.bind(this);
    this.switchPreview = this.switchPreview.bind(this);
    // this.renderGroupFields = this.renderGroupFields.bind(this);
    // this.renderExampleGroupFields = this.renderExampleGroupFields.bind(this);
    this.updateCounters = this.updateCounters.bind(this);
    this.fixOffset = this.fixOffset.bind(this);
    this.checkSameNumbers = this.checkSameNumbers.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.setRequiredValidationResult = this.setRequiredValidationResult.bind(this);
    this.setDuplicateValidationResult = this.setDuplicateValidationResult.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { /* isImporting, */exportPatientsStatus, clearForm, change } = this.props;
    const scope = this;

    if (exportPatientsStatus.exporting && !newProps.exportPatientsStatus.exporting) {
      clearForm();

      change('groupname', '');
      change('groupemail', '');
      change('groupphone', '');
      change('groupage', '');
      change('groupgender', '');
      change('groupbmi', '');

      this.setState({ fields: [], showPreview: false }, () => {
        scope.updateCounters();
      });
    }
  }

  setRequiredValidationResult(requiredValidationResult) {
    this.setState({ requiredValidationResult });
  }

  setDuplicateValidationResult(duplicateValidationResult) {
    this.setState({ duplicateValidationResult });
  }

  updateCounters() {
    const { fields } = this.state;
    const counters = {
      name: 0,
      email: 0,
      phone: 0,
      age: 0,
      gender: 0,
      bmi: 0,
    };

    _.forEach(fields, (field) => {
      _.forEach(field, (value, key) => {
        if (value !== '') {
          counters[key]++;
        }
      });
    });

    this.setState({ rowsCounts: counters });
  }

  checkSameNumbers(fields) {
    const duplicates = [];
    _.forEach(fields, (patient) => {
      const hasPhone = _.hasIn(patient, 'phone');
      let samePhone = 0;

      if (hasPhone) {
        _.forEach(fields, (compareWith) => {
          if (patient.phone !== '' && patient.phone === compareWith.phone) {
            samePhone++;
          }
        });

        if (samePhone > 1 && _.findIndex(duplicates, (d) => { return d === patient.phone; }) === -1) {
          duplicates.push(patient.phone);
        }
      }
    });

    this.setState({ duplicates });
  }

  mapTextAreaGroups(event) {
    const { fields, cachedColumns } = this.state;
    const scope = this;
    const pattern = /\r\n|\r|\n/g;
    // recognize integers for age fields
    const agePattern = /[^\d]+/g;
    // recognize decimals for age fields
    const bmiPattern = /[^\d.]+/g;
    const replaced = event.target.value.replace(pattern, '|');
    const items = replaced.split('|');

    const cloneFields = _.clone(fields);
    const cloneCachedColumns = _.clone(cachedColumns);
    const key = event.target.name.substring(5);
    let isEmptyCurrent = true;

    _.forEach(items, (item) => { // eslint-disable-line consistent-return
      if (item !== '') {
        isEmptyCurrent = false;
        return false;
      }
    });

    cloneCachedColumns[key] = (!isEmptyCurrent) ? event.target.value : null;

    if (items[items.length - 1] === '') {
      items.pop();
    }

    this.fixOffset(items, key);

    if (items.length < cloneFields.length) {
      _.forEach(cloneFields, (item, index) => {
        delete cloneFields[index][key];
      });
    }

    _.forEach(items, (item, index) => {
      let value = item;
      // console.log('prev value: ', cloneFields[index], 'current value: ', value);

      // recognize lower case for gender fields
      if (key === 'gender' && value !== 'N/A') {
        value = value.toLowerCase();
      }
      // recognize integers for age fields
      if (key === 'age' && value !== 'N/A') {
        value = value.replace(agePattern, '');
      }
      // recognize decimals for age fields
      if (key === 'bmi' && value !== 'N/A') {
        value = value.replace(bmiPattern, '');
      }

      // insert if field doesn't exist
      if (!cloneFields[index]) {
        cloneFields[index] = {
          [key]: value,
        };
      } else if (cloneFields[index][key] !== value) {
        cloneFields[index][key] = value;
      }
    });

    if (_.isEmpty(cloneFields[cloneFields.length - 1])) {
      cloneFields.pop();
    }

    // console.log('cloneFields', cloneFields);
    this.setState({ fields: cloneFields, cachedColumns: cloneCachedColumns }, () => {
      scope.updateCounters();
      scope.checkSameNumbers(cloneFields);
    });
  }

  fixOffset(current, key) {
    const { prevItems, cachedColumns } = this.state;
    const scope = this;
    let offset = 0;
    let isEmptyCurrent = true;

    _.forEach(current, (field) => { // eslint-disable-line consistent-return
      if (field !== '') {
        isEmptyCurrent = false;
        return false;
      }
    });

    if (prevItems.length > 0 && cachedColumns[key] === null) {
      let emptyInCurrent = 0;
      let emptyInPrev = 0;

      _.forEach(current, (field, index) => { // eslint-disable-line consistent-return
        if (field === '') {
          emptyInCurrent++;
        }
        if (current[index + 1] && current[index + 1][index] !== '') {
          return false;
        }
      });
      _.forEach(prevItems, (field, index) => { // eslint-disable-line consistent-return
        if (field === '') {
          emptyInPrev++;
        }
        if (prevItems[index + 1] && prevItems[index + 1][index] !== '') {
          return false;
        }
      });

      if (!isEmptyCurrent && emptyInCurrent > emptyInPrev) {
        offset = emptyInCurrent - emptyInPrev;
        current.splice(0, offset);
      } else if (!isEmptyCurrent && emptyInCurrent < emptyInPrev) {
        offset = emptyInPrev - emptyInCurrent;
        for (let i = 0; i < offset; i++) {
          current.unshift('');
        }
      }
    }

    if (offset) {
      this.setState({ prevItems: current }, () => {
        scope.updateFields(null, false);
      });
    } else {
      this.setState({ prevItems: (isEmptyCurrent ? prevItems : current) });
    }
  }

  updateFields(index, allowUpdateFields = true) {
    const { change } = this.props;
    const { fields } = this.state;
    const scope = this;

    let groupName = null;
    let groupEmail = null;
    let groupPhone = null;
    let groupAge = null;
    let groupGender = null;
    let groupBmi = null;

    if (index !== null) {
      fields.splice(index, 1);
    }

    _.forEach(fields, (field) => {
      _.forEach(field, (value, key) => {
        switch (key) {
          case 'name':
            if (groupName !== null) {
              groupName += `\n${value}`;
            } else {
              groupName = '';
              groupName += `${value}`;
            }
            break;
          case 'email':
            if (groupEmail !== null) {
              groupEmail += `\n${value}`;
            } else {
              groupEmail = '';
              groupEmail += `${value}`;
            }
            break;
          case 'phone':
            if (groupPhone !== null) {
              groupPhone += `\n${normalizePhoneForServer(value)}`;
            } else {
              groupPhone = '';
              groupPhone += `${normalizePhoneForServer(value)}`;
            }
            break;
          case 'age':
            if (groupAge !== null) {
              groupAge += `\n${value}`;
            } else {
              groupAge = '';
              groupAge += `${value}`;
            }
            break;
          case 'gender':
            if (groupGender !== null) {
              groupGender += `\n${value}`;
            } else {
              groupGender = '';
              groupGender += `${value}`;
            }
            break;
          case 'bmi':
            if (groupBmi !== null) {
              groupBmi += `\n${value}`;
            } else {
              groupBmi = '';
              groupBmi += `${value}`;
            }
            break;
          default:
            break;
        }
      });
    });

    change('groupname', groupName);
    change('groupemail', groupEmail);
    change('groupphone', groupPhone);
    change('groupage', groupAge);
    change('groupgender', groupGender);
    change('groupbmi', groupBmi);

    if (allowUpdateFields) {
      this.setState({ fields }, () => {
        scope.updateCounters();
        scope.checkSameNumbers(fields);
      });
    }
  }

  switchPreview() {
    // const scope = this;
    const { fields } = this.state;
    const { isImporting, switchIsImporting, touchFields, formSyncErrors } = this.props;

    touchFields();

    if (_.isEmpty(formSyncErrors)) {
      this.setState({ fields, showPreview: !this.state.showPreview }, () => {
        // scope.updateFields(null);
        if (isImporting) {
          switchIsImporting();
        }
      });
    } else {
      console.log(formSyncErrors);
    }
  }

  addField() {
    const fields = this.state.fields;
    fields.push({});
    this.setState({ fields });
  }

  changeField(value, name, index) {
    const fields = this.state.fields;
    const scope = this;
    let val = value;

    if (val === '' && name !== 'phone') {
      val = '\n';
    }
    fields[index][name] = val;
    _.forEach(fields, (field, i) => {
      if ((i !== index) && !fields[i][name]) {
        if (name !== 'phone') {
          fields[i][name] = ''; // N/A
        } else {
          fields[i][name] = '';
        }
      }
    });

    this.setState({ fields }, () => {
      scope.updateFields(null);
    });
  }

  changeSiteLocation(location) {
    const { currentUser, fetchFilteredProtcols, change } = this.props;
    let siteLocation = null;

    if (location) {
      fetchFilteredProtcols(currentUser.roleForClient.id, location);
      siteLocation = location;
    } else {
        // clear the protocol value if there is no site id
      change('protocol', null);
      change('indication', null);
    }

    this.setState({ siteLocation });
  }

  selectIndication(indicationId) {
    if (indicationId) {
      const { change, protocols } = this.props;
      const protocol = _.find(protocols, { indicationId });
      if (protocol) {
        change('protocol', protocol.studyId);
      } else {
        // clear the protocol value if the indicationId doesn't match
        change('protocol', null);
      }
    }
  }

  selectProtocol(studyId) {
    const { protocols, showProtocolModal, change } = this.props;

    if (studyId === 'add-new-protocol') {
      change('protocol', null);
      change('indication', null);
      showProtocolModal();
    } else {
      const protocol = _.find(protocols, { studyId });
      change('indication', protocol.indicationId);
    }
  }

  handleFile(e) {
    const rABS = false;
    const scope = this;
    const files = e.target.files;
    const f = files[0];
    const name = f ? f.name : '';
    const reader = new FileReader();
    console.log('f', f);
    console.log('name', name);
    reader.onload = function (e) {
      let data = e.target.result;
      if (!rABS) data = new Uint8Array(data);
      const workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
      const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(firstWorksheet, { defval: null });

      scope.setState({ fileName: name, patients: json });
    };

    if (rABS) {
      reader.readAsBinaryString(f);
    } else {
      reader.readAsArrayBuffer(f);
    }
  }

  /* renderGroupFields(names) {
    const { rowsCounts } = this.state;
    let counter = 0;

    return names.map(item => {
      const key = item.substring(0, 5);
      const name = item.substring(5);
      const required = (item === 'groupname' || item === 'groupemail' || item === 'groupphone');

      if (key && key !== 'group') {
        return null;
      }

      counter++;
      return (
        <div className={classNames('column', `${name}s`)} key={counter}>
          <span className={classNames('title', (required ? 'required' : ''))}>
            <label htmlFor={`group${name}`}>{name}</label>
          </span>
          <Field
            name={`group${name}`}
            component={Input}
            componentClass="textarea"
            className="group"
            onChange={this.mapTextAreaGroups}
          />
          <span className="rows-counter">{rowsCounts[name]}</span>
        </div>
      );
    });
  }*/

  /* renderExampleGroupFields(names) {
    const { examples } = this.state;
    let counter = 0;

    return names.map(item => {
      const key = item.substring(0, 5);
      const name = item.substring(5);
      const required = (item === 'groupname' || item === 'groupemail' || item === 'groupphone');

      if (key && key !== 'group') {
        return null;
      }

      counter++;
      return (
        <div className={classNames('column', `${name}s`)} key={counter}>
          <span className={classNames('title', (required ? 'required' : ''))}>
            <label htmlFor={`group${name}`}>{name}</label>
          </span>
          <div className="group">
            {
              examples[`${name}s`].map(item => {
                return <span className="item">{item}<br /></span>;
              })
            }
          </div>
        </div>
      );
    });
  }*/

  render() {
    const { handleSubmit, /* emptyRowRequiredError,*/ fileInputRef, indications, isFetchingProtocols, protocols, sites, sources, isImporting/* , change, blur*/ } = this.props;
    const { /* fields, */showPreview/* , rowsCounts, duplicates*/, patients, requiredValidationResult, duplicateValidationResult } = this.state;
    const uploadSources = _.clone(sources);
    const indicationOptions = indications.map(indicationIterator => ({
      label: indicationIterator.name,
      value: indicationIterator.id,
    }));

    const siteOptions = sites.map(siteIterator => ({
      label: siteIterator.name,
      value: siteIterator.id,
    }));
    const protocolOptions = protocols.map(protocolIterator => ({
      label: protocolIterator.number,
      value: protocolIterator.studyId,
    }));
    uploadSources.shift();
    protocolOptions.unshift({ id: 'add-new-protocol', name: 'Add New Protocol' });
    const sourceOptions = uploadSources.map(source => ({
      label: source.type,
      value: source.id,
    }));

    return (
      <Form
        className="upload-patients-form"
        onSubmit={handleSubmit}
      >
        <div className="field-row status">
          <span className="step-one">
            1. Upload Patients List
          </span>
          <span className={`step-two ${(this.state.showPreview) ? 'active' : ''}`}>
            2. Preview & Finish
          </span>
        </div>
        {(!this.state.showPreview && !isImporting) &&
          <div className="field-row main">
            <strong className="label required">
              <label>Site Location</label>
            </strong>
            <Field
              name="site"
              component={ReactSelect}
              className="field"
              placeholder="Select Site Location"
              options={siteOptions}
              onChange={this.changeSiteLocation}
            />
          </div>
        }
        {(!this.state.showPreview && !isImporting) &&
          <div className="field-row main">
            <strong className="label required">
              <label>Protocol</label>
            </strong>
            <Field
              name="protocol"
              component={ReactSelect}
              placeholder="Select Protocol"
              className="field"
              options={protocolOptions}
              disabled={isFetchingProtocols || !this.state.siteLocation}
              onChange={this.selectProtocol}
            />
          </div>
        }
        {(!this.state.showPreview && !isImporting) &&
          <div className="field-row main">
            <strong className="label required">
              <label>Indication</label>
            </strong>
            <Field
              name="indication"
              component={ReactSelect}
              className="field"
              placeholder="Select Indication"
              options={indicationOptions}
              onChange={this.selectIndication}
            />
          </div>
        }
        {(!this.state.showPreview && !isImporting) &&
          <div className="field-row main">
            <strong className="label required">
              <label>Source</label>
            </strong>
            <Field
              name="source"
              component={ReactSelect}
              className="field"
              placeholder="Select Source"
              options={sourceOptions}
            />
          </div>
        }
        {(!this.state.showPreview && !isImporting) &&
          <div className="field-row main">
            <strong className="label required">
              <label>UPLOAD PATIENTS LIST</label></strong>
            <div className="field">
              <label htmlFor="patients_list" data-text="Browse" data-hover-text="Attach File" className="btn btn-gray upload-btn" />
              <Field
                id="patients_list"
                name="file"
                inputRef={fileInputRef}
                component={Input}
                type="file"
                onChange={this.handleFile}
              />
              <strong className="label filename">
                <label className="filename" htmlFor="patients_list">{this.state.fileName ? this.state.fileName : ''}</label>
              </strong>
            </div>
          </div>
        }
        {(!this.state.showPreview && !isImporting) &&
          <div className="instructions">
            <span className="head">Upload Instructions</span>
            <span className="body">
              <span className="first-row">Please upload an Excel file up to 20,000 rows and less then 50MB in size.</span>
              Please format the first row of your colums with the proper column names
              i.e.: "Full Name", "Email",  "Phone",  "DOB",  "Gender",  and "BMI".
            </span>
            <div className="examples">
              <span className="title">* Only the Phone field is required; all other fields are optional.</span>
              {/* this.renderExampleGroupFields(formFields)*/}
              <table className="example-table">
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>BMI</th>
                </tr>
                <tr>
                  <td>John, Doe</td>
                  <td>johndoe@example.com</td>
                  <td>(111) 111-1111</td>
                  <td className="dob">1/1/1111</td>
                  <td>Male</td>
                  <td className="bmi">18.4</td>
                </tr>
                <tr>
                  <td>Jane, Doe</td>
                  <td>janedoe@example.com</td>
                  <td>(555) 555-5555</td>
                  <td className="dob">5/5/5555</td>
                  <td>Female</td>
                  <td className="bmi">24.5</td>
                </tr>
                <tr>
                  <td>Janie, Doe</td>
                  <td>janiedoe@example.com</td>
                  <td>(888) 888-8888</td>
                  <td className="dob">8/8/8888</td>
                  <td>Female</td>
                  <td className="bmi">29</td>
                </tr>
              </table>
            </div>
          </div>
        }
        {/*! this.state.showPreview &&
          <div className="column-groups">
            {this.renderGroupFields(formFields)}
          </div>
        */}
        {/* this.state.showPreview &&
          <div className={`legends ${(fields.length > 10) ? 'scroll-fix' : ''}`}>
            <span className="title name required">
              <label htmlFor="import-patient-name">Name</label>
            </span>
            <span className="title email required">
              <label htmlFor="import-patient-email">Email</label>
            </span>
            <span className="title phone required">
              <label htmlFor="import-patient-phone">Phone</label>
            </span>
            <span className="title age">
              <label htmlFor="import-patient-phone">Age</label>
            </span>
            <span className="title gender">
              <label htmlFor="import-patient-phone">Gender</label>
            </span>
            <span className="title bmi">
              <label htmlFor="import-patient-phone">BMI</label>
            </span>
          </div>
        */}
        {/* this.state.showPreview && <FieldArray
          name="patients"
          component={RenderPatientsList}
          patients={fields}
          duplicates={duplicates}
          rowsCounts={rowsCounts}
          emptyRowRequiredError={emptyRowRequiredError}
          change={change}
          addField={this.addField}
          changeField={this.changeField}
          updateFields={this.updateFields}
          blur={blur}
        />*/}
        {(this.state.showPreview && !isImporting && patients.length) &&
          <UploadPatientsPreviewForm
            setDuplicateValidationResult={this.setDuplicateValidationResult}
            setRequiredValidationResult={this.setRequiredValidationResult}
            patients={patients}
          />
        }
        {isImporting &&
          <div className="import-progress">
            <ProgressBar bsStyle="success" now={10} />
            <div className="control">
              <span className="title">Import of <b>{this.state.fileName}</b> in progress.</span>
              <input type="button" value="Cancel import" className="btn btn-gray-outline margin-right" onClick={this.switchPreview} />
            </div>
          </div>
        }
        {isImporting &&
          <div className="upload-history">
            <div className="header">
              <span className="title">Import history</span>
              <span className="tip">Import sessions are kept for 90 days, but can only be deleted in the first 48 hours after upload. </span>
            </div>
            <div className="histoList"></div>
          </div>
        }
        <div className="text-right">
          {!showPreview && <Button type="button" className="no-margin-right" onClick={this.switchPreview} disabled={this.state.fileName === null}>Next</Button>}
          {(showPreview && !isImporting) && <input type="button" value="back" className="btn btn-gray-outline margin-right" onClick={this.switchPreview} />}
          {(showPreview && !isImporting) && <Button type="submit" disabled={duplicateValidationResult !== true || requiredValidationResult !== true}>Submit</Button>}
        </div>
      </Form>
    );
  }
}
