/*
 *
 * ProfilePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ProfileForm from 'components/ProfileForm';
import { selectChangePasswordResult, selectProfilePage } from 'containers/ProfilePage/selectors';
import { changePassword } from 'containers/ProfilePage/actions';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changePasswordResult: PropTypes.object,
    changePassword: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.changePassword = this.props.changePassword.bind(this);
  }

  render() {
    return (
      <div className="container-fluid">
        <section className="study-portal">

          <h2 className="main-heading">PROFILE</h2>

          <div className="row form-study">

            <div className="col-xs-6 form-holder">
              <ProfileForm changePassword={this.changePassword} />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = selectProfilePage({
  changePasswordResult: selectChangePasswordResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: (values) => dispatch(changePassword(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
