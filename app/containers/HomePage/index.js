/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { selectUserRoleType, selectCurrentUserClientId } from 'containers/App/selectors';
import { fetchClientSites, fetchLevels, getAvailPhoneNumbers } from 'containers/App/actions';
import { fetchStudies } from './actions';

import Dashboard from './Dashboard';
import SponsorDashboard from './SponsorDashboard';
import SearchStudiesForm from './SearchStudiesForm';
import SearchProtocolsForm from './SearchProtocolsForm';
import StudiesList from './StudiesList';

export class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    userRoleType: PropTypes.string,
    location: PropTypes.any,
    currentUserClientId: PropTypes.number,
    fetchClientSites: PropTypes.func,
    fetchLevels: PropTypes.func,
    fetchStudies: PropTypes.func,
    getAvailPhoneNumbers: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.searchStudies = this.searchStudies.bind(this);
  }

  componentWillMount() {
    const { currentUserClientId, userRoleType } = this.props;
    if (currentUserClientId && userRoleType === 'client') {
      this.props.fetchClientSites(currentUserClientId, {});
      this.props.fetchLevels();
      this.props.getAvailPhoneNumbers();
      setTimeout(this.props.fetchStudies, 0);
    }
  }

  searchStudies(searchParams) {
    const queryParams = {
      name: searchParams.name,
      siteId: searchParams.site,
      status: searchParams.status,
    };
    this.props.fetchStudies(queryParams);
  }

  searchProtocols(searchParams) {
    const queryParams = {
      name: searchParams.name,
      siteId: searchParams.site,
      status: searchParams.status,
    };
    this.props.fetchStudies(queryParams);
  }

  render() {
    const { userRoleType } = this.props;
    console.log(userRoleType);
    return (
      <div className="home-page">
        <Helmet title="Home - StudyKIK" />
        {userRoleType === 'client' &&
          (
          <div className="container-fluid">
            <div className="dashboard form-group">
              <Dashboard location={this.props.location} />
            </div>
            <div className="search-studies-panel clearfix form-group">
              <SearchStudiesForm onSubmit={this.searchStudies} />
              <Link to="/list-new-study" className="btn btn-primary btn-list-new-study pull-right">+ List New Study</Link>
            </div>
            <div className="table-holder form-group">
              <StudiesList />
            </div>
          </div>
          )
        }
        {userRoleType === 'sponsor' &&
          (
          <div className="container-fluid sponsor-portal">
            <section className="home-section">
              <SponsorDashboard location={this.props.location} />
              <SearchProtocolsForm onSubmit={this.searchProtocols} />
            </section>
          </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userRoleType: selectUserRoleType(),
  currentUserClientId: selectCurrentUserClientId(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchClientSites: (clientId, searchParams) => dispatch(fetchClientSites(clientId, searchParams)),
    fetchLevels: () => dispatch(fetchLevels()),
    fetchStudies: searchParams => dispatch(fetchStudies(searchParams)),
    getAvailPhoneNumbers: () => dispatch(getAvailPhoneNumbers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
