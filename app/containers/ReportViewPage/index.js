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

export class ReportViewPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    location: PropTypes.object,
  };

  render() {
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

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportViewPage);
