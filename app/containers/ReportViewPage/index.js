/*
 *
 * ReportViewPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ReportViewInfo from 'containers/ReportViewPage/ReportViewInfo';
import ReportViewTotals from 'containers/ReportViewPage/ReportViewTotals';
import ReportViewSearch from 'containers/ReportViewPage/ReportViewSearch';
import ReportViewTable from 'containers/ReportViewPage/ReportViewTable';

import { selectCurrentUser } from 'containers/App/selectors';
import { getReportsList, setActiveSort, sortReportsSuccess } from 'containers/ReportViewPage/actions';
import { selectReportsList, selectSearchReportsFormValues, selectPaginationOptions, selectTableFormValues } from 'containers/ReportViewPage/selectors';

import _ from 'lodash';

export class ReportViewPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    location: PropTypes.object,
    getReportsList: PropTypes.func,
    reportsList: PropTypes.object,
    formValues: PropTypes.object,
    setActiveSort: PropTypes.func,
    sortReportsSuccess: PropTypes.func,
    paginationOptions: PropTypes.object,
    formTableValues: PropTypes.object,
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.searchReports = this.searchReports.bind(this);
  }

  componentWillMount() {
    const { currentUser } = this.props;
    const protocolNumber = this.props.location.query.protocol || null;

    this.props.getReportsList({ sponsorRoleId: currentUser.roleForSponsor.id, protocol: protocolNumber });
  }

  getPercentageObject(item) {
    const result = {
      count_contacted_p: parseInt(item.count_total) ? Math.round(((parseInt(item.count_contacted) / parseInt(item.count_total)) * 100) * 10) / 10 : 0,
      count_not_contacted_p: parseInt(item.count_total) ? Math.round(((parseInt(item.count_not_contacted) / parseInt(item.count_total)) * 100) * 10) / 10 : 0,
      dnq_p: parseInt(item.count_total) ? Math.round(((parseInt(item.dnq) / parseInt(item.count_total)) * 100) * 10) / 10 : 0,
      scheduled_p: parseInt(item.count_total) ? Math.round(((parseInt(item.scheduled) / parseInt(item.count_total)) * 100) * 10) / 10 : 0,
      consented_p: parseInt(item.count_total) ? Math.round(((parseInt(item.consented) / parseInt(item.count_total)) * 100) * 10) / 10 : 0,
      screen_failed_p: parseInt(item.count_total) ? Math.round(((parseInt(item.screen_failed) / parseInt(item.count_total)) * 100) * 10) / 10 : 0,
      randomized_p: parseInt(item.count_total) ? Math.round(((parseInt(item.randomized) / parseInt(item.count_total)) * 100) * 10) / 10 : 0,
      call_attempted_p: parseInt(item.count_total) ? Math.round(((parseInt(item.call_attempted) / parseInt(item.count_total)) * 100) * 10) / 10 : 0,
    };

    return result;
  }

  searchReports(searchFilter) {
    const { currentUser } = this.props;
    const protocolNumber = this.props.location.query.protocol || null;

    let filters = { sponsorRoleId: currentUser.roleForSponsor.id, protocol: protocolNumber };

    filters = _.assign(filters, this.props.formValues, searchFilter);

    this.props.getReportsList(filters);
  }

  render() {
    const protocolNumber = this.props.location.query.protocol || null;
    return (
      <div className="container-fluid sponsor-portal report-view-page">
        <section className="reports">
          <div className="individual-study">
            <div className="main-head">
              <h2 className="main-heading">{protocolNumber}</h2>
              <p><span className="info-cell">Indication: {this.props.reportsList.details.length > 0 ? this.props.reportsList.details[0].indication_name : ''}</span> <span className="info-cell">CRO: {this.props.reportsList.details.length > 0 ? this.props.reportsList.details[0].cro_name : ''}</span></p>
            </div>
          </div>
        </section>
        <ReportViewInfo
          reportsList={this.props.reportsList}
        />
        <ReportViewTotals
          reportsList={this.props.reportsList}
          getPercentageObject={this.getPercentageObject}
        />
        <ReportViewSearch
          searchReports={this.searchReports}
          formValues={this.props.formValues}
        />
        <ReportViewTable
          reportsList={this.props.reportsList}
          getPercentageObject={this.getPercentageObject}
          setActiveSort={this.props.setActiveSort}
          sortReportsSuccess={this.props.sortReportsSuccess}
          paginationOptions={this.props.paginationOptions}
          formTableValues={this.props.formTableValues}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  reportsList: selectReportsList(),
  formValues: selectSearchReportsFormValues(),
  paginationOptions: selectPaginationOptions(),
  formTableValues: selectTableFormValues(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReportsList: searchParams => dispatch(getReportsList(searchParams)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    sortReportsSuccess: (reports) => dispatch(sortReportsSuccess(reports)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportViewPage);
