import React, { PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setActiveProtocolsSort } from '../actions';
import { selectPaginationOptionsProtocols, selectSearchSponsorsFormValues } from '../selectors';
import RowItem from './RowItem';
import { translate } from '../../../../common/utilities/localization';

export class SponsorManageUsersProtocolsTable extends React.Component {
  static propTypes = {
    manageSponsorUsersData: PropTypes.object,
    editUser: PropTypes.func,
    deleteUser: PropTypes.func,
    paginationOptionsProtocols: PropTypes.object,
    setActiveProtocolsSort: PropTypes.func,
    searchFormValues: React.PropTypes.object,
    editProtocol: PropTypes.func,
    protocols: PropTypes.array,
    currentUser: React.PropTypes.object,
    filterMethod: PropTypes.func,
    userFilterQuery: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.sortBy = this.sortBy.bind(this);
  }

  sortBy(ev) {
    ev.preventDefault();
    let sort = ev.currentTarget.dataset.sort;
    let direction = 'up';


    if (ev.currentTarget.className && ev.currentTarget.className.indexOf('up') !== -1) {
      direction = 'down';
    } else if (ev.currentTarget.className && ev.currentTarget.className.indexOf('down') !== -1) {
      direction = null;
      sort = null;
    }

    this.props.setActiveProtocolsSort(sort, direction);
  }

  render() {
    let studiesList = this.props.manageSponsorUsersData.studiesList;

    studiesList = _.filter(studiesList, this.props.filterMethod);

    if (this.props.paginationOptionsProtocols.activeDirection && this.props.paginationOptionsProtocols.activeSort) {
      const dir = ((this.props.paginationOptionsProtocols.activeDirection === 'down') ? 'desc' : 'asc');

      studiesList = _.orderBy(studiesList, [(o) => {
        if (this.props.paginationOptionsProtocols.activeSort === 'protocolNumber') {
          return o.protocolNumber;
        } else if (this.props.paginationOptionsProtocols.activeSort === 'indication') {
          return o.indicationName;
        } else if (this.props.paginationOptionsProtocols.activeSort === 'cros') {
          return o.croName;
        }
        return o[this.props.paginationOptionsProtocols.activeSort];
      }], [dir]);
    }

    return (
      <div className="table-holder table-responsive">
        {
          <table className="table-manage-user alt table">
            <caption>{translate('sponsor.component.sponsorManageUsersProtocolsTable.title')}</caption>
            <thead>
              <tr>
                <th onClick={this.sortBy} data-sort="protocolNumber" className={`col1 ${(this.props.paginationOptionsProtocols.activeSort === 'protocolNumber') ? this.props.paginationOptionsProtocols.activeDirection : ''}`}>
                  {translate('sponsor.component.sponsorManageUsersProtocolsTable.tableHeadNumber')}<i className="caret-arrow" />
                </th>
                <th onClick={this.sortBy} data-sort="indication" className={`col2 ${(this.props.paginationOptionsProtocols.activeSort === 'indication') ? this.props.paginationOptionsProtocols.activeDirection : ''}`}>
                  {translate('sponsor.component.sponsorManageUsersProtocolsTable.tableHeadIndeication')}<i className="caret-arrow" />
                </th>
                <th onClick={this.sortBy} data-sort="cros" className={`col3 ${(this.props.paginationOptionsProtocols.activeSort === 'cros') ? this.props.paginationOptionsProtocols.activeDirection : ''}`}>
                  {translate('sponsor.component.sponsorManageUsersProtocolsTable.tableHeadCro')}<i className="caret-arrow" />
                </th>
                <th onClick={this.sortBy} data-sort="irbName" className={`col4 ${(this.props.paginationOptionsProtocols.activeSort === 'irb') ? this.props.paginationOptionsProtocols.activeDirection : ''}`}>
                  {translate('sponsor.component.sponsorManageUsersProtocolsTable.tableHeadIrb')}<i className="caret-arrow" />
                </th>
                <th onClick={this.sortBy} data-sort="iwrs" className={`col5 ${(this.props.paginationOptionsProtocols.activeSort === 'iwrs') ? this.props.paginationOptionsProtocols.activeDirection : ''}`}>
                  {translate('sponsor.component.sponsorManageUsersProtocolsTable.tableHeadIwrs')}<i className="caret-arrow" />
                </th>
                <th className="col6" />
                <th className="col7" />
              </tr>
            </thead>
            <tbody>
              {
                studiesList.map((item, index) => (
                  <RowItem key={index} item={item} editProtocol={this.props.editProtocol} editUser={this.props.editUser} deleteUser={this.props.deleteUser} userFilter={this.props.userFilterQuery} protocols={this.props.protocols} currentUser={this.props.currentUser} />
                ))
              }
            </tbody>
          </table>
        }
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  paginationOptionsProtocols: selectPaginationOptionsProtocols(),
  searchFormValues: selectSearchSponsorsFormValues(),
});

function mapDispatchToProps(dispatch) {
  return {
    setActiveProtocolsSort: (sort, direction) => dispatch(setActiveProtocolsSort(sort, direction)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorManageUsersProtocolsTable);
