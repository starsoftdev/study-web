import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { setNewPasswordRequest } from '../../../app/containers/SetNewPasswordPage/actions';

export class ResetPasswordPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    setNewPasswordRequest: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.setNewPasswordRequest = this.props.setNewPasswordRequest.bind(this);
  }

  componentDidMount() {
    this.setNewPasswordRequest();
  }

  render() {
    return (
      <div className="reset-pwd container">
        <Helmet title="Confirm Reset Password" />
        <h3 className="text-center">The password soon will be changed. Please wait.</h3>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNewPasswordRequest: (values) => dispatch(setNewPasswordRequest(values)),
  };
}

export default connect(null, mapDispatchToProps)(ResetPasswordPage);
