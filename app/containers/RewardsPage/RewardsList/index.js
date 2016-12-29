import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import RewardListItem from './RewardListItem';

class RewardsList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    rewards: PropTypes.array,
    paginationOptions: PropTypes.object,
    setActiveSort: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.sortBy = this.sortBy.bind(this);
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
    const { rewards } = this.props;

    let sorted = rewards;
    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');

      sorted = _.orderBy(rewards, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    const RewardsListContents = sorted.map((item, index) => (
      <RewardListItem
        {...item}
        key={index}
        index={index}
      />
    ));

    if (rewards.length > 0) {
      return (
        <div>
          <header>
            <h2>REWARDS HISTORY</h2>
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
                <th onClick={this.sortBy} data-sort="userName" className={(this.props.paginationOptions.activeSort === 'userName') ? this.props.paginationOptions.activeDirection : ''}>DESCRIPTION <i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="date" className={(this.props.paginationOptions.activeSort === 'date') ? this.props.paginationOptions.activeDirection : ''}>DATE <i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="time" className={(this.props.paginationOptions.activeSort === 'time') ? this.props.paginationOptions.activeDirection : ''}>TIME <i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="points" className={(this.props.paginationOptions.activeSort === 'points') ? this.props.paginationOptions.activeDirection : ''}>AMOUNT <i className="caret-arrow" /></th>
                <th onClick={this.sortBy} data-sort="balance" className={(this.props.paginationOptions.activeSort === 'balance') ? this.props.paginationOptions.activeDirection : ''}>BALANCE <i className="caret-arrow" /></th>
              </tr>
            </thead>
            <tbody>
              {RewardsListContents}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
        <h3>No rewards found!</h3>
      </div>
    );
  }
}

export default connect(null, null)(RewardsList);
