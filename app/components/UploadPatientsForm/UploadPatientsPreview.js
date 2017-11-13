/**
 *
 * UploadPatientsPreviewForm
 *
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import classNames from 'classnames';

class UploadPatientsPreviewForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    patients: PropTypes.array,
    setDuplicateValidationResult: PropTypes.func,
    setRequiredValidationResult: PropTypes.func,
    setPatients: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      missingColumnNames: [],
      duplicatedColumnNames: [],
      missingKeys: [],
      validKeys: [
        'Full Name',
        'Email',
        'Phone',
        'DOB',
        'Gender',
        'BMI',
      ],
    };

    this.renderExampleTable = this.renderExampleTable.bind(this);
    this.clearInvalidKeys = this.clearInvalidKeys.bind(this);
    this.validateRequiredKeys = this.validateRequiredKeys.bind(this);
    this.validateDuplicateKeys = this.validateDuplicateKeys.bind(this);
  }

  componentWillMount() {
    const { patients } = this.props;
    const firstPatients = _.slice(patients, 0, 3);
    this.clearInvalidKeys(patients);
    this.validateDuplicateKeys(firstPatients);
    this.validateRequiredKeys(firstPatients);
  }

  clearInvalidKeys(patients) {
    const { setPatients } = this.props;
    const { validKeys } = this.state;
    const clonePatients = _.clone(patients);
    _.forEach(clonePatients, (patient, patientKey) => {
      _.forEach(patient, (prop, propKey) => {
        const index = _.findIndex(validKeys, (k) => { return k.toLowerCase() === propKey.toLowerCase(); });

        if (index === -1) {
          delete clonePatients[patientKey][propKey];
        }
      });
    });

    setPatients(clonePatients);
  }

  validateDuplicateKeys(patients) {
    const { setDuplicateValidationResult } = this.props;
    const { validKeys } = this.state;
    const duplicatedColumnNames = [];
    const firstPatientKeys = _.keys(patients[0]);

    const getAllIndexes = (arr, val) => {
      const indexes = [];
      let i;
      for (i = 0; i < arr.length; i++) {
        if (arr[i].toLowerCase() === val) {
          indexes.push(i);
        }
      }
      return indexes;
    };

    _.forEach(validKeys, (key) => {
      const indexes = getAllIndexes(firstPatientKeys, key.toLowerCase());
      const duplicatedKeys = [];

      if (indexes.length >= 2) {
        _.forEach(indexes, (index) => {
          duplicatedKeys.push(firstPatientKeys[index]);
        });
        duplicatedColumnNames.push(`"${_.join(duplicatedKeys, '" and "')}" column names are duplicated.`);
      }
    });

    if (duplicatedColumnNames.length) {
      this.setState({ duplicatedColumnNames });
      setDuplicateValidationResult(false);
    }
  }

  validateRequiredKeys(patients) {
    const { setRequiredValidationResult } = this.props;
    const { validKeys } = this.state;
    const missingColumnNames = [];
    const missingKeys = [];
    const firstPatientKeys = _.keys(patients[0]);

    _.forEach(validKeys, (key) => {
      const index = _.findIndex(firstPatientKeys, (k) => { return k.toLowerCase() === key.toLowerCase(); });

      if (index === -1) {
        missingColumnNames.push(`"${key}" column name is missing.`);
        missingKeys.push(key);
      }
    });

    if (missingColumnNames.length) {
      this.setState({ missingColumnNames, missingKeys }, () => {
        setRequiredValidationResult(false, missingKeys);
      });
    }
  }

  renderExampleTable() {
    const { patients } = this.props;
    const { missingKeys } = this.state;
    const firstPatients = _.slice(patients, 0, 3);
    const firstPatientKeys = _.keys(patients[0]);

    if (missingKeys.length > 0) {
      _.forEach(missingKeys, (key) => {
        firstPatientKeys.push(key);
      });
    }

    return (
      <table className="example-table">
        <tbody>
          <tr key={_.uniqueId()}>
            {
              firstPatientKeys.map((key) => {
                return (
                  <th key={_.uniqueId()}>{key}</th>
                );
              })
            }
          </tr>
          {
            firstPatients.map((patient) => {
              const patientProps = _.map(patient);
              if (missingKeys.length > 0) {
                _.forEach(missingKeys, () => {
                  patientProps.push('');
                });
              }
              return (
                <tr key={_.uniqueId()}>
                  {
                    patientProps.map((value) => {
                      return (
                        <td key={_.uniqueId()}>{value}</td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }

  renderValidationMessages(missingColumnNames) {
    const { missingKeys } = this.state;
    let requiredError = false;
    let requiredIndex = null;

    _.forEach(missingKeys, (key, index) => {
      if (key.toLowerCase() === 'phone') {
        requiredError = true;
        requiredIndex = index;
      }
    });

    return (
      <div
        className={classNames('validation-messages', (requiredError ? 'error' : 'warning'))}
      >
        {!requiredError &&
          <span className={classNames('heading', (requiredError ? 'error' : 'warning'))}>
            Missing column names (not required). You can still continue with uploading the file.
          </span>
        }
        <ul>
          {
            missingColumnNames.map((message, index) => {
              if (requiredIndex === null || requiredIndex === index) {
                return (
                  <li
                    className={classNames((missingKeys[index] === 'Phone' ? 'error' : ''))}
                    key={index}
                  >
                    {(!requiredError) ? message : `${message} This is a required field.`}
                  </li>
                );
              } else {
                return null;
              }
            })
          }
        </ul>
      </div>
    );
  }

  render() {
    const { missingColumnNames, duplicatedColumnNames } = this.state;
    const errorMessages = _.union(missingColumnNames, duplicatedColumnNames);

    return (
      <div className="preview">
        {(missingColumnNames.length > 0 || duplicatedColumnNames.length > 0) && this.renderValidationMessages(errorMessages)}
        <div className="title">
          <span className="head">Preview Upload Data</span>
          <span className="body">
            Please confirm that the information below is correct.
          </span>
        </div>
        {this.renderExampleTable()}
        <span className="tip">The example above are a representation of your upload.</span>
      </div>
    );
  }
}

export default UploadPatientsPreviewForm;
