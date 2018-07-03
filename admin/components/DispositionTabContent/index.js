import React, { Component, PropTypes } from 'react';
import moment from 'moment-timezone';
import InfiniteScroll from 'react-infinite-scroller';
import { pad } from '../../utils/functions';
import LoadingSpinner from '../LoadingSpinner';

export default class DispositionTabContent extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    studies: PropTypes.object,
    active: PropTypes.bool,
    paginationOptions: PropTypes.object,
    loadItems: PropTypes.func,
  };

  render() {
    const { studies, active, paginationOptions, loadItems } = this.props;
    let key = 0;
    if (active) {
      return (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadItems}
          initialLoad={false}
          hasMore={paginationOptions.hasMoreItems}
        >
          <table id="dispositionTable">
            <thead>
              <tr>
                <th>STUDY #</th>
                <th>SITE LOCATION</th>
                <th>SITE ADDRESS</th>
                <th>EXPOSURE LEVEL</th>
                <th>START DATE</th>
                <th>END DATE</th>
                <th>PASSED PRESCREENER</th>
                <th>DID NOT PASS PRESCREENER</th>
                <th>DNQ / NOT INTERESTED</th>
                <th>ALL ATTEMPTS MADE</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {
                studies.details.map((study) => {
                  return study.campaigns.map((campaign) => {
                    const campaignDateFrom = moment(campaign.start_date).tz(study.timezone);
                    const campaignDateTo = moment(campaign.end_date).tz(study.timezone);
                    const startDate = campaign.start_date ? campaignDateFrom.format('MM/DD/YY') : 'TBD';
                    const endDate = campaign.end_date ? campaignDateTo.format('MM/DD/YY') : 'TBD';
                    return (
                      <tr key={key++}>
                        <th>{study.study_id}.{pad(campaign.order)}</th>
                        <td>{study.site_name}</td>
                        <td>{study.site_address}</td>
                        <td>{campaign.level_name}</td>
                        <td>{startDate}</td>
                        <td>{endDate}</td>
                        <td>{campaign.stats.disposition.key1}</td>
                        <td>{campaign.stats.disposition.key2}</td>
                        <td>{campaign.stats.disposition.key3}</td>
                        <td>{campaign.stats.disposition.key4}</td>
                        <td>{campaign.stats.disposition.key1 + campaign.stats.disposition.key2 + campaign.stats.disposition.key3 + campaign.stats.disposition.key4}</td>
                      </tr>
                    );
                  });
                })
              }
              {studies.fetching &&
                <tr className="loading"><td colSpan={11} className="text-center"><LoadingSpinner showOnlyIcon /></td></tr>
              }
            </tbody>
          </table>
        </InfiniteScroll>
      );
    } else {
      return (
        <table id="dispositionTable" />
      );
    }
  }
}
