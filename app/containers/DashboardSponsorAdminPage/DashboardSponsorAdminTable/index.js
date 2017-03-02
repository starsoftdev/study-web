import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RowItem from './RowItem';

export class DashboardSponsorAdminTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
  }

  render() {
    const sponsorAdmins = [
      { id: 1, name: 'Bruce Wayne', company: 'Pfizer', email: 'bruce.wayne@wayneenterprise.com', bd: 'Kobe Byant', ae: 'Michael Grimm' },
      { id: 2, name: 'Ray Palmer', company: 'Company 1', email: 'ray.palmer@palmertech.com', bd: 'Bianca Ryan', ae: 'Cas Haley' },
      { id: 3, name: 'Will Graham', company: 'Company 2', email: 'will.graham@wayneenterprise.com', bd: 'Terry Fator', ae: 'Eli Mattson' },
      { id: 4, name: 'Jon Snow', company: 'Company 3', email: 'jon.snow@wayneenterprise.com', bd: 'Kevin Skinner', ae: 'Tom Cotter' },
    ];

    return (
      <div className="table-responsive table-holder table-sponsor-admin alt">
        <table className="table-manage-user table">
          <caption>Admins</caption>

          <thead>
            <tr>
              <th>Sponsor <i className="caret-arrow"></i></th>
              <th>Name <i className="caret-arrow"></i></th>
              <th>EMAIL <i className="caret-arrow"></i></th>
              <th>BD <i className="caret-arrow"></i></th>
              <th>AE <i className="caret-arrow"></i></th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
            sponsorAdmins.map((item, index) => (
              <RowItem key={index} item={item} sponsorData={sponsorAdmins} />
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
