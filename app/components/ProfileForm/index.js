/**
*
* ProfileForm
*
*/

import 'blueimp-canvas-to-blob';
import _ from 'lodash';
import moment from 'moment-timezone';
import classNames from 'classnames';
import React from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { Modal } from 'react-bootstrap';
import Input from '../../components/Input';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import ProfileImageForm from '../../components/ProfileImageForm';
import defaultImage from '../../assets/images/Default-User-Img-Dr-Full.png';
import CenteredModal from '../../components/CenteredModal/index';
import profileFormValidator from './validator';
import { formatTimezone } from '../../utils/time';
import FormGeosuggest from '../../components/Input/Geosuggest';
import { translate } from '../../../common/utilities/localization';

const toShortCode = country => {
  switch (country) {
    case 'United States':
      return 'us';
    case 'United Kingdom':
      return 'uk';
    case 'Brazil':
      return 'br';
    case 'France':
      return 'fr';
    case 'Germany':
      return 'de';
    case 'Hungary':
      return 'hu';
    case 'Italy':
      return 'it';
    case 'Czech Republic':
      return 'cz';
    case 'Japan':
      return 'jp';
    case 'Poland':
      return 'pl';
    case 'Canada':
      return 'ca';
    default:
      return 'us';
  }
};

@reduxForm({ form: 'profile', validate: profileFormValidator })
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
    tempTimezone: React.PropTypes.string,
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
    const { tempTimezone, dispatch, formValues, initialValues } = this.props;

    if (!newProps.changePasswordResult.passwordChanging && this.props.changePasswordResult.passwordChanging && newProps.changePasswordResult.success) {
      this.closeResetPasswordModal();
    }
    if (newProps.tempTimezone && newProps.tempTimezone !== tempTimezone) {
      dispatch(change('profile', 'timezone', formatTimezone(newProps.tempTimezone, formValues.city)));
      dispatch(change('profile', 'timezoneUnparsed', newProps.tempTimezone));
    }
    if (initialValues && !initialValues.address) {
      this.props.initialValues.timezone = '';
    }
  }

  onSuggestSelect(e) {
    const { getTimezone, dispatch } = this.props;
    let city = '';
    let state = '';
    let countryCode = '';
    let postalCode = '';
    let streetNmber = '';
    let route = '';
    if (e.location) {
      getTimezone(e.location.lat, e.location.lng);
    }
    dispatch(change('profile', 'address', e.label));

    if (e.gmaps && e.gmaps.address_components) {
      const addressComponents = e.gmaps.address_components;

      for (const val of addressComponents) {
        if (!city) {
          city = _.find(val.types, (o) => (o === 'locality'));
          const city2 = _.find(val.types, (o) => (o === 'administrative_area_level_2'));
          if (city) {
            dispatch(change('profile', 'city', val.long_name));
          } else if (city2) {
            dispatch(change('profile', 'city', val.long_name));
          }
        }
        if (!state) {
          state = _.find(val.types, (o) => (o === 'administrative_area_level_1'));
          if (state) {
            dispatch(change('profile', 'state', val.short_name));
          }
        }
        if (!countryCode) {
          countryCode = _.find(val.types, (o) => (o === 'country'));
          if (state) {
            dispatch(change('profile', 'countryCode', val.short_name));
          }
        }
        if (!postalCode) {
          postalCode = _.find(val.types, (o) => (o === 'postal_code'));
          if (postalCode) {
            dispatch(change('profile', 'zip', val.long_name));
          }
        }
        if (!streetNmber && _.find(val.types, (o) => (o === 'street_number'))) {
          streetNmber = val.long_name;
        }
        if (!route && _.find(val.types, (o) => (o === 'route'))) {
          route = val.long_name;
        }
        if (streetNmber && route) {
          this.geoSuggest.update(`${streetNmber} ${route}`);
        }
      }
    } else {
      const addressArr = e.label.split(',');
      if (addressArr[1]) {
        dispatch(change('profile', 'city', addressArr[1]));
      }
      if (addressArr[2]) {
        dispatch(change('profile', 'state', addressArr[2]));
      }
      if (addressArr[3]) {
        dispatch(change('profile', 'countryCode', toShortCode(addressArr[3])));
      }
      this.geoSuggest.update(`${addressArr[0]}`);
    }
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

    let isDst = false;
    if (this.props.formValues && this.props.formValues.timezoneUnparsed) {
      isDst = moment().tz(this.props.formValues.timezoneUnparsed).isDST();
    } else if (this.props.initialValues && this.props.initialValues.timezoneUnparsed) {
      isDst = moment().tz(this.props.initialValues.timezoneUnparsed).isDST();
    }

    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="field-row label-top file-img active">
          <strong className="label"><label htmlFor="profile-img">{translate('client.component.profileForm.profileImg')}</label></strong>
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
            <a className="btn btn-gray upload-btn" onClick={this.openProfileImageModal}>{translate('client.component.profileForm.updateProfileImage')}</a>
          </div>
        </div>

        <div className="field-row">
          <strong className="label"><label>{translate('client.component.profileForm.profileName')}</label></strong>
          <div className="field">
            <div className="row">
              <Field
                name="firstName"
                component={Input}
                type="text"
                placeholder={translate('client.component.profileForm.placeholderFirstName')}
                className="col pull-left"
                isDisabled
              />
              <Field
                name="lastName"
                component={Input}
                type="text"
                placeholder={translate('client.component.profileForm.placeholderLastName')}
                className="col pull-right"
                isDisabled
              />
            </div>
          </div>
        </div>

        <div className="field-row fs-hide">
          <strong className="label"><label>{translate('client.component.profileForm.profileEmail')}</label></strong>
          <Field
            name="email"
            component={Input}
            disabled="true"
            type="text"
            placeholder={translate('client.component.profileForm.placeholderEmail')}
            className="field"
            isDisabled
          />
        </div>
        {
          !(userRoleType === 'dashboard' || (currentUser.roleForClient && currentUser.roleForClient.site_id != null)) &&
          <div className="field-row fs-hide">
            <strong className="label required"><label>{translate('client.component.profileForm.profileAddress')}</label></strong>
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
        }
        {
          !(userRoleType === 'dashboard' || (currentUser.roleForClient && currentUser.roleForClient.site_id != null)) &&
          <div className={classNames('field-row', { 'field-before-dst-label': (isDst) })}>
            <strong className="label"><label>{translate('client.component.profileForm.profileTimeZone')}</label></strong>
            <div className="field">
              <Field
                name="timezone"
                component={Input}
                type="text"
                isDisabled
              />
            </div>
          </div>
        }
        {
          (isDst === true) &&
          <div className="field-row">
            <strong className="label"><label>&nbsp;</label></strong>
            <div className="field dst-label">{translate('client.component.profileForm.profileDstLabel')}</div>
          </div>
        }
        <div className="field-row">
          <strong className="label"><label>PASSWORD</label></strong>
          <a className="btn btn-primary" onClick={this.openResetPasswordModal} disabled={!me}>{translate('client.component.profileForm.profileEdit')}</a>
        </div>
        {
          !(userRoleType === 'dashboard' || (currentUser.roleForClient && currentUser.roleForClient.site_id != null)) &&
          <div className="btn-block text-right">
            <button type="submit" className="btn btn-default btn-add-row">
              <span>{translate('client.component.profileForm.profileUpdate')}</span>
            </button>
          </div>
        }
        <Modal
          className="profile-page-modal"
          dialogComponentClass={CenteredModal}
          show={this.state.passwordResetModalOpen}
          onHide={this.closeResetPasswordModal}
          backdrop
          keyboard
        >
          <Modal.Header>
            <Modal.Title>{translate('client.component.profileForm.changePasswordModalTitle')}</Modal.Title>
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
            <Modal.Title>{translate('client.component.profileForm.updateProfileImageModalTitle')}</Modal.Title>
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
