import _ from 'lodash';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectPaginationOptionsAdmin, selectSearchSponsorsFormValues } from '../selectors';
import { setActiveAdminSort } from '../actions';
import RowItem from './RowItem';
import { translate } from '../../../../common/utilities/localization';

export class SponsorManageUsersAdminsTable extends React.Component {
  static propTypes = {
    manageSponsorUsersData: PropTypes.object,
    editUser: PropTypes.func,
    deleteUser: PropTypes.func,
    paginationOptionsAdmin: PropTypes.object,
    setActiveAdminSort: PropTypes.func,
    searchFormValues: React.PropTypes.object,
    protocols: PropTypes.array,
    currentUser: React.PropTypes.object,
    filterMethod: PropTypes.func,
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

    this.props.setActiveAdminSort(sort, direction);
  }

  render() {
    let adminsList = this.props.manageSponsorUsersData.adminsList;
    const { filterMethod } = this.props;

    adminsList = _.filter(adminsList, filterMethod);

    if (this.props.paginationOptionsAdmin.activeDirection && this.props.paginationOptionsAdmin.activeSort) {
      const dir = ((this.props.paginationOptionsAdmin.activeDirection === 'down') ? 'desc' : 'asc');
      adminsList = _.orderBy(adminsList, [(o) => {
        if (this.props.paginationOptionsAdmin.activeSort === 'first_name') {
          const firstName = o.first_name;
          const lastName = o.last_name;
          return `${firstName} ${lastName}`;
        }
        return o[this.props.paginationOptionsAdmin.activeSort];
      }], [dir]);
    }

    return (
      <div className="table-holder table-responsive">
        {
          <table className="table-manage-user table">
            <caption>{translate('sponsor.component.sponsorManageUsersAdminsTable.title')}</caption>
            <thead>
              <tr>
                <th onClick={this.sortBy} data-sort="first_name" className={`th ${(this.props.paginationOptionsAdmin.activeSort === 'first_name') ? this.props.paginationOptionsAdmin.activeDirection : ''}`}>
                  {translate('sponsor.component.sponsorManageUsersAdminsTable.tableHeadName')}<i className="caret-arrow" />
                </th>
                <th onClick={this.sortBy} data-sort="email" className={`th ${(this.props.paginationOptionsAdmin.activeSort === 'email') ? this.props.paginationOptionsAdmin.activeDirection : ''}`}>
                  {translate('sponsor.component.sponsorManageUsersAdminsTable.tableHeadEmail')}<i className="caret-arrow" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {
                adminsList.map((item, index) => (
                  <RowItem key={index} item={item} editUser={this.props.editUser} deleteUser={this.props.deleteUser} protocols={this.props.protocols} currentUser={this.props.currentUser} />
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
  paginationOptionsAdmin: selectPaginationOptionsAdmin(),
  searchFormValues: selectSearchSponsorsFormValues(),
});

function mapDispatchToProps(dispatch) {
  return {
    setActiveAdminSort: (sort, direction) => dispatch(setActiveAdminSort(sort, direction)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorManageUsersAdminsTable);
