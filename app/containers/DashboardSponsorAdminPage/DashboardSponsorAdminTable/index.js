import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';
import _ from 'lodash';

export class DashboardSponsorAdminTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    sponsors: PropTypes.object,
    sponsorsWithoutAdmin: PropTypes.object,
    usersByRoles: PropTypes.object,
    editUserProcess: PropTypes.object,
    editSponsorAdmin: PropTypes.func,
    deleteSponsorAdmin: PropTypes.func,
    paginationOptions: PropTypes.object,
    sponsorAdminSearchFormValues: PropTypes.object,
    setActiveSort: PropTypes.func,
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

    this.props.setActiveSort(sort, direction);
  }

  render() {
    let sponsors = this.props.sponsors.details;

    if (this.props.sponsorAdminSearchFormValues.name) {
      sponsors = _.filter(sponsors, (item) => {
        if (
          (`${item.first_name} ${item.last_name}`.toLowerCase().indexOf(this.props.sponsorAdminSearchFormValues.name.toLowerCase()) !== -1) ||
          (`${item.name}`.toLowerCase().indexOf(this.props.sponsorAdminSearchFormValues.name.toLowerCase()) !== -1)
        ) {
          return true;
        }
        return false;
      });
    }

    if (this.props.paginationOptions.activeDirection && this.props.paginationOptions.activeSort) {
      const dir = ((this.props.paginationOptions.activeDirection === 'down') ? 'desc' : 'asc');
      sponsors = _.orderBy(sponsors, [(o) => (o[this.props.paginationOptions.activeSort])], [dir]);
    }

    return (
      <div className="table-responsive table-holder table-sponsor-admin alt">
        <table className="table-manage-user table">
          <caption>Admins</caption>

          <thead>
            <tr>
              <th onClick={this.sortBy} data-sort="name" className={`th ${(this.props.paginationOptions.activeSort === 'name') ? this.props.paginationOptions.activeDirection : ''}`}>Sponsor <i className="caret-arrow"></i></th>
              <th onClick={this.sortBy} data-sort="first_name" className={`th ${(this.props.paginationOptions.activeSort === 'first_name') ? this.props.paginationOptions.activeDirection : ''}`}>Name <i className="caret-arrow"></i></th>
              <th onClick={this.sortBy} data-sort="email" className={`th ${(this.props.paginationOptions.activeSort === 'email') ? this.props.paginationOptions.activeDirection : ''}`}>EMAIL <i className="caret-arrow"></i></th>
              <th onClick={this.sortBy} data-sort="bd_user_first_name" className={`th ${(this.props.paginationOptions.activeSort === 'bd_user_first_name') ? this.props.paginationOptions.activeDirection : ''}`}>BD <i className="caret-arrow"></i></th>
              <th onClick={this.sortBy} data-sort="ae_user_first_name" className={`th ${(this.props.paginationOptions.activeSort === 'ae_user_first_name') ? this.props.paginationOptions.activeDirection : ''}`}>AE <i className="caret-arrow"></i></th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              sponsors.map((item, index) => (
                <RowItem key={index} item={item} sponsorsWithoutAdmin={this.props.sponsorsWithoutAdmin} usersByRoles={this.props.usersByRoles} editUserProcess={this.props.editUserProcess} editSponsorAdmin={this.props.editSponsorAdmin} deleteSponsorAdmin={this.props.deleteSponsorAdmin} />
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardSponsorAdminTable);
