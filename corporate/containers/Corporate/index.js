import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReduxToastr from 'react-redux-toastr';
import Helmet from 'react-helmet';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import { default as Header } from '../../components/Header';
import { default as Footer } from '../../components/Footer';

import { fetchMeFromToken } from '../../../app/containers/App/actions';
import { selectAuthState, selectCurrentUser } from '../../../app/containers/App/selectors';
import { logout } from '../../../app/containers/LoginPage/actions';

export class Corporate extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    isLoggedIn: React.PropTypes.bool,
    fetchMeFromToken: React.PropTypes.func,
    userDataFetched: React.PropTypes.object,
    location: React.PropTypes.object,
    children: React.PropTypes.node,
    logout: React.PropTypes.func,
  };

  componentWillMount() {
    // Always load user details from the localStorage Token
    this.props.fetchMeFromToken(false);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <div id="wrapper">
        <Helmet
          meta={[
            {
              name: 'og:title',
              content: 'Find Clinical Trials - Advertise &amp; Promote Your Medical Study',
            }, {
              name: 'og:description',
              content: 'Looking for a clinical trial near you? Clinical trials are easy to find on StudyKIK.com. Join the millions of people searching for studies every year!',
            },
          ]}
        />
        <Header {...this.props} />
        {React.Children.toArray(this.props.children)}
        <Footer {...this.props} />
        <ReduxToastr
          timeOut={6000}
          preventDuplicates
          newestOnTop={false}
          position="top-right"
        />
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
    fetchMeFromToken: (redirect) => dispatch(fetchMeFromToken(redirect)),
    logout: () => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Corporate);
