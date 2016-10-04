/*
 *
 * Proposals
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { StickyContainer, Sticky } from 'react-sticky';
import { selectProposals } from './selectors';
import { selectCurrentUser } from 'containers/App/selectors';

import {
  getProposals,
} from 'containers/Proposals/actions';
import {
  fetchSites,
} from 'containers/App/actions';
import {
  selectSiteLocations,
} from 'containers/App/selectors';

import ProposalsTable from 'components/ProposalsTable';
import ProposalsForm from 'components/ProposalsForm';

export class Proposals extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    fetchSites: PropTypes.func,
    getProposals: PropTypes.func,
    location: PropTypes.any,
    proposals: PropTypes.any,
    currentUser: PropTypes.any,
  }

  componentDidMount() {
    this.props.fetchSites();
    this.props.getProposals({test: true});
  }

  componentWillReceiveProps(nextProps) {
    //console.log('componentWillReceiveProps', nextProps);
  }

  render() {
    return (
      <StickyContainer className="container-fluid">
        <Helmet title="Proposals - StudyKIK" />
        <section className="calendar-section receipts">
          <h2 className="main-heading">PROPOSALS</h2>
          <ProposalsForm {...this.props}/>
          <ProposalsTable {...this.props}/>
        </section>
      </StickyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
  currentUser: selectCurrentUser(),
  proposals: selectProposals(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSites: () => dispatch(fetchSites()),
    getProposals: (values) => dispatch(getProposals(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);
