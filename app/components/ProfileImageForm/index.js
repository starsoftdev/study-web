/**
*
* ProfileImageForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import ReactAvatarEditor from 'react-avatar-editor';
// import Input from '../../components/Input';
import classNames from 'classnames';
import FileUpload from './FileUpload';
import defaultMaleImage from '../../assets/images/Default-User-Img-Dr-Full.png';
import defaultFemaleImage from '../../assets/images/Default-User-Img-Dr-Girl.png';
import { translate } from '../../../common/utilities/localization';

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
      selectedImage: null,
      isDragOver: false,
      usingDefaultImage: false,
    };

    this.handleSave = this.handleSave.bind(this);
    this.handleScale = this.handleScale.bind(this);
    this.handleBorderRadius = this.handleBorderRadius.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.useDefaultMaleImage = this.useDefaultMaleImage.bind(this);
    this.useDefaultFemaleImage = this.useDefaultFemaleImage.bind(this);
    this.onDragEnterHandler = this.onDragEnterHandler.bind(this);
    this.onDragLeaveHandler = this.onDragLeaveHandler.bind(this);
    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.redraw = this.redraw.bind(this);
    this.handleCropLoad = this.handleCropLoad.bind(this);
  }

  componentDidMount() {
    this.redraw();
  }

  componentDidUpdate() {
    this.redraw();
  }

  onDragEnterHandler() {
    this.setState({ isDragOver: true });
  }

  onDragLeaveHandler() {
    this.setState({ isDragOver: false });
  }

  handleCropLoad(e) {
    const rootElement = this.rootElement;
    const ctx = rootElement.getContext('2d');
    ctx.drawImage(e.target, 0, 0, 400, 400);
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

  handleSave() {
    if (this.state.selectedImage) {
      const avatar = this.avatar;
      const img = avatar.getImage().toDataURL();
      const rect = avatar.getCroppingRect();
      this.setState({ preview: img, croppingRect: rect });
      // this.props.handleSubmit(avatar.getImage());
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

  handleFileChange(img) {
    this.setState({ selectedImage: img });
  }

  useDefaultMaleImage() {
    this.setState({ selectedImage: defaultMaleImage, usingDefaultImage: true });
  }

  useDefaultFemaleImage() {
    this.setState({ selectedImage: defaultFemaleImage, usingDefaultImage: true });
  }

  logCallback(e) {
    console.log('callback', e);
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props; // eslint-disable-line
    return (
      <form className="form-lightbox">
        <div className="drag-drop-uploader">
          <div className={classNames('avatar-editor', { hidden: !this.state.selectedImage })}>
            <ReactAvatarEditor
              ref={(avatar) => {
                this.avatar = avatar;
              }}
              width={350}
              height={350}
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
          <div className={classNames('avatar-photo', { hidden: this.state.selectedImage }, { dragover: this.state.isDragOver })}>
            <FileUpload id="avatar_file" handleFileChange={this.handleFileChange} handleDragEnter={this.onDragEnterHandler} handleDragLeave={this.onDragLeaveHandler} />
            <div className="info">
              <i className="icomoon-arrow_up_alt" />
              <span className="text" dangerouslySetInnerHTML={{ __html: translate('corporate.page.profile.profileImageForm.dragAndDrop') }} />
            </div>
          </div>

          {this.state.croppingRect ? // display only if there is a cropping rect
            <canvas
              ref={(rootElement) => {
                this.rootElement = rootElement;
              }}
              style={{ margin: '10px 24px 32px', padding: 5, border: '1px solid #CCC', display: 'none' }}
              width={400}
              height={400}
            />
            :
            null
          }
          <div className="field-row">
            <strong className="label required"><label htmlFor="clinicaltrialGovLink">{translate('corporate.page.profile.profileImageForm.labelUploadImage')}</label></strong>
            <div className="field">
              <label htmlFor="avatar_file" data-text="Browse" data-hover-text={translate('corporate.page.profile.profileImageForm.browseValue')} className="btn btn-gray upload-btn" />
            </div>
          </div>
          <div className="field-row">
            <a className="link" onClick={this.useDefaultMaleImage}>{translate('corporate.page.profile.profileImageForm.defaultMale')}</a>
          </div>
          <div className="field-row">
            <a className="link" onClick={this.useDefaultFemaleImage}>{translate('corporate.page.profile.profileImageForm.defaultFemale')}</a>
          </div>
          <div className="text-right">
            <input type="button" className="btn btn-default" onClick={this.handleSave} value={translate('corporate.page.profile.profileImageForm.buttonValue')} />
          </div>
        </div>
      </form>
    );
  }
}

export default ProfileImageForm;
