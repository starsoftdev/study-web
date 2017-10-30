/**
 *
 * UploadPatientsPreviewForm
 *
 */

import React, { PropTypes } from 'react';

class UploadPatientsPreviewForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    patients: React.PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.renderExampleTable = this.renderExampleTable.bind(this);
  }

  renderExampleTable() {
    const { patients } = this.props;
    // console.log('renderExampleTable', patients);

    return (
      <table className="example-table">
        {
          patients.map((patient, patientIndex) => {
            if (patientIndex <= 3) {
              return (
                <tr>
                  {
                    patient.map((prop, propIndex) => {
                      if (patientIndex === 0) {
                        return (
                          <th>{prop}</th>
                        );
                      } else {
                        let className = '';

                        if (propIndex === 3) {
                          className = 'dob';
                        }

                        if (propIndex === 5) {
                          className = 'bmi';
                        }
                        return (
                          <td className={className}>{prop}</td>
                        );
                      }
                    })
                  }
                </tr>
              );
            } else {
              return null;
            }
          })
        }
      </table>
    );
  }

  render() {
    return (
      <div className="preview">
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
