import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment-timezone';

import { translate } from '../../../../common/utilities/localization';
import RewardListItem from './RewardListItem';

class RewardsList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.object,
    rewards: PropTypes.array,
    paginationOptions: PropTypes.object,
    setActiveSort: PropTypes.func,
    siteLocations: PropTypes.array,
  };

  constructor(props) {
    super(props);

    this.sortBy = this.sortBy.bind(this);
  }

  componentWillUnmount() {
    const defaultSort = 'userName';
    this.props.setActiveSort(defaultSort, null);
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';

    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);
  }

  render() {
    const { currentUser, rewards } = this.props;
    let rewardsListContents = null;

    if (rewards.length > 0) {
      let sorted = rewards;

      if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
        const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');

        sorted = _.orderBy(rewards, [(o) => {
          if (this.props.paginationOptions.activeSort === 'time') {
            return moment(o.created).tz(currentUser.timezone).format('HH:mm');
          } else if (this.props.paginationOptions.activeSort === 'date') {
            return moment(o.created).tz(currentUser.timezone).format('MM/DD/YYYY');
          } else if (this.props.paginationOptions.activeSort === 'description') {
            let rewardData = _.get(o, 'reward_data', '');
            if (rewardData) {
              rewardData = JSON.parse(rewardData);
            }
            return _.get(rewardData, 'siteLocationName');
          }
          return o[this.props.paginationOptions.activeSort];
        }], [dir]);
      }
      rewardsListContents = sorted.map((item, index) => (
        <RewardListItem
          {...item}
          timezone={currentUser.timezone}
          key={index}
          index={index}
          siteLocations={this.props.siteLocations}
        />
      ));
    }

    return (
      <div>
        <header>
          <h2>{translate('client.component.rewardsList.header')}</h2>
        </header>
        <table className="table">
          <colgroup>
            <col style={{ width: '48%' }} />
            <col style={{ width: '13.2%' }} />
            <col style={{ width: '14.5%' }} />
            <col style={{ width: '14.2%' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr>
              <th onClick={this.sortBy} data-sort="description" className={(this.props.paginationOptions.activeSort === 'description') ? this.props.paginationOptions.activeDirection : ''}>
                {translate('client.component.rewardsList.tableDescription')} <i className="caret-arrow" />
              </th>
              <th onClick={this.sortBy} data-sort="date" className={(this.props.paginationOptions.activeSort === 'date') ? this.props.paginationOptions.activeDirection : ''}>
                {translate('client.component.rewardsList.tableDate')} <i className="caret-arrow" />
              </th>
              <th onClick={this.sortBy} data-sort="time" className={(this.props.paginationOptions.activeSort === 'time') ? this.props.paginationOptions.activeDirection : ''}>
                {translate('client.component.rewardsList.tableTime')} <i className="caret-arrow" />
              </th>
              <th onClick={this.sortBy} data-sort="points" className={(this.props.paginationOptions.activeSort === 'points') ? this.props.paginationOptions.activeDirection : ''}>
                {translate('client.component.rewardsList.tableAmount')} <i className="caret-arrow" />
              </th>
              <th onClick={this.sortBy} data-sort="balance" className={(this.props.paginationOptions.activeSort === 'balance') ? this.props.paginationOptions.activeDirection : ''}>
                {translate('client.component.rewardsList.tableBalance')}<i className="caret-arrow" />
              </th>
            </tr>
          </thead>
          <tbody>
            {rewardsListContents}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(null, null)(RewardsList);
