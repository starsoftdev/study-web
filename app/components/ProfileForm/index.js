/**
*
* ProfileForm
*
*/

import 'blueimp-canvas-to-blob';
import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { Modal } from 'react-bootstrap';
import Input from '../../components/Input';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import ProfileImageForm from '../../components/ProfileImageForm';
import defaultImage from '../../assets/images/Default-User-Img-Dr-Full.png';
import CenteredModal from '../../components/CenteredModal/index';
import { formatTimezone } from '../../utils/time';
import FormGeosuggest from '../../components/Input/Geosuggest';

@reduxForm({ form: 'profile' })
class ProfileForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: React.PropTypes.object,
    userRoleType: React.PropTypes.string,
    changePassword: React.PropTypes.func,
    changeImage: React.PropTypes.func,
    changePasswordResult: React.PropTypes.object,
    me: React.PropTypes.bool,
    formValues: React.PropTypes.object,
    changeUsersTimezone: React.PropTypes.func,
    getTimezone: React.PropTypes.func,
    timezone: React.PropTypes.string,
    handleSubmit: React.PropTypes.func,
    dispatch: React.PropTypes.func,
    initialValues: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.openResetPasswordModal = this.openResetPasswordModal.bind(this);
    this.closeResetPasswordModal = this.closeResetPasswordModal.bind(this);
    this.openProfileImageModal = this.openProfileImageModal.bind(this);
    this.closeProfileImageModal = this.closeProfileImageModal.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.onSuggestSelect = this.onSuggestSelect.bind(this);

    this.state = {
      passwordResetModalOpen: false,
      profileImageModalOpen: false,
    };
  }

  componentWillReceiveProps(newProps) {
    const { timezone, dispatch } = this.props;

    if (!newProps.changePasswordResult.passwordChanging && this.props.changePasswordResult.passwordChanging) {
      this.closeResetPasswordModal();
    }
    if (newProps.timezone && newProps.timezone !== timezone) {
      dispatch(change('profile', 'timezone', formatTimezone(newProps.timezone)));
    }
  }

  onSuggestSelect(e) {
    const { getTimezone, dispatch } = this.props;
    if (e.location) {
      getTimezone(e.location.lat, e.location.lng);
    }
    dispatch(change('profile', 'address', e.label));
  }

  openResetPasswordModal() {
    this.setState({ passwordResetModalOpen: true });
  }

  closeResetPasswordModal() {
    this.setState({ passwordResetModalOpen: false });
  }

  openProfileImageModal() {
    this.setState({ profileImageModalOpen: true });
  }

  closeProfileImageModal() {
    this.setState({ profileImageModalOpen: false });
  }

  uploadImage(e) {
    e.toBlob((blob) => {
      this.props.changeImage({ file: blob, user_id: this.props.currentUser.id });
      this.closeProfileImageModal();
    });
  }

  render() {
    const { me, userRoleType, currentUser } = this.props;
    const initialValues = {
      initialValues: {
        user_id: currentUser.id,
      },
    };

    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="field-row label-top file-img active">
          <strong className="label"><label htmlFor="profile-img">PROFILE IMAGE</label></strong>
          <div className="field">
            <div className="profile-image">
              <label htmlFor="profile-img" className="image">
                <span>
                  <img src={currentUser.profileImageURL || defaultImage} alt="" /><br />
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="field-row">
          <strong className="label" />
          <div className="field">
            <a className="btn btn-gray upload-btn" onClick={this.openProfileImageModal}>Update Profile Image</a>
          </div>
        </div>

        <div className="field-row">
          <strong className="label"><label>NAME</label></strong>
          <div className="field">
            <div className="row">
              <Field
                name="firstName"
                component={Input}
                type="text"
                className="col pull-left"
                isDisabled
              />
              <Field
                name="lastName"
                component={Input}
                type="text"
                placeholder="Last Name"
                className="col pull-right"
                isDisabled
              />
            </div>
          </div>
        </div>

        <div className="field-row fs-hide">
          <strong className="label"><label>Email</label></strong>
          <Field
            name="email"
            component={Input}
            disabled="true"
            type="text"
            placeholder="Email"
            className="field"
            isDisabled
          />
        </div>
        <div className="field-row fs-hide">
          <strong className="label"><label>Address</label></strong>
          <div className="field">
            <Field
              name="address"
              component={FormGeosuggest}
              refObj={(el) => { this.geoSuggest = el; }}
              onSuggestSelect={this.onSuggestSelect}
              initialValue={(this.props.initialValues.address || '')}
              placeholder=""
            />
          </div>
        </div>
        {
          !(userRoleType === 'dashboard' || (currentUser.roleForClient && currentUser.roleForClient.site_id != null)) &&
          <div className="field-row">
            <strong className="label required"><label>Time Zone</label></strong>
            <div className="field">
              <Field
                name="timezone"
                placeholder="Timezone"
                component={Input}
                type="text"
                isDisabled
              />
            </div>
          </div>
        }
        <div className="field-row">
          <strong className="label"><label>PASSWORD</label></strong>
          <a className="btn btn-primary" onClick={this.openResetPasswordModal} disabled={!me}>EDIT</a>
        </div>
        <div className="btn-block text-right">
          <button type="submit" className="btn btn-default btn-add-row">
            <span>Update</span>
          </button>
        </div>
        <Modal
          className="profile-page-modal"
          dialogComponentClass={CenteredModal}
          show={this.state.passwordResetModalOpen}
          onHide={this.closeResetPasswordModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>CHANGE PASSWORD</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeResetPasswordModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <ChangePasswordForm {...initialValues} onSubmit={this.props.changePassword} />
          </Modal.Body>
        </Modal>
        <Modal
          className="profile-page-modal avatar-modal"
          dialogComponentClass={CenteredModal}
          show={this.state.profileImageModalOpen}
          onHide={this.closeProfileImageModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>UPDATE PROFILE IMAGE</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeProfileImageModal}>
              <i className="icomoon-icon_close" />
            </a>
          </Modal.Header>
          <Modal.Body>
            <ProfileImageForm {...initialValues} handleSubmit={this.uploadImage} />
          </Modal.Body>
        </Modal>

      </form>
    );
  }
}

export default ProfileForm;
