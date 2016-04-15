import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect } from 'react-router';
import { AppContainer, UserIsAuthenticated } from './containers';
import { LoginContainer, LogoutContainer } from './modules/sessions/containers';
import { SignupContainer } from './modules/users/containers';

const Root = (props) => {
  const { store, history } = props;
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={AppContainer}>
          <IndexRedirect to="/login" />
					<Route path="/signup" component={SignupContainer} />
					<Route path="/login" component={LoginContainer} />
          <Route path="/logout" component={UserIsAuthenticated(LogoutContainer)} />
        </Route>
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Root;
