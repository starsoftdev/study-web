import React, { Component, PropTypes } from 'react';

export default class FileUpload extends Component {
  static propTypes = {
    handleFileChange: PropTypes.func,
    id: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleFile = this.handleFile.bind(this);
    this.onFileLoad = this.onFileLoad.bind(this);
  }

  onFileLoad(img) {
    const inFile = this.inFile;
    inFile.value = '';
    this.props.handleFileChange(img.target.result);
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (!file) return;

    reader.onload = this.onFileLoad;
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <input
        id={this.props.id}
        ref={(inFile) => {
          this.inFile = inFile;
        }}
        type="file"
        accept="image/*"
        onChange={this.handleFile}
      />
    );
  }
}
