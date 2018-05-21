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
import { browserHistory } from 'react-router';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import { selectUserRoleType, selectCurrentUserClientId, selectCurrentUser } from '../../containers/App/selectors';
import { fetchClientSites, fetchLevels, fetchPatientMessageUnreadCount } from '../../containers/App/actions';
import { fetchStudies, clearStudiesCollection, fetchProtocols, fetchProtocolNumbers, fetchIndications } from './actions';
import { selectStudies, selectSearchProtocolsFormValues, selectQueryParams, selectPaginationOptions } from '../../containers/HomePage/selectors';

import Dashboard from './Dashboard';
import SponsorDashboard from './SponsorDashboard';
import AdminDashboard from './AdminDashboard';
import SearchStudiesForm from './SearchStudiesForm';
import SearchProtocolsForm from './SearchProtocolsForm';
import ProtocolsList from './ProtocolsList';
import StudiesList from '../../components/StudiesList';
import { ACTIVE_STATUS_VALUE } from './constants';
import { translate } from '../../../common/utilities/localization';

export class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.object,
    currentUserClientId: PropTypes.number,
    fetchClientSites: PropTypes.func,
    fetchLevels: PropTypes.func,
    studies: PropTypes.object,
    fetchStudies: PropTypes.func,
    clearStudiesCollection: PropTypes.func,
    fetchProtocols: PropTypes.func.isRequired,
    fetchProtocolNumbers: PropTypes.func.isRequired,
    fetchIndications: PropTypes.func,
    location: PropTypes.any,
    userRoleType: PropTypes.string,
    queryParams: PropTypes.object,
    searchProtocolsFormValues: PropTypes.object,
    paginationOptions: React.PropTypes.object,
    fetchPatientMessageUnreadCount: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      filters: null,
    };

    this.searchStudies = this.searchStudies.bind(this);
    this.searchProtocols = this.searchProtocols.bind(this);
    this.gotoListNewStudy = this.gotoListNewStudy.bind(this);
    this.loadProtocols = this.loadProtocols.bind(this);
  }

  componentWillMount() {
    const { currentUser, currentUserClientId, userRoleType, queryParams } = this.props;
    const params = queryParams;
    params.status = ACTIVE_STATUS_VALUE;

    if (currentUserClientId && userRoleType === 'client') {
      this.props.fetchClientSites(currentUserClientId, {});
      this.props.fetchLevels();
      this.props.fetchStudies(currentUser, params);
      this.props.fetchPatientMessageUnreadCount(currentUser);
    } else if (currentUser && userRoleType === 'sponsor') {
      this.props.fetchProtocols(currentUser.roleForSponsor.id);
      this.props.fetchProtocolNumbers(currentUser.roleForSponsor.id);
      this.props.fetchIndications(currentUser);
    }
  }

  componentWillUnmount() {
    this.props.clearStudiesCollection();
  }

  searchStudies(searchParams) {
    const { currentUser, queryParams, studies } = this.props;
    const params = queryParams;
    params.name = searchParams.name;
    params.site = searchParams.site;
    if (params.name) {
      params.status = searchParams.status;
    } else {
      params.status = searchParams.status || ACTIVE_STATUS_VALUE;
    }

    params.filter = false;

    if (searchParams.filter) {
      params.skip = 0;
      params.filter = true;
    }

    if (!studies.fetching) {
      this.props.fetchStudies(currentUser, params);
    }
  }

  searchProtocols(searchParams) {
    const { currentUser, fetchProtocols, searchProtocolsFormValues } = this.props;

    const filters = _.assign(searchProtocolsFormValues, searchParams);
    this.setState({ filters });
    fetchProtocols(currentUser.roleForSponsor.id, filters, 50, 0, this.props.paginationOptions.activeSort, this.props.paginationOptions.activeDirection);
  }

  gotoListNewStudy() {
    browserHistory.push('/app/list-new-study');
  }

  loadProtocols(isSort, sort, direction) {
    const { currentUser, fetchProtocols } = this.props;

    let offset = 0;
    if (!isSort) {
      offset = this.props.paginationOptions.page * 50;
    }
    const limit = 50;

    fetchProtocols(currentUser.roleForSponsor.id, this.state.filters, limit, offset, (sort || null), (direction || null));
  }

  render() {
    const { userRoleType, currentUser, queryParams } = this.props;
    let purchasable = true;
    if (userRoleType === 'client') {
      purchasable = currentUser.roleForClient.name === 'Super Admin' ? true : currentUser.roleForClient.canPurchase;
    }
    const bDisabled = purchasable ? null : true;
    return (
      <div className="home-page">
        <Helmet title={translate('portals.page.homePage.helmetTitle')} />
        {userRoleType === 'client' &&
          (
            <div className="container-fluid">
              <div className="dashboard form-group">
                <Dashboard location={this.props.location} />
              </div>
              <div className="search-studies-panel clearfix form-group">
                <SearchStudiesForm
                  onSubmit={this.searchStudies}
                  currentUser={currentUser}
                  initialValues={{ status: ACTIVE_STATUS_VALUE }}
                />
                <button type="button" className="btn btn-primary btn-list-new-study pull-right" onClick={this.gotoListNewStudy} disabled={bDisabled}>
                  {translate('portals.page.homePage.listNewStudyBtn')}
                </button>
              </div>
              <div className="table-holder form-group">
                <StudiesList queryParams={queryParams} />
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
                </div>
                <ProtocolsList
                  loadProtocols={this.loadProtocols}
                />
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
  studies: selectStudies(),
  queryParams: selectQueryParams(),
  currentUser: selectCurrentUser(),
  currentUserClientId: selectCurrentUserClientId(),
  userRoleType: selectUserRoleType(),
  searchProtocolsFormValues: selectSearchProtocolsFormValues(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchClientSites: (clientId, searchParams) => dispatch(fetchClientSites(clientId, searchParams)),
    fetchLevels: () => dispatch(fetchLevels()),
    fetchStudies: (currentUser, searchParams) => dispatch(fetchStudies(currentUser, searchParams)),
    clearStudiesCollection: () => dispatch(clearStudiesCollection()),
    fetchProtocols: (sponsorRoleId, searchParams, limit, offset, sort, order) => dispatch(fetchProtocols(sponsorRoleId, searchParams, limit, offset, sort, order)),
    fetchProtocolNumbers: (sponsorRoleId) => dispatch(fetchProtocolNumbers(sponsorRoleId)),
    fetchIndications: (currentUser) => dispatch(fetchIndications(currentUser)),
    fetchPatientMessageUnreadCount: (currentUser) => dispatch(fetchPatientMessageUnreadCount(currentUser)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
