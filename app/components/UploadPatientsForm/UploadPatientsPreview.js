/**
 *
 * UploadPatientsPreviewForm
 *
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';

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
    this.clearInvalidKeys(patients);
    this.validateDuplicateKeys(patients);
    this.validateRequiredKeys(patients);
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
    } else {
      setDuplicateValidationResult(true);
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
      this.setState({ missingColumnNames, missingKeys });
    } else {
      setRequiredValidationResult(true);
    }
  }

  renderExampleTable() {
    const { patients } = this.props;
    const { missingKeys } = this.state;
    const firstPatientKeys = _.keys(patients[0]);

    return (
      <table className="example-table">
        <tbody>
          <tr key={_.uniqueId()}>
            {
              firstPatientKeys.map((key) => {
                const index = _.findIndex(missingKeys, (k) => { return k.toLowerCase() === key.toLowerCase(); });
                if (index === -1) {
                  return (
                    <th key={_.uniqueId()}>{key}</th>
                  );
                } else {
                  return null;
                }
              })
            }
          </tr>
          {
            patients.map((patient, patientIndex) => {
              const patientProps = _.map(patient);
              if (patientIndex <= 2) {
                return (
                  <tr key={_.uniqueId()}>
                    {
                      patientProps.map((value, propIndex) => {
                        let className = '';

                        if (propIndex === 3) {
                          className = 'dob';
                        }

                        if (propIndex === 5) {
                          className = 'bmi';
                        }
                        return (
                          <td className={className} key={_.uniqueId()}>{value}</td>
                        );
                      })
                    }
                  </tr>
                );
              } else {
                return null;
              }
            })
          }
        </tbody>
      </table>
    );
  }

  renderErrorMessages(missingColumnNames) {
    return (
      <div className="error-messages">
        <ul>
          {
            missingColumnNames.map((message, index) => {
              return (
                <li key={index}>{message}</li>
              );
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
        {(missingColumnNames.length > 0 || duplicatedColumnNames.length > 0) && this.renderErrorMessages(errorMessages)}
        <div className="title">
          <span className="head">Preview Upload Data</span>
          <span className="body">
                Please validate the data based on the firs 3 rows of the upload file.
              </span>
        </div>
        {this.renderExampleTable()}
      </div>
    );
  }
}

export default UploadPatientsPreviewForm;
