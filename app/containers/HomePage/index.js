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
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Helmet from 'react-helmet';
import { selectCurrentUserClientId } from 'containers/App/selectors';
import { fetchClientSites } from 'containers/App/actions';
import { fetchStudies } from './actions';

import Dashboard from './Dashboard';
import SearchStudiesForm from './SearchStudiesForm';
import StudiesList from './StudiesList';

export class HomePage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    location: PropTypes.any,
    currentUserClientId: PropTypes.number,
    fetchClientSites: PropTypes.func,
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
      this.props.fetchStudies();
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
            <SearchStudiesForm onSubmit={this.searchStudies} />
          </div>
          <div className="studies-list form-group">
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
    fetchStudies: searchParams => dispatch(fetchStudies(searchParams)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
