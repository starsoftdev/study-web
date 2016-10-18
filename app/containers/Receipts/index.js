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

// import LoadingSpinner from 'components/LoadingSpinner';
import {
  getReceipts,
  createPDF,
} from 'containers/Receipts/actions';
import {
  fetchSites,
  fetchEvents,
} from 'containers/App/actions';
import {
  selectSiteLocations,
  selectCurrentUser,
  selectEvents,
} from 'containers/App/selectors';

// import selectReceipts from './selectors';
// import ProposalsTable from 'components/ProposalsTable';
import ProposalsForm from 'components/ProposalsForm';
import './styles.less';

export class Receipts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    unsubscribeFromAll: PropTypes.func,
    unsubscribeFromPageEvent: PropTypes.func,
    fetchSites: PropTypes.func,
    getReceipts: PropTypes.func,
    createPDF: PropTypes.func,
    location: PropTypes.any,
    proposals: PropTypes.any,
    currentUser: PropTypes.any,
  }

  constructor(props, context) {
    super(props, context);

    this.createPdf = this.createPdf.bind(this);
    this.changeRange = this.changeRange.bind(this);
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
    this.props.fetchSites();
    this.props.getReceipts();
  }

  changeRange(payload) {
    this.setState({
      site : null,
      searchBy : null,
      range : payload,
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
    return (
      <StickyContainer className="container-fluid">
        <Helmet title="Proposals - StudyKIK" />
        <section className="calendar-section receipts">
          <h2 className="main-heading">RECEIPTS</h2>
          <ProposalsForm
            changeRange={this.changeRange}
            selectSite={this.selectSite}
            search={this.search}
            createPdf={this.createPdf}
            {...this.props}
          />
        </section>
      </StickyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
  currentUser: selectCurrentUser(),
  pageEvents: selectEvents(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchEvents: (values) => dispatch(fetchEvents(values)),
    fetchSites: () => dispatch(fetchSites()),
    getReceipts: (values) => dispatch(getReceipts(values)),
    createPDF: (values) => dispatch(createPDF(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);
