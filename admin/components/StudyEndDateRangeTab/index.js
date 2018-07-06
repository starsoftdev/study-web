import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import InfiniteScroll from 'react-infinite-scroller';
import LoadingSpinner from '../LoadingSpinner';

export default class StudyEndDateRangeTab extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    campaignsStats: PropTypes.object,
    filtersFormValues: PropTypes.object,
    campaignsPaginationOptions: PropTypes.object,
    loadCampaignItems: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.renderItems = this.renderItems.bind(this);
  }

  renderItems(item, key) {
    const campaignDateFrom = moment(item.start_date).tz(item.timezone);
    const campaignDateTo = moment(item.end_date).tz(item.timezone);
    const startDate = item.start_date ? campaignDateFrom.format('MM/DD/YY') : 'TBD';
    const endDate = item.end_date ? campaignDateTo.format('MM/DD/YY') : 'TBD';
    return (
      <tr key={key}>
        <th>{item.study_id} - {item.order}</th>
        <td>{item.site_name}</td>
        <td>{item.site_address}</td>
        <td>{item.level_name}</td>
        <td>{startDate}</td>
        <td>{endDate}</td>
        <td>{item.goal}</td>
        <td>{item.tier}</td>
        <td>{item.color}</td>
        <td>{item.total}</td>
      </tr>
    );
  }

  render() {
    const { campaignsStats, filtersFormValues, campaignsPaginationOptions, loadCampaignItems } = this.props;
    if (filtersFormValues.startDate && filtersFormValues.endDate) {
      if (campaignsStats.details.length || campaignsStats.fetching) {
        return (
          <InfiniteScroll
            pageStart={0}
            loadMore={loadCampaignItems}
            initialLoad={false}
            hasMore={campaignsPaginationOptions.hasMoreItems}
          >
            <table id="studyEndDateRange">
              <thead>
                <tr>
                  <th>Study #</th>
                  <th>SITE LOCATION</th>
                  <th>SITE ADDRESS</th>
                  <th>EXPOSURE LEVEL</th>
                  <th>START DATE</th>
                  <th>END DATE</th>
                  <th>GOAL</th>
                  <th>TIER</th>
                  <th>COLOR</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {
                  campaignsStats.details.map((item, key) => {
                    return this.renderItems(item, key);
                  })
                }
                {campaignsStats.fetching &&
                  <tr>
                    <td colSpan={10} className="text-center"><LoadingSpinner showOnlyIcon /></td>
                  </tr>
                }
              </tbody>
            </table>
          </InfiniteScroll>
        );
      } else {
        return (
          <p className="text-center">No data matching your criteria.</p>
        );
      }
    } else {
      return (
        <p className="text-center">No study end date range specified.</p>
      );
    }
  }
}
