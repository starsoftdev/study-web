/*
 *
 * Receipts
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { StickyContainer } from 'react-sticky';
const _ = require('lodash');

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

import selectReceipts from './selectors';
import ReceiptsTable from 'components/ReceiptsTable';
import TableSearchForm from 'components/TableSearchForm';
import './styles.less';

export class Receipts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    unsubscribeFromAll: PropTypes.func,
    unsubscribeFromPageEvent: PropTypes.func,
    fetchSites: PropTypes.func,
    getReceipts: PropTypes.func,
    createPDF: PropTypes.func,
    receipts: PropTypes.any,
    currentUser: PropTypes.any,
  };

  constructor(props, context) {
    super(props, context);

    this.createPdf = this.createPdf.bind(this);
    this.search = this.search.bind(this);
    this.selectCurrent = this.selectCurrent.bind(this);
    this.selectAll = this.selectAll.bind(this);

    this.state = {
      range: null,
      site: null,
      searchBy: null,
      processPDF: false,
      receipts: null,
      filteredReceipts: null,
    };
  }

  componentDidMount() {
    this.props.fetchSites();
    this.props.getReceipts();
  }

  componentWillReceiveProps() {
    // console.log('componentWillReceiveProps', nextProps);
  }

  get selectedReceipts() {
    return this.SelectedReceipts;
  }

  set selectedReceipts(value) {
    this.SelectedReceipts = value;
  }

  get searchOptions() {
    return this.SearchOptions;
  }

  set searchOptions(value) {
    this.SearchOptions = value;
  }

  selectCurrent(receipt) {
    this.selectedReceipts = receipt;
  }

  selectAll(receipt) {
    this.selectedReceipts = receipt;
  }

  search(event, type) {
    let options;
    this.searchOptions = this.searchOptions || [];
    if (type === 'search') {
      options = { data: event.target.value, type };
    } else if (type === 'site') {
      const { siteLocations } = this.props;
      const site = siteLocations[event - 1] || null;
      options = { data: site, type };
    } else if (type === 'range') {
      options = { data: event, type };
    }

    if (_.isEmpty(this.searchOptions)) {
      this.searchOptions.push(options);
    } else {
      let el = _.find(this.searchOptions, { type });
      if (el) {
        this.searchOptions[_.findKey(this.searchOptions, el)] = options;
      } else {
        this.searchOptions.push(options);
      }
    }

    this.props.getReceipts(this.searchOptions);
  }

  createPdf() {
    if (this.selectedReceipts) {
      this.props.createPDF(this.selectedReceipts);
    }
  }

  render() {
    return (
      <StickyContainer className="container-fluid">
        <Helmet title="Proposals - StudyKIK" />
        <section className="calendar-section receipts">
          <h2 className="main-heading">RECEIPTS</h2>
          <TableSearchForm
            changeRange={this.changeRange}
            search={this.search}
            createPdf={this.createPdf}
            {...this.props}
          />
          <ReceiptsTable
            selectCurrent={this.selectCurrent}
            selectAll={this.selectAll}
            receipts={this.props.receipts}
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
  receipts: selectReceipts(),
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
