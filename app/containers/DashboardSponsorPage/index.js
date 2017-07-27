/*
 *
 * DashboardSponsorPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { fetchSponsors, addSponsor, editSponsor, deleteSponsor, setActiveSort, setSearchQuery } from './actions';
import { selectDashboardSponsors, selectDashboardEditSponsorProcess, selectDashboardSponsorSearchFormValues, selectPaginationOptions } from './selectors';

import DashboardSponsorSearch from './DashboardSponsorSearch/index';
import DashboardSponsorTable from './DashboardSponsorTable';

export class DashboardSponsorPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    fetchSponsors: PropTypes.func,
    sponsors: PropTypes.object,
    addSponsor: PropTypes.func,
    editSponsor: PropTypes.func,
    deleteSponsor: PropTypes.func,
    editSponsorProcess: PropTypes.object,
    sponsorSearchFormValues: PropTypes.object,
    setActiveSort: PropTypes.func,
    paginationOptions: PropTypes.object,
    setSearchQuery: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);
    this.onSubmitQuery = this.onSubmitQuery.bind(this);
  }

  componentWillMount() {
    this.props.fetchSponsors();
  }

  onSubmitQuery(query) {
    const { fetchSponsors } = this.props;
    this.props.setSearchQuery(query);
    const offset = 0;
    const limit = 10;
    fetchSponsors(query, limit, offset);
  }

  loadMore() {
    const { fetchSponsors, sponsors } = this.props;
    if (!sponsors.fetching) {
      const query = this.props.paginationOptions.query;
      const offset = this.props.paginationOptions.page * 10;
      const limit = 10;
      fetchSponsors(query, limit, offset);
    }
  }


  render() {
    return (
      <div className="container-fluid dashboard-sponsor">
        <Helmet title="Sponsor - StudyKIK" />
        <h2 className="main-heading">Sponsor</h2>

        <DashboardSponsorSearch
          sponsors={this.props.sponsors}
          addSponsor={this.props.addSponsor}
          editSponsorProcess={this.props.editSponsorProcess}
          onSubmitQuery={this.onSubmitQuery}
        />
        <DashboardSponsorTable
          editSponsorProcess={this.props.editSponsorProcess}
          editSponsor={this.props.editSponsor}
          deleteSponsor={this.props.deleteSponsor}
          sponsorSearchFormValues={this.props.sponsorSearchFormValues}
          setActiveSort={this.props.setActiveSort}
          loadMore={this.loadMore}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  sponsors: selectDashboardSponsors(),
  editSponsorProcess: selectDashboardEditSponsorProcess(),
  sponsorSearchFormValues: selectDashboardSponsorSearchFormValues(),
  paginationOptions: selectPaginationOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSponsors: (query, limit, offset) => dispatch(fetchSponsors(query, limit, offset)),
    addSponsor: (payload) => dispatch(addSponsor(payload)),
    editSponsor: (payload) => dispatch(editSponsor(payload)),
    deleteSponsor: (payload) => dispatch(deleteSponsor(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    setSearchQuery: (query) => dispatch(setSearchQuery(query)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSponsorPage);
