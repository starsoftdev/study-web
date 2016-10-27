/**
*
* ProfileForm
*
*/

import React from 'react';
import { Field, reduxForm } from 'redux-form'; // eslint-disable-line
import { Modal } from 'react-bootstrap';
import Input from 'components/Input';
import ChangePasswordForm from 'components/ChangePasswordForm';
import defaultImage from 'assets/images/Default-User-Img.png';
import './styles.less';

@reduxForm({ form: 'profile' })
class ProfileForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: React.PropTypes.object,
    changePassword: React.PropTypes.func,
    changeImage: React.PropTypes.func,
    changePasswordResult: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.openResetPasswordModal = this.openResetPasswordModal.bind(this);
    this.closeResetPasswordModal = this.closeResetPasswordModal.bind(this);
    this.uploadFile = this.uploadFile.bind(this);

    this.state = {
      passwordResetModalOpen: false,
    };
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.changePasswordResult.passwordChanging && this.props.changePasswordResult.passwordChanging) {
      this.closeResetPasswordModal();
    }
  }

  openResetPasswordModal() {
    this.setState({ passwordResetModalOpen: true });
  }

  closeResetPasswordModal() {
    this.setState({ passwordResetModalOpen: false });
  }

  uploadFile(e) {
    if (e.target.files[0]) {
      this.props.changeImage({ file: e.target.files[0], user_id: this.props.currentUser.id });
    }
  }

  render() {
    const initialValues = {
      initialValues: {
        user_id: this.props.currentUser.id,
      },
    };
    return (
      <form className="form-study">


        <div className="field-row label-top file-img active">
          <strong className="label"><label htmlFor="profile-img">PROFILE IMAGE</label></strong>
          <div className="field">
            <div className="profile-image">
              <label htmlFor="profile-img" className="image">
                <span>
                  <img src={this.props.currentUser.profileImageURL || defaultImage} alt="" /><br />
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="field-row">
          <strong className="label"></strong>
          <div className="field">
            <label htmlFor="image_file" className="btn btn-grey" >UPDATE PROFILE IMAGE</label>
            <input type="file" id="image_file" onChange={this.uploadFile} />
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
                isDisabled="true"
              />
              <Field
                name="lastName"
                component={Input}
                type="text"
                placeholder="Last Name"
                className="col pull-right"
                isDisabled="true"
              />
            </div>
          </div>
        </div>

        <div className="field-row">
          <strong className="label"><label>Email</label></strong>
          <Field
            name="email"
            component={Input}
            disabled="true"
            type="text"
            placeholder="Email"
            className="field"
            isDisabled="true"
          />
        </div>

        <div className="field-row">
          <strong className="label"><label>PASSWORD</label></strong>
          <a className="btn btn-primary lightbox-opener" onClick={this.openResetPasswordModal}>EDIT</a>
        </div>


        <Modal className="custom-modal" show={this.state.passwordResetModalOpen} onHide={this.closeResetPasswordModal}>
          <Modal.Header>
            <Modal.Title>CHANGE PASSWORD</Modal.Title>
            <a className="lightbox-close close" onClick={this.closeResetPasswordModal}>
              <i className="icomoon-icon_close"></i>
            </a>
          </Modal.Header>
          <Modal.Body>
            <ChangePasswordForm {...initialValues} onSubmit={this.props.changePassword} />
          </Modal.Body>
        </Modal>

      </form>
    );
  }
}

export default ProfileForm;
