/*
 *
 * Receipts
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
import selectReceipts from './selectors';

import ProposalsTable from 'components/ProposalsTable';
import ProposalsForm from 'components/ProposalsForm';
import './styles.less';

export class Receipts extends React.Component { // eslint-disable-line react/prefer-stateless-function
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

    this.state = {
      range: null,
      site: null,
      searchBy: null,
      processPDF: false,
      proposals: null,
      filteredProposals: null,
    };
  }

  render() {
    return (
      <StickyContainer className="container-fluid">
        <Helmet title="Proposals - StudyKIK" />
        <section className="calendar-section receipts">
          <h2 className="main-heading">RECEIPTS</h2>
        </section>
      </StickyContainer>
    );
  }
}

const mapStateToProps = selectReceipts();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);
