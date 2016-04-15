import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Signup } from '../components';
import { createUser } from '../ducks/users';
import _ from 'lodash';

const mapStateToProps = (state) => {
  const isAuthenticated = !!_.get(state, 'session.user.token', false);
  let redirect = _.get(state, 'routing.locationBeforeTransitions.query.redirect', '/');

  // TODO: there's got to be a better way to handle this
  if (redirect === '/logout') {
    redirect = '/';
  }

  return {
    isAuthenticated,
    redirect
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createUser, replace: routerActions.replace }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
