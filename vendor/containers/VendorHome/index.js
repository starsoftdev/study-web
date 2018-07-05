/*
 * VendorHome
 *
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Dashboard from './Dashboard';
import StudiesList from '../../components/StudiesList';
import { selectCurrentUser } from '../App/selectors';
import { translate } from '../../../common/utilities/localization';
import { ACTIVE_STATUS_VALUE } from './constants';
import SearchStudiesForm from './SearchStudiesForm';
import { fetchVendorSites, fetchStudies } from './actions';
import { selectQueryParams, selectStudies } from './selectors';


export class VendorHome extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    location: PropTypes.any,
    currentUser: PropTypes.object,
    fetchVendorSites: PropTypes.func,
    queryParams: PropTypes.object,
    fetchStudies: PropTypes.func,
    studies: PropTypes.object,
  };

  componentWillMount() {
    const { currentUser, fetchVendorSites, fetchStudies, queryParams } = this.props;
    const params = queryParams;
    params.status = ACTIVE_STATUS_VALUE;
    if (currentUser && currentUser.roleForVendor && currentUser.roleForVendor.vendor_id) {
      fetchVendorSites(currentUser.roleForVendor.vendor_id);

      fetchStudies(currentUser, params);
    }
  }

  searchStudies = (searchParams) => {
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

  render() {
    const { currentUser, queryParams } = this.props;
    return (
      <div>
        <div className="home-page">
          <Helmet title={translate('vendor.page.homePage.helmetTitle')} />

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
            </div>
            <div className="table-holder form-group">
              <StudiesList queryParams={queryParams} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  queryParams: selectQueryParams(),
  studies: selectStudies(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchVendorSites: (vendorId) => dispatch(fetchVendorSites(vendorId)),
    fetchStudies: (currentUser, searchParams) => dispatch(fetchStudies(currentUser, searchParams)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorHome);
