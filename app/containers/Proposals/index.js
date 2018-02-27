/*
 *
 * Proposals
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { StickyContainer } from 'react-sticky';

import LoadingSpinner from '../../components/LoadingSpinner';
import {
  getProposals,
  getPDF,
  showProposalPdf,
} from '../../containers/Proposals/actions';
import {
  fetchClientSites,
  fetchEvents,
} from '../../containers/App/actions';
import {
  unsubscribeFromAll,
  unsubscribeFromPageEvent,
} from '../../containers/GlobalNotifications/actions';
import {
  selectSiteLocations,
  selectCurrentUser,
  selectEvents,
  selectSites,
} from '../../containers/App/selectors';
import { selectProposalsList, selectProposalsStatus, selectPaginationOptions } from './selectors';

import ProposalsTable from '../../components/ProposalsTable';
import TableSearchForm from '../../components/TableSearchForm';

export class Proposals extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    currentUser: PropTypes.object,
    getPDF: PropTypes.func,
    fetchClientSites: PropTypes.func,
    fetchEvents: PropTypes.func,
    getProposals: PropTypes.func,
    location: PropTypes.object,
    proposals: PropTypes.array,
    showProposalPdf: PropTypes.func,
    siteLocations: PropTypes.array,
    sites: PropTypes.array,
    unsubscribeFromAll: PropTypes.func,
    unsubscribeFromPageEvent: PropTypes.func,
    paginationOptions: PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);

    this.getPDF = this.getPDF.bind(this);
    this.changeRange = this.changeRange.bind(this);
    this.selectCurrent = this.selectCurrent.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.search = this.search.bind(this);
    this.getPaginatedProposals = this.getPaginatedProposals.bind(this);

    this.state = {
      range: null,
      site: null,
      searchBy: null,
      processPDF: false,
      proposals: null,
      filteredProposals: null,
      downloadBtnDisabled: true,
    };
  }

  componentDidMount() {
    const events = [
      {
        events: [
          'twilio-message',
        ],
        raw: { pathname: this.props.location.pathname },
        cb: (err, data) => {
          console.log('received', err, data);
        },
      },
      {
        events: [
          'create-patient',
        ],
        raw: { pathname: this.props.location.pathname },
        cb: (err, data) => {
          console.log('received', err, data);
        },
      },
    ];

    const { currentUser, fetchClientSites, fetchEvents } = this.props;
    fetchClientSites(currentUser.roleForClient.client_id);
    this.getPaginatedProposals(50, 0);
    fetchEvents(events);
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, siteLocations } = nextProps;

    if (siteLocations.length > 0 && this.props.siteLocations.length < 1) {
      const isAdmin = currentUser && (currentUser.roleForClient && currentUser.roleForClient.name) === 'Super Admin';
      let bDisabled = true;
      if (currentUser && currentUser.roleForClient) {
        bDisabled = !(currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin' || currentUser.roleForClient.name === 'Admin');
      }
      let defaultValue = null;
      if (!isAdmin && bDisabled) {
        defaultValue = currentUser.site_id;
        if (currentUser && currentUser.roleForClient) {
          defaultValue = currentUser.roleForClient.site_id;
        }
        const site = siteLocations[defaultValue - 1] || null;

        this.setState({
          site,
        });
      }
    }
  }

  componentWillUnmount() {
    this.props.unsubscribeFromPageEvent({
      events: ['twilio-message'],
      raw: { pathname: this.props.location.pathname },
      cb: (err, data) => {
        console.log(err, data);
      },
    });
  }

  getPaginatedProposals(limit, offset) {
    const { currentUser, proposals } = this.props;
    this.props.getProposals(currentUser.roleForClient.id, limit, offset, proposals);
  }

  getPDF() {
    if (this.selectedProposal) {
      this.props.getPDF(this.selectedProposal);
    }
  }

  get selectedProposal() {
    return this.SelectedProposal;
  }

  set selectedProposal(value) {
    this.SelectedProposal = value;
    this.updateBtnState();
  }

  selectCurrent(proposal) {
    this.selectedProposal = proposal;
    this.updateBtnState();
  }

  selectAll(proposals) {
    this.selectedProposal = proposals;
    this.updateBtnState();
  }

  updateBtnState() {
    const noItems = !(this.selectedProposal && this.selectedProposal.length);
    if (this.state.downloadBtnDisabled !== noItems) {
      this.setState({ downloadBtnDisabled: noItems });
    }
  }

  changeRange(payload) {
    this.setState({
      site : null,
      searchBy : null,
      range : payload,
    });
  }

  search(value, type) {
    const { siteLocations } = this.props;

    if (type === 'search') {
      const searchBy = (value.target.value.length) ? value.target.value : null;

      this.setState({
        searchBy,
      });
    } else if (type === 'site') {
      const site = siteLocations.find(item => item.id === value);

      this.setState({
        site,
      });
    } else if (type === 'range') {
      this.setState({
        range: value,
      });
    }
  }

  render() {
    const { processPDF } = this.state;
    return (
      <StickyContainer className="container-fluid">
        <Helmet title="Proposals - StudyKIK" />
        <section className="receipts">
          <h2 className="main-heading">PROPOSALS</h2>
          <TableSearchForm
            changeRange={this.changeRange}
            search={this.search}
            createPdf={this.getPDF}
            downloadBtnDisabled={this.state.downloadBtnDisabled}
            {...this.props}
          />
          <ProposalsTable
            currentUser={this.props.currentUser}
            selectCurrent={this.selectCurrent}
            selectAll={this.selectAll}
            range={this.state.range}
            site={this.state.site}
            searchBy={this.state.searchBy}
            proposals={this.state.proposals}
            getPaginatedProposals={this.getPaginatedProposals}
            proposalsStatus={this.state.proposalsStatus}
            paginationOptions={this.props.paginationOptions}
            showProposalPdf={showProposalPdf}
            {...this.props}
          />
          {processPDF
            ?
              <div>
                <div className="loading-bacground"></div>
                <div className="loading-container">
                  <LoadingSpinner showOnlyIcon size={20} />
                </div>
              </div>
            : null
          }
        </section>
      </StickyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
  sites : selectSites(),
  currentUser: selectCurrentUser(),
  proposals: selectProposalsList(),
  proposalsStatus: selectProposalsStatus(),
  paginationOptions: selectPaginationOptions(),
  pageEvents: selectEvents(),
});

function mapDispatchToProps(dispatch) {
  return {
    unsubscribeFromAll: (values) => dispatch(unsubscribeFromAll(values)),
    unsubscribeFromPageEvent: (values) => dispatch(unsubscribeFromPageEvent(values)),
    fetchEvents: (values) => dispatch(fetchEvents(values)),
    fetchClientSites: (id) => dispatch(fetchClientSites(id)),
    getProposals: (clientRoleId, limit, offset, proposals, searchParams) => dispatch(getProposals(clientRoleId, limit, offset, proposals, searchParams)),
    getPDF: (values) => dispatch(getPDF(values)),
    showProposalPdf: (values) => dispatch(showProposalPdf(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);
