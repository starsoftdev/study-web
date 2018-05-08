/*
 *
 * ProfilePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';

import ProfileForm from '../../components/ProfileForm';
import { selectChangePasswordResult, selectOtherUser, selectProfileFormValues } from '../../containers/ProfilePage/selectors';
import { selectCurrentUser, selectUserRoleType, selectFormsTempTimezone } from '../../containers/App/selectors';
import { changePassword, changeImage, fetchOtherUser } from '../../containers/ProfilePage/actions';
import { changeUsersTimezone, getTimezone } from '../../containers/App/actions';
import { formatTimezone } from '../../utils/time';
import { translate } from '../../../common/utilities/localization';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changePasswordResult: PropTypes.object,
    changePassword: PropTypes.func,
    changeImage: PropTypes.func,
    fetchOtherUser: PropTypes.func,
    currentUser: PropTypes.any,
    otherUser: PropTypes.any,
    params: PropTypes.object,
    formValues: PropTypes.object,
    userRoleType: PropTypes.string,
    changeUsersTimezone: React.PropTypes.func,
    getTimezone: React.PropTypes.func,
    tempTimezone: React.PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.updateUsersTimezone = this.updateUsersTimezone.bind(this);

    this.changePassword = this.props.changePassword.bind(this);
    this.changeImage = this.props.changeImage.bind(this);
  }

  componentDidMount() {
    const { userId } = this.props.params;
    if (userId !== 'me') {
      this.props.fetchOtherUser({ userId });
    }
  }

  updateUsersTimezone(values) {
    this.props.changeUsersTimezone(this.props.currentUser.id, {
      city: values.city,
      timezone: values.timezoneUnparsed,
      address: values.address,
      countryCode: values.countryCode,
      zip: values.zip,
      needSetup: false,
    });
  }

  render() {
    const me = this.props.params.userId === 'me';
    const { currentUser, otherUser } = this.props;
    const initialTimezoneValue = currentUser.address ? formatTimezone((me ? currentUser.timezone : otherUser.info.timezone),
      (me ? currentUser.city : otherUser.info.city)) : '';

    return (
      <div className="container-fluid">
        <Helmet title="Profile - StudyKIK" />
        <section>
          <h2 className="main-heading">{translate('client.page.profile.mainHeading')}</h2>
          <div className="row profile form-study">

            <div className="col-xs-6 form-holder">
              {(() => {
                const initialValues = {
                  initialValues: {
                    ...(me ? currentUser : otherUser.info),
                    timezone: initialTimezoneValue,
                    timezoneUnparsed: (me ? currentUser.timezone : otherUser.info.timezone),
                  },
                };

                return (me || otherUser.info) && <ProfileForm
                  {...initialValues}
                  changePasswordResult={this.props.changePasswordResult}
                  changePassword={this.changePassword}
                  changeImage={this.changeImage}
                  currentUser={me ? currentUser : otherUser.info}
                  userRoleType={this.props.userRoleType}
                  me={me}
                  formValues={this.props.formValues}
                  changeUsersTimezone={this.props.changeUsersTimezone}
                  getTimezone={this.props.getTimezone}
                  tempTimezone={this.props.tempTimezone}
                  onSubmit={this.updateUsersTimezone}
                />;
              })()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  changePasswordResult: selectChangePasswordResult(),
  currentUser: selectCurrentUser(),
  userRoleType: selectUserRoleType(),
  otherUser: selectOtherUser(),
  formValues: selectProfileFormValues(),
  tempTimezone: selectFormsTempTimezone(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: (values) => dispatch(changePassword(values)),
    changeImage: (values) => dispatch(changeImage(values)),
    fetchOtherUser: (userId) => dispatch(fetchOtherUser(userId)),
    changeUsersTimezone: (userId, params) => dispatch(changeUsersTimezone(userId, params)),
    getTimezone: (lat, lng) => dispatch(getTimezone(lat, lng)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
