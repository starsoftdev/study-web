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
} from '../../containers/App/selectors';

import { selectReceiptsList, selectPaginationOptions, selectSearchOptions } from './selectors';
import ReceiptsTable from '../../components/ReceiptsTable';
import TableSearchForm from '../../components/TableSearchForm';
import AlertModal from '../../components/AlertModal';

export class Receipts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    siteLocations: PropTypes.array,
    fetchClientSites: PropTypes.func.isRequired,
    getReceipts: PropTypes.func,
    getPDF: PropTypes.func,
    receipts: PropTypes.array,
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
      showAlertModal: false,
    };
  }

  componentDidMount() {
    const { currentUser, fetchClientSites } = this.props;
    fetchClientSites(currentUser.roleForClient.client_id);
  }

  componentWillReceiveProps(nProps) {
    const { currentUser, siteLocations } = nProps;

    if (siteLocations !== this.props.siteLocations) {
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
        this.search(defaultValue, 'site');
      } else {
        this.props.getReceipts(currentUser.roleForClient.id, 15, 0, this.props.receipts);
      }
    }
  }

  getPDF() {
    if (this.selectedReceipts) {
      this.props.getPDF(this.selectedReceipts);
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
    if (type === 'search' && event.target.value) {
      options = { data: event.target.value, type };
    } else if (type === 'site') {
      const { siteLocations } = this.props;
      const site = siteLocations[event - 1] || null;
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

    getReceipts(currentUser.roleForClient.id, 15, 0, receipts, paginationOptions.activeSort, paginationOptions.activeDirection, this.searchOptions);
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
            {...this.props}
          />
          <AlertModal show={this.state.showAlertModal} onHide={this.hideAlertModal} name="receipt" />
          <ReceiptsTable
            currentUser={this.props.currentUser}
            selectCurrent={this.selectCurrent}
            selectAll={this.selectAll}
            getReceipts={this.props.getReceipts}
            receipts={this.props.receipts}
            paginationOptions={this.props.paginationOptions}
            searchOptions={this.props.searchOptions}
            setActiveSort={this.props.setActiveSort}
            showInvoicePdf={this.props.showInvoicePdf}
            sortProposalsSuccess={this.props.sortProposalsSuccess}
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
  receipts: selectReceiptsList(),
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
