import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { default as Header } from '../../components/Header';
import { default as Footer } from '../../components/Footer';

import { fetchMeFromToken } from '../../../app/containers/App/actions';
import { selectAuthState, selectCurrentUser } from '../../../app/containers/App/selectors';
import { logout } from '../../../app/containers/LoginPage/actions';

import './styles.less';

export class Corporate extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    isLoggedIn: React.PropTypes.bool,
    fetchMeFromToken: React.PropTypes.func,
    userDataFetched: React.PropTypes.object,
    children: React.PropTypes.node,
    logout: React.PropTypes.func,
  };

  componentWillMount() {
    // Always load user details from the localStorage Token
    this.props.fetchMeFromToken();
  }

  componentWillReceiveProps() {}

  render() {
    return (
      <div id="wrapper">
        <Header {...this.props} />
        {React.Children.toArray(this.props.children)}
        <Footer {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn: selectAuthState(),
  userDataFetched: selectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchMeFromToken: () => dispatch(fetchMeFromToken()),
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Corporate);
