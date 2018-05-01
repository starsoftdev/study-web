import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingSpinner from '../../components/LoadingSpinner';
import ReportItem from '../ReportItem';

@reduxForm({ form: 'reportListForm' })

export class ReportViewTable extends React.Component {
  static propTypes = {
    reportsList: PropTypes.object,
    getPercentageObject: PropTypes.func,
    paginationOptions: PropTypes.object,
    totals: PropTypes.object,
    loadReports: PropTypes.func,
    openNotesModal: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.loadItems = this.loadItems.bind(this);
  }

  loadItems() {
    if (!this.props.reportsList.fetching && this.props.paginationOptions.hasMoreItems) {
      this.props.loadReports(false);
    }
  }

  render() {
    const { reportsList, getPercentageObject, openNotesModal, paginationOptions, totals } = this.props;
    const inActive = (totals.details[totals.source] && totals.details[totals.source].total_inactive) ? parseInt(totals.details[totals.source].total_inactive) : 0;
    const active = (totals.details[totals.source] && totals.details[totals.source].total_active) ? parseInt(totals.details[totals.source].total_active) : 0;
    const total = inActive + active;

    return (
      <div>
        <p className="report-stats">
          <span className="stats-span">Active: <span className="number">{active}</span></span>
          <span className="stats-span">Inactive: <span className="number">{inActive}</span></span>
          <span className="stats-span">Total: <span className="number">{total}</span></span>
        </p>
        <InfiniteScroll
          className="reports"
          pageStart={0}
          loadMore={this.loadItems}
          initialLoad={false}
          hasMore={paginationOptions.hasMoreItems}
        >
          <div className="reports">
            {
              reportsList.details.map((item, index) => <ReportItem
                item={item}
                key={index}
                order={index}
                percentage={getPercentageObject(item)}
                openNotesModal={openNotesModal}
              />)
            }
          </div>
        </InfiniteScroll>
        { reportsList.fetching && <div className="text-center"><LoadingSpinner showOnlyIcon /></div> }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportViewTable);
