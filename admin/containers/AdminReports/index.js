/*
 * AdminReports
 *
 */

import React, { Component, PropTypes } from 'react';
import { change, reset, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import _, { isEqual } from 'lodash';
import { actions as toastrActions } from 'react-redux-toastr';

import StatsBox from '../../components/StatsBox';
import FiltersPageForm from '../../components/FiltersPageForm';
import ReportTabs from '../../components/ReportTabs';
import RangePopups from '../../components/RangePopups';
import FilterQueryForm from '../../components/Filter/FilterQueryForm';
import {
  clearCustomFilters, clearFilters, clearStudies, fetchCro, fetchIndications, fetchMediaTotalsForAdmin, fetchProtocols,
  fetchSources, fetchSponsors, fetchStudiesForAdmin, fetchTotalsForAdmin, fetchUsersByRole,
} from '../App/actions';
import { selectCustomFilters, selectSources, selectStudiesPaginationOptions, selectTotals, selectFilterFormValues,
  selectMediaTotals, selectStudies,
} from '../App/selectors';
import { getCampaignsStats, clearCampaigns, setActiveReportTab, exportMediaTotals } from './actions';
import { selectCampaignsStats, selectCampaignsPaginationOptions, selectActiveReportTab } from './selectors';
import { selectSocket } from '../../../app/containers/GlobalNotifications/selectors';
import { getItem } from '../../utils/localStorage';

const formName = 'adminDashboardFilters';

@reduxForm({
  form: 'adminFilter',
  enableReinitialize: true,
})
export class AdminReportsPage extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    change: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    filtersFormValues: PropTypes.object.isRequired,
    changeAdminFilters: PropTypes.func.isRequired,
    fetchStudiesForAdmin: PropTypes.func,
    fetchTotalsForAdmin: PropTypes.func,
    fetchMediaTotalsForAdmin: PropTypes.func,
    fetchSources: PropTypes.func,
    studies: PropTypes.object,
    totals: PropTypes.object,
    mediaTotals: PropTypes.object,
    sources: PropTypes.array,
    indications: PropTypes.array,
    protocols: PropTypes.object,
    sponsors: PropTypes.object,
    cro: PropTypes.object,
    usersByRoles: PropTypes.object,
    paginationOptions: PropTypes.object,
    customFilters: PropTypes.array.isRequired,
    fetchIndications: PropTypes.func,
    fetchProtocols: PropTypes.func,
    fetchSponsors: PropTypes.func,
    fetchCro: PropTypes.func,
    fetchUsersByRole: PropTypes.func,
    clearFilters: PropTypes.func,
    clearStudies: PropTypes.func,
    clearCustomFilters: PropTypes.func,
    campaignsStats: PropTypes.object,
    campaignsPaginationOptions: PropTypes.object,
    getCampaignsStats: PropTypes.func,
    clearCampaigns: PropTypes.func,
    setActiveReportTab: PropTypes.func,
    activeReportTab: PropTypes.string,
    exportMediaTotals: PropTypes.func,
    socket: React.PropTypes.any,
    toastrActions: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      socketBinded: false,
      modalOpen: false,
      activateManually: null,
      prevTotalsFilters: null,
      prevOffset: null,
    };

    this.manuallySetActiveTab = this.manuallySetActiveTab.bind(this);
    this.getCurrentFilters = this.getCurrentFilters.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.clearFiltersAndClean = this.clearFiltersAndClean.bind(this);
    this.getCampaignsStatsAccordingToFilters = this.getCampaignsStatsAccordingToFilters.bind(this);
  }

  componentWillMount() {
    const { sources, fetchSources, indications, fetchIndications, protocols, fetchProtocols, sponsors, fetchSponsors,
      cro, fetchCro, usersByRoles, fetchUsersByRole } = this.props;
    if (!sources || !sources.length) {
      fetchSources();
    }
    if (!indications || !indications.length) {
      fetchIndications();
    }
    if (!protocols || !protocols.details.length) {
      fetchProtocols();
    }
    if (!sponsors || !sponsors.details.length) {
      fetchSponsors();
    }
    if (!cro || !cro.details.length) {
      fetchCro();
    }
    if (!usersByRoles || ![...usersByRoles.sm, ...usersByRoles.bd, ...usersByRoles.ae, ...usersByRoles.cc].length) {
      fetchUsersByRole();
    }
    this.applyFilters();
  }

  componentWillReceiveProps(newProps) {
    const equal = isEqual(newProps.studies.details, this.props.studies.details);
    if (newProps.studies.details.length  && !equal) {
      const filters = this.getCurrentFilters();
      this.props.fetchMediaTotalsForAdmin(filters);
    }

    if (this.props.socket && this.state.socketBinded === false) {
      this.setState({ socketBinded: true }, () => {
        this.props.socket.on('notifyAdminReportReady', (data) => {
          const authToken = getItem('auth_token');
          if (data.url && authToken === data.authToken) {
            setTimeout(() => { this.props.toastrActions.remove('loadingToasterForExportMediaTotals'); }, 1000);
            location.replace(data.url);
          }
        });
      });
    }
  }

  getCurrentFilters() {
    const { filtersFormValues, customFilters, sources } = this.props;
    const allSources = _.cloneDeep(sources);
    const defaultSource = allSources.find(s => {
      return s.type === 'StudyKIK';
    });
    let filters = _.cloneDeep(filtersFormValues);

    // adding custom filters and remove unneeded attributes
    if (filters['admin-search-type']) {
      delete filters['admin-search-type'];
    }
    if (filters['admin-search-value']) {
      delete filters['admin-search-value'];
    }
    delete filters.campaign;
    customFilters.forEach(cf => {
      if (cf.key === 'studyNumber' && cf.value) {
        filters = { ...filters, search: { value: cf.value.trim() } };
      } else if (cf.key === 'address' && cf.value) {
        filters = { ...filters, address: { value: cf.value.trim() } };
      } else if (cf.key === 'postalCode' && cf.value) {
        filters = { ...filters, postalCode: { value: cf.value.trim() } };
      }
    });

    _.forEach(filters, (filter, k) => {
      if (k !== 'search' && k !== 'percentage' && k !== 'campaign' && k !== 'source' && k !== 'postalCode' &&
        k !== 'address' && k !== 'startDate' && k !== 'endDate') {
        const withoutAll = _.remove(filter, (item) => (item.label !== 'All'));
        filters[k] = withoutAll;
      }
    });

    if (!filters.source && defaultSource) {
      change('dashboardFilters', 'source', defaultSource.id);
      filters.source = defaultSource.id;
    }

    if (filters.source === -1) {
      change('dashboardFilters', 'source', null);
      delete filters.source;
    }

    return filters;
  }

  applyFilters(fetchByScroll = false) {
    const { change, totals, clearFilters, fetchTotalsForAdmin, fetchStudiesForAdmin, sources, paginationOptions } = this.props;
    const { prevTotalsFilters, prevOffset } = this.state;

    const allSources = _.cloneDeep(sources);
    const defaultSource = allSources.find(s => {
      return s.type === 'StudyKIK';
    });
    const filters = this.getCurrentFilters();
    let isEmpty = true;

    _.forEach(filters, (filter) => {
      if (!_.isEmpty(filter) || filter > 0) {
        isEmpty = false;
      }
    });

    let offset = 0;
    const limit = 50;

    if (fetchByScroll) {
      offset = paginationOptions.page * limit;
    } else {
      clearStudies();
    }

    if (defaultSource && filters.source === defaultSource.id) {
      change('dashboardFilters', 'source', defaultSource.id);
    } else if (!filters.source) {
      change('dashboardFilters', 'source', null);
    }

    if (isEmpty) {
      clearFilters();
      this.setState({ prevTotalsFilters: null });
    } else if (_.isEqual(prevTotalsFilters, filters)) {
      if (prevOffset !== offset || _.isEmpty(totals.details)) {
        fetchTotalsForAdmin(filters);
        fetchStudiesForAdmin(filters, limit, offset);
        this.setState({ prevOffset: offset });
      }
    } else {
      this.setState({ prevTotalsFilters: _.cloneDeep(filters) });
      fetchTotalsForAdmin(filters);
      fetchStudiesForAdmin(filters, limit, offset);
      this.setState({ prevOffset: offset });
    }
  }

  getCampaignsStatsAccordingToFilters(fetchByScroll = false) {
    const { campaignsPaginationOptions, getCampaignsStats, clearCampaigns } = this.props;

    const filters = this.getCurrentFilters();

    let offset = 0;
    const limit = 50;

    if (fetchByScroll) {
      offset = campaignsPaginationOptions.page * limit;
    } else {
      clearCampaigns();
    }
    getCampaignsStats(filters, limit, offset);
  }

  manuallySetActiveTab(activeTab) {
    this.setState({ activateManually: activeTab });
  }

  clearFiltersAndClean() {
    const { resetForm, clearCustomFilters, clearStudies, changeAdminFilters } = this.props;
    clearCustomFilters();
    resetForm();
    clearStudies();
    changeAdminFilters('startDate', null);
    changeAdminFilters('endDate', null);
    this.setState({ prevOffset: null, prevTotalsFilters: null });
  }

  render() {
    const { activateManually } = this.state;
    const { resetForm, totals, filtersFormValues, changeAdminFilters, mediaTotals, studies, paginationOptions,
      fetchMediaTotalsForAdmin, campaignsStats, campaignsPaginationOptions, setActiveReportTab, activeReportTab, exportMediaTotals } = this.props;
    const filterUnchanged = _.isEqual(this.state.prevTotalsFilters, this.getCurrentFilters());
    const currentFilters = this.getCurrentFilters();
    let disableDownload = false;

    const campaignSelected = (typeof filtersFormValues.campaign === 'string');

    if (!campaignsStats.details.length && activeReportTab === 'studyEndDateRange') {
      disableDownload = true;
    }

    return (
      <div id="adminHomePage" className="admin-dashboard">
        <div className="fixed-header clearfix">
          <h1 className="main-heading pull-left">Admin portal</h1>
          <FiltersPageForm />
        </div>
        <FilterQueryForm
          resetForm={resetForm}
          changeAdminFilters={changeAdminFilters}
          applyFilters={this.applyFilters}
          clearFilters={this.clearFiltersAndClean}
          filterUnchanged={filterUnchanged}
        />
        <RangePopups
          manuallySetActiveTab={this.manuallySetActiveTab}
          fetchMediaTotalsForAdmin={fetchMediaTotalsForAdmin}
          getCampaignsStats={this.getCampaignsStatsAccordingToFilters}
          studies={studies}
          changeAdminFilters={changeAdminFilters}
          currentFilters={currentFilters}
          applyFilters={this.applyFilters}
          activeReportTab={activeReportTab}
          exportMediaTotals={exportMediaTotals}
          paginationOptions={paginationOptions}
          setActiveReportTab={setActiveReportTab}
          disableDownload={disableDownload}
        />
        <StatsBox
          totals={totals}
          campainSelected={campaignSelected}
        />
        {(totals.details && totals.details.total_studies) && (
          <ReportTabs
            activateManually={activateManually}
            manuallySetActiveTab={this.manuallySetActiveTab}
            mediaTotals={mediaTotals}
            studies={studies}
            campaignsStats={campaignsStats}
            paginationOptions={paginationOptions}
            campaignsPaginationOptions={campaignsPaginationOptions}
            filtersFormValues={filtersFormValues}
            loadItems={() => this.applyFilters(true)}
            loadCampaignItems={() => this.getCampaignsStatsAccordingToFilters(true)}
            setActiveReportTab={setActiveReportTab}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  filtersFormValues: selectFilterFormValues(),
  paginationOptions: selectStudiesPaginationOptions(),
  totals: selectTotals(),
  studies: selectStudies(),
  mediaTotals: selectMediaTotals(),
  sources: selectSources(),
  customFilters: selectCustomFilters(),
  campaignsPaginationOptions: selectCampaignsPaginationOptions(),
  campaignsStats: selectCampaignsStats(),
  activeReportTab: selectActiveReportTab(),
  socket: selectSocket(),
});

const mapDispatchToProps = (dispatch) => ({
  change: (fName, name, value) => dispatch(change(fName, name, value)),
  changeAdminFilters: (name, value) => dispatch(change(formName, name, value)),
  fetchStudiesForAdmin: (params, limit, offset) => dispatch(fetchStudiesForAdmin(params, limit, offset)),
  fetchTotalsForAdmin: (params, limit, offset) => dispatch(fetchTotalsForAdmin(params, limit, offset)),
  fetchMediaTotalsForAdmin: (params) => dispatch(fetchMediaTotalsForAdmin(params)),
  resetForm: () => dispatch(reset(formName)),
  fetchIndications: () => dispatch(fetchIndications()),
  fetchProtocols: () => dispatch(fetchProtocols()),
  fetchSponsors: () => dispatch(fetchSponsors()),
  fetchSources: () => dispatch(fetchSources()),
  fetchUsersByRole: () => dispatch(fetchUsersByRole()),
  fetchCro: () => dispatch(fetchCro()),
  clearFilters: () => dispatch(clearFilters()),
  clearStudies: () => dispatch(clearStudies()),
  clearCampaigns: () => dispatch(clearCampaigns()),
  clearCustomFilters: () => dispatch(clearCustomFilters()),
  getCampaignsStats: (params, limit, offset) => dispatch(getCampaignsStats(params, limit, offset)),
  setActiveReportTab: (activeTab) => dispatch(setActiveReportTab(activeTab)),
  exportMediaTotals: (params) => dispatch(exportMediaTotals(params)),
  toastrActions: bindActionCreators(toastrActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminReportsPage);
