/*
 *
 * ProfilePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ProfileForm from 'components/ProfileForm';
import { selectChangePasswordResult } from 'containers/ProfilePage/selectors';
import { selectCurrentUser } from 'containers/App/selectors';
import { changePassword, changeImage } from 'containers/ProfilePage/actions';
import { createStructuredSelector } from 'reselect';

export class ProfilePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    changePasswordResult: PropTypes.object,
    changePassword: PropTypes.func,
    changeImage: PropTypes.func,
    currentUser: PropTypes.any,
  }

  constructor(props) {
    super(props);
    this.changePassword = this.props.changePassword.bind(this);
    this.changeImage = this.props.changeImage.bind(this);
  }

  render() {
    return (
      <div className="container-fluid">
        <section className="study-portal">

          <h2 className="main-heading">PROFILE</h2>

          <div className="row form-study">

            <div className="col-xs-6 form-holder">
              {(() => {
                if (this.props.currentUser) {
                  const initialValues = {
                    initialValues: this.props.currentUser,
                  };

                  return (<ProfileForm
                    {...initialValues}
                    changePasswordResult={this.props.changePasswordResult}
                    changePassword={this.changePassword}
                    changeImage={this.changeImage}
                    currentUser={this.props.currentUser}
                  />);
                }
                return <div>Please Login.</div>;
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
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: (values) => dispatch(changePassword(values)),
    changeImage: (values) => dispatch(changeImage(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
