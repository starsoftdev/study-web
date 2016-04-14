import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import _ from 'lodash';

export default UserAuthWrapper({
  authSelector: state => _.get(state, 'session.user'),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
});
