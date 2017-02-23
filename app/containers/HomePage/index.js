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
import { selectUserRoleType, selectCurrentUserClientId, selectCurrentUser } from '../../containers/App/selectors';
import { fetchClientSites, fetchLevels, getAvailPhoneNumbers } from '../../containers/App/actions';
import { fetchStudies, fetchProtocols, fetchProtocolNumbers, fetchIndications } from './actions';
import { selectSearchProtocolsFormValues } from '../../containers/HomePage/selectors';

import Dashboard from './Dashboard';
import SponsorDashboard from './SponsorDashboard';
import AdminDashboard from './AdminDashboard';
import SearchStudiesForm from './SearchStudiesForm';
import SearchProtocolsForm from './SearchProtocolsForm';
import ProtocolsList from './ProtocolsList';
import StudiesList from './StudiesList';
import _ from 'lodash';

export class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.object,
    currentUserClientId: PropTypes.number,
    fetchClientSites: PropTypes.func,
    fetchLevels: PropTypes.func,
    fetchStudies: PropTypes.func,
    fetchProtocols: PropTypes.func,
    fetchProtocolNumbers: PropTypes.func,
    fetchIndications: PropTypes.func,
    getAvailPhoneNumbers: PropTypes.func,
    location: PropTypes.any,
    userRoleType: PropTypes.string,
    searchProtocolsFormValues: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.searchStudies = this.searchStudies.bind(this);
    this.searchProtocols = this.searchProtocols.bind(this);
  }

  componentWillMount() {
    const { currentUser, currentUserClientId, userRoleType } = this.props;
    if (currentUserClientId && userRoleType === 'client') {
      this.props.fetchClientSites(currentUserClientId, {});
      this.props.fetchLevels();
      this.props.getAvailPhoneNumbers();
      this.props.fetchStudies();
    } else if (currentUser && userRoleType === 'sponsor') {
      this.props.fetchProtocols({ sponsorRoleId: currentUser.roleForSponsor.id });
      this.props.fetchProtocolNumbers(currentUser);
      this.props.fetchIndications(currentUser);
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
    const { currentUser } = this.props;

    let filters = { sponsorRoleId: currentUser.roleForSponsor.id };

    filters = _.assign(filters, this.props.searchProtocolsFormValues, searchParams);

    this.props.fetchProtocols(filters);
  }

  render() {
    const { userRoleType } = this.props;
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
              <SearchStudiesForm onSubmit={this.searchStudies} currentUser={this.props.currentUser} />
              <Link to="/app/list-new-study" className="btn btn-primary btn-list-new-study pull-right">+ List New Study</Link>
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
              <div className="search-studies-panel clearfix form-group">
                <SearchProtocolsForm onSubmit={this.searchProtocols} />
                {/* <Link to="/app/add-credits" className="btn btn-primary btn-list-new-study pull-right"><i className="icomoon-icon_creditcard"></i> Add Credits</Link> */}
                {/* <Link to="/app/list-new-study" className="btn btn-primary btn-list-new-study pull-right">+ List New Protocol</Link> */}
              </div>
              <ProtocolsList />
            </section>
          </div>
          )
        }
        {userRoleType === 'dashboard' &&
          (
          <AdminDashboard />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  currentUserClientId: selectCurrentUserClientId(),
  userRoleType: selectUserRoleType(),
  searchProtocolsFormValues: selectSearchProtocolsFormValues(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchClientSites: (clientId, searchParams) => dispatch(fetchClientSites(clientId, searchParams)),
    fetchLevels: () => dispatch(fetchLevels()),
    fetchStudies: searchParams => dispatch(fetchStudies(searchParams)),
    fetchProtocols: searchParams => dispatch(fetchProtocols(searchParams)),
    fetchProtocolNumbers: currentUser => dispatch(fetchProtocolNumbers(currentUser)),
    fetchIndications: currentUser => dispatch(fetchIndications(currentUser)),
    getAvailPhoneNumbers: () => dispatch(getAvailPhoneNumbers()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
