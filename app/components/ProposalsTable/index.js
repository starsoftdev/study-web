/**
*
* Proposals Table
*
*/

import React, { Component, PropTypes } from 'react';
import _ from 'lodash'
import moment from 'moment'
import './styles.less';

const headers = [
  {
    text: 'Date',
    sort: 'date'
  },
  {
    text: 'Site name',
    sort: 'site'
  },
  {
    text: 'Proposal number',
    sort: 'proposal'
  },
  {
    text: 'Protocol number',
    sort: 'protocol'
  },
  {
    text: 'Total',
    sort: 'total'
  }
];

class ProposalsTable extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {};

  state = {
    checkAll: false,
    proposals: false,
    activeSort: null,
    activeDirection: null
  }

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.proposals){
      nextProps.proposals.forEach(proposal => {
        proposal.selected = false
      })
      this.setState({proposals: nextProps.proposals});
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  onClickCurrent(ev) {
    ev.preventDefault();
    let scope = this
    let proposals = this.state.proposals;
    proposals.forEach((proposal, key) => {
      if (key === parseInt(ev.currentTarget.firstChild.name)) {
        proposal.selected = (!proposal.selected);
      }
    })

    this.setState({proposals: proposals}, () => {
      let all = true
      this.state.proposals.forEach((proposal) => {
        if (!proposal.selected) {
          all = false
        }
      })

      if (scope.state.checkAll && !all) {
        this.setState({checkAll: false});
      } else if (!scope.state.checkAll && all) {
        this.setState({checkAll: true});
      }
    });
  }

  onClickAll(ev) {
    ev.preventDefault();
    let proposals = this.state.proposals;
    proposals.forEach((proposal) => {
      proposal.selected = (!this.state.checkAll);
    })
    this.setState({checkAll: (!this.state.checkAll), proposals: proposals});
  }

  sortBy(ev) {//need to refactor
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort
    let direction = 'down'

    if (ev.currentTarget.className && ev.currentTarget.className === 'down') {
      direction = 'up'
    }

    const proposalsArr = this.state.proposals
    const directionUnits = (direction === 'up') ? {
      more: 1,
      less: -1
    } :  {
      more: -1,
      less: 1
    }

    switch(sort){
      case 'date':
        proposalsArr.sort((a, b) => {
          let aDate = new Date(a.created).getTime()
          let bDate = new Date(b.created).getTime()
          if (aDate > bDate) {
            return directionUnits.more;
          }
          if (aDate < bDate) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      case 'site':
        proposalsArr.sort((a, b) => {
          if (a.site > b.site) {
            return directionUnits.more;
          }
          if (a.site < b.site) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      case 'proposal':
        proposalsArr.sort((a, b) => {
          if (a.proposalNumber > b.proposalNumber) {
            return directionUnits.more;
          }
          if (a.proposalNumber < b.proposalNumber) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      case 'protocol':
        proposalsArr.sort((a, b) => {
          if (parseInt(a.protocol) > b.protocol) {
            return directionUnits.more;
          }
          if (a.protocol < b.protocol) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      case 'total':
        proposalsArr.sort((a, b) => {
          if (a.total > b.total) {
            return directionUnits.more;
          }
          if (a.total < b.total) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      default:
        break;
    }

    this.setState({proposals: proposalsArr, activeSort: sort, activeDirection: direction});
  }

  mapHeaders(raw, state, result) {
    _.map(raw, (header, key) => {
      result.push(
        <th
          key={key}
          data-sort={header.sort}
          onClick={this.sortBy.bind(this)}
          className={(state.activeSort === header.sort) ? state.activeDirection : ''}
        >
          {header.text} <i className="caret-arrow" />
        </th>
      );
    })
  }

  mapProposals(raw, result) {
    _.map(raw, (source, key) => {
      let date = new Date(source.created);
      let dateWrapper = moment(date);
      result.push(
        <tr key={key}>
          <td>
            <span className={(source.selected) ? "sm-container checked" : "sm-container"}>
              <span
                className="input-style"
                onClick={this.onClickCurrent.bind(this)}
              >
                <input
                  type="checkbox"
                  name={key}
                  ref={"input-"+key}
                />
              </span>
            </span>
          </td>
          <td>{dateWrapper.calendar()}</td>
          <td>{source.site}</td>
          <td>{source.proposalNumber}</td>
          <td>{source.protocol}</td>
          <td>${source.total}</td>
        </tr>
      )
    })
  }

  render() {
    const state = this.state;
    const proposalsArr = state.proposals;
    let proposals = [];
    let heads = [];

    this.mapHeaders(headers, state, heads)
    this.mapProposals(proposalsArr, proposals)

    return (
      <div className="table-holder">
        <table className="table">
          <colgroup>
            <col style={{ width: "9%" }} />
            <col style={{ width: "11%" }} />
            <col style={{ width: "24%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "auto" }} />
          </colgroup>
          <thead>
            <tr>
              <th>
                <span className={(this.state.checkAll) ? "sm-container checked" : "sm-container"}>
                  <span className="input-style" onClick={this.onClickAll.bind(this)}>
                    <input name="all" type="checkbox" ref={"input-all"} />
                  </span>
                </span>
                <span>#</span><i className="caret-arrow" />
              </th>
              {heads}
            </tr>
          </thead>
          <tbody>
            {proposals}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ProposalsTable;
