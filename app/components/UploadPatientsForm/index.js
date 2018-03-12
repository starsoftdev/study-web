import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { ProgressBar } from 'react-bootstrap';
import { blur, change, Field, reduxForm, touch } from 'redux-form';
import { toastr } from 'react-redux-toastr';
import { createStructuredSelector } from 'reselect';

import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import Input from '../../components/Input/index';
import ReactSelect from '../../components/Input/ReactSelect';
import LoadingSpinner from '../../components/LoadingSpinner';

import { fetchFilteredProtcols, revertBulkUpload } from '../../containers/UploadPatients/actions';
import { selectIndications, selectSiteLocations, selectCurrentUser } from '../../containers/App/selectors';
import { selectIsFetchingProtocols, selectProtocols, selectExportPatientsStatus, selectUploadHistory } from '../../containers/UploadPatients/selectors';
import { selectSyncErrors } from '../../common/selectors/form.selector';
import UploadPatientsPreviewForm from './UploadPatientsPreview';
import UploadHistoryList from './UploadHistoryList';

import formValidator, { fields as formFields } from './validator';

const formName = 'UploadPatients.UploadPatientsForm';

const mapStateToProps = createStructuredSelector({
  uploadHistory: selectUploadHistory(),
  currentUser: selectCurrentUser(),
  indications: selectIndications(),
  isFetchingProtocols: selectIsFetchingProtocols(formName),
  protocols: selectProtocols(formName),
  sites: selectSiteLocations(),
  exportPatientsStatus: selectExportPatientsStatus(),
  formSyncErrors: selectSyncErrors(formName),
});

const mapDispatchToProps = (dispatch) => ({
  touchFields: () => dispatch(touch(formName, ...formFields)),
  blur: (field, value) => dispatch(blur(formName, field, value)),
  change: (field, value) => dispatch(change(formName, field, value)),
  fetchFilteredProtcols: (clientId, siteId) => dispatch(fetchFilteredProtcols(clientId, siteId)),
  revertBulkUpload: (uploadId) => dispatch(revertBulkUpload(uploadId)),
});

@reduxForm({
  form: formName,
  validate: formValidator,
  formFields,
})
@connect(mapStateToProps, mapDispatchToProps)
export default class UploadPatientsForm extends Component {
  static propTypes = {
    addProtocolProcess: PropTypes.object,
    uploadProgress: PropTypes.any,
    revertProgress: PropTypes.any,
    touchFields: PropTypes.func,
    formSyncErrors: PropTypes.object,
    addPatientStatus: PropTypes.object,
    uploadHistory: PropTypes.object,
    currentUser: PropTypes.object,
    uploadResult: PropTypes.object,
    change: PropTypes.func,
    fetchFilteredProtcols: PropTypes.func,
    showProtocolModal: PropTypes.func,
    exportPatientsStatus: PropTypes.any,
    indications: PropTypes.array,
    isFetchingProtocols: PropTypes.bool,
    isImporting: PropTypes.bool,
    switchIsImporting: PropTypes.func,
    setPatients: PropTypes.func,
    onClose: PropTypes.func,
    sites: PropTypes.array,
    sources: PropTypes.array,
    handleSubmit: PropTypes.func,
    blur: PropTypes.func,
    setFileName: PropTypes.func,
    revertBulkUpload: PropTypes.func,
    protocols: PropTypes.array,
    lastAddedSiteLocation: PropTypes.any,
    lastAddedProtocolNumber: PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      defaultSourceSet: false,
      duplicateValidationResult: true,
      requiredValidationResult: true,
      dragEnter: false,
      showPreview: false,
      isDragOver: false,
      siteLocation: null,
      fileName: null,
      currentStudy: null,
      missingKeys: [],
      allowedFormats: ['xls', 'xlsx', 'xlsm', 'xlw', 'xlsb', 'xml', 'csv', 'ods', 'fods'],
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
      fileParsing: false,
      needToUpdateProtocol: false,
    };

    this.changeSiteLocation = this.changeSiteLocation.bind(this);
    this.selectProtocol = this.selectProtocol.bind(this);
    this.addField = this.addField.bind(this);
    this.switchPreview = this.switchPreview.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.setRequiredValidationResult = this.setRequiredValidationResult.bind(this);
    this.setDuplicateValidationResult = this.setDuplicateValidationResult.bind(this);
    this.downloadExample = this.downloadExample.bind(this);
    this.onDragEnterHandler = this.onDragEnterHandler.bind(this);
    this.onDragLeaveHandler = this.onDragLeaveHandler.bind(this);
    this.clearEmptySheet = this.clearEmptySheet.bind(this);
    this.revert = this.revert.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { exportPatientsStatus, isImporting, addProtocolProcess, currentUser, fetchFilteredProtcols, change } = this.props;
    const { currentStudy, siteLocation } = this.state;

    if (newProps.addProtocolProcess.fetching === false && newProps.addProtocolProcess.fetching !== addProtocolProcess.fetching) {
      this.setState({ needToUpdateProtocol : true });
      fetchFilteredProtcols(currentUser.roleForClient.id, siteLocation);
    }

    if ((!newProps.isFetchingProtocols && this.props.isFetchingProtocols) && this.state.needToUpdateProtocol) {
      if (this.props.lastAddedSiteLocation !== siteLocation) {
        change('site', this.props.lastAddedSiteLocation);
        this.setState({ siteLocation: this.props.lastAddedSiteLocation });
        fetchFilteredProtcols(currentUser.roleForClient.id, this.props.lastAddedSiteLocation);
      } else {
        const newSelectedProtocol = _.find(newProps.protocols, (item) => (item.number === this.props.lastAddedProtocolNumber));
        change('protocol', newSelectedProtocol.studyId);
        change('indication', newSelectedProtocol.indicationId);
        this.setState({ needToUpdateProtocol : false });
      }
    }

    if (exportPatientsStatus.exporting && !newProps.exportPatientsStatus.exporting) {
      setTimeout(() => {
        this.setState({ fields: [], showPreview: false, fileName: null, currentStudy: null }, () => {
          if (isImporting) {
            location.href = `/app/study/${currentStudy}`;
          }
        });
      }, 2000);
    }
  }

  onDragEnterHandler() {
    this.setState({ dragEnter: true });
  }

  onDragLeaveHandler() {
    this.setState({ dragEnter: false });
  }

  setRequiredValidationResult(requiredValidationResult, missingKeys) {
    this.setState({ requiredValidationResult, missingKeys });
  }

  setDuplicateValidationResult(duplicateValidationResult) {
    this.setState({ duplicateValidationResult });
  }

  switchPreview() {
    const { fields, fileName } = this.state;
    const { isImporting, switchIsImporting, touchFields, formSyncErrors } = this.props;

    touchFields();

    if (!fileName) {
      toastr.error('', 'Error! Please upload an Excel file.');
    } else if (_.isEmpty(formSyncErrors)) {
      this.setState({ fields, showPreview: !this.state.showPreview }, () => {
        if (isImporting) {
          switchIsImporting();
        }
      });
    }
  }

  addField() {
    const fields = this.state.fields;
    fields.push({});
    this.setState({ fields });
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

  selectProtocol(studyId) {
    const { protocols, showProtocolModal, change } = this.props;

    if (studyId === 'add-new-protocol') {
      change('protocol', null);
      change('indication', null);
      showProtocolModal();
    } else {
      this.setState({ currentStudy: studyId }, () => {
        const protocol = _.find(protocols, { studyId });
        change('indication', protocol.indicationId);
      });
    }
  }

  clearEmptySheet(json) {
    const validPatients = [];
    _.forEach(json, (patient) => {
      let hasValues = false;
      _.forEach(patient, (prop, propKey) => {
        if (patient[propKey]) {
          hasValues = true;
        }
      });

      if (hasValues) {
        validPatients.push(patient);
      }
    });

    return validPatients;
  }

  handleFile(e) {
    e.stopPropagation();
    e.preventDefault();
    const rABS = false;
    const scope = this;
    const files = e.target.files;
    const f = files[0];
    const name = f ? f.name : null;
    const ext = (name) ? name.split('.').pop() : null;
    const index = _.findIndex(scope.state.allowedFormats, (f) => { return f === ext; });
    const reader = new FileReader();
    reader.onload = function (e) {
      if (f.size >= 5000000) {
        toastr.error('', 'Error! File exceeds the upload limit.');
      } else if (ext && index === -1) {
        toastr.error('', 'Error! The selected file is in the wrong format.');
      } else {
        scope.setState({ fileParsing: true });
        let data = e.target.result;
        if (!rABS) data = new Uint8Array(data);
        try {
          const workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
          const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(firstWorksheet, { defval: null });
          if (json.length >= 5000) {
            scope.setState({ fileParsing: false }, () => {
              toastr.error('', 'Error! File contains too many rows.');
            });
          } else {
            const patients = scope.clearEmptySheet(json);
            scope.setState({
              fileParsing: false,
              missingKeys: [],
              duplicateValidationResult: false,
              requiredValidationResult: false,
              fileName: name,
              patients,
            }, () => {
              scope.props.setFileName(name);
              scope.props.setPatients(patients);
            });
          }
        } catch (e) {
          scope.setState({ fileParsing: false }, () => {
            toastr.error('', 'Error! The selected file is in the wrong format.');
          });
        }
      }
    };
    if (rABS) {
      reader.readAsBinaryString(f);
    } else {
      reader.readAsArrayBuffer(f);
    }
  }

  downloadExample() {
    const header = {
      header:[
        'Full Name',
        'Email',
        'Phone',
        'DOB',
        'Gender',
        'BMI',
      ],
    };
    const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([], header);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SheetJS');

    const wbout = XLSX.write(workbook, wopts);

    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF; // eslint-disable-line no-bitwise
      }
      return buf;
    };

    /* the saveAs call downloads a file on the local machine */
    FileSaver.saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'Upload_Patients_Template.xlsx');
  }

  revert(uploadId) {
    // TODO: check for 48 hours
    const { revertBulkUpload } = this.props;
    revertBulkUpload(uploadId);
  }

  render() {
    const {
      setPatients,
      handleSubmit,
      indications,
      isFetchingProtocols,
      protocols,
      sites,
      sources,
      isImporting,
      uploadHistory,
      uploadResult,
    } = this.props;
    const { showPreview, patients, requiredValidationResult, duplicateValidationResult, dragEnter, missingKeys } = this.state;
    let uploadSources = _.clone(sources);
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

    if (uploadSources.length > 0) {
      uploadSources = _.sortBy(uploadSources, (item) => {
        return (item.type === 'StudyKIK (Imported)' ? -1 : item.orderNumber);
      });
    }
    protocolOptions.unshift({ id: 'add-new-protocol', name: 'No Protocol' });
    const sourceOptions = uploadSources.map(source => ({
      label: (source.type === 'StudyKIK (Imported)' ? 'Database' : source.type), // rename StudyKIK Imported
      value: source.id,
    }));
    let disabled = false;

    if (!duplicateValidationResult || !requiredValidationResult) {
      const index = _.findIndex(missingKeys, (k) => { return k.toLowerCase() === 'phone'; });
      if (index !== -1) {
        disabled = true;
      }
    }

    return (
      <div className="upload-patients-container">
        <Form className="upload-patients-form" onSubmit={handleSubmit}>
          <div className="field-row status">
            <span className="step-one">
            1. Upload Patients List
          </span>
            <span className={`step-two ${(this.state.showPreview) ? 'active' : ''}`}>
            2. Preview & Finish
          </span>
          </div>
          {(!showPreview && !isImporting) &&
            <div className="instructions">
              <span className="head">Upload Instructions</span>
              <span className="body">
                <span className="first-row">Please upload an Excel file up to 5,000 rows and less then 5MB in size.</span>
                  Please format the first row of your colums with the proper column names
                  i.e.: "Full Name", "Email",  "Phone",  "DOB",  "Gender",  and "BMI".
                  <span className="download-template" onClick={this.downloadExample}>Download Template</span>
              </span>
              <div className="examples">
                <span className="title">* Only the Phone field is required; all other fields are optional.</span>
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
                    <td>Doe, John</td>
                    <td>johndoe@example.com</td>
                    <td>(111) 111-1111</td>
                    <td>1/1/1111</td>
                    <td>Male</td>
                    <td>18.4</td>
                  </tr>
                  <tr>
                    <td>Doe, Jane</td>
                    <td>janedoe@example.com</td>
                    <td>(555) 555-5555</td>
                    <td>5/5/5555</td>
                    <td>Female</td>
                    <td>24.5</td>
                  </tr>
                  <tr>
                    <td>Doe, Janie</td>
                    <td>janiedoe@example.com</td>
                    <td>(888) 888-8888</td>
                    <td>8/8/8888</td>
                    <td>Female</td>
                    <td>29</td>
                  </tr>
                </table>
              </div>
            </div>
          }
          {(!showPreview && !isImporting) &&
            <div
              className={classNames('drop-zone', (dragEnter ? 'drag-enter' : ''))}
            >
              <input
                type="file"
                onChange={this.handleFile}
                onDragEnter={this.onDragEnterHandler}
                onDragLeave={this.onDragLeaveHandler}
              />
              <div className="icon">
                <i className="icomoon-arrow_up_alt" />
                <span className="text">Drag and drop Excel<br /> file here</span>
              </div>
            </div>
          }
          {this.state.fileParsing && <div className="field-row main text-center"><LoadingSpinner showOnlyIcon /></div>}
          {(!this.state.showPreview && !isImporting) &&
            <div className="field-row main">
              <strong className="label required">
                <label>UPLOAD PATIENTS LIST</label></strong>
              <div className="field">
                <label htmlFor="patients_list" data-text="Browse" data-hover-text="Attach File" className="btn btn-default upload-btn" />
                <Field
                  id="patients_list"
                  name="file"
                  component={Input}
                  type="file"
                  onChange={this.handleFile}
                />
                <strong className="label filename">
                  <span className="filename" htmlFor="patients_list">{this.state.fileName ? this.state.fileName : ''}</span>
                </strong>
              </div>
            </div>
          }
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
              <strong className="label">
                <label>Indication</label>
              </strong>
              <Field
                name="indication"
                component={ReactSelect}
                className="field"
                placeholder="Select Indication"
                options={indicationOptions}
                disabled
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
                placeholder="Select Source"
                className="field"selectedSourceValue
                options={sourceOptions}
              />
            </div>
          }
          {(showPreview && !isImporting) &&
            <UploadPatientsPreviewForm
              setDuplicateValidationResult={this.setDuplicateValidationResult}
              setRequiredValidationResult={this.setRequiredValidationResult}
              setPatients={setPatients}
              patients={patients}
            />
          }
          {isImporting &&
            <div className="import-progress">
              <div className="control">
                <ProgressBar bsStyle="success" now={this.props.uploadProgress} />
                {uploadResult === null &&
                  <span className="title">Import of <b>{this.state.fileName}</b> {(uploadResult !== null) ? 'finished' : 'in progress'}.</span>
                }
                {uploadResult !== null &&
                  <span className="upload-result">
                    {`${uploadResult.imported} patients added and ${uploadResult.skipped} skipped.`}
                  </span>
                }
              </div>
            </div>
          }
          <div className="text-right">
            {(!showPreview && !isImporting) && <Button type="button" className="no-margin-right" onClick={this.switchPreview}>Next</Button>}
            {(showPreview && !isImporting) && <input type="button" value="back" className="btn btn-gray-outline margin-right" onClick={this.switchPreview} />}
            {(showPreview && !isImporting) && <Button type="submit" disabled={disabled}>Submit</Button>}
          </div>
        </Form>
        {(!showPreview && !isImporting) &&
          <UploadHistoryList
            revertProgress={this.props.revertProgress}
            uploadHistory={uploadHistory}
            revert={this.revert}
          />
        }
      </div>
    );
  }
}
