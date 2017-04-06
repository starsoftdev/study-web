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
  createPDF,
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
} from '../../containers/App/selectors';
import { selectProposals } from './selectors';

import ProposalsTable from '../../components/ProposalsTable';
import TableSearchForm from '../../components/TableSearchForm';
import AlertModal from '../../components/AlertModal';

export class Proposals extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    unsubscribeFromAll: PropTypes.func,
    unsubscribeFromPageEvent: PropTypes.func,
    fetchClientSites: PropTypes.func,
    fetchEvents: PropTypes.func,
    getProposals: PropTypes.func,
    createPDF: PropTypes.func,
    location: PropTypes.any,
    proposals: PropTypes.any,
    currentUser: PropTypes.any,
    showProposalPdf: PropTypes.func,
  }

  constructor(props, context) {
    super(props, context);

    this.createPdf = this.createPdf.bind(this);
    this.changeRange = this.changeRange.bind(this);
    this.selectCurrent = this.selectCurrent.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      range: null,
      site: null,
      searchBy: null,
      processPDF: false,
      proposals: null,
      filteredProposals: null,
      showAlertModal: false,
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

    const { currentUser, fetchClientSites, fetchEvents, getProposals } = this.props;
    fetchClientSites(currentUser.roleForClient.client_id);
    getProposals();
    fetchEvents(events);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.proposals) {
      for (const proposal of nextProps.proposals) {
        proposal.selected = false;
      }
      this.setState({
        proposals: nextProps.proposals,
      });
    }

    const { currentUser, siteLocations } = nextProps;

    if (siteLocations.length > 0 && this.props.siteLocations.length < 1) {
      const isAdmin = currentUser && (currentUser.roleForClient && currentUser.roleForClient.name) === 'Super Admin';
      let bDisabled = true;
      if (currentUser && currentUser.roleForClient) {
        bDisabled = !(currentUser.roleForClient.canPurchase || currentUser.roleForClient.canRedeemRewards || currentUser.roleForClient.name === 'Super Admin');
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

  get selectedProposal() {
    return this.SelectedProposal;
  }

  set selectedProposal(value) {
    this.SelectedProposal = value;
  }

  selectCurrent(proposal) {
    this.selectedProposal = proposal;
  }

  selectAll(proposals) {
    this.selectedProposal = proposals;
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
    }

    if (type === 'site') {
      const site = siteLocations[value - 1] || null;

      this.setState({
        site,
      });
    }
  }

  createPdf() {
    if (this.selectedProposal) {
      this.props.createPDF(this.selectedProposal);
    } else {
      this.setState({
        showAlertModal: true,
      });
    }
  }

  hideAlertModal = () => {
    this.setState({
      showAlertModal: false,
    });
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
            createPdf={this.createPdf}
            {...this.props}
          />
          <AlertModal show={this.state.showAlertModal} onHide={this.hideAlertModal} name="proposal" />
          <ProposalsTable
            currentUser={this.props.currentUser}
            selectCurrent={this.selectCurrent}
            selectAll={this.selectAll}
            range={this.state.range}
            site={this.state.site}
            searchBy={this.state.searchBy}
            proposals={this.state.proposals}
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
  currentUser: selectCurrentUser(),
  proposals: selectProposals(),
  pageEvents: selectEvents(),
});

function mapDispatchToProps(dispatch) {
  return {
    unsubscribeFromAll: (values) => dispatch(unsubscribeFromAll(values)),
    unsubscribeFromPageEvent: (values) => dispatch(unsubscribeFromPageEvent(values)),
    fetchEvents: (values) => dispatch(fetchEvents(values)),
    fetchClientSites: (id) => dispatch(fetchClientSites(id)),
    getProposals: (values) => dispatch(getProposals(values)),
    createPDF: (values) => dispatch(createPDF(values)),
    showProposalPdf: (values) => dispatch(showProposalPdf(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);
