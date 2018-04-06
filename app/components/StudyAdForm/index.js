/**
*
* StudyAdForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import ReactAvatarEditor from 'react-avatar-editor';
import classNames from 'classnames';
import { toastr } from 'react-redux-toastr';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingSpinner from '../../components/LoadingSpinner';
import FileUpload from './FileUpload';

import './styles.less';

@reduxForm(
  {
    form: 'studyAdForm',
    validate: null,
  })
class StudyAdForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    error: React.PropTypes.object,
    changeStudyAdProcess: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    pristine: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    removeStudyAd: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      borderRadius: 0,
      preview: null,
      selectedImage: null,
      selectedImageWidth: null,
      selectedImageHeight: null,
      isDragOver: false,
      usingDefaultImage: false,
      pdfFile: null,
      pdfPreview: null,
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleScale = this.handleScale.bind(this);
    this.handleBorderRadius = this.handleBorderRadius.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.onDragEnterHandler = this.onDragEnterHandler.bind(this);
    this.onDragLeaveHandler = this.onDragLeaveHandler.bind(this);
    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.redraw = this.redraw.bind(this);
    this.handleCropLoad = this.handleCropLoad.bind(this);
    this.showPdfPreview = this.showPdfPreview.bind(this);
    this.clearPreview = this.clearPreview.bind(this);
  }

  componentDidMount() {
    this.redraw();
  }

  onDragEnterHandler() {
    this.setState({ isDragOver: true });
  }

  onDragLeaveHandler() {
    this.setState({ isDragOver: false });
  }

  handleCropLoad(e) {
    const { selectedImageWidth, selectedImageHeight } = this.state;
    const rootElement = this.rootElement;
    const ctx = rootElement.getContext('2d');
    ctx.drawImage(e.target, 0, 0, selectedImageWidth, selectedImageHeight);
    this.props.handleSubmit(rootElement);
  }

  redraw() {
    const img = new Image();
    img.src = this.state.preview;
    img.onload = this.handleCropLoad;
  }

  handleLoadSuccess() {
    if (this.state.usingDefaultImage === true) {
      this.handleSave();
      this.setState({ usingDefaultImage: false });
    }
  }

  handleSave(ev) {
    ev.preventDefault();
    if (this.state.selectedImage) {
      const avatar = this.avatar;
      const img = avatar.getImage().toDataURL();
      const rect = avatar.getCroppingRect();
      this.setState({ preview: img, croppingRect: rect }, () => {
        this.redraw();
      });
    }
    if (this.state.pdfFile) {
      this.props.handleSubmit(this.state.pdfFile);
    }
  }

  handleScale() {
    const scale = this.scale;
    const scaleValue = parseFloat(scale.value);
    this.setState({ scale: scaleValue });
  }

  handleBorderRadius() {
    const borderRadius = this.borderRadius;
    const borderRadiusValue = parseInt(borderRadius.value);
    this.setState({ borderRadius: borderRadiusValue });
  }

  handleFileChange(img, width, height) {
    if (width > 2000 || height > 2000) {
      toastr.error('', 'Error! The image size is too large. The maximum supported size is 2000x2000 pixels.');
    }
    this.setState({
      selectedImage: img,
      selectedImageWidth: width,
      selectedImageHeight: height,
      manualDisable: width > 2000 || height > 2000,
    });
  }

  logCallback(e) {
    if (e) {
      console.trace('callback', e);
    }
  }

  clearPreview() {
    this.setState({
      selectedImage: null,
      selectedImageWidth: null,
      selectedImageHeight: null,
      pdfFile: null,
      pdfPreview: null,
    });
  }

  showPdfPreview(file, img) {
    this.setState({
      pdfFile: file,
      pdfPreview: img,
      manualDisable: false,
    });
  }

  render() {
    let width;
    let height;
    const { changeStudyAdProcess } = this.props;
    const { manualDisable } = this.state;
    if (this.state.selectedImageWidth) {
      // calculate the ratio
      // choose whichever is higher for the nominator so that the picture will fit
      if (this.state.selectedImageHeight > this.state.selectedImageWidth) {
        const ratio = this.state.selectedImageWidth / this.state.selectedImageHeight;
        width = 350 * ratio;
        height = 350;
      } else {
        const ratio = this.state.selectedImageHeight / this.state.selectedImageWidth;
        width = 350;
        height = 350 * ratio;
      }
    } else {
      width = 350;
      height = 350;
    }

    const submitButtonText = (changeStudyAdProcess.saving) ? <LoadingSpinner showOnlyIcon size={20} /> : 'update';

    return (
      <form className="form-lightbox" onSubmit={this.handleSave}>
        <div className="drag-drop-uploader">
          <div className={classNames('avatar-editor', { hidden: !this.state.selectedImage })}>
            <ReactAvatarEditor
              ref={(avatar) => {
                this.avatar = avatar;
              }}
              width={width}
              height={height}
              scale={parseFloat(this.state.scale)}
              borderRadius={this.state.borderRadius}
              onSave={this.handleSave}
              onLoadFailure={this.logCallback}
              onLoadSuccess={this.handleLoadSuccess}
              onImageReady={this.logCallback}
              onImageLoad={this.logCallback}
              onDropFile={this.logCallback}
              image={this.state.selectedImage}
            />
            <br />
            Zoom:
            <input
              name="scale"
              type="range"
              ref={(scale) => {
                this.scale = scale;
              }}
              onChange={this.handleScale}
              min="1"
              max="5"
              step="0.01"
              defaultValue="1"
            />
          </div>
          <div className={classNames('avatar-photo', { hidden: (this.state.selectedImage || this.state.pdfPreview) }, { dragover: this.state.isDragOver })}>
            <FileUpload id="avatar_file" showPdfPreview={this.showPdfPreview} clearPreview={this.clearPreview} handleFileChange={this.handleFileChange} handleDragEnter={this.onDragEnterHandler} handleDragLeave={this.onDragLeaveHandler} />
            <div className="info">
              <i className="icomoon-arrow_up_alt" />
              <span className="text">Drag and drop <br /> image here</span>
            </div>
          </div>

          {this.state.croppingRect ? // display only if there is a cropping rect
            <canvas
              ref={(rootElement) => {
                this.rootElement = rootElement;
              }}
              style={{ margin: '10px 24px 32px', padding: 5, border: '1px solid #CCC', display: 'none' }}
              width={this.state.selectedImageWidth}
              height={this.state.selectedImageHeight}
            />
            :
            null
          }

          {this.state.pdfPreview ?
            <div className="pdf-preview">
              <iframe src={`${this.state.pdfPreview}#zoom=scale&scrollbar=1&toolbar=0&view=Fit`} id="viewer" frameBorder="0" scrolling="no" width="100%" height="500"></iframe>
            </div>
            :
            null
          }
          <div className="field-row">
            <strong className="label required"><label htmlFor="clinicaltrialGovLink">Upload Image</label></strong>
            <div className="field">
              <label htmlFor="avatar_file" data-text="Browse" data-hover-text="Browse" className="btn btn-gray upload-btn" />
            </div>
          </div>
          <div className="field-row">
            <a className="link" onClick={this.props.removeStudyAd}>Remove Image</a>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className={manualDisable ? 'btn btn-gray' : 'btn btn-default'}
              disabled={manualDisable || changeStudyAdProcess.saving}
            >
              {submitButtonText}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, null)(StudyAdForm);
