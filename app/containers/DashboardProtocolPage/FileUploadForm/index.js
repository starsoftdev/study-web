import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { createStructuredSelector } from 'reselect';
import { reduxForm } from 'redux-form';
import formValidator from './validator';
import LoadingSpinner from '../../../components/LoadingSpinner';

@reduxForm({ form: 'protocolFileUploadForm', validate: formValidator })

export class FileUploadForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    initialValues: PropTypes.object,
    handleSubmit: PropTypes.func,
    uploading: PropTypes.bool,
  }

  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
  }

  handleFile(e) {
    const { initialValues } = this.props;
    const file = e.target.files[0];

    if (!file || file.type.indexOf('application/pdf') === -1) {
      toastr.error('', 'Error! Invalid file type. PDF only.');
      this.inFile.value = null;
      return;
    }

    initialValues.file = file;
  }

  render() {
    return (
      <form action="#" className="form-lightbox dashboard-lightbox" onSubmit={this.props.handleSubmit}>

        <div className="field-row">
          <input
            name="file"
            ref={(inFile) => {
              this.inFile = inFile;
            }}
            type="file"
            accept="application/pdf"
            onChange={this.handleFile}
            onDragEnter={this.onDragEnterHandler}
            onDragLeave={this.onDragLeaveHandler}
          />
        </div>

        <div className="field-row text-right no-margins">
          <button type="submit" className="btn btn-primary">
            {this.props.uploading
              ? <span><LoadingSpinner showOnlyIcon size={20} className="saving-user" /></span>
              : <span>Submit</span>
            }
          </button>
        </div>

      </form>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileUploadForm);
