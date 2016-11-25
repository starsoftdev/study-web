/**
*
* ProfileImageForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import ReactAvatarEditor from 'react-avatar-editor';
import Input from 'components/Input';
import FileUpload from './FileUpload';
import './styles.less';

@reduxForm(
  {
    form: 'change_password',
    fields: ['old_password', 'new_password', 'new_password_confirm', 'user_id'],
    // validate: changePasswordFormValidator,
  })
class ProfileImageForm extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    error: React.PropTypes.object,
    handleSubmit: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
    pristine: React.PropTypes.bool.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      borderRadius: 0,
      preview: null,
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleScale = this.handleScale.bind(this);
    this.handleBorderRadius = this.handleBorderRadius.bind(this);
  }

  handleSave() {
    const avatar = this.avatar;
    const img = avatar.getImage().toDataURL();
    const rect = avatar.getCroppingRect();
    this.setState({ preview: img, croppingRect: rect });
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

  logCallback(e) {
    console.log('callback', e);
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props; // eslint-disable-line

    return (
      <form onSubmit={handleSubmit} className="form-lightbox">
        <div className="drag-drop-uploader">
          <div className="avatar-photo">
            <FileUpload handleFileChange={this.handleFileChange} />
            <div className="info">
              <i className="icomoon-arrow_up_alt"></i>
              <span className="text">Drag and drop <br /> image here</span>
            </div>
          </div>
        </div>
        <ReactAvatarEditor
          ref={(avatar) => {
            this.avatar = avatar;
          }}
          scale={parseFloat(this.state.scale)}
          borderRadius={this.state.borderRadius}
          onSave={this.handleSave}
          onLoadFailure={this.logCallback}
          onLoadSuccess={this.logCallback}
          onImageReady={this.logCallback}
          onImageLoad={this.logCallback}
          onDropFile={this.logCallback}
          image="example/avatar.jpg"
          style={{ border: 'dashed 2px #ccc' }}
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
          max="2"
          step="0.01"
          defaultValue="1"
        />
        <br />
        <br />
        <input type="button" onClick={this.handleSave} value="Preview" />
        <br />
        <img
          src={this.state.preview}
          style={{ borderRadius: this.state.borderRadius + 5 }}
          alt=""
        />


      </form>
    );
  }
}

export default ProfileImageForm;
