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
import _ from 'lodash';

import {
  getReceipts,
  getPDF,
  setSearchOptions,
  setActiveSort,
  showInvoicePdf,
  sortProposalsSuccess,
} from '../../containers/Receipts/actions';
import {
  fetchClientSites,
  fetchEvents,
} from '../../containers/App/actions';
import {
  selectSiteLocations,
  selectCurrentUser,
  selectEvents,
  selectSites,
} from '../../containers/App/selectors';

import { selectReceiptsList, selectPaginationOptions, selectSearchOptions, selectReceiptsStatus } from './selectors';
import ReceiptsTable from '../../components/ReceiptsTable';
import TableSearchForm from '../../components/TableSearchForm';

export class Receipts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    sites: PropTypes.array,
    fetchClientSites: PropTypes.func.isRequired,
    getReceipts: PropTypes.func,
    getPDF: PropTypes.func,
    receipts: PropTypes.array,
    receiptsStatus: PropTypes.bool,
    currentUser: PropTypes.any,
    paginationOptions: PropTypes.object,
    searchOptions: PropTypes.array,
    setSearchOptions: PropTypes.func.isRequired,
    setActiveSort: PropTypes.func.isRequired,
    showInvoicePdf: PropTypes.func.isRequired,
    sortProposalsSuccess: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.getPDF = this.getPDF.bind(this);
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
      downloadBtnDisabled: true,
    };
  }

  componentDidMount() {
    const { currentUser, fetchClientSites, getReceipts, receipts } = this.props;
    fetchClientSites(currentUser.roleForClient.client_id);
    getReceipts(currentUser.roleForClient.id, 50, 0, receipts);
  }

  componentWillReceiveProps(nProps) {
    const { currentUser, siteLocations } = nProps;

    if (siteLocations !== this.props.siteLocations) {
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
        this.search(defaultValue, 'site');
      }
    }
  }

  getPDF() {
    if (this.selectedReceipts) {
      this.props.getPDF(this.selectedReceipts);
    }
  }

  get selectedReceipts() {
    return this.SelectedReceipts;
  }

  set selectedReceipts(value) {
    this.SelectedReceipts = value;
    this.updateBtnState();
  }

  get searchOptions() {
    return this.SearchOptions;
  }

  set searchOptions(value) {
    this.SearchOptions = value;
  }

  selectCurrent(receipt) {
    this.selectedReceipts = receipt;
    this.updateBtnState();
  }

  selectAll(receipt) {
    this.selectedReceipts = receipt;
    this.updateBtnState();
  }

  updateBtnState() {
    const noItems = !(this.SelectedReceipts && this.selectedReceipts.length);
    if (this.state.downloadBtnDisabled !== noItems) {
      this.setState({ downloadBtnDisabled: noItems });
    }
  }

  search(event, type) {
    let options;
    this.searchOptions = this.searchOptions || [];
    if (type === 'search' && event.target.value) {
      options = { data: event.target.value, type };
    } else if (type === 'site') {
      const { siteLocations } = this.props;
      const site = _.find(siteLocations, (item) => (item.id === event));
      if (site) {
        options = { data: site, type };
      }
    } else if (type === 'range') {
      options = { data: event, type };
    }

    if (options) {
      if (_.isEmpty(this.searchOptions)) {
        this.searchOptions.push(options);
      } else {
        const el = _.find(this.searchOptions, { type });
        if (el) {
          this.searchOptions[_.findKey(this.searchOptions, el)] = options;
        } else {
          this.searchOptions.push(options);
        }
      }
    } else if (!_.isEmpty(this.searchOptions)) {
      const el = _.find(this.searchOptions, { type });
      if (el) {
        this.searchOptions.splice(_.findKey(this.searchOptions, el), 1);
      }
    }

    const { currentUser, getReceipts, paginationOptions, receipts, setSearchOptions } = this.props;
    setSearchOptions(this.searchOptions);

    getReceipts(currentUser.roleForClient.id, 50, 0, receipts, paginationOptions.activeSort, paginationOptions.activeDirection, this.searchOptions);
  }

  render() {
    return (
      <StickyContainer className="container-fluid">
        <Helmet title="Receipts - StudyKIK" />
        <section className="receipts">
          <h2 className="main-heading">RECEIPTS</h2>
          <TableSearchForm
            changeRange={this.changeRange}
            search={this.search}
            createPdf={this.getPDF}
            downloadBtnDisabled={this.state.downloadBtnDisabled}
            {...this.props}
          />
          <ReceiptsTable
            currentUser={this.props.currentUser}
            selectCurrent={this.selectCurrent}
            selectAll={this.selectAll}
            getReceipts={this.props.getReceipts}
            receipts={this.props.receipts}
            receiptsStatus={this.props.receiptsStatus}
            paginationOptions={this.props.paginationOptions}
            searchOptions={this.props.searchOptions}
            setActiveSort={this.props.setActiveSort}
            showInvoicePdf={this.props.showInvoicePdf}
            sortProposalsSuccess={this.props.sortProposalsSuccess}
            sites={this.props.sites}
            {...this.props}
          />
        </section>
      </StickyContainer>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  siteLocations : selectSiteLocations(),
  sites : selectSites(),
  currentUser: selectCurrentUser(),
  receipts: selectReceiptsList(),
  receiptsStatus: selectReceiptsStatus(),
  pageEvents: selectEvents(),
  paginationOptions: selectPaginationOptions(),
  searchOptions: selectSearchOptions(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchEvents: (values) => dispatch(fetchEvents(values)),
    fetchClientSites: (id) => dispatch(fetchClientSites(id)),
    getReceipts: (clientRoleId, limit, offset, receipts, orderBy, orderDir, values) => dispatch(getReceipts(clientRoleId, limit, offset, receipts, orderBy, orderDir, values)),
    getPDF: (values) => dispatch(getPDF(values)),
    setSearchOptions: (payload) => dispatch(setSearchOptions(payload)),
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    showInvoicePdf: (values) => dispatch(showInvoicePdf(values)),
    sortProposalsSuccess: (values) => dispatch(sortProposalsSuccess(values)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Receipts);
