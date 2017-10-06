import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { blur, change, Field, FieldArray, reduxForm, reset } from 'redux-form';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';

import { selectIndications, selectSiteLocations, selectSources, selectCurrentUser } from '../../containers/App/selectors';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import { fetchFilteredProtcols } from '../../containers/UploadPatients/actions';
import { selectIsFetchingProtocols, selectProtocols, selectExportPatientsStatus } from '../../containers/UploadPatients/selectors';
import RenderPatientsList from './RenderPatientsList';
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
});

const mapDispatchToProps = (dispatch) => ({
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
    addPatientStatus: React.PropTypes.object,
    currentUser: React.PropTypes.object,
    change: React.PropTypes.func,
    fetchFilteredProtcols: React.PropTypes.func,
    clearForm: React.PropTypes.func,
    exportPatientsStatus: React.PropTypes.any,
    indications: React.PropTypes.array,
    isFetchingProtocols: React.PropTypes.bool,
    onClose: React.PropTypes.func,
    sites: React.PropTypes.array,
    sources: React.PropTypes.array,
    submitting: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func,
    blur: React.PropTypes.func,
    protocols: React.PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.state = {
      showPreview: false,
      siteLocation: null,
      fields: [],
      rowsCounts: {
        name: 0,
        email: 0,
        phone: 0,
        age: 0,
        gender: 0,
        bmi: 0,
      },
    };

    this.changeSiteLocation = this.changeSiteLocation.bind(this);
    this.selectIndication = this.selectIndication.bind(this);
    this.selectProtocol = this.selectProtocol.bind(this);
    this.mapTextAreaGroups = this.mapTextAreaGroups.bind(this);
    this.updateFields = this.updateFields.bind(this);
    this.addField = this.addField.bind(this);
    this.changeField = this.changeField.bind(this);
    this.switchPreview = this.switchPreview.bind(this);
    this.renderGroupFields = this.renderGroupFields.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { exportPatientsStatus, clearForm, change } = this.props;
    if (exportPatientsStatus.exporting && !newProps.exportPatientsStatus.exporting) {
      clearForm();

      change('group-name', '');
      change('group-email', '');
      change('group-phone', '');
      change('group-age', '');
      change('group-gender', '');
      change('group-bmi', '');

      this.setState({ fields: [], showPreview: false });
    }
  }

  mapTextAreaGroups(event) {
    const { fields, rowsCounts } = this.state;
    const pattern = /\r\n|\r|\n/g;
    const replaced = event.target.value.replace(pattern, '|');
    const items = replaced.split('|');
    let counter = 0;

    const key = event.target.name.split('-')[1];

    if (items.length < fields.length) {
      // add empty strings to keep balance with rest of the columns
      _.forEach(fields, (item, index) => {
        fields[index][key] = '';
      });
    }

    _.forEach(items, (item, index) => {
      let value = item;

      // recognize lower case for gender fields
      if (key === 'gender' && value !== 'N/A') {
        value = value.toLowerCase();
      }

      if (fields[index]) {
        if (fields[index][key] !== value) {
          fields[index][key] = value;
        }
      } else if (value && value !== '') {
        fields[index] = {
          [key]: value,
        };
      }

      if (value !== '') {
        counter++;
      }
    });
    rowsCounts[key] = counter;
    this.setState({ fields, rowsCounts });
  }

  updateFields(index) {
    const { change } = this.props;
    const fields = this.state.fields;

    let groupName = '';
    let groupEmail = '';
    let groupPhone = '';
    let groupAge = '';
    let groupGender = '';
    let groupBmi = '';

    if (index !== null) {
      fields.splice(index, 1);
    }

    _.forEach(fields, (field) => {
      _.forEach(field, (value, key) => {
        switch (key) {
          case 'name':
            if (groupName !== '') {
              groupName += `\n${value}`;
            } else {
              groupName += `${value}`;
            }
            break;
          case 'email':
            if (groupEmail !== '') {
              groupEmail += `\n${value}`;
            } else {
              groupEmail += `${value}`;
            }
            break;
          case 'phone':
            if (groupPhone !== '') {
              groupPhone += `\n${normalizePhoneForServer(value)}`;
            } else {
              groupPhone += `${normalizePhoneForServer(value)}`;
            }
            break;
          case 'age':
            if (groupAge !== '') {
              groupAge += `\n${value || 'N/A'}`;
            } else {
              groupAge += `${value || 'N/A'}`;
            }
            break;
          case 'gender':
            if (groupGender !== '') {
              groupGender += `\n${value || 'N/A'}`;
            } else {
              groupGender += `${value || 'N/A'}`;
            }
            break;
          case 'bmi':
            if (groupBmi !== '') {
              groupBmi += `\n${value || 'N/A'}`;
            } else {
              groupBmi += `${value || 'N/A'}`;
            }
            break;
          default:
            break;
        }
      });
    });

    change('group-name', groupName);
    change('group-email', groupEmail);
    change('group-phone', groupPhone);
    change('group-age', groupAge);
    change('group-gender', groupGender);
    change('group-bmi', groupBmi);

    this.setState({ fields });
  }

  switchPreview() {
    this.setState({ showPreview: !this.state.showPreview });
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
      val = 'N/A';
    }

    fields[index][name] = val;
    _.forEach(fields, (field, i) => {
      if ((i !== index) && !fields[i][name]) {
        if (name !== 'phone') {
          fields[i][name] = 'N/A';
        } else {
          fields[i][name] = '';
        }
      }
    });

    this.setState({ fields }, () => {
      scope.updateFields(null);
    });
  }

  changeSiteLocation(siteId) {
    const { currentUser, fetchFilteredProtcols, change } = this.props;
    this.setState({ siteLocation: siteId });
    if (siteId) {
      fetchFilteredProtcols(currentUser.roleForClient.id, siteId);
    } else {
      // clear the protocol value if there is no site id
      change('protocol', null);
    }
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
    if (studyId) {
      const { change, protocols } = this.props;
      const protocol = _.find(protocols, { studyId });
      change('indication', protocol.indicationId);
    }
  }

  renderGroupFields(names) {
    const { rowsCounts } = this.state;

    const groupFields = names.map(item => {
      const key = item.split('-')[0];
      const name = item.split('-')[1];
      const required = (item === 'group-name' || item === 'group-email' || item === 'group-phone');

      if (key && key !== 'group') {
        return null;
      }

      return (
        <div className={classNames('column', `${name}s`)}>
          <span className={classNames('title', (required ? 'required' : ''))}>
            <label htmlFor={`group-${name}`}>{name}</label>
          </span>
          <Field
            name={`group-${name}`}
            component={Input}
            componentClass="textarea"
            className="group"
            onChange={this.mapTextAreaGroups}
          />
          <span className="rows-counter">{rowsCounts[name]}</span>
        </div>
      );
    });

    return groupFields;
  }

  render() {
    const { handleSubmit, submitting, indications, isFetchingProtocols, protocols, sites, sources, change, blur } = this.props;
    const { fields, showPreview } = this.state;
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
    const sourceOptions = sources.map(source => ({
      label: source.type,
      value: source.id,
    }));

    // {error && <span className="error">{error}</span>}

    return (
      <Form
        className="upload-patients-form"
        onSubmit={handleSubmit}
      >
        <div className="field-row status">
          <span className="step-one">
            1. Copy & Paste contacts
          </span>
          <span className={`step-two ${(this.state.showPreview) ? 'active' : ''}`}>
            1. Preview Contacts
          </span>
        </div>
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
        <div className="field-row main">
          <strong className="label">
            <label>Protocol</label>
          </strong>
          <Field
            name="protocol"
            component={ReactSelect}
            placeholder={this.state.siteLocation ? 'Select Protocol' : 'N/A'}
            className="field"
            options={protocolOptions}
            disabled={isFetchingProtocols || !this.state.siteLocation}
            onChange={this.selectProtocol}
          />
        </div>
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
        {!this.state.showPreview &&
          <span className="tip">
            Copy & Paste contacts
          </span>
        }
        {!this.state.showPreview &&
          <div className="column-groups">
            {this.renderGroupFields(formFields)}
          </div>
        }
        {!this.state.showPreview &&
          <div className="instructions">
            <span className="head">Pasting instructions</span>
            <span className="body">Please separate your fields by entering one contact per line.</span>
            <span className="examples">
              <span className="title">Examples:</span>
              <span className="item">John Doe</span>
              <span className="item">Jane Doe</span>
              <span className="item">Janie Doe</span>
            </span>
          </div>
        }
        {this.state.showPreview && <FieldArray
          name="patients"
          component={RenderPatientsList}
          patients={fields}
          change={change}
          addField={this.addField}
          changeField={this.changeField}
          updateFields={this.updateFields}
          blur={blur}
        />}
        <div className="text-right">
          {!showPreview && <Button type="button" className="no-margin-right" onClick={this.switchPreview}>Next</Button>}
          {showPreview && <input type="button" value="back" className="btn btn-gray-outline margin-right" onClick={this.switchPreview} />}
          {showPreview && <Button type="submit" disabled={submitting}>Submit</Button>}
        </div>
      </Form>
    );
  }
}
