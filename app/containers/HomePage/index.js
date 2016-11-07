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
import { createStructuredSelector } from 'reselect';
import { selectCurrentUserClientId } from 'containers/App/selectors';
import { fetchClientSites, fetchLevels } from 'containers/App/actions';
import { fetchStudies } from './actions';

import Dashboard from './Dashboard';
import SearchStudiesForm from './SearchStudiesForm';
import StudiesList from './StudiesList';

export class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    location: PropTypes.any,
    currentUserClientId: PropTypes.number,
    fetchClientSites: PropTypes.func,
    fetchLevels: PropTypes.func,
    fetchStudies: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.searchStudies = this.searchStudies.bind(this);
  }

  componentWillMount() {
    const { currentUserClientId } = this.props;
    if (currentUserClientId) {
      this.props.fetchClientSites(currentUserClientId, {});
      this.props.fetchLevels();
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

  render() {
    return (
      <div className="home-page">
        <Helmet title="Home Page - StudyKIK" />
        <div className="container-fluid">
          <div className="dashboard form-group">
            <Dashboard location={this.props.location} />
          </div>
          <div className="search-studies-panel form-group">
            <div className="row">
              <div className="col-sm-10">
                <SearchStudiesForm onSubmit={this.searchStudies} />
              </div>
              <div className="col-sm-2">
                <div className="pull-right">
                  <a href="/list-new-study" className="btn btn-primary btn-list-new-study">List New Study</a>
                </div>
              </div>
            </div>
          </div>
          <div className="table-holder form-group">
            <StudiesList />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUserClientId: selectCurrentUserClientId(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchClientSites: (clientId, searchParams) => dispatch(fetchClientSites(clientId, searchParams)),
    fetchLevels: () => dispatch(fetchLevels()),
    fetchStudies: searchParams => dispatch(fetchStudies(searchParams)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
