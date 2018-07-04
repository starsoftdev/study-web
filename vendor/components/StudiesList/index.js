import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import ReactTooltip from 'react-tooltip';

import LoadingSpinner from '../../components/LoadingSpinner';
import { selectCurrentUser } from '../../containers/App/selectors';
import { setActiveSort, sortSuccess, fetchStudies } from '../../containers/VendorHome/actions';
import { selectStudies, selectPaginationOptions } from '../../containers/VendorHome/selectors';
import StudyItem from './StudyItem';
import { translate } from '../../../common/utilities/localization';
import pqsImage from '../../../app/assets/images/pqs2.png';

class StudiesList extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    sites: PropTypes.object,
    currentUser: PropTypes.object.isRequired,
    paginationOptions: React.PropTypes.object,
    setActiveSort: PropTypes.func,
    sortSuccess: PropTypes.func,
    studies: PropTypes.object,
    fetchStudies: PropTypes.func,
    queryParams: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.sortBy = this.sortBy.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.renderStudiesTable = this.renderStudiesTable.bind(this);
  }

  componentWillUnmount() {
    const defaultSort = 'orderNumber';
    this.props.setActiveSort(defaultSort, null);
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';
    const defaultSort = 'orderNumber';

    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveSort(sort, direction);

    const dir = ((direction === 'down') ? 'desc' : 'asc');
    const sorted = _.orderBy(this.props.studies.details, [function (o) {
      if (sort === 'indication') {
        return o.indication.name;
      }
      return o[(sort || defaultSort)];
    }], [dir]);
    this.props.sortSuccess(sorted);
  }

  loadItems() {
    console.log('loadItems');
    const { queryParams, studies } = this.props;

    let allowFetch = false;

    if (queryParams.status === 'Active') {
      allowFetch = (studies.active > queryParams.skip);
    } else if (queryParams.status === 'Inactive') {
      allowFetch = (studies.inactive > queryParams.skip);
    } else {
      allowFetch = (studies.total > queryParams.skip);
    }

    if (queryParams.hasMoreItems && !studies.fetching && allowFetch) {
      const params = queryParams;
      params.filter = false;
      this.props.fetchStudies(this.props.currentUser, params);
    }
  }

  renderStudiesTable() {
    const { studies, currentUser, queryParams } = this.props;

    const studiesListContents = studies.details.map((item, index) => {
      return (
        <StudyItem
          {...item}
          orderNumber={index + 1}
          currentUser={currentUser}
          key={index}
          index={index}
          unreadMessageCount={item.unreadMessageCount}
        />
      );
    });

    let showSpinner = false;

    if (queryParams.status === 'Active') {
      showSpinner = (studies.active > queryParams.skip);
    } else if (queryParams.status === 'Inactive') {
      showSpinner = (studies.inactive > queryParams.skip);
    } else {
      showSpinner = (studies.total > queryParams.skip);
    }

    if (!studies.details.length && studies.fetching) {
      return (
        <tbody>
          <tr>
            <td colSpan="9">
              <LoadingSpinner showOnlyIcon={false} noMessage />
            </td>
          </tr>
        </tbody>
      );
    }

    if (studies.details.length > 0) {
      return (
        <InfiniteScroll
          element="tbody"
          pageStart={0}
          loadMore={this.loadItems}
          initialLoad={false}
          hasMore={queryParams.hasMoreItems}
          loader={null}
        >
          {studiesListContents}
          {(studies.fetching && showSpinner) &&
            <tr>
              <td colSpan="9">
                <LoadingSpinner showOnlyIcon={false} noMessage />
              </td>
            </tr>
          }
        </InfiniteScroll>
      );
    }

    return null;
  }

  render() {
    const { studies } = this.props;

    return (
      <div className="studies">
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="table has-absolute-caption">
                <caption className="absolute-caption">
                  <span className="pull-left">{translate('portals.client.component.studiesList.tableTitle')}</span>
                  <span className="pull-right">
                    <span className="inner-info">
                      <span className="info-label">{translate('portals.client.component.studiesList.active')}</span>
                      <span className="info-value">{studies.active || 0}</span>
                    </span>
                    <span className="inner-info">
                      <span className="info-label">{translate('portals.client.component.studiesList.inactive')}</span>
                      <span className="info-value">{studies.inactive || 0}</span>
                    </span>
                    <span className="inner-info">
                      <span className="info-label">{translate('portals.client.component.studiesList.total')}</span>
                      <span className="info-value">{studies.total || 0}</span>
                    </span>
                  </span>
                </caption>
                <thead>
                  <tr>
                    <th className="default-cursor">#<i className="caret-arrow" /></th>
                    <th onClick={this.sortBy} data-sort="indication" className={(this.props.paginationOptions.activeSort === 'indication') ? this.props.paginationOptions.activeDirection : ''}>
                      {translate('portals.client.component.studiesList.indication')}
                      <i className="caret-arrow" />
                    </th>
                    <th onClick={this.sortBy} data-sort="location" className={(this.props.paginationOptions.activeSort === 'location') ? this.props.paginationOptions.activeDirection : ''}>
                      {translate('portals.client.component.studiesList.location')}
                      <i className="caret-arrow" />
                    </th>
                    <th onClick={this.sortBy} data-sort="sponsor" className={(this.props.paginationOptions.activeSort === 'sponsor') ? this.props.paginationOptions.activeDirection : ''}>
                      {translate('portals.client.component.studiesList.sponsor')}
                      <i className="caret-arrow" />
                    </th>
                    <th onClick={this.sortBy} data-sort="protocol" className={(this.props.paginationOptions.activeSort === 'protocol') ? this.props.paginationOptions.activeDirection : ''}>
                      {translate('portals.client.component.studiesList.protocol')}
                      <i className="caret-arrow" />
                    </th>
                    <th className="default-cursor">
                      <img className="pqs-logo" src={pqsImage} alt="" data-for="pqs-logo" data-tip={translate('portals.client.component.studiesList.pqs')} />
                      <ReactTooltip id="pqs-logo" type="info" class="tooltipClass wide" effect="solid" />
                    </th>
                    <th onClick={this.sortBy} data-sort="status" className={(this.props.paginationOptions.activeSort === 'status') ? this.props.paginationOptions.activeDirection : ''}>
                      {translate('portals.client.component.studiesList.status')}
                      <i className="caret-arrow" />
                    </th>
                    <th onClick={this.sortBy} data-sort="startDate" className={(this.props.paginationOptions.activeSort === 'startDate') ? this.props.paginationOptions.activeDirection : ''}>
                      {translate('portals.client.component.studiesList.startDate')}
                      <i className="caret-arrow" />
                    </th>
                    <th onClick={this.sortBy} data-sort="endDate" className={(this.props.paginationOptions.activeSort === 'endDate') ? this.props.paginationOptions.activeDirection : ''}>
                      {translate('portals.client.component.studiesList.endDate')}
                      <i className="caret-arrow" />
                    </th>
                  </tr>
                </thead>
                {this.renderStudiesTable()}
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser(),
  paginationOptions: selectPaginationOptions(),
  studies: selectStudies(),
  // sites: selectClientSites(),
});

function mapDispatchToProps(dispatch) {
  return {
    setActiveSort: (sort, direction) => dispatch(setActiveSort(sort, direction)),
    sortSuccess: (payload) => dispatch(sortSuccess(payload)),
    fetchStudies: (currentUser, searchParams) => dispatch(fetchStudies(currentUser, searchParams)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudiesList);
