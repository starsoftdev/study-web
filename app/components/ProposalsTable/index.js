/**
*
* Proposals Table
*
*/

import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import moment from 'moment-timezone';
import InfiniteScroll from 'react-infinite-scroller';
import Checkbox from '../../components/Input/Checkbox';
import LoadingSpinner from '../../components/LoadingSpinner';
import { translate } from '../../../common/utilities/localization';

const headers = [
  {
    text: translate('portals.component.proposalsTable.dateColumn'),
    sort: 'date',
  },
  {
    text: translate('portals.component.proposalsTable.siteColumn'),
    sort: 'site',
  },
  {
    text: translate('portals.component.proposalsTable.proposalColumn'),
    sort: 'proposal',
  },
  {
    text: translate('portals.component.proposalsTable.protocolColumn'),
    sort: 'protocol',
  },
  {
    text: translate('portals.component.proposalsTable.totalColumn'),
    sort: 'total',
  },
];

const formName = 'ProposalsTable.Proposals';
@reduxForm({ form: formName })
class ProposalsTable extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.object,
    sites: PropTypes.array,
    selectCurrent: PropTypes.func,
    selectAll: PropTypes.func,
    range: PropTypes.any,
    searchBy: PropTypes.any,
    site: PropTypes.any,
    getPaginatedProposals: PropTypes.func,
    proposals: PropTypes.any,
    proposalsStatus: PropTypes.bool,
    showProposalPdf: PropTypes.func,
    paginationOptions: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.onClickAll = this.onClickAll.bind(this);
    this.onClickCurrent = this.onClickCurrent.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.filter = this.filter.bind(this);

    this.state = {
      checkAll: false,
      proposals: false,
      filteredProposals: null,
      activeSort: null,
      activeDirection: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.filteredProposals) {
      this.setState({
        filteredProposals: null,
      });
    }

    if (nextProps.site || nextProps.searchBy || nextProps.range) {
      this.setState({
        filteredProposals: this.filter(nextProps.site, nextProps.searchBy, nextProps.range),
      });
    }

    if (nextProps.proposals.length > this.props.proposals.length) {
      if (this.state.checkAll) {
        const selectedArr = [];
        for (const proposal of nextProps.proposals) {
          proposal.selected = true;
          if (proposal.proposalpdfid && proposal.selected) {
            selectedArr.push(proposal);
          }
        }
        this.selectedProposal = selectedArr;
        this.props.selectAll(this.selectedProposal);
      }
    }
  }

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
    const selectedArr = [];
    this.selectedProposal = null;
    for (const proposal of proposals) {
      proposal.selected = (!this.state.checkAll);
      if (proposal.proposalpdfid && proposal.selected) {
        selectedArr.push(proposal);
        this.selectedProposal = selectedArr;
      }
    }

    this.setState({ checkAll: (!this.state.checkAll), proposals }, () => {
      this.props.selectAll(this.selectedProposal);
    });
  }

  filter(site, searchBy, range) {
    let proposalsMatch = this.props.proposals;

    if (site && site.name) {
      proposalsMatch = proposalsMatch.filter(p => p.sitename === site.name);
    }
    if (searchBy) {
      proposalsMatch = proposalsMatch.filter(p => `${p.id} ${p.protocol}`.toLowerCase().includes(searchBy.toLowerCase()));
    }
    if (range && range.startDate && range.endDate) {
      proposalsMatch = proposalsMatch
        .filter(p => moment(p.created).valueOf() < range.endDate.valueOf() && moment(p.created).valueOf() > range.startDate.valueOf());
    }

    return proposalsMatch;
  }

  get selectedProposal() {
    return this.SelectedProposal;
  }

  set selectedProposal(value) {
    this.SelectedProposal = value;
  }

  loadItems() {
    this.props.getPaginatedProposals(50, (this.props.paginationOptions.page) * 50);
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
          if (a.id > b.id) {
            return directionUnits.more;
          }
          if (a.id < b.id) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      case 'protocol':
        proposalsArr.sort((a, b) => {
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
      case 'orderNumber':
        proposalsArr.sort((a, b) => {
          if (a.orderNumber > b.orderNumber) {
            return directionUnits.more;
          }
          if (a.orderNumber < b.orderNumber) {
            return directionUnits.less;
          }
          return 0;
        });
        break;
      default:
        proposalsArr.sort((a, b) => {
          if (a.orderNumber > b.orderNumber) {
            return 1;
          }
          if (a.orderNumber < b.orderNumber) {
            return -1;
          }
          return 0;
        });
        break;
    }

    this.setState({ filteredProposals: proposalsArr, activeSort: sort, activeDirection: direction });
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
    const { currentUser, sites } = this.props;
    let timezone = currentUser.timezone;
    if (currentUser.roleForClient && currentUser.roleForClient.site_id) {
      const site = _.find(sites, site => site.id === currentUser.roleForClient.site_id);
      if (site) {
        timezone = site.timezone;
      }
    }

    if (this.state.activeSort === null) {
      const directionUnits = {
        more: 1,
        less: -1,
      };
      raw.sort((a, b) => {
        const aDate = new Date(a.created).getTime();
        const bDate = new Date(b.created).getTime();
        if (aDate < bDate) {
          return directionUnits.more;
        }
        if (aDate > bDate) {
          return directionUnits.less;
        }
        return 0;
      });
    }
    _.map(raw, (source, key) => {
      const dateWrapper = moment(source.created).tz(timezone).format(translate('portals.component.proposalsTable.dateMask'));
      const sub = ((source.total % 100) === 0) ? '.00' : false;

      let proposalLink = source.id;
      let checkbox = (
        <span className={(source.selected) ? 'sm-container checked' : 'sm-container'}>
          <span className="input-style" onClick={this.onClickCurrent}>
            <input
              className="form-control"
              type="checkbox"
              name={key}
              disabled={!source.proposalpdfid}
            />
          </span>
        </span>
      );
      if (source.proposalpdfid) {
        proposalLink = <a className="show-pdf-link" onClick={() => this.props.showProposalPdf(source.id)}>{source.id}</a>;
      } else {
        checkbox = (
          <Field
            className="proposal-disabled"
            name={`proposal-${key}`}
            type="checkbox"
            disabled
            component={Checkbox}
          />
        );
      }

      result.push(
        <tr key={key}>
          <td>
            {checkbox}
            <span>{source.orderNumber}</span>
          </td>
          <td>{dateWrapper}</td>
          <td><span>{source.sitename}</span></td>
          <td>{proposalLink}</td>
          <td>{source.protocol}</td>
          <td>${(sub) ? `${(source.total / 100)}${sub}` : `${(source.total / 100).toFixed(2)}` }</td>
        </tr>
      );
    });
  }

  render() {
    const state = this.state;
    const { getPaginatedProposals, paginationOptions, proposalsStatus } = this.props;
    const proposals = [];
    const heads = [];

    this.mapHeaders(headers, state, heads);
    this.mapProposals(this.props.proposals, proposals);

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
              <th className="default-cursor">
                <span className={(state.checkAll) ? 'sm-container checked' : 'sm-container'}>
                  <span className="input-style" onClick={this.onClickAll}>
                    <input name="all" type="checkbox" />
                  </span>
                </span>
                <span
                  className={(state.activeSort === 'orderNumber') ? state.activeDirection : ''}
                >#</span>
                <i className="caret-arrow" />
              </th>
              {heads}
            </tr>
          </thead>
          <InfiniteScroll
            element="tbody"
            pageStart={0}
            loadMore={() => getPaginatedProposals(50, (paginationOptions.page) * 50)}
            initialLoad={false}
            hasMore={paginationOptions.hasMoreItems}
            loader={null}
          >
            {proposals}
            {(proposalsStatus) &&
            <tr>
              <td colSpan="6">
                <LoadingSpinner showOnlyIcon={false} noMessage />
              </td>
            </tr>
            }
          </InfiniteScroll>
        </table>
      </div>
    );
  }
}

export default ProposalsTable;
