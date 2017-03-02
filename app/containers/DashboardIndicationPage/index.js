/*
 *
 * DashboardIndicationPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { DashboardIndicationSearch } from './DashboardIndicationSearch/index';
import { DashboardIndicationTable } from './DashboardIndicationTable';
import { fetchIndications } from './actions';
import { selectIndications } from './selectors';

export class DashboardIndicationPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    fetchIndications: PropTypes.func,
    indications: PropTypes.object,
  };

  componentWillMount() {
    this.props.fetchIndications();
  }

  render() {
    const { indications } = this.props;
    return (
      <div className="container-fluid dashboard-indication">
        <h2 className="main-heading">Indication</h2>

        <DashboardIndicationSearch />
        <DashboardIndicationTable indications={indications} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  indications: selectIndications(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchIndications: () => dispatch(fetchIndications()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardIndicationPage);
