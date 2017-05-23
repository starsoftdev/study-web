import React, { Component, PropTypes } from 'react';

export default class FileUpload extends Component {
  static propTypes = {
    id: PropTypes.string,
    handleFileChange: PropTypes.func,
    handleDragEnter: PropTypes.func,
    handleDragLeave: PropTypes.func,
    showPdfPreview: PropTypes.func,
    clearPreview: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);
    this.onDragEnterHandler = this.onDragEnterHandler.bind(this);
    this.onDragLeaveHandler = this.onDragLeaveHandler.bind(this);
  }

  onDragEnterHandler() {
    this.props.handleDragEnter();
  }

  onDragLeaveHandler() {
    this.props.handleDragLeave();
  }

  onFileLoad(img) {
    const inFile = this.inFile;
    inFile.value = '';
    // get file reader for the image
    const image = new Image();
    image.src = img.target.result;
    image.onload = () => {
      // access image src, width, and height
      this.props.handleFileChange(image.src, image.width, image.height);
    };
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    this.props.clearPreview();

    if (!file || (file.type.indexOf('image/') === -1 && file.type.indexOf('application/') === -1)) return;

    if (file.type.indexOf('application/') !== -1) {
      const url = URL.createObjectURL(file);
      this.props.showPdfPreview(file, url);
    } else {
      reader.onload = this.onFileLoad;
      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <input
        id={this.props.id}
        ref={(inFile) => {
          this.inFile = inFile;
        }}
        type="file"
        accept="image/*,application/pdf"
        onChange={this.handleFile}
        onDragEnter={this.onDragEnterHandler}
        onDragLeave={this.onDragLeaveHandler}
      />
    );
  }
}
