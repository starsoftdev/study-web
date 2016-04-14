import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { Logout } from '../components';
import { destroySession } from '../ducks/session';

const mapStateToProps = (state) => {
  const isAuthenticated = !!_.get(state, 'session.user.token', false);

  return {
    isAuthenticated
  };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ destroySession, replace: routerActions.replace }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
