import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';
import LoadingSpinner from 'components/LoadingSpinner';
import { selectPaginationOptionsAdmin, selectSearchSponsorsFormValues } from 'containers/SponsorManageUsers/selectors';
import { setActiveAdminSort } from 'containers/SponsorManageUsers/actions';

import _ from 'lodash';
export class SponsorManageUsersAdminsTable extends React.Component {
  static propTypes = {
    manageSponsorUsersData: PropTypes.object,
    editUser: PropTypes.func,
    deleteUser: PropTypes.func,
    paginationOptionsAdmin: PropTypes.object,
    setActiveAdminSort: PropTypes.func,
    searchFormValues: React.PropTypes.object,
  }

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

    if (this.props.searchFormValues.name) {
      adminsList = _.filter(adminsList, (item) => (`${item.first_name} ${item.last_name}`.toLowerCase().indexOf(this.props.searchFormValues.name.toLowerCase()) !== -1));
    }

    if (this.props.paginationOptionsAdmin.activeDirection && this.props.paginationOptionsAdmin.activeSort) {
      const dir = ((this.props.paginationOptionsAdmin.activeDirection === 'down') ? 'desc' : 'asc');
      adminsList = _.orderBy(adminsList, [(o) => (o[this.props.paginationOptionsAdmin.activeSort])], [dir]);
    }

    return (
      <div className="table-holder table-responsive">
        {(this.props.manageSponsorUsersData.fetching)
          ?
          <div className="text-center">
            <LoadingSpinner showOnlyIcon size={20} />
          </div>
          :
          <table className="table-manage-user table">
            <caption>
              ADMINS
            </caption>

            <thead>
              <tr>
                <th onClick={this.sortBy} data-sort="first_name" className={`th ${(this.props.paginationOptionsAdmin.activeSort === 'first_name') ? this.props.paginationOptionsAdmin.activeDirection : ''}`}>NAME<i className="caret-arrow"></i></th>
                <th onClick={this.sortBy} data-sort="email" className={`th ${(this.props.paginationOptionsAdmin.activeSort === 'email') ? this.props.paginationOptionsAdmin.activeDirection : ''}`}>EMAIL<i className="caret-arrow"></i></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {
              adminsList.map((item, index) => (
                <RowItem key={index} item={item} editUser={this.props.editUser} deleteUser={this.props.deleteUser} />
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
