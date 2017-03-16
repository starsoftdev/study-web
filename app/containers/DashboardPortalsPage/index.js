/*
 *
 * DashboardPortalsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { selectDashboardPortalsClients, selectDashboardPortalsFormValues, selectDashboardPortalsSponsors } from './selectors';
import { DashboardPortalsForm } from '../DashboardPortalsPage/DashboardPortalsForm';
import { fetchClients, fetchSponsors } from './actions';
import { createStructuredSelector } from 'reselect';

export class DashboardPortalsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    clients: PropTypes.object,
    sponsors: PropTypes.object,
    formValues: PropTypes.object,
    fetchClients: PropTypes.func,
    fetchSponsors: PropTypes.func,
  };

  componentWillMount() {
    this.props.fetchClients();
    this.props.fetchSponsors();
  }

  render() {
    return (
      <div className="container-fluid dashboard-portals">
        <Helmet title="Portals - StudyKIK" />
        <h2 className="main-heading">PORTALS</h2>

        <DashboardPortalsForm
          clients={this.props.clients}
          sponsors={this.props.sponsors}
          formValues={this.props.formValues}
        />

      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  clients: selectDashboardPortalsClients(),
  sponsors: selectDashboardPortalsSponsors(),
  formValues: selectDashboardPortalsFormValues(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchClients: () => dispatch(fetchClients()),
    fetchSponsors: () => dispatch(fetchSponsors()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPortalsPage);
