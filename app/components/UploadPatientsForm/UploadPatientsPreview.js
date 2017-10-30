/**
 *
 * UploadPatientsPreviewForm
 *
 */

import React, { PropTypes } from 'react';

class UploadPatientsPreviewForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    renderExampleTable: PropTypes.func,
    patients: React.PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.renderExampleTable = this.renderExampleTable.bind(this);
  }

  renderExampleTable() {
    const { patients } = this.props;
    console.log('renderExampleTable', patients);
  }

  render() {
    const { renderExampleTable } = this.props;
    return (
      <div className="preview">
        <div className="title">
          <span className="head">Preview Upload Data</span>
          <span className="body">
                Please validate the data based on the firs 3 rows of the upload file.
              </span>
        </div>
        {renderExampleTable()}
        {this.renderExampleTable()}
      </div>
    );
  }
}

export default UploadPatientsPreviewForm;
