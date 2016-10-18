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

import LoadingSpinner from 'components/LoadingSpinner';
import {
  getProposals,
  createPDF,
} from 'containers/Proposals/actions';
import {
  fetchSites,
  fetchEvents,
} from 'containers/App/actions';
import {
  unsubscribeFromAll,
  unsubscribeFromPageEvent,
} from 'containers/GlobalNotifications/actions';
import {
  selectSiteLocations,
  selectCurrentUser,
  selectEvents,
} from 'containers/App/selectors';
import { selectProposals } from './selectors';

import ProposalsTable from 'components/ProposalsTable';
import ProposalsForm from 'components/ProposalsForm';
import './styles.less';

export class Proposals extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    unsubscribeFromAll: PropTypes.func,
    unsubscribeFromPageEvent: PropTypes.func,
    fetchSites: PropTypes.func,
    fetchEvents: PropTypes.func,
    getProposals: PropTypes.func,
    createPDF: PropTypes.func,
    location: PropTypes.any,
    proposals: PropTypes.any,
    currentUser: PropTypes.any,
  }

  constructor(props, context) {
    super(props, context);

    this.createPdf = this.createPdf.bind(this);
    this.changeRange = this.changeRange.bind(this);
    this.selectCurrent = this.selectCurrent.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectSite = this.selectSite.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      range: null,
      site: null,
      searchBy: null,
      processPDF: false,
      proposals: null,
      filteredProposals: null,
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

    this.props.fetchSites();
    this.props.getProposals();
    this.props.fetchEvents(events);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', nextProps);

    if (nextProps.proposals) {
      for (const proposal of nextProps.proposals) {
        proposal.selected = false;
      }
      this.setState({
        proposals: nextProps.proposals,
      });
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
    }, () => {
      // console.log('state', this.state);
    });
  }

  selectSite(val) {
    const { siteLocations } = this.props;
    const site = siteLocations[val - 1];
    this.setState({
      range : null,
      searchBy : null,
      site,
    });
  }

  search(value) {
    const searchBy = (value.length) ? value : null;
    this.setState({
      site : null,
      range : null,
      searchBy,
    });
  }

  createPdf() {
    if (this.selectedProposal) {
      this.props.createPDF(this.selectedProposal);
    }
  }

  render() {
    const { processPDF } = this.state;
    return (
      <StickyContainer className="container-fluid">
        <Helmet title="Proposals - StudyKIK" />
        <section className="calendar-section receipts">
          <h2 className="main-heading">PROPOSALS</h2>
          <ProposalsForm
            changeRange={this.changeRange}
            selectSite={this.selectSite}
            search={this.search}
            createPdf={this.createPdf}
            {...this.props}
          />
          <ProposalsTable
            selectCurrent={this.selectCurrent}
            selectAll={this.selectAll}
            range={this.state.range}
            site={this.state.site}
            searchBy={this.state.searchBy}
            proposals={this.state.proposals}
            {...this.props}
          />
          {processPDF
            ?
            <div>
              <div className="loading-bacground"></div>
              <div className="loading-container">
                <LoadingSpinner showOnlyIcon size={20} className="saving-card" />
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
    fetchSites: () => dispatch(fetchSites()),
    getProposals: (values) => dispatch(getProposals(values)),
    createPDF: (values) => dispatch(createPDF(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);
