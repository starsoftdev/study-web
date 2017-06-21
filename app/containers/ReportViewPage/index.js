/*
 *
 * ReportViewPage
 *
 */

import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ReportViewInfo from '../../containers/ReportViewPage/ReportViewInfo';
import ReportViewTotals from '../../containers/ReportViewPage/ReportViewTotals';
import ReportViewSearch from '../../components/ReportViewSearch';
import ReportViewTable from '../../components/ReportViewTable';

import { selectCurrentUser } from '../../containers/App/selectors';
import { getReportsList, setActiveSort, sortReportsSuccess, changeProtocolStatus, getReportsTotals } from '../../containers/ReportViewPage/actions';
import { selectReportsList, selectSearchReportsFormValues, selectPaginationOptions, selectTableFormValues, selectReportsTotals } from '../../containers/ReportViewPage/selectors';

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
    changeProtocolStatus: PropTypes.func,
    getReportsTotals: PropTypes.func,
    totals: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      filters: null,
    };

    this.searchReports = this.searchReports.bind(this);
    this.loadReports = this.loadReports.bind(this);
  }

  componentWillMount() {
    const { currentUser } = this.props;
    const protocolNumber = this.props.location.query.protocol || null;
    const indication = this.props.location.query.indication || null;
    const cro = this.props.location.query.cro || null;
    const messaging = this.props.location.query.messaging || null;

    const filters = { sponsorRoleId: currentUser.roleForSponsor.id, protocol: protocolNumber, indication, cro, messaging };
    this.setState({ filters });

    this.props.getReportsList(filters);
    this.props.getReportsTotals(filters);
  }

  getPercentageObject(item) {
    const result = {
      count_contacted_p: parseInt(item.count_total) ? Math.round(((parseInt(item.count_contacted) / parseInt(item.count_total)) * 100) * 10) / 10 : 0,
      count_not_contacted_p: parseInt(item.count_total) ? Math.round(((parseInt(item.count_not_contacted) / parseInt(item.count_total)) * 100) * 10) / 10 : 0,
      dnq_p: parseInt(item.count_total) ? Math.round(((parseInt(item.dnq) / parseInt(item.count_total)) * 100) * 10) / 10 : 0,
      action_needed_p: parseInt(item.count_total) ? Math.round(((parseInt(item.action_needed) / parseInt(item.count_total)) * 100) * 10) / 10 : 0,
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
    const indication = this.props.location.query.indication || null;
    const cro = this.props.location.query.cro || null;
    const messaging = this.props.location.query.messaging || null;

    let filters = { sponsorRoleId: currentUser.roleForSponsor.id, protocol: protocolNumber, indication, cro, messaging };

    filters = _.assign(filters, this.props.formValues, searchFilter);

    this.setState({ filters });

    this.props.getReportsTotals(filters);
    this.props.getReportsList(filters, 10, 0, this.props.paginationOptions.activeSort, this.props.paginationOptions.activeDirection);
  }

  loadReports(isSort, sort, direction) {
    let offset = 0;
    if (!isSort) {
      offset = this.props.paginationOptions.page * 10;
    }
    const limit = 10;

    this.props.getReportsList(this.state.filters, limit, offset, (sort || null), (direction || null));
  }

  render() {
    const protocolNumber = this.props.location.query.protocol || null;
    const indication = this.props.location.query.indication || null;
    const cro = (this.props.location.query.cro && this.props.location.query.cro !== 'null') ? this.props.location.query.cro : 'N/A';

    return (
      <div className="container-fluid sponsor-portal report-view-page">
        <section className="reports">
          <div className="individual-study">
            <div className="main-head">
              <h2 className="main-heading">{protocolNumber}</h2>
              <p><span className="info-cell">Indication: {indication}</span> <span className="info-cell">CRO: {cro}</span></p>
            </div>
          </div>
        </section>
        <ReportViewInfo
          reportsList={this.props.reportsList}
          totals={this.props.totals}
        />
        <ReportViewTotals
          reportsList={this.props.reportsList}
          getPercentageObject={this.getPercentageObject}
          totals={this.props.totals}
        />
        <ReportViewSearch
          searchReports={this.searchReports}
          reportsList={this.props.reportsList}
          location={this.props.location}
          currentUser={this.props.currentUser}
          formValues={this.props.formValues}
        />
        <ReportViewTable
          reportsList={this.props.reportsList}
          getPercentageObject={this.getPercentageObject}
          setActiveSort={this.props.setActiveSort}
          sortReportsSuccess={this.props.sortReportsSuccess}
          paginationOptions={this.props.paginationOptions}
          formTableValues={this.props.formTableValues}
          changeProtocolStatus={this.props.changeProtocolStatus}
          currentUser={this.props.currentUser}
          totals={this.props.totals}
          loadReports={this.loadReports}
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
  totals: selectReportsTotals(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReportsList: (searchParams, limit, offset, sort, order) => dispatch(getReportsList(searchParams, limit, offset, sort, order)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    sortReportsSuccess: (reports) => dispatch(sortReportsSuccess(reports)),
    changeProtocolStatus: (payload) => dispatch(changeProtocolStatus(payload)),
    getReportsTotals: searchParams => dispatch(getReportsTotals(searchParams)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportViewPage);
