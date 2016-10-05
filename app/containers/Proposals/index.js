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

import {
  getProposals,
} from 'containers/Proposals/actions';
import {
  fetchSites,
  fetchEvents,
} from 'containers/App/actions';
import {
  selectSiteLocations,
  selectCurrentUser,
  selectEvents,
} from 'containers/App/selectors';
import { selectProposals } from './selectors';

import ProposalsTable from 'components/ProposalsTable';
import ProposalsForm from 'components/ProposalsForm';

export class Proposals extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    fetchSites: PropTypes.func,
    fetchEvents: PropTypes.func,
    getProposals: PropTypes.func,
    location: PropTypes.any,
    proposals: PropTypes.any,
    currentUser: PropTypes.any,
  }

  constructor(props, context) {
    super(props, context);

    this.createPdf = this.createPdf.bind(this);
    this.selectCurrent = this.selectCurrent.bind(this);
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

  componentWillReceiveProps() {
    // console.log('componentWillReceiveProps', nextProps);
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

  createPdf() {
    console.log('createPdf');
    console.log('proposal', this.selectedProposal);
  }

  render() {
    return (
      <StickyContainer className="container-fluid">
        <Helmet title="Proposals - StudyKIK" />
        <section className="calendar-section receipts">
          <h2 className="main-heading">PROPOSALS</h2>
          <ProposalsForm createPdf={this.createPdf} {...this.props} />
          <ProposalsTable selectCurrent={this.selectCurrent} {...this.props} />
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
    fetchEvents: (values) => dispatch(fetchEvents(values)),
    fetchSites: () => dispatch(fetchSites()),
    getProposals: (values) => dispatch(getProposals(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);
