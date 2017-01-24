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
import { getReportsList } from 'containers/ReportViewPage/actions';
import { selectReportsList } from 'containers/ReportViewPage/selectors';

export class ReportViewPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    location: PropTypes.object,
    getReportsList: PropTypes.func,
    reportsList: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { currentUser } = this.props;
    this.props.getReportsList({ sponsorRoleId: currentUser.roleForSponsor.id });
  }

  render() {
    console.log(123, this.props);
    const protocolNumber = this.props.location.query.protocol || null;
    return (
      <div className="container-fluid sponsor-portal report-view-page">
        <section className="reports">
          <h2 className="main-heading">{protocolNumber}</h2>
        </section>
        <ReportViewInfo />
        <ReportViewTotals />
        <ReportViewSearch />
        <ReportViewTable />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  reportsList: selectReportsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReportsList: searchParams => dispatch(getReportsList(searchParams)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportViewPage);
