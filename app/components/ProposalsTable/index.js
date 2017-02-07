/**
*
* Proposals Table
*
*/

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { getLocalTime } from 'utils/time';

const headers = [
  {
    text: 'Date',
    sort: 'date',
  },
  {
    text: 'Site name',
    sort: 'site',
  },
  {
    text: 'Proposal number',
    sort: 'proposal',
  },
  {
    text: 'Protocol number',
    sort: 'protocol',
  },
  {
    text: 'Total',
    sort: 'total',
  },
];

class ProposalsTable extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.object,
    selectCurrent: PropTypes.func,
    selectAll: PropTypes.func,
    range: PropTypes.any,
    searchBy: PropTypes.any,
    proposals: PropTypes.any,
    showProposalPdf: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onClickAll = this.onClickAll.bind(this);
    this.onClickCurrent = this.onClickCurrent.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.sort = this.sort.bind(this);

    this.state = {
      checkAll: false,
      proposals: false,
      filteredProposals: null,
      activeSort: null,
      activeDirection: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.proposals) {
      this.setState({
        filteredProposals: null,
      });
    }

    if (nextProps.range) {
      this.rangeSort(nextProps.range);
    }

    if (nextProps.site || nextProps.searchBy) {
      this.sort(nextProps.site, nextProps.searchBy);
    } else {
      this.setState({
        filteredProposals: null,
      });
    }
  }

  componentDidUpdate() {}

  onClickCurrent(ev) {
    ev.preventDefault();
    const scope = this;
    let selectedArr = [];
    let key = 0;
    const proposals = this.props.proposals;

    for (const proposal of proposals) {
      if (key === parseInt(ev.currentTarget.firstChild.name, 10)) {
        proposal.selected = (!proposal.selected);

        if (proposal.selected) {
          if (_.isEmpty(this.selectedProposal)) {
            this.selectedProposal = [];
            this.selectedProposal.push(proposal);
          } else {
            selectedArr = this.selectedProposal;
            selectedArr.push(proposal);

            this.selectedProposal = selectedArr;
          }
        } else {
          this.selectedProposal = _.filter(this.selectedProposal, (o) => o.site !== proposal.site);
          if (!this.selectedProposal.length) {
            this.selectedProposal = null;
          }
        }
      }
      key++;
    }

    this.props.selectCurrent(this.selectedProposal);

    this.setState({ proposals }, () => {
      let all = true;
      this.props.proposals.forEach((proposal) => {
        if (!proposal.selected) {
          all = false;
        }
      });

      if (scope.state.checkAll && !all) {
        this.setState({ checkAll: false });
      } else if (!scope.state.checkAll && all) {
        this.setState({ checkAll: true });
      }
    });
  }

  onClickAll(ev) {
    ev.preventDefault();
    const proposals = this.props.proposals;
    for (const proposal of proposals) {
      proposal.selected = (!this.state.checkAll);
    }

    this.setState({ checkAll: (!this.state.checkAll), proposals }, () => {
      this.selectedProposal = (this.state.checkAll) ? proposals : null;
      this.props.selectAll(this.selectedProposal);
    });
  }

  sort(site, searchBy) {
    const proposalsMatch = [];
    const proposalsArr = this.props.proposals;

    if (site !== null && searchBy !== null) {
      for (const proposal of proposalsArr) {
        if (proposal.site === site.name) {
          const proposalNumber = String(proposal.proposalNumber);
          const protocalNumber = String(proposal.protocol);
          if (proposalNumber.includes(searchBy) || protocalNumber.includes(searchBy)) {
            proposalsMatch.push(proposal);
          }
        }
      }
    } else if (searchBy !== null) {
      for (const proposal of proposalsArr) {
        const proposalNumber = String(proposal.proposalNumber);
        const protocalNumber = String(proposal.protocol);
        if (proposalNumber.includes(searchBy) || protocalNumber.includes(searchBy)) {
          proposalsMatch.push(proposal);
        }
      }
    } else if (site !== null) {
      for (const proposal of proposalsArr) {
        if (proposal.site === site.name) {
          proposalsMatch.push(proposal);
        }
      }
    }

    this.setState({ filteredProposals: proposalsMatch });
  }

  get selectedProposal() {
    return this.SelectedProposal;
  }

  set selectedProposal(value) {
    this.SelectedProposal = value;
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';

    if (ev.currentTarget.className && ev.currentTarget.className === 'up') {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className === 'down') {
      direction = null;
      sort = null;
    }

    const proposalsArr = this.state.filteredProposals || this.props.proposals;

    const directionUnits = (direction === 'up') ? {
      more: 1,
      less: -1,
    } : {
      more: -1,
      less: 1,
    };

    switch (sort) {
      case 'date':
        proposalsArr.sort((a, b) => {
          const aDate = new Date(a.created).getTime();
          const bDate = new Date(b.created).getTime();
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
          if (a.site.toLowerCase() > b.site.toLowerCase()) {
            return directionUnits.more;
          }
          if (a.site.toLowerCase() < b.site.toLowerCase()) {
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
          console.log(a);
          if (a.protocol > b.protocol) {
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
      case 'order_number':
        proposalsArr.sort((a, b) => {
          if (a.order_number > b.order_number) {
            return directionUnits.more;
          }
          if (a.order_number < b.order_number) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      default:
        proposalsArr.sort((a, b) => {
          if (a.order_number > b.order_number) {
            return 1;
          }
          if (a.order_number < b.order_number) {
            return -1;
          }
          return 0;
        });
        break;
    }

    this.setState({ filteredProposals: proposalsArr, activeSort: sort, activeDirection: direction });
  }

  rangeSort(range) {
    const proposalsInRange = [];
    const proposalsArr = this.props.proposals;
    for (const proposal of proposalsArr) {
      const created = new Date(proposal.created).getTime();
      const endDate = new Date(range.endDate).getTime();
      const startDate = new Date(range.startDate).getTime();

      if (created > startDate && created < endDate) {
        proposalsInRange.push(proposal);
      }
    }

    this.setState({ filteredProposals: proposalsInRange });
  }

  mapHeaders(raw, state, result) {
    _.map(raw, (header, key) => {
      result.push(
        <th
          key={key}
          data-sort={header.sort}
          onClick={this.sortBy}
          className={state.activeSort === header.sort ? state.activeDirection : ''}
        >
          {header.text} <i className="caret-arrow" />
        </th>
      );
    });
  }

  mapProposals(raw, result) {
    if (this.state.activeSort === null) {
      const directionUnits = {
        more: 1,
        less: -1,
      };
      raw.sort((a, b) => {
        const aDate = new Date(a.created).getTime();
        const bDate = new Date(b.created).getTime();
        if (aDate > bDate) {
          return directionUnits.more;
        }
        if (aDate < bDate) {
          return directionUnits.less;
        }
        return 0;
      });
    }
    _.map(raw, (source, key) => {
      const dateWrapper = getLocalTime(source.created, this.props.currentUser.timezone).format('MM/DD/YY');
      const sub = ((source.total % 100) === 0) ? '.00' : false;

      let proposalLink = source.proposalNumber;
      if (source.proposalPdfId) {
        proposalLink = <a className="show-pdf-link" onClick={() => this.props.showProposalPdf(source.id)}>{source.proposalNumber}</a>;
      }

      result.push(
        <tr key={key}>
          <td>
            <span className={(source.selected) ? 'sm-container checked' : 'sm-container'}>
              <span className="input-style" onClick={this.onClickCurrent}>
                <input type="checkbox" name={key} />
              </span>
            </span>
            <span>{source.order_number}</span>
          </td>
          <td>{dateWrapper}</td>
          <td>{source.site}</td>
          <td>{proposalLink}</td>
          <td>{source.protocol}</td>
          <td>${(sub) ? `${(source.total / 100)}${sub}` : `${(source.total / 100).toFixed(2)}` }</td>
        </tr>
      );
    });
  }

  render() {
    const state = this.state;
    const proposalsArr = state.filteredProposals || this.props.proposals;
    const proposals = [];
    const heads = [];

    if (headers) {
      this.mapHeaders(headers, state, heads);
    }
    if (proposalsArr) {
      this.mapProposals(proposalsArr, proposals);
    }

    return (
      <div className="table-holder">
        <table className="table">
          <caption />
          <colgroup>
            <col style={{ width: '6.5%' }} />
            <col style={{ width: '11%' }} />
            <col style={{ width: '24%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '20%' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <thead>
            <tr>
              <th className={state.activeSort === 'orderNumber' ? state.activeDirection : ''}>
                <span className={(this.state.checkAll) ? 'sm-container checked' : 'sm-container'}>
                  <span className="input-style" onClick={this.onClickAll}>
                    <input name="all" type="checkbox" />
                  </span>
                </span>
                <span
                  data-sort="order_number"
                  onClick={this.sortBy}
                  className={(state.activeSort === 'order_number') ? state.activeDirection : ''}
                >
                  #<i className="caret-arrow" />
                </span>
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
