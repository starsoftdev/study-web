/*
 *
 * DashboardSponsorPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { fetchSponsors, addSponsor, editSponsor, deleteSponsor, setActiveSort } from './actions';
import { selectDashboardSponsors, selectDashboardEditSponsorProcess, selectDashboardSponsorSearchFormValues, selectPaginationOptions } from './selectors';

import { DashboardSponsorSearch } from './DashboardSponsorSearch/index';
import { DashboardSponsorTable } from './DashboardSponsorTable';

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
  };

  componentWillMount() {
    this.props.fetchSponsors();
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
        />
        <DashboardSponsorTable
          sponsors={this.props.sponsors}
          editSponsorProcess={this.props.editSponsorProcess}
          editSponsor={this.props.editSponsor}
          deleteSponsor={this.props.deleteSponsor}
          sponsorSearchFormValues={this.props.sponsorSearchFormValues}
          setActiveSort={this.props.setActiveSort}
          paginationOptions={this.props.paginationOptions}
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
    fetchSponsors: () => dispatch(fetchSponsors()),
    addSponsor: (payload) => dispatch(addSponsor(payload)),
    editSponsor: (payload) => dispatch(editSponsor(payload)),
    deleteSponsor: (payload) => dispatch(deleteSponsor(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSponsorPage);
